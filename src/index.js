import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.port||3000;

const startServer= async()=>{
    try{
        //no need to connect db explicitely as in neon it is done by prisma when we make first querry
        app.listen(port,()=>{
            console.log(`app is listining on ${port}`)
        })
    }catch(err){
        console.log('failed to start the server',err.message);
    }
}
startServer();