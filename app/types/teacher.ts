export interface TeacherUser {
  id: number
  name: string
}

export interface Teacher {
  id: number
  nig: string
  full_name: string
  position: string
  subject: string
  photo?: string
  description: string
  user: TeacherUser
}
