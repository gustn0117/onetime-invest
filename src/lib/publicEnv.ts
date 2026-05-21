/**
 * Public Supabase connection values.
 * The anon key is safe to expose — row-level security gates all access.
 * Kept dependency-free so lightweight callers can read it without pulling
 * in the full supabase-js bundle.
 */
export const SUPABASE_URL = 'https://api.hsweb.pics'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE3OTk1MzU2MDB9.pei5Gx1wqEkbcDs1CiHFuTWNuVRlcrG5dPmYdrAqDdY'
export const DB_SCHEMA = 'onetime_invest'
