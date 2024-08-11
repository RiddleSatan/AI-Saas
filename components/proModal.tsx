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



const ProModal = () => {

  const isOpen: boolean = useAppSelector(state => state.isOpen)


  return (
    <Dialog open={isOpen} >
      <DialogTrigger >Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex flex-col justify-center items-center gap-y-4 pb-2'>Upgrade To ProModal</DialogTitle>

        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default ProModal