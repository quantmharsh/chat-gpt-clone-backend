import express from "express";
import morgan from "morgan";
import cors from "cors"

import askGPT from "./openAI/gpt.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

app.route("/").get((req, res)=>{
    return res.status(200).json({
        msg: "Server up and running"
    })
})

app.route("/health").get((req, res)=>{
    return res.status(200).json({
        msg: `Server running on PORT: ${PORT}`
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

app.listen(PORT, ()=>{
    console.log("server running on port: ", PORT);
})