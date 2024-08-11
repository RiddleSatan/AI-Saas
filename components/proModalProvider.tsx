"use client"

import React, { useEffect, useState } from 'react'
import ProModal from './proModal'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'


const ProModalProvider = () => {
  const store=makeStore()
    const [isMounted,setIsMounted]=useState(false)

    useEffect(()=>{
setIsMounted(true)
    },[])

    if(!isMounted){
      return null
    }

  return (
    <>
    <Provider store={store}>

    <ProModal/>
    </Provider>
    </>
  )
}

export default ProModalProvider