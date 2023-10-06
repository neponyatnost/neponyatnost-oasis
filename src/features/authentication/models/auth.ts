export interface AuthProps {
  email: string
  password: string
}

export interface UpdateUserProps {
  password?: string
  fullName?: string
  avatar?: string | File | null
}

export interface SignUpProps {
  fullName: string
  email: string
  password: string
  passwordConfirm?: string
  avatar?: string
}

export interface UserProps {
  id?: string
  aud?: string
  role?: string
  email?: string
  email_confirmed_at?: string
  phone?: string
  confirmed_at?: string
  recovery_sent_at?: string
  last_sign_in_at?: string
  app_metadata?: AppMetadata
  user_metadata?: UserMetadata
  identities?: Identities
  created_at?: string
  updated_at?: string
}

export interface AppMetadata {
  provider?: string
  providers?: Providers
}

export interface Providers {
  '0'?: string
}

export interface UserMetadata {
  avatar?: string
  fullName?: string
}

export interface Identities {
  '0'?: N0
}

export interface N0 {
  id?: string
  user_id?: string
  identity_data?: IdentityData
  provider?: string
  last_sign_in_at?: string
  created_at?: string
  updated_at?: string
}

export interface IdentityData {
  email?: string
  sub?: string
}
