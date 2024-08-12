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
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'






const ProModal = () => {

  const isOpen: boolean = useAppSelector(state => state.isOpen)
  const dispatch: any = useAppDispatch()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(onClose())
    }
  }

  return (
    <Dialog  open={isOpen} onOpenChange={handleOpenChange}>

      <DialogContent className='bg-white rounded'>
        <DialogHeader className='rounded'>
          <DialogTitle className='flex flex-col gap-y-2 justify-center items-center '>
            <div className='flex items-center gap-x-2'>
                  Upgrade to Riddle's Pro
            <Badge className='py-1 bg-black text-white'>PRO</Badge>
            </div>
                <Button className='bg-black text-white rounded hover:bg-slate-600'>
                  Upgrade
                  <Zap className='w-4 h-4 ml-1 mr-0'/>
                </Button>
          </DialogTitle>

        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default ProModal