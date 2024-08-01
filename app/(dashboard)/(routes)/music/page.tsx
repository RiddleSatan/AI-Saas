"use client"

import axios from 'axios';
import { Header } from "@/components/header"
import { MessageCircle, Music } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"
import *  as z from "zod";
import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'

type formSchemaType = z.infer<typeof formSchema>

const ConversationPage = () => {
  const [audio,setAudio]=useState<string>()
  const router = useRouter()
  const form = useForm<formSchemaType>(
    {
      resolver: zodResolver(formSchema),//auto validation so we dont have to worry about doing validation of the input field  manually  
      defaultValues: {
        prompt: ''
      }
    }
  )
  // const {getFieldState,getValues}=useFormContext()

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: formSchemaType) => {
    try {
      setAudio(undefined)


    
     

      const response = await axios.post('/api/music',{

        prompt:values.prompt
      })
      // console.log('response:',response.data)

      
      console.log('response in audio:',response.data.output.audio)
      setAudio(response.data.output.audio)
     

 
      form.reset()
    } catch (error: any) {
      console.log('!Error:', error)
    } finally {
      router.refresh()
    }
  }



  return (
    <>
      <Header title='Music Generator' description="Give voices to your thoughts" icon={Music} iconColor="text-cyan-500" bgColor="bg-cyan-500/10" />
      <div className="px-4 lg:px-8">

        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10 ">
                      <FormControl className="m-0 p-0 bg-slate-100">
                        <Input
                          disabled={isLoading}
                          placeholder="How do I calculate the radius of a circle?"
                          className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible: ring-transparent"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="col-span-12 lg:col-span-2 w-full"
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-2 mt-4">
            {isLoading && (
              <div className='p-8 flex items-center justify-center rounded-lg bg-muted'>
                <Loader />
              </div>
            
            )}
         {!audio && !isLoading && (
          <Empty lable='no music generated yet'/>
         )}
         <div>
          {audio && <audio controls className='w-full mt-8'>
            <source src={audio}/>
            </audio>}
         </div>
            </div>
          </div>
        </div>
     
    </>
  )
}



export default ConversationPage

