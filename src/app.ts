import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import filmesRouter from './Routes/filme';

const app: Express = express();
const port: number = 3000

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date()}] ${req.ip} ${req.method} ${req.url}`);
    next();
});

app.use(filmesRouter);

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});