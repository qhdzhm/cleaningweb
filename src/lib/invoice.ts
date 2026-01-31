import { supabase } from './supabase';

export async function generateInvoicePDF(bookingId: string) {
  // 获取订单详情
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error || !booking) {
    console.error('Failed to fetch booking:', error);
    return null;
  }

  // 生成 Invoice HTML
  const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #1e293b;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px solid #14b8a6;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .company-name {
      font-size: 28px;
      font-weight: bold;
      color: #14b8a6;
    }
    .invoice-title {
      font-size: 36px;
      font-weight: bold;
      color: #475569;
      text-align: right;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th {
      background: #f1f5f9;
      padding: 12px;
      text-align: left;
      font-weight: bold;
      border-bottom: 2px solid #cbd5e1;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    .total-row {
      background: #14b8a6;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="company-name">NaturePure Cleaning</div>
      <div style="margin-top: 5px; color: #64748b;">Chemical-Free · Eco-Friendly</div>
      <div style="margin-top: 10px; font-size: 14px;">
        Phone: 0478 759 693<br>
        Email: info@naturepurecleaning.com.au
      </div>
    </div>
    <div class="invoice-title">INVOICE</div>
  </div>

  <div class="section">
    <div class="section-title">Bill To</div>
    <div style="font-size: 16px;">
      <strong>${booking.customer_name}</strong><br>
      ${booking.customer_phone}<br>
      ${booking.customer_email || ''}
      ${booking.address ? `<br>${booking.address}` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Invoice Details</div>
    <div style="display: flex; gap: 40px; font-size: 14px;">
      <div>
        <strong>Invoice #:</strong> ${booking.id?.slice(0, 8).toUpperCase()}<br>
        <strong>Date:</strong> ${new Date().toLocaleDateString('en-AU')}
      </div>
      <div>
        <strong>Service Date:</strong> ${booking.preferred_date || 'TBD'}<br>
        <strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">PAID</span>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Quantity</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>${booking.service_category === 'residential' ? 'Home Cleaning Service' : 'Commercial Cleaning Service'}</strong><br>
          <span style="color: #64748b; font-size: 13px;">
            ${booking.service_category === 'residential' 
              ? `${booking.bedrooms} Bedroom, ${booking.bathrooms} Bathroom · ${booking.frequency}`
              : `${booking.service_subtype || 'Office Cleaning'}`}
          </span>
        </td>
        <td style="text-align: center;">1</td>
        <td style="text-align: right;">$${booking.final_price || booking.estimated_price_max || 0}.00</td>
        <td style="text-align: right;">$${booking.final_price || booking.estimated_price_max || 0}.00</td>
      </tr>
      ${booking.extras && Object.entries(booking.extras).filter(([_, v]) => v).map(([key]) => {
        const prices: Record<string, number> = { oven: 80, windows: 40, fridge: 40 };
        const price = prices[key] || 0;
        return `
        <tr>
          <td>
            <span style="color: #64748b;">+ ${key.charAt(0).toUpperCase() + key.slice(1)} Deep Clean</span>
          </td>
          <td style="text-align: center;">1</td>
          <td style="text-align: right;">$${price}.00</td>
          <td style="text-align: right;">$${price}.00</td>
        </tr>
        `;
      }).join('') || ''}
      <tr class="total-row">
        <td colspan="3" style="text-align: right;">TOTAL (AUD)</td>
        <td style="text-align: right;">$${booking.final_price || booking.estimated_price_max || 0}.00</td>
      </tr>
    </tbody>
  </table>

  ${booking.notes ? `
  <div class="section" style="margin-top: 30px;">
    <div class="section-title">Notes</div>
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px;">
      ${booking.notes}
    </div>
  </div>
  ` : ''}

  <div class="footer">
    <p>Thank you for choosing NaturePure Cleaning!</p>
    <p>This invoice was generated on ${new Date().toLocaleString('en-AU')}</p>
  </div>
</body>
</html>
  `;

  return invoiceHTML;
}

export async function sendInvoiceEmail(bookingId: string, invoiceHTML: string, customerEmail: string) {
  // 使用 web3forms 发送邮件
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "1e9599d5-9e74-4c7d-85f4-66841f2a2e99",
        subject: `Invoice for Your NaturePure Cleaning Service`,
        from_name: "NaturePure Cleaning",
        email: customerEmail,
        message: invoiceHTML,
        content_type: "text/html"
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return false;
  }
}
