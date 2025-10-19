// Calendar Event Type
export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  event_date: string; // YYYY-MM-DD format
  start_date?: string; // Optional for events with date ranges
  end_date?: string; // Optional for events with date ranges
  image?: string; // Event image URL
  category?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

// Guest Book Type
export interface GuestBook {
  id: number;
  title: string;
  instance_name: string;
  contact_person: string;
  email: string;
  phone: string;
  request_date: string; // YYYY-MM-DD format
  description: string;
  status?: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at?: string;
  updated_at?: string;
}

// Guest Book Form Data (for creating new entries)
export interface GuestBookFormData {
  title: string;
  instance_name: string;
  contact_person: string;
  email: string;
  phone: string;
  request_date: string;
  description: string;
}
