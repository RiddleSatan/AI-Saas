"use client"

import axios from 'axios';
import { Header } from "@/components/header"
import { MessageCircle } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"
import *  as z from "zod";
import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from 'react';


type formSchemaType = z.infer<typeof formSchema>

const ConversationPage = () => {
  const [messages, setMessages] = useState<any[]>([])
  const router = useRouter()
  const form = useForm<formSchemaType>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: ''
      }
    }
  )
  // const {getFieldState,getValues}=useFormContext()

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: formSchemaType) => {
    try {
      const userMessage = values.prompt



      const newMessage = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessage
      })
      console.log(response.data)
      setMessages((curr) => [...curr, response.data, userMessage,])//it is a better practice and safter approach compare to the below one i.e.
      // setMessages([newMessage, response.data]);

      console.log(messages)
      form.reset();
    } catch (error: any) {
      console.log('!Error:', error)
    } finally {
      router.refresh()
    }

  }



  return (
    <>

      <Header title='Conversation' description="Our most advanced conversation model." icon={MessageCircle} iconColor="text-blue-500" bgColor="bg-blue-500/10" />
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
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
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
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConversationPage

