import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSelector } from 'react-redux'





const ProModal = () => {

 const proModal=useSelector(state=>state) 

  return (
    <Dialog open={proModal.isOpen}>
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