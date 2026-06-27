import { Worker } from 'bullmq';
import { connection } from './bullmq.js';
import {sendEmail} from '../utils/sendEmail.js';
import dotenv from 'dotenv'
dotenv.config();
console.log("Email Worker Started");

const worker = new Worker ('email',
    async(job)=>{
        console.log("Job ID:", job.id);
        console.log("Job Name:", job.name);
        console.log("Job Data:", job.data);

        const {email , companyName , jobTitle } = job.data;
        await sendEmail(email , "Application Submitted" , `you've successfully applied for ${jobTitle} in ${companyName}`)
    },
    {
        connection
    }
)

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed (email sending)`);
});

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed`);
    console.error(err.message);
});