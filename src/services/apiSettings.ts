import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { ISettings } from '../features/settings/models/settings'
import supabase from './supabase'

export async function getSettings(): Promise<ISettings | null> {
  const { data, error }: PostgrestSingleResponse<ISettings | null> =
    await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('The settings could not be loaded :(')
  }
  if (data) {
    return data
  } else {
    return null
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  newSetting: ISettings
): Promise<ISettings | null> {
  const { data, error }: PostgrestSingleResponse<ISettings | null> =
    await supabase
      .from('settings')
      .update(newSetting)
      // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
      .eq('id', 1)
      .single()

  if (error) {
    console.error(error)
    throw new Error('The settings could not be updated :(')
  }

  if (data) {
    return data
  } else {
    return null
  }
}
