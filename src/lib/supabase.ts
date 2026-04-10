import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yikeyhhwzdemvnahacte.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpa2V5aGh3emRlbXZuYWhhY3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzI4NjQsImV4cCI6MjA4ODcwODg2NH0.iDkqmCgPwOjiXvTnce9OU2xOg3s3P50HWvPZNNmo6Ns'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})
