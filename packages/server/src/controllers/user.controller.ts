import prisma from '../prismaClient';
import { type Request, type Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
   const { emailAddress, username } = req.body;
   console.log('Creating user:', emailAddress, username);
   if (!emailAddress || !username) {
      return res
         .status(400)
         .json({ message: 'emailAddress and username are required' });
   }
   try {
      const existedUser = await prisma.user.findFirst({
         where: { emailAddress },
      });

      if (existedUser) {
         return res
            .status(200)
            .json({ message: 'User already exists', user: existedUser });
      }

      const newUser = await prisma.user.create({
         data: {
            emailAddress,
            username,
            preferences: [], // send empty array
            allergies: [],
            meals: {
               create: [],
            },
            logs: {
               create: [],
            },
         },
      });
      console.log('New User', newUser);
      return res
         .status(201)
         .json({ message: 'User created successfully', user: newUser });
   } catch (error: any) {
      console.error(error);
      return res
         .status(500)
         .json({ message: 'Internal server error', error: error.message });
   }
};
