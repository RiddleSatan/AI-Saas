"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector } from '@/lib/hooks'
import { onClose } from '@/lib/features/upgrade/upgradeSlice'
import { useAppDispatch } from '@/lib/hooks'




const ProModal = () => {

  const isOpen: boolean = useAppSelector(state => state.isOpen)
  const dispatch:any=useAppDispatch()

const handleOpenChange=(open:boolean)=>{
if(!open){
  dispatch(onClose())
}
}

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  )
}

export default ProModal