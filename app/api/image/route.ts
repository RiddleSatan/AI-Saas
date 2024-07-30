import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = process.env.IMAGE_GEN_API_KEY;

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
    prompt:
      "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner))",
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

  try {
    const response = await axios.post(baseUrl, body, options);
    const { status, fetch_result } = response.data;
    let imageStatus = status;
    let postResoponse;

    while (imageStatus == "processing") {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      postResoponse = await axios.post(fetch_result, { key }, options);
      const { status } = postResoponse.data;
      if (status == "sucess") {
        imageStatus = "sucess";
      } else if (status == "error") {
        throw new Error("Image generation failed");
      }
    }

    console.log(postResoponse?.data);

    return new NextResponse(response.data);
  } catch (error) {
    console.log("Error", error);
  }
}
