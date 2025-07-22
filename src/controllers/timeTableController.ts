import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import {
  createTimeTableSchema,
  updateTimeTableSchema,
  timeTableIdSchema,
} from '../validators/timeTableValidator';

const createTimeTable = asyncHandler(async (req: Request, res: Response) => {
  const validated = createTimeTableSchema.parse(req.body);

  const timetable = await prisma.timeTable.create({
    data: validated,
  });

  res.status(201).json(timetable);
});

const getAllTimeTables = asyncHandler(async (_req: Request, res: Response) => {
  const timetables = await prisma.timeTable.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(timetables);
});

const getTimeTableById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = timeTableIdSchema.parse(req.params);

  const timetable = await prisma.timeTable.findUnique({ where: { id } });

  if (!timetable) {
    res.status(404);
    throw new Error('Timetable not found');
  }

  res.json(timetable);
});

const updateTimeTable = asyncHandler(async (req: Request, res: Response) => {
  const { id } = timeTableIdSchema.parse(req.params);
  const validated = updateTimeTableSchema.parse(req.body);

  const existing = await prisma.timeTable.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Timetable not found');
  }

  const updated = await prisma.timeTable.update({
    where: { id },
    data: validated,
  });

  res.json(updated);
});

const deleteTimeTable = asyncHandler(async (req: Request, res: Response) => {
  const { id } = timeTableIdSchema.parse(req.params);

  const existing = await prisma.timeTable.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Timetable not found');
  }

  await prisma.timeTable.delete({ where: { id } });

  res.json({ message: 'Timetable deleted successfully' });
});

export {
  createTimeTable,
  getAllTimeTables,
  getTimeTableById,
  updateTimeTable,
  deleteTimeTable,
};
