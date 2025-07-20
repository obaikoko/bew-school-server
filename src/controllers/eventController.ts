import { Request, Response } from 'express';
import { prisma } from '../config/db/prisma';
import asyncHandler from 'express-async-handler';
import { eventSchema, updateEventSchema } from '../validators/eventValidator';
import cloudinary from '../config/cloudinary';

const getEvents = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (!events) {
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

const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const validateData = updateEventSchema.parse(req.body);
  const { title, description, date, imageUrl } = validateData;
  const event = await prisma.event.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  if (imageUrl) {
    const existingImageId = event?.imagePublicId || '';

    if (existingImageId) {
      const newImageId = existingImageId.substring(
        existingImageId.indexOf('samples') + 'samples/'.length
      );

      const uploadedResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: 'samples',
        public_id: newImageId,
      });

      const updatedEvent = await prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          title: title ?? event.title,
          description: description ?? event.description,
          date: date ?? event.date,
          imagePublicId: uploadedResponse.public_id,
          imageUrl: uploadedResponse.url,
        },
      });

      res.status(200).json(updatedEvent);
    } else {
      const uploadedResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: 'samples',
      });

      const updatedEvent = await prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          title: title ?? event.title,
          description: description ?? event.description,
          date: date ?? event.date,
          imagePublicId: uploadedResponse.public_id,
          imageUrl: uploadedResponse.url,
        },
      });

      res.status(200).json(updatedEvent);
    }
  }
});

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

export { getEvents, addEvent, updateEvent, deleteEvent };
