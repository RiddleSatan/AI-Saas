import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";



export async function POST(req: Request) {
  const key: any = process.env.API_KEY;

  if(!key){
    return new NextResponse('error:key not found',{status:501})
  }
  
  const genAI = new GoogleGenerativeAI(key);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    const instruction: string =
      "You are a code Genarator. You must answer only in makrdown code snippets. use code comments for explanations";

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }
    if (!process.env.API_KEY) {
      return new NextResponse("GeminiAI key is not set", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("no message has been given", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trail has been expired", { status: 403 });
    }

    const result = await model.generateContent([instruction, ...messages]);
    await increaseApiLimit();
    const value = result.response.text();
    console.log(value);
    return NextResponse.json(value);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse(`Error:${error}`, { status: 500 });
  }
}
