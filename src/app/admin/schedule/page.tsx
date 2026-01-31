"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Schedule = {
  id: string;
  booking_id: string;
  cleaner_name: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  status: string;
  price?: number | null;
  bookings?: {
    customer_name: string;
    customer_phone: string;
    service_category: string;
    bedrooms?: number;
    bathrooms?: number;
    frequency?: string;
    final_price?: number;
  };
};

export default function AdminSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewRange, setViewRange] = useState<'week' | 'month' | '3months'>('month');
  const [startDate, setStartDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [editPriceModal, setEditPriceModal] = useState<{ schedule: Schedule | null; isOpen: boolean }>({
    schedule: null,
    isOpen: false,
  });
  const [priceInput, setPriceInput] = useState<number>(0);

  useEffect(() => {
    fetchSchedules();
    
    // 实时监听 schedules 表变化
    const subscription = supabase
      .channel('schedules-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'schedules' },
        () => {
          fetchSchedules();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [startDate, viewRange]);

  const fetchSchedules = async () => {
    setLoading(true);
    
    // 根据 viewRange 计算天数
    let dayCount = 7;
    if (viewRange === 'month') dayCount = 30;
    if (viewRange === '3months') dayCount = 90;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + dayCount);

    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        bookings (
          customer_name,
          customer_phone,
          service_category,
          bedrooms,
          bathrooms,
          frequency
        )
      `)
      .gte('scheduled_date', start.toISOString().split('T')[0])
      .lte('scheduled_date', end.toISOString().split('T')[0])
      .order('scheduled_date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data || []);
    }
    setLoading(false);
  };

  // 生成日期范围，并按周分组
  const getWeeks = () => {
    const weeks = [];
    const start = new Date(startDate);
    
    let dayCount = 7;
    if (viewRange === 'month') dayCount = 30;
    if (viewRange === '3months') dayCount = 90;

    let currentWeek = [];
    for (let i = 0; i < dayCount; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      currentWeek.push(date);
      
      // 每7天或最后一天，结束当前周
      if (currentWeek.length === 7 || i === dayCount - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    return weeks;
  };

  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedules.filter(s => s.scheduled_date === dateStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const updateScheduleStatus = async (scheduleId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ status: newStatus })
        .eq('id', scheduleId);

      if (error) throw error;
      
      // 自动刷新
      fetchSchedules();
    } catch (error) {
      console.error('Error updating schedule status:', error);
      alert('Failed to update schedule status');
    }
  };

  const deleteSchedule = async (scheduleId: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) throw error;
      
      alert('✅ Schedule deleted!');
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    }
  };

  const handleGenerateInvoice = async (schedule: Schedule) => {
    if (!schedule.bookings) {
      alert('No booking information found');
      return;
    }

    // 检查是否设置了价格
    if (!schedule.price) {
      alert('⚠️ Please set a price for this schedule first!');
      openEditPriceModal(schedule);
      return;
    }

    try {
      // 构建 booking 对象用于生成 invoice
      const booking = {
        id: schedule.booking_id,
        customer_name: schedule.bookings.customer_name,
        customer_phone: schedule.bookings.customer_phone,
        service_category: schedule.bookings.service_category,
        bedrooms: schedule.bookings.bedrooms,
        bathrooms: schedule.bookings.bathrooms,
        scheduled_date: schedule.scheduled_date,
        cleaner_name: schedule.cleaner_name,
        final_price: schedule.price, // 使用 schedule 的价格
      };

      // 动态导入 invoice 生成函数
      const { generateInvoicePDF } = await import('@/lib/invoice');
      
      // 生成 invoice HTML
      const invoiceHTML = await generateInvoicePDF(booking as any);
      
      if (!invoiceHTML) {
        alert('Failed to generate invoice');
        return;
      }

      // 在新窗口打开
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        
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

  const openEditPriceModal = (schedule: Schedule) => {
    setEditPriceModal({ schedule, isOpen: true });
    setPriceInput(schedule.price || schedule.bookings?.final_price || 0);
  };

  const handleSavePrice = async () => {
    if (!editPriceModal.schedule) return;

    try {
      const { error } = await supabase
        .from('schedules')
        .update({ price: priceInput })
        .eq('id', editPriceModal.schedule.id);

      if (error) throw error;

      alert('✅ Price updated!');
      setEditPriceModal({ schedule: null, isOpen: false });
      fetchSchedules();
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update price');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  const weeks = getWeeks();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Schedule Calendar</h1>
          <p className="text-slate-600">View all upcoming cleaning jobs by date</p>
        </div>

        {/* Date Range Selector */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-2">View Range</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewRange('week')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewRange === 'week'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setViewRange('month')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewRange === 'month'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  30 Days
                </button>
                <button
                  onClick={() => setViewRange('3months')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewRange === '3months'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  90 Days
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStartDate(new Date().toISOString().split('T')[0])}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                📅 Today
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <strong className="text-teal-600">{schedules.length}</strong> schedules from{' '}
            <strong>{new Date(startDate).toLocaleDateString()}</strong> to{' '}
            <strong>
              {new Date(
                new Date(startDate).setDate(
                  new Date(startDate).getDate() + (viewRange === 'week' ? 7 : viewRange === 'month' ? 30 : 90)
                )
              ).toLocaleDateString()}
            </strong>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Total Scheduled</p>
            <p className="text-3xl font-bold text-slate-800">{schedules.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Today</p>
            <p className="text-3xl font-bold text-blue-600">
              {getSchedulesForDate(new Date()).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-yellow-600">
              {schedules.filter(s => s.status === 'in_progress').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {schedules.filter(s => s.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Calendar Grid - 7 columns like a real calendar */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-bold text-slate-600 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Weeks */}
          <div className="space-y-4">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-4">
                {week.map((date) => {
                  const daySchedules = getSchedulesForDate(date);
                  const isCurrentDay = isToday(date);
                  const isPastDay = isPast(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`border-2 rounded-xl p-3 transition-all min-h-[120px] ${
                        isCurrentDay
                          ? 'border-teal-500 bg-teal-50'
                          : isPastDay
                          ? 'border-slate-100 bg-slate-50/50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {/* Date Header */}
                      <div className="mb-2 pb-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-xl font-bold ${isCurrentDay ? 'text-teal-600' : 'text-slate-800'}`}>
                              {date.getDate()}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {date.toLocaleDateString('en-US', { month: 'short' })}
                            </p>
                          </div>
                          {isCurrentDay && (
                            <span className="px-1.5 py-0.5 bg-teal-500 text-white text-[10px] font-bold rounded">
                              TODAY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Schedules */}
                      {daySchedules.length === 0 ? (
                        <p className="text-[10px] text-slate-400 text-center py-2">No bookings</p>
                      ) : (
                        <div className="space-y-1.5">
                          {daySchedules.map((schedule) => (
                            <div
                              key={schedule.id}
                              className={`p-2 rounded-lg border ${getStatusColor(schedule.status)} transition-all hover:shadow-md group relative`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-start justify-between">
                                  <p className="font-bold text-[10px] text-slate-800">
                                    {schedule.start_time}
                                  </p>
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                                    schedule.status === 'scheduled' ? 'bg-blue-500 text-white' :
                                    schedule.status === 'in_progress' ? 'bg-yellow-500 text-white' :
                                    schedule.status === 'completed' ? 'bg-green-500 text-white' :
                                    'bg-gray-500 text-white'
                                  }`}>
                                    {schedule.status === 'in_progress' ? 'DOING' : schedule.status}
                                  </span>
                                </div>
                                
                                <p className="text-[10px] font-semibold text-slate-700">
                                  👤 {schedule.cleaner_name}
                                </p>
                                
                                {schedule.bookings && (
                                  <div className="pt-1 border-t border-white/30 space-y-0.5">
                                    <p className="text-[10px] font-medium text-slate-700 truncate">
                                      {schedule.bookings.customer_name}
                                    </p>
                                    {schedule.bookings.frequency && (
                                      <p className="text-[9px] text-teal-600 font-semibold capitalize">
                                        🔄 {schedule.bookings.frequency}
                                      </p>
                                    )}
                                    {/* Price Display */}
                                    {schedule.price ? (
                                      <p className="text-[10px] font-bold text-green-600">
                                        💰 ${schedule.price}
                                      </p>
                                    ) : (
                                      <p className="text-[9px] text-orange-600 font-semibold">
                                        ⚠️ Price not set
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Action Buttons (显示在 hover 时) */}
                                <div className="pt-1 mt-1 border-t border-white/50 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {/* 主要操作按钮 */}
                                  <div className="flex gap-1">
                                    {schedule.status === 'scheduled' && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateScheduleStatus(schedule.id, 'in_progress');
                                        }}
                                        className="flex-1 px-1 py-0.5 bg-yellow-500 hover:bg-yellow-600 text-white text-[8px] font-bold rounded"
                                      >
                                        ▶ Start
                                      </button>
                                    )}
                                    {schedule.status === 'in_progress' && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateScheduleStatus(schedule.id, 'completed');
                                        }}
                                        className="flex-1 px-1 py-0.5 bg-green-500 hover:bg-green-600 text-white text-[8px] font-bold rounded"
                                      >
                                        ✓ Done
                                      </button>
                                    )}
                                    {schedule.status === 'completed' && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleGenerateInvoice(schedule);
                                        }}
                                        className="flex-1 px-1 py-0.5 bg-teal-500 hover:bg-teal-600 text-white text-[8px] font-bold rounded"
                                      >
                                        📄 Invoice
                                      </button>
                                    )}
                                    {(schedule.status === 'scheduled' || schedule.status === 'in_progress') && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (confirm('Cancel this schedule?')) {
                                            updateScheduleStatus(schedule.id, 'cancelled');
                                          }
                                        }}
                                        className="px-1 py-0.5 bg-red-500 hover:bg-red-600 text-white text-[8px] font-bold rounded"
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </div>

                                  {/* 价格编辑按钮 */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditPriceModal(schedule);
                                    }}
                                    className="w-full px-1 py-0.5 bg-purple-600 hover:bg-purple-700 text-white text-[8px] font-bold rounded"
                                  >
                                    💰 Set Price
                                  </button>

                                  {/* 删除按钮 (所有状态都可以删除) */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteSchedule(schedule.id);
                                    }}
                                    className="w-full px-1 py-0.5 bg-gray-700 hover:bg-gray-800 text-white text-[8px] font-bold rounded"
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-200"></div>
            <span className="text-sm text-slate-600">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-200"></div>
            <span className="text-sm text-slate-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-200"></div>
            <span className="text-sm text-slate-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-200"></div>
            <span className="text-sm text-slate-600">Cancelled</span>
          </div>
        </div>
      </div>

      {/* Price Edit Modal */}
      {editPriceModal.isOpen && editPriceModal.schedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Set Price</h3>
            
            <div className="space-y-4 mb-6">
              {/* Schedule Info */}
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Schedule Details</p>
                <p className="font-semibold text-slate-800">
                  {editPriceModal.schedule.bookings?.customer_name}
                </p>
                <p className="text-sm text-slate-600">
                  {new Date(editPriceModal.schedule.scheduled_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {editPriceModal.schedule.start_time} ({editPriceModal.schedule.duration_hours}h)
                </p>
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  placeholder="150"
                  min="0"
                  step="1"
                  autoFocus
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg font-semibold"
                />
                {editPriceModal.schedule.bookings?.final_price && (
                  <p className="text-xs text-slate-500 mt-2">
                    💡 Default booking price: ${editPriceModal.schedule.bookings.final_price}
                  </p>
                )}
                <p className="text-xs text-slate-600 mt-2">
                  💡 <strong>Tip:</strong> First clean? Charge more for deep clean. Regular clean? Use standard rate.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditPriceModal({ schedule: null, isOpen: false })}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrice}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-500/25"
              >
                Save Price
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
