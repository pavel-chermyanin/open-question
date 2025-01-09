
export type User = {
  id: number
  client_id: number
  email: string
  username: string
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
  role: Role
}

type Role = 'admin' | 'editor' | 'viewer'

export type UserState = {
  user: User | null
}