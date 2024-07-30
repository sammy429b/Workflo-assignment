import express, {Express, Request,  Response} from 'express'
import dotenv from 'dotenv'
import DBconnection from './utils/DBconnect';
import changePasswordRoute from './routes/changePassword.route'
import forgotPasswordRoute from './routes/forgotPassword.route'
import authRoute from './routes/auth.route'
import taskRoute from './routes/task.route'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app : Express = express();
dotenv.config();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use("/",authRoute)
app.use("/",changePasswordRoute)
app.use("/",forgotPasswordRoute)
app.use("/",taskRoute)


app.get("/", (req: Request, res:Response)=>{
    res.send("TypeScript wiht express");
})

app.listen(port || 5000, ()=>{
    console.log(`http://localhost:${port}`);
    DBconnection();
})