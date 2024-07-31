"use client"

import axios from 'axios';
import { Header } from "@/components/header"

import { useForm } from "react-hook-form"
import *  as z from "zod";
import { formSchema, resolution } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagesIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { numbers } from './formSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select"
import { string } from 'zod';



type formSchemaType = z.infer<typeof formSchema>

const ConversationPage = () => {

  const [images, setImages] = useState<string[]>([])

  const router = useRouter()
  const form = useForm<formSchemaType>(
    {
      resolver: zodResolver(formSchema),//auto validation so we dont have to worry about doing validation of the input field  manually  
      defaultValues: {
        prompt: '',
        number: '1',
        resolution: '256x256'
      }
    }
  )
  // const {getFieldState,getValues}=useFormContext()
const url='https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: formSchemaType) => {
    try {


      console.log(values)

    
      const response = await axios.post('/api/image', {
        messages: {
          prompt:values.prompt,
          number:values.number,
          resolution:values.resolution
        }
      })

     
      setImages([url])
      
   console.log(images)
      // console.log(images)
      form.reset();
    } catch (error: any) {
      console.log('!Error:', error)
    } finally {
      router.refresh()
    }

  }
  return (
    <>
      <Header title='Image Generator' description="Our most advanced Image Generation model." icon={ImagesIcon} iconColor="text-pink-500" bgColor="bg-pink-500/10" />
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
                          placeholder="create Africa but with water"
                          className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible: ring-transparent"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name='number'
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10 ">
                      <FormControl className="m-0 p-0 bg-slate-100">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectGroup >
                            <SelectLabel className='text-muted-foreground p-0 m-0'>Select Numbers of photo</SelectLabel>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="number of images" />
                            </SelectTrigger>
                            <SelectContent >
                              {numbers.map((res) => <SelectItem key={res.lable} value={res.value}>{res.value}</SelectItem>)}
                            </SelectContent>
                          </SelectGroup>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='resolution'
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10 ">
                      <FormControl className="m-0 p-0 bg-slate-100">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectGroup >
                            <SelectLabel className='text-muted-foreground p-0 m-0'>Select resolution of image</SelectLabel>
                            <SelectTrigger className="w-[180px] ">
                              <SelectValue placeholder="select resolution" />
                            </SelectTrigger>
                            <SelectContent>
                              {resolution.map((res) => <SelectItem key={res.lable} value={res.lable}>{res.value}</SelectItem>)}
                            </SelectContent>
                          </SelectGroup>
                        </Select>
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
            {images == undefined && !isLoading && (
              <div><Empty lable='!...nothing to show...!' /></div>
            )}
            <div className='flex flex-col-reverse gap-y-4 w-full items-center'>

         
                <Image width={500} height={500} src={`${images[0]}`} alt='random' />
     
            </div>





          </div>
        </div>
      </div>
    </>
  )


}



export default ConversationPage

