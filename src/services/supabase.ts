import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://arujhmvxgcqzdukfrjwa.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydWpobXZ4Z2NxemR1a2ZyandhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMDEzMjIsImV4cCI6MjAxMDg3NzMyMn0.HVU-9fAJhtOkxqvKwi720KWBYqJdt4kN4xTdTj3Mdew'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
