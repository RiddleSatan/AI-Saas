import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs';
import { string } from 'zod';

const key=process.env.OPENAI_API_KEY
const openai=new OpenAI( { apiKey: key });


export async function POST(req: Request) {
    try {
    const {userId }=auth()
    const body=await req.json()
    const {messages} =body 
   
  
    console.log(messages)
  
    
    if(!userId){
      return new NextResponse('Unauthorized user',{status:401})
    }
    if(!key){
      return new NextResponse('openai key is not set',{status:500})
    }
  
    // if(!messages){
    //   return new NextResponse('no message has been given',{status:400})
    // }
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
      });
     
    const  image_url = response.data[0].url;
    console.log(image_url)
   
    return NextResponse.json(image_url);

  
    } catch (error) {
      console.log("[CONVERSATION ERROR]", error);
      return new NextResponse(`Error:${error}`, { status: 500 });
    }
  }