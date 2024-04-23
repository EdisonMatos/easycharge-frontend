import { NextApiRequest, NextApiResponse } from "next/types"


type ResponseData = {
    title: string
    thumbnail: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData[]>
) {
    fetch("https://serpapi.com/search.json?engine=bing_news&q=Startup&cc=br&mkt=pt-BR&api_key=ae32f8b901d7b5738357b4da305cf91b5b33ffa5227fd5992909f0434a69380f&count=7", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then((data: { organic_results: any[] }) => {
            const dataToSend = data.organic_results.filter(result => result.thumbnail)
            
return res.status(200).send(dataToSend)
        })


}