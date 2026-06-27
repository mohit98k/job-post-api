import dotenv from 'dotenv'
dotenv.config();
export const connection = {
    url: process.env.REDIS_URL
};