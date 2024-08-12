import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'



export async function POST(req:Request){
  const key=process.env.REPLICATE_API_KEY
  if(!key){
    return new NextResponse('!Error: key not found',{status:501})
  }  

    const replicate=new Replicate({auth:key})
    const response=await req.json()
const {prompt}=response

    // const {prompt}=response.body

    const {userId }=auth()
    const input={
        prompt:prompt
    }
    
    if(!userId){
        return new NextResponse('Unauthorized user',{status:401})
      }
      if(!process.env.API_KEY){
        return new NextResponse('openai key is not set',{status:500})
      }

    try {
    
        // const reponse=await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

 
//         const callbackURL = `https://my.app/webhooks/replicate`;
//  const response=await replicate.predictions.create({
//   version: "8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
//   input: input,
//   webhook: callbackURL,
//   webhook_events_filter: ["completed"],
// });

// const getRes=response.urls.get
// let status=false

// while(!status){
//     await new Promise((res)=>setTimeout(res,2000))
//     const result=await fetch(getRes,{
//      headers:{
//         'Authorization':`Bearer ${key}`
//      }   
//     })
//    if(result.status==200){
//     status=true
//    }
    
// }

const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("free trial has been expired", { status: 403 });
    }

let prediction = await replicate.predictions.create({
    version: "8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    input
  });
await increaseApiLimit()
  prediction = await replicate.wait(prediction);
console.log(prediction.output);

return NextResponse.json(prediction)

// console.log('response',response)
        // console.log("this is your response:",response)
        // console.log("this is your response.data:",typeof(response.data))
    
        // return NextResponse.json(response)
    } catch (error) {
        console.log('!Error:',error)
    }
    } 





