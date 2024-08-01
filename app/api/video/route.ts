import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"

const key=process.env.REPLICATE_API_KEY
const userId=auth()

const replicate=new Replicate({
    auth:key
})

export  async function POST(req:Request){
const body=await req.json()
const {prompt}=body

const input={
    fps: 24,
    width: 1024,
    height: 576,
    prompt,
    guidance_scale: 17.5,
    negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
};

if(!userId){
    return new NextResponse('Unauthorized user',{status:401})
  }
  if(!process.env.API_KEY){
    return new NextResponse('openai key is not set',{status:500})
  }

try {
    let prediction = await replicate.predictions.create({
        version: "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
       input
      });
    
      prediction=await replicate.wait(prediction)
      console.log(prediction.output)
    
      return  NextResponse.json(prediction)
} catch (error) {
    console.log('Error:',error)
}


} 





