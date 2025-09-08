import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Middleware to handle JSON requests
app.use(express.json());

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.get('/api/test', (req: Request, res: Response) => {
   res.json({ data: 'Hello!' });
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
