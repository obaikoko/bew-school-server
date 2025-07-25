import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import {
  createTimeTableSchema,
  updateTimeTableSchema,
  timeTableIdSchema,
  createManyTimeTablesSchema,
} from '../validators/timeTableValidator';

const createTimeTable = asyncHandler(async (req: Request, res: Response) => {
  const validated = createTimeTableSchema.parse(req.body);
  const { level, subLevel, day } = validated;
  // check if time table for specific day already exist

  const timeTableExist = await prisma.timeTable.findFirst({
    where: {
      level,
      subLevel,
      day,
    },
  });

  if (timeTableExist) {
    res.status(400);
    throw new Error(`Time table for ${day} ${level}-${subLevel} already Exist`);
  }

  const result = await prisma.timeTable.create({
    data: validated,
  });

  res.status(201).json(result);
});

const getAllTimeTables = asyncHandler(async (req: Request, res: Response) => {
  let timeTables;
  if (req.user?.isAdmin) {
    timeTables = await prisma.timeTable.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (!timeTables) {
      res.status(404);
      throw new Error('Time table not found');
    }
  } else if (!req.user?.isAdmin && req.user?.level && req.user?.subLevel) {
    timeTables = await prisma.timeTable.findFirst({
      where: { level: req.user.level, subLevel: req.user.subLevel },
      orderBy: { createdAt: 'desc' },
    });

    if (!timeTables) {
      res.status(404);
      throw new Error('Time table not found');
    }
  } else if (req.student) {
    timeTables = await prisma.timeTable.findFirst({
      where: { level: req.student.level, subLevel: req.student.subLevel },
      orderBy: { createdAt: 'desc' },
    });

    if (!timeTables) {
      res.status(404);
      throw new Error('Time table not found');
    }
  }

  res.json(timeTables);
});

// GET /api/time-table/class?level=JSS%201&subLevel=A

const getTimeTableForClass = asyncHandler(
  async (req: Request, res: Response) => {
    const { level, subLevel } = req.query;

    if (!level || !subLevel) {
      res.status(400);
      throw new Error('Level and SubLevel are required');
    }

    const weekTimeTable = await prisma.timeTable.findMany({
      where: {
        level: level as string,
        subLevel: subLevel as string,
      },
      orderBy: {
        day: 'asc',
      },
    });

    res.json(weekTimeTable);
  }
);

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
  const validated = updateTimeTableSchema.parse(req.body);
  const { day, level, subLevel, periods } = validated;

  const existing = await prisma.timeTable.findFirst({
    where: {
      day,
      level,
      subLevel,
    },
  });

  if (!existing) {
    res.status(404);
    throw new Error('Timetable not found');
  }

  const updated = await prisma.timeTable.update({
    where: { id: existing.id },
    data: { periods },
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
  getTimeTableForClass,
  updateTimeTable,
  deleteTimeTable,
};
