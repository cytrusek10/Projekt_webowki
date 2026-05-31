import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function calculateBreakTime(duration: number, difficulty: string): number {
  let baseBreak = Math.floor(duration * 0.2);
  if (difficulty === 'HIGH') baseBreak += 5;
  if (difficulty === 'LOW') baseBreak = Math.max(5, baseBreak - 2);
  return baseBreak;
}

export const getSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await prisma.studySession.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const enrichedSessions = sessions.map(session => ({
      ...session,
      recommendedBreak: calculateBreakTime(session.duration, session.difficulty),
      notification: `Zalecana przerwa po sesji "${session.title}": ${calculateBreakTime(session.duration, session.difficulty)} minut.`
    }));
    res.json(enrichedSessions);
  } catch (error) {
    res.status(500).json({ error: 'Błąd pobierania sesji' });
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { title, duration, difficulty } = req.body;
  if (!title || !duration || !difficulty) {
    return res.status(400).json({ error: 'Brak wymaganych pól' });
  }
  try {
    const newSession = await prisma.studySession.create({
      data: { title, duration: Number(duration), difficulty }
    });
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: 'Błąd zapisu sesji' });
  }
};