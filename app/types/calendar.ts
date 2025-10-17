export interface CalendarEvent {
  id: number
  title: string
  description: string
  event_date: string // format: YYYY-MM-DD
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
