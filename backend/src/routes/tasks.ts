import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.use(auth);

// GET /tasks
router.get("/", async (req: any, res) => {
  const { page = 1, search = "", completed } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      userId: req.userId,
      title: { contains: search },
      ...(completed !== undefined && {
        completed: completed === "true",
      }),
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  res.json(tasks);
});

// POST
router.post("/", async (req: any, res) => {
  const task = await prisma.task.create({
    data: {
      title: req.body.title,
      userId: req.userId,
    },
  });
  res.json(task);
});

// PATCH
router.patch("/:id", async (req: any, res) => {
  const task = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(task);
});

// DELETE
router.delete("/:id", async (req: any, res) => {
  await prisma.task.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ ok: true });
});

// TOGGLE
router.patch("/:id/toggle", async (req: any, res) => {
  const task = await prisma.task.findUnique({
    where: { id: Number(req.params.id) },
  });

  const updated = await prisma.task.update({
    where: { id: task!.id },
    data: { completed: !task!.completed },
  });

  res.json(updated);
});

export default router;