import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const response = await req.json();
  const { messages } = response;

  const key = process.env.IMAGE_GEN_API_KEY;
  const {userId }=auth()

  const baseUrl = "https://modelslab.com/api/v6/realtime/text2img";

  let options = {
    method: "POST",
    url: "https://modelslab.com/api/v6/realtime/text2img",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    key,
    prompt: messages.prompt,

    negative_prompt: "bad quality",
    width: "512",
    height: "512",
    safety_checker: false,
    seed: null,
    samples: 1,
    base64: false,
    webhook: null,
    track_id: null,
  };


  if(!userId){
    return new NextResponse('Unauthorized user',{status:401})
  }
  if(!process.env.API_KEY){
    return new NextResponse('openai key is not set',{status:500})
  }

  try {
    const response = await axios.post(baseUrl, body, options);
    const { status, fetch_result } = response.data;
    let imageStatus = status;
    let postResoponse;

    while (imageStatus == "processing") {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      postResoponse = await axios.post(fetch_result, { key }, options);
      const { status } = postResoponse.data;
      if (status == "success") {
        imageStatus = "success";
      } else if (status == "error") {
        throw new Error("Image generation failed");
      }
      console.log(postResoponse?.data.output[0]);
    }

    return new NextResponse(response.data.output[0]);
  } catch (error) {
    console.log("Error", error);
  }
}



/*

const key=process.env.DEEPAI_KEY

export async function POST(req:Request){



const userId=auth()

const res=await req.json()
const {messages}= res

const option={
  text:messages.prompt
}

if(!userId){
  return new NextResponse('user not available')
}

if(!key){
  return new NextResponse('authentication key not available')
}


try {
const response=await axios.post('https://api.deepai.org/api/text2img',option,{ 
    headers: {
  'Content-Type': 'application/json',
  'api-key': key
}, 
})
console.log(response)

return new NextResponse(response.data)

} catch (error) {
  console.log('Error',error)
}

}
*/