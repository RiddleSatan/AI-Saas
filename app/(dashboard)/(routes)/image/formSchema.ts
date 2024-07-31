import { Label } from "@radix-ui/react-label";
import * as z from "zod";

export const formSchema=z.object({
prompt:z.string().min(1,{message:'prompt is required'}),
resolution:z.string(),
number:z.string()
})

export const numbers=[{
    lable:'1 photo',
    value:'1',
},
{
    lable:'2 photos',
    value:'2'
},
{
    lable:'3 photos',
    value:'3'
},
{
    lable:'4 photos',
    value:'4'
}
]


export const resolution=[
    {
    lable:'256x256',
    value:'256x256',
},
    {
    lable:'512x512',
    value:'512x512',
},
    {
    lable:'1024x1024',
    value:'1024x1024',
},

]