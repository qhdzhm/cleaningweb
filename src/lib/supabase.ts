import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hgqumkdddfcfqwmnnwxa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncXVta2RkZGZjZnF3bW5ud3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NzkzMzEsImV4cCI6MjA4NTM1NTMzMX0.rWMKDFLL1pBdflBaY8neC8VBWQVAqW6DcpnDvMayAos'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript 类型定义
export type Booking = {
  id?: string
  created_at?: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  service_category: 'residential' | 'commercial' | 'airbnb'
  service_subtype?: string
  bedrooms?: number
  bathrooms?: number
  frequency?: string
  company_name?: string
  estimated_price_min?: number
  estimated_price_max?: number
  final_price?: number
  extras?: Record<string, boolean>
  address?: string
  preferred_date?: string
  preferred_time?: string
  status?: string
  assigned_to?: string
  notes?: string
  internal_notes?: string
}
