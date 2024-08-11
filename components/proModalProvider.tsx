"use client"

import React, { useEffect, useState } from 'react'
import ProModal from './proModal'


const ProModalProvider = () => {

    const [isMounted,setIsMounted]=useState(false)

    useEffect(()=>{
setIsMounted(true)
    },[])

    if(!isMounted){
      return null
    }

  return (
    <>
  

    <ProModal/>
  
    </>
  )
}

export default ProModalProvider