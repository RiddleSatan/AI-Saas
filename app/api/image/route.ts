import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import OpenAI from 'openai'
import fs from "fs";
import { string } from "zod";
import axios from "axios";
import MonsterApiClient from "monsterapi";
import monsterApi from '@api/monster-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';


dotenv.config();

// const key=process.env.OPENAI_API_KEY
// const openai=new OpenAI( { apiKey: key });



export async function POST(req: Request) {
  const key= process.env.MONSTER_API_KEY;
  const client =new MonsterApiClient(`${key}`)
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    console.log(messages);

    const payload={
      safe_filter: true,
      prompt: 'cat swiming',
      guidance_scale: 7.5,
      aspect_ratio: 'portrait',
      negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
      samples: 1,
      seed: 2414,
      steps: 15,
      style: 'anime'
    }

    // const input : Record<string, any>={
    //   prompt:'cat swiming'
    // }

    // if (!userId) {
    //   return new NextResponse("Unauthorized user", { status: 401 });
    // }
    if (!key) {
      return new NextResponse("openai key is not set", { status: 500 });
    }

    // if(!messages){
    //   return new NextResponse('no message has been given',{status:400})
    // }
    // const response = await openai.images.generate({
    //     model: "dall-e-3",
    //     prompt: "a white siamese cat",
    //     n: 1,
    //     size: "1024x1024",
    //   });




    const url = 'https://api.monsterapi.ai/v1/generate/txt2img';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImIwOTVhYzdkZjU0MzA2ZjQyM2JlNzA0MWY0ZDllNDcyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMzBUMDQ6MTg6NDYuNjEzMTExIn0.iKNmfUHIgpLjukANRqWQB9gtKkqq9Jt7xFyzRrl-KjM'
      },
      body: JSON.stringify({
        safe_filter: true,
        aspect_ratio: 'portrait',
        guidance_scale: 7.5,
        negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
        prompt: 'cat swiming',
        samples: 1,
        seed: 2414,
        steps: 15,
        style: 'anime'
      })
    };
    
   const response= fetch(url, options)
      .then(res => console.log(res.json()))
      .catch(err => console.error('error:' + err));
  
// console.log(response.data)

return new NextResponse('true')


  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
    return new NextResponse(`Error:${error}`, { status: 500 });
  }
}
