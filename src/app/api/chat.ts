import { NextApiRequest, NextApiResponse } from "next/types"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        
return
    }

    const { messages } = JSON.parse(req.body)
    
    const response = await fetch("https://www.chatcsv.co/api/v1/chat", {
        method: 'POST',
        headers: {
            Authorization: 'Bearer sk_3ZRMQUuMAu2chbBUrBr5Zx2q',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages,
            files: [
                'https://raw.githubusercontent.com/GabSnow24/nsights-frontend/master/startups.csv'
            ]
        })
    })

    const chunkArray = []

    //@ts-ignore
    for await(const chunk of response.body){
        chunkArray.push(new TextDecoder().decode(chunk))
    }

    const stringToSend = chunkArray.join("").replace(/\n/g,' ')
    
return res.status(200).send({message: stringToSend})
}