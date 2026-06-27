import {Queue} from 'bullmq'
import { connection } from './bullmq.js';

const emailQueue = new Queue('email',{connection});
export default emailQueue;