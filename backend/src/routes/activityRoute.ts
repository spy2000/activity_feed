import { Router, Request, Response } from "express";
import Activity from "../models/ActivityModel";
import { emitNewActivity } from "../sockets/sockets";

const router = Router();

// POST
router.post("/", async (req: Request, res: Response) => {
  try {
    // console.log(req.body)
    // const old_id = req.body.entityId
    const activity = await Activity.create({
      tenantId: req.user!.tenantId,
      actorId: req.user!.id,
      actorName: req.user!.name,
      type: req.body.type,
      entityId: req.body.entityId,
      metadata: req.body.metadata,
      clientId: req.body.clientId
    });

    emitNewActivity(activity);

    res.status(201).json(activity);
  } catch (e) {
    res.status(500).json({ error: "Create failed" });
  }
});

// GET with cursor
// router.get("/api/activities", async (req: Request, res: Response) => {
//     const { cursor } = req.query;
//     const tenantId = req.header("x-tenant-id");
  
//     const limit = 20;
  
//     const query: any = { tenantId };
  
//     if (cursor) {
//       query.createdAt = { $lt: new Date(cursor as string) };
//     }
  
//     const items = await Activity.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit + 1)
//       .select("_id tenantId actorId actorName type entityId metadata createdAt")
//       .lean();
  
//     let nextCursor: string | null = null;
  
//     if (items.length > limit) {
//       const next = items.pop();
//       nextCursor = next!.createdAt.toISOString();
//     }
  
//     res.json({
//       items,
//       nextCursor
//     });
//   });
  
router.get("/", async (req: Request, res: Response) => {
  const { cursor, limit = 2 } = req.query;

  const query: any = { tenantId: req.user!.tenantId };
  if (cursor) {
    query.createdAt = { $lt: new Date(cursor as string) };
  }

  const activities = await Activity.find(query)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .select("actorName type entityId metadata createdAt");

  res.json({
    data: activities,
    nextCursor: activities.length
      ? activities[activities.length - 1].createdAt
      : null
  });
});

export default router;
