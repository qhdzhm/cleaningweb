"use client";

import { useEffect, useState } from "react";
import { supabase, type Booking } from "@/lib/supabase";
import { generateInvoicePDF } from "@/lib/invoice";

type AssignModalData = {
  booking: Booking;
  isOpen: boolean;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<AssignModalData>({ booking: {} as Booking, isOpen: false });
  const [editModal, setEditModal] = useState<AssignModalData>({ booking: {} as Booking, isOpen: false });
  const [assignForm, setAssignForm] = useState({
    cleanerName: "",
    scheduledDate: "",
    startTime: "09:00",
    durationHours: 3,
    generateRecurring: false,
    recurringCount: 4
  });
  const [editForm, setEditForm] = useState({
    address: "",
    final_price: 0,
    internal_notes: ""
  });

  useEffect(() => {
    fetchBookings();

    // 实时监听新订单
    const channel = supabase
      .channel('bookings_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' }, 
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const booking = bookings.find(b => b.id === id);
    
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update status');
    } else {
      // 如果状态改为 completed，自动生成并下载 Invoice
      if (newStatus === 'completed' && booking) {
        await handleGenerateInvoice(booking);
      }
      fetchBookings();
    }
  };

  const handleGenerateInvoice = async (booking: Booking) => {
    try {
      const invoiceHTML = await generateInvoicePDF(booking.id!);
      if (!invoiceHTML) {
        alert('Failed to generate invoice');
        return;
      }

      // 创建一个新窗口显示 Invoice（用户可以打印或另存为PDF）
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        
        // 自动打开打印对话框
        setTimeout(() => {
          printWindow.print();
        }, 500);

        alert('✅ Invoice generated! Check the new window to print or save as PDF.');
      }
    } catch (error) {
      console.error('Invoice generation error:', error);
      alert('Failed to generate invoice');
    }
  };

  const openAssignModal = (booking: Booking) => {
    setAssignModal({ booking, isOpen: true });
    // 预填默认值
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // 判断是否需要自动勾选循环
    const isRecurring = !!(booking.frequency && ['weekly', 'fortnightly', 'monthly'].includes(booking.frequency));
    
    setAssignForm({
      cleanerName: "",
      scheduledDate: tomorrow.toISOString().split('T')[0],
      startTime: "09:00",
      durationHours: 3,
      generateRecurring: isRecurring,
      recurringCount: 4
    });
  };

  const handleAssign = async () => {
    if (!assignForm.cleanerName) {
      alert('Please enter cleaner name');
      return;
    }

    try {
      const endTime = new Date(`2000-01-01T${assignForm.startTime}`);
      endTime.setHours(endTime.getHours() + assignForm.durationHours);
      const endTimeStr = endTime.toTimeString().slice(0, 5);

      // 如果勾选了"生成循环排班"
      if (assignForm.generateRecurring && assignModal.booking.frequency) {
        const schedules = [];
        const startDate = new Date(assignForm.scheduledDate);
        
        // 计算间隔天数
        let intervalDays = 7; // 默认每周
        if (assignModal.booking.frequency === 'fortnightly') intervalDays = 14;
        if (assignModal.booking.frequency === 'monthly') intervalDays = 30;

        // 生成多次排班
        for (let i = 0; i < assignForm.recurringCount; i++) {
          const scheduleDate = new Date(startDate);
          scheduleDate.setDate(scheduleDate.getDate() + (i * intervalDays));
          
          // 第一次用 final_price，后续为 null（需要单独设置）
          const price = i === 0 && assignModal.booking.final_price 
            ? assignModal.booking.final_price 
            : null;
          
          schedules.push({
            booking_id: assignModal.booking.id,
            cleaner_name: assignForm.cleanerName,
            scheduled_date: scheduleDate.toISOString().split('T')[0],
            start_time: assignForm.startTime,
            end_time: endTimeStr,
            duration_hours: assignForm.durationHours,
            status: 'scheduled',
            price: price
          });
        }

        // 批量插入
        const { error: scheduleError } = await supabase
          .from('schedules')
          .insert(schedules);

        if (scheduleError) throw scheduleError;

        alert(`✅ Successfully created ${schedules.length} recurring schedules!`);
      } else {
        // 只创建一次排班
        const { error: scheduleError } = await supabase
          .from('schedules')
          .insert({
            booking_id: assignModal.booking.id,
            cleaner_name: assignForm.cleanerName,
            scheduled_date: assignForm.scheduledDate,
            start_time: assignForm.startTime,
            end_time: endTimeStr,
            duration_hours: assignForm.durationHours,
            status: 'scheduled',
            price: assignModal.booking.final_price || null
          });

        if (scheduleError) throw scheduleError;

        alert('✅ Successfully assigned!');
      }

      // 更新 booking 状态
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ 
          status: 'assigned',
          assigned_to: assignForm.cleanerName
        })
        .eq('id', assignModal.booking.id);

      if (bookingError) throw bookingError;

      setAssignModal({ booking: {} as Booking, isOpen: false });
      fetchBookings();
    } catch (error) {
      console.error('Assign error:', error);
      alert('Failed to assign booking');
    }
  };

  const openEditModal = (booking: Booking) => {
    setEditModal({ booking, isOpen: true });
    setEditForm({
      address: booking.address || "",
      final_price: booking.final_price || booking.estimated_price_max || 0,
      internal_notes: booking.internal_notes || ""
    });
  };

  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          address: editForm.address,
          final_price: editForm.final_price,
          internal_notes: editForm.internal_notes
        })
        .eq('id', editModal.booking.id);

      if (error) throw error;

      alert('✅ Booking updated!');
      setEditModal({ booking: {} as Booking, isOpen: false });
      fetchBookings();
    } catch (error) {
      console.error('Edit error:', error);
      alert('Failed to update booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Booking Dashboard</h1>
          <p className="text-slate-600">Total Bookings: <span className="font-bold text-teal-600">{bookings.length}</span></p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {['pending', 'confirmed', 'assigned', 'completed'].map((status) => {
            const count = bookings.filter(b => b.status === status).length;
            return (
              <div key={status} className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm text-slate-500 capitalize mb-1">{status}</p>
                <p className="text-3xl font-bold text-slate-800">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Bookings Table */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No bookings yet</h3>
            <p className="text-slate-500">When customers submit the form, they'll appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Customer</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Service</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Details</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Price</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{booking.customer_name}</p>
                          <p className="text-sm text-slate-500">{booking.customer_phone}</p>
                          {booking.customer_email && (
                            <p className="text-xs text-slate-400">{booking.customer_email}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full capitalize">
                          {booking.service_category}
                        </span>
                        {booking.service_subtype && (
                          <span className="block text-xs text-slate-500 mt-1 capitalize">{booking.service_subtype}</span>
                        )}
                        {booking.company_name && (
                          <span className="block text-xs text-slate-500 mt-1">{booking.company_name}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {booking.service_category === 'residential' ? (
                          <div className="text-sm text-slate-600">
                            <p>{booking.bedrooms}BR / {booking.bathrooms}BA</p>
                            <p className="text-xs text-slate-400 capitalize">{booking.frequency}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-600">Custom Quote</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {booking.estimated_price_min && booking.estimated_price_max ? (
                          <p className="text-sm font-semibold text-slate-800">
                            ${booking.estimated_price_min} - ${booking.estimated_price_max}
                          </p>
                        ) : (
                          <p className="text-sm text-slate-400">TBD</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {/* Status Dropdown - 可以改状态 */}
                        <select
                          value={booking.status || 'pending'}
                          onChange={(e) => updateStatus(booking.id!, e.target.value)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize border-0 cursor-pointer ${getStatusColor(booking.status || 'pending')}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="assigned">Assigned</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 flex-wrap">
                          {/* Edit Button - 任何状态都可以编辑 */}
                          <button
                            onClick={() => openEditModal(booking)}
                            className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            ✏️ Edit
                          </button>

                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking.id!, 'confirmed')}
                                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                ✓ Confirm
                              </button>
                              <button
                                onClick={() => updateStatus(booking.id!, 'cancelled')}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                ✕ Reject
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => openAssignModal(booking)}
                              className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              📅 Assign Cleaner
                            </button>
                          )}
                          {booking.status === 'assigned' && (
                            <div className="flex gap-2">
                              <a
                                href="/admin/schedule"
                                className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-lg transition-colors"
                              >
                                📅 View Schedule
                              </a>
                              {/* 如果不是循环订单，可以直接完成 */}
                              {!booking.frequency || booking.frequency === 'one-off' ? (
                                <button
                                  onClick={() => updateStatus(booking.id!, 'completed')}
                                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
                                >
                                  ✓ Mark Complete
                                </button>
                              ) : null}
                            </div>
                          )}
                          {booking.status === 'completed' && (
                            <button
                              onClick={() => handleGenerateInvoice(booking)}
                              className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                              📄 View Invoice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {assignModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Assign Cleaner</h3>
            
            <div className="space-y-4 mb-6">
              {/* Customer Info */}
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Customer</p>
                <p className="font-semibold text-slate-800">{assignModal.booking.customer_name}</p>
                <p className="text-sm text-slate-600">{assignModal.booking.customer_phone}</p>
              </div>

              {/* Cleaner Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cleaner Name *</label>
                <input
                  type="text"
                  value={assignForm.cleanerName}
                  onChange={(e) => setAssignForm({...assignForm, cleanerName: e.target.value})}
                  placeholder="e.g. Maria"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Scheduled Date *</label>
                <input
                  type="date"
                  value={assignForm.scheduledDate}
                  onChange={(e) => setAssignForm({...assignForm, scheduledDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              {/* Time & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={assignForm.startTime}
                    onChange={(e) => setAssignForm({...assignForm, startTime: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (hrs)</label>
                  <input
                    type="number"
                    value={assignForm.durationHours}
                    onChange={(e) => setAssignForm({...assignForm, durationHours: Number(e.target.value)})}
                    min="1"
                    max="8"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              {/* Recurring Schedule (if applicable) */}
              {assignModal.booking.frequency && ['weekly', 'fortnightly', 'monthly'].includes(assignModal.booking.frequency) && (
                <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assignForm.generateRecurring}
                      onChange={(e) => setAssignForm({...assignForm, generateRecurring: e.target.checked})}
                      className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">🔄 Generate Recurring Schedule</p>
                      <p className="text-sm text-slate-600 capitalize">
                        This is a <strong>{assignModal.booking.frequency}</strong> booking
                      </p>
                    </div>
                  </label>

                  {assignForm.generateRecurring && (
                    <div className="mt-3 pl-8">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        How many occurrences?
                      </label>
                      <input
                        type="number"
                        value={assignForm.recurringCount}
                        onChange={(e) => setAssignForm({...assignForm, recurringCount: Number(e.target.value)})}
                        min="2"
                        max="12"
                        className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-2">
                        Will create <strong className="text-teal-600">{assignForm.recurringCount}</strong> schedules
                        {assignModal.booking.frequency === 'weekly' && ' (1 per week)'}
                        {assignModal.booking.frequency === 'fortnightly' && ' (every 2 weeks)'}
                        {assignModal.booking.frequency === 'monthly' && ' (1 per month)'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setAssignModal({ booking: {} as Booking, isOpen: false })}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-500/25"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Edit Booking</h3>
            
            <div className="space-y-4 mb-6">
              {/* Customer Info */}
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Customer</p>
                <p className="font-semibold text-slate-800">{editModal.booking.customer_name}</p>
                <p className="text-sm text-slate-600">{editModal.booking.customer_phone}</p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  placeholder="e.g. 123 Collins St, Hobart TAS 7000"
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
                />
              </div>

              {/* Final Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Final Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={editForm.final_price}
                  onChange={(e) => setEditForm({...editForm, final_price: Number(e.target.value)})}
                  placeholder="150"
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
                {editModal.booking.estimated_price_min && editModal.booking.estimated_price_max && (
                  <p className="text-xs text-slate-500 mt-1">
                    Original estimate: ${editModal.booking.estimated_price_min} - ${editModal.booking.estimated_price_max}
                  </p>
                )}
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Internal Notes (Optional)
                </label>
                <textarea
                  value={editForm.internal_notes}
                  onChange={(e) => setEditForm({...editForm, internal_notes: e.target.value})}
                  placeholder="e.g. Customer requested extra attention to kitchen"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditModal({ booking: {} as Booking, isOpen: false })}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-500/25"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
