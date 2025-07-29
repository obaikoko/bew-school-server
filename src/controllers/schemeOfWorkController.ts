import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import {
  createSchemeSchema,
  updateSchemeSchema,
  schemeIdSchema,
} from '../validators/schemeOfWorkValidator';
const createScheme = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const validated = createSchemeSchema.parse(req.body);

  // Check if scheme already exists for the same subject, level, and term
  const existingScheme = await prisma.schemeOfWork.findFirst({
    where: {
      subject: validated.subject,
      level: validated.level,
      term: validated.term,
    },
  });

  if (existingScheme) {
    res.status(400);
    throw new Error('Scheme for this subject, level, and term already exists.');
  }

  const scheme = await prisma.schemeOfWork.create({
    data: {
      ...validated,
      userId: req.user.id,
    },
  });

  res.status(201).json({ scheme, message: 'Scheme added successfully' });
});

const getAllSchemes = asyncHandler(async (_req: Request, res: Response) => {
  const schemes = await prisma.schemeOfWork.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(schemes);
});
const getClassScheme = asyncHandler(async (req: Request, res: Response) => {
  const { level, term, subject } = req.query;
  if (!level || !term || !subject) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const schemes = await prisma.schemeOfWork.findMany({
    where: {
      level: level as string,
      term: term as string,
      subject: subject as string,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(schemes);
});

const getSchemeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = schemeIdSchema.parse(req.params);

  const scheme = await prisma.schemeOfWork.findUnique({ where: { id } });

  if (!scheme) {
    res.status(404);
    throw new Error('Scheme not found');
  }

  res.json(scheme);
});

const updateScheme = asyncHandler(async (req: Request, res: Response) => {
  const { id } = schemeIdSchema.parse(req.params);
  const validated = updateSchemeSchema.parse(req.body);

  const existing = await prisma.schemeOfWork.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Scheme not found');
  }

  const updated = await prisma.schemeOfWork.update({
    where: { id },
    data: validated,
  });

  res.json({ updated, message: 'Updated successfully' });
});

const deleteScheme = asyncHandler(async (req: Request, res: Response) => {
  const { id } = schemeIdSchema.parse(req.params);

  const existing = await prisma.schemeOfWork.findUnique({ where: { id } });

  if (!existing) {
    res.status(404);
    throw new Error('Scheme not found');
  }

  await prisma.schemeOfWork.delete({ where: { id } });

  res.json('Scheme deleted successfully');
});

export {
  createScheme,
  getAllSchemes,
  getSchemeById,
  getClassScheme,
  updateScheme,
  deleteScheme,
};
