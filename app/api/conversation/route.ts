import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
  const {userId }=auth()
  const body=await req.json()
  const {messages} =body 
 

  console.log(messages)

  
  if(!userId){
    return new NextResponse('Unauthorized user',{status:401})
  }
  if(!openai.apiKey){
    return new NextResponse('openai key is not set',{status:500})
  }

  if(!messages){
    return new NextResponse('no message has been given',{status:400})
  }
  const response=await openai.chat.completions.create({
    model:'gpt-3.5-turbo',
    messages:[{role: "user", content:messages}]
  })
  return NextResponse.json(response.choices[0]);

  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
    return new NextResponse(`Error:${error}`, { status: 500 });
  }
}
