import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { ICabin } from '../features/cabins/models/cabin'
import supabase, { supabaseUrl } from './supabase'

export async function getCabins(): Promise<ICabin[]> {
  const { data, error }: PostgrestResponse<ICabin> = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.log(error)
    throw new Error('The cabins could not be found :(')
  }

  if (data) {
    return data
  } else {
    return []
  }
}

export async function createEditCabin(
  newCabin: ICabin,
  id?: number
): Promise<ICabin | null> {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${uuidv4()}`.replaceAll('/', '')

  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = id
    ? supabase
        .from('cabins')
        .update({ ...newCabin, image: imageUrl })
        .eq('id', id)
    : supabase.from('cabins').insert([{ ...newCabin, image: imageUrl }])

  const { data, error }: PostgrestSingleResponse<ICabin | null> = await query
    .select()
    .single()

  if (error) {
    throw new Error('The cabin could not be created :(')
  }

  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if (storageError && data) {
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error(
      'The image was not uploaded and the cabin could not be created :('
    )
  }

  return data ?? null
}

export async function deleteCabin(id: number): Promise<ICabin | null> {
  const response: PostgrestSingleResponse<ICabin | null> = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (response.error) {
    console.log(response.error)
    throw new Error('The cabin could not be deleted :(')
  }

  return response.data ?? null
}
