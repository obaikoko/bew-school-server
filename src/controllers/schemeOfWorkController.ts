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

  const scheme = await prisma.schemeOfWork.create({
    data: {
      ...validated,
      userId: req.user.id,
    },
  });

  res.status(201).json(scheme);
});

const getAllSchemes = asyncHandler(async (_req: Request, res: Response) => {
  const schemes = await prisma.schemeOfWork.findMany({
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

  res.json(updated);
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
  updateScheme,
  deleteScheme,
};
