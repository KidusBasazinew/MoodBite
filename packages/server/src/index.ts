import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import user from './routes/user.route.ts';
import meal from './routes/meal.route.ts';
dotenv.config();

const app = express();
const cors = require('cors');

app.use(
   cors({
      origin: '*', // or your app URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   })
);

app.use(express.json());

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.get('/api/v1/test', (req: Request, res: Response) => {
   res.json({ data: 'Hello!' });
});
app.use('/api/v1/users', user);
app.use('/api/v1/meal', meal);

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
