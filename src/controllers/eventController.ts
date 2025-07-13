import { Request, Response } from 'express';
import { prisma } from '../config/db/prisma';
import asyncHandler from 'express-async-handler';
import { eventSchema } from '../validators/eventValidator';
import cloudinary from '../config/cloudinary';

const getEvents = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const events = await prisma.event.findMany({orderBy: {createdAt: 'desc'}});
    if (!events || events.length === 0) {
      res.status(404);
      throw new Error('No Event found!');
    } else {
      res.status(200);
      res.json(events);
    }
  }
);

const addEvent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = eventSchema.parse(req.body);
    const { title, description, date, imageUrl } = validateData;

    let uploadedResponse;
    try {
      uploadedResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: 'samples',
      });
    } catch (error) {
      console.log(error);
      throw new Error('Unable to upload Image');
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        imageUrl: uploadedResponse.url,
        imagePublicId: uploadedResponse.public_id,
      },
    });

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(500);
      throw new Error('Something went wrong');
    }
  }
);

const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!event) {
      res.status(404);
      throw new Error('Event not found!');
    }

    await prisma.event.delete({
      where: {
        id: event.id,
      },
    });

    res.status(200).json('Event deleted successfully');
  } catch (error) {
    throw error;
  }
});

export { getEvents, addEvent, deleteEvent };
