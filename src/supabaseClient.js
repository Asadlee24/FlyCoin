// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase URL and Anon Key
const SUPABASE_URL = 'https://tmhjqejachfolusmvhmj.supabase.co'; // Your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaGpxZWphY2hmb2x1c212aG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNTU5MzgsImV4cCI6MjAzOTczMTkzOH0.2HR21iYFnqdRILIDD9NHILf_j7qAg7_0JEsU4gQBErw'; // Your Supabase Anon Key

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
