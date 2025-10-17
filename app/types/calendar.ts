export interface CalendarEvent {
  id: number
  title: string
  description: string
  event_date?: string // format: YYYY-MM-DD (for backward compatibility)
  start_date?: string // format: YYYY-MM-DD
  end_date?: string // format: YYYY-MM-DD
  category?: string
  location?: string
  organizer?: string
  image: string
  created_at?: string
  updated_at?: string
}

export interface GuestBook {
  id: number
  title: string
  instance_name: string
  contact_person: string
  email: string
  phone: string
  request_date: string // format: YYYY-MM-DD
  description: string
  created_at: string
  status?: 'pending' | 'approved' | 'rejected'
}
