import express from "express";
import morgan from "morgan";
import cors from "cors"

import askGPT from "./openAI/gpt.js";

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

app.route("/").get((req, res)=>{
    return res.status(200).json({
        msg: "Hello from home route"
    })
})

app.route("/gpt").post( async (req, res)=>{
    const body = req.body;

    const query = body.query


    const gptResponse = await askGPT(query);

    return res.status(200).json({
        msg: gptResponse
    })
})

app.listen(3000, ()=>{
    console.log("server running on port: ", 3000);
})