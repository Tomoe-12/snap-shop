import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateProductForm = async() => {

  const session = await auth()
  if(session?.user.role !== 'admin')return redirect('/dashboard/settings')
  return (
    <CreateProductForm>
      
    </CreateProductForm>
  )
}

export default CreateProductForm