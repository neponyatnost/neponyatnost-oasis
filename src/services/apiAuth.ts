import { v4 as uuid } from 'uuid'
import {
  AuthProps,
  SignUpProps,
  UpdateUserProps,
} from '../features/authentication/models/auth'
import supabase, { supabaseUrl } from './supabase'

export async function signup({
  fullName,
  email,
  avatar,
  password,
}: SignUpProps) {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: avatar || '',
      },
    },
  })

  if (signupError) {
    throw new Error(signupError.message)
  }

  return { signupData, signupError }
}

export async function login({ email, password }: AuthProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (!sessionData.session) {
    return null
  }

  if (sessionError) {
    throw new Error(sessionError.message)
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (!userData) {
    return null
  }

  if (userError) {
    throw new Error(userError.message)
  }

  return userData.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUserProps) {
  let updateData = {}

  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data: userData, error: userError } = await supabase.auth.updateUser(
    updateData
  )

  if (userError) {
    throw new Error(userError.message)
  }

  if (!avatar) {
    return userData.user
  }

  const avatarUrl = `avatar-${uuid()}`.replaceAll('/', '')

  const { error: avatarError } = await supabase.storage
    .from('avatars')
    .upload(avatarUrl, avatar)

  if (avatarError) {
    throw new Error(avatarError.message)
  }

  const { data: updatedUserData, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarUrl}`,
      },
    })

  if (updatedUserError) {
    throw new Error(updatedUserError.message)
  }

  return updatedUserData.user
}
