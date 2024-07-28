import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {GoogleGenerativeAI } from '@google/generative-ai'

// import OpenAI from "openai";
// const openai = new OpenAI();

const key:any=process.env.API_KEY

const genAI = new GoogleGenerativeAI(key);

const model=genAI.getGenerativeModel({model:'gemini-1.5-flash'});


export async function POST(req: Request) {
  try {
  const {userId }=auth()
  const body=await req.json()
  const {messages} =body 
 

const instruction:string='You are a code Genarator. You must answer only in makrdown code snippets. use code comments for explanations'

  
  if(!userId){
    return new NextResponse('Unauthorized user',{status:401})
  }
  if(!process.env.API_KEY){
    return new NextResponse('GeminiAI key is not set',{status:500})
  }

  if(!messages){
    return new NextResponse('no message has been given',{status:400})
  }
  // const response=await openai.chat.completions.create({
  //   model:'gpt-3.5-turbo',
  //   messages:[{role: "user", content:messages}]
  // })
  // return NextResponse.json(response.choices[0]);

const result=await model.generateContent([instruction,...messages]);
const value=result.response.text()
console.log(value)
return  NextResponse.json(value)


  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse(`Error:${error}`, { status: 500 });
  }
}



