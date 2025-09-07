import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/test', (req: Request, res: Response) => {
   res.send('Hello World');
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
