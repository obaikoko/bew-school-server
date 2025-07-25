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
    let userAnnouncements;

    if (req.user?.isAdmin) {
      // Admin: See all
      userAnnouncements = await prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } else if (req.student) {
      // Student: See "ALL" or "STUDENT"
      userAnnouncements = await prisma.announcement.findMany({
        where: {
          target: { in: ['All', 'Student'] },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Teacher (or other non-admin): See "ALL" or "TEACHER"
      userAnnouncements = await prisma.announcement.findMany({
        where: {
          target: { in: ['All', 'Teacher'] },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    res.json(userAnnouncements);
  }
);

// @route GET announcement/:id
// @desc Get  announcement by ID
// @Privacy Private
const getAnnouncementById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = announcementIdSchema.parse(req.params);

    let announcement;

    if (req.user?.isAdmin) {
      // Admin: See all
      announcement = await prisma.announcement.findUnique({
        where: { id },
      });
      if (!announcement) {
        res.status(404);
        throw new Error('Announcement not found');
      }
    } else if (req.student) {
      // Student: See "ALL" or "STUDENT"
      announcement = await prisma.announcement.findUnique({
        where: {
          id,
          target: { in: ['All', 'Student'] },
        },
      });
      if (!announcement) {
        res.status(404);
        throw new Error('Announcement not found');
      }
    } else {
      // Teacher (or other non-admin): See "ALL" or "TEACHER"
      announcement = await prisma.announcement.findUnique({
        where: {
          id,
          target: { in: ['All', 'Teacher'] },
        },
      });
      if (!announcement) {
        res.status(404);
        throw new Error('Announcement not found');
      }
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
