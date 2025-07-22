import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
  announcementIdSchema,
} from '../validators/announcementValidator';

// @route POST /announcement/add
// @desc Create/Add new announcement
// @Privacy Private
const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const validated = createAnnouncementSchema.parse(req.body);

  const announcement = await prisma.announcement.create({
    data: {
      ...validated,
      createdBy: req.user.id,
    },
  });

  res.status(201).json(announcement);
});

// @route GET /announcement
// @desc Get  announcements
// @Privacy Privateexport
const getAllAnnouncements = asyncHandler(
  async (req: Request, res: Response) => {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(announcements);
  }
);

// @route GET announcement/:id
// @desc Get  announcement by ID
// @Privacy Private
const getAnnouncementById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = announcementIdSchema.parse(req.params);

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      res.status(404);
      throw new Error('Announcement not found');
    }

    res.json(announcement);
  }
);

// @route PUT /announcement/:id
// @desc Update announcement
// @Privacy Private
const updateAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = announcementIdSchema.parse(req.params);
  const validated = updateAnnouncementSchema.parse(req.body);

  const existing = await prisma.announcement.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Announcement not found');
  }

  const updated = await prisma.announcement.update({
    where: { id },
    data: validated,
  });

  res.json(updated);
});

// @route DELETE /announcement/:id
// @desc Delete announcement
// @Privacy Private
const deleteAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { id } = announcementIdSchema.parse(req.params);

  const existing = await prisma.announcement.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Announcement not found');
  }

  await prisma.announcement.delete({ where: { id } });

  res.json({ message: 'Announcement deleted' });
});

export {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
