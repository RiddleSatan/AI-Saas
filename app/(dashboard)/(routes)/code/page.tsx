"use client"

import axios from 'axios';
import { Header } from "@/components/header"
import { useForm, } from "react-hook-form"
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
import { Code2 } from 'lucide-react';
import ReactMarkdown from "react-markdown";




type formSchemaType = z.infer<typeof formSchema>

const CodePage = () => {
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

      const response = await axios.post('/api/code', {
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
      <Header title='Code Generation' description="Generate code using prompt." icon={Code2} iconColor="text-green-500" bgColor="bg-green-500/10" />
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
                          placeholder="Simple navbar for social media website"
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
            {messages.length === 0 && !isLoading && (
              <div><Empty lable='!...nothing to show...!' /></div>
            )}
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((msg, index) => (
                <div
                  className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', index % 2 == 0 ? "bg-muted" : 'bg-white border border-black/10')}
                  key={index}>
                  {index % 2 == 0 ? < BotAvatar /> : < UserAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                      )
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {msg || ""}
                  </ReactMarkdown>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default CodePage

