import { Request, Response } from "express";
import AvailabilityResponse from "../models/AvailabilityResponse.model.js";

export const saveAvailabilityResponse = async (req: Request, res: Response) => {
  try {
    console.log("📥 Availability API hit");
    console.log("📦 Body:", req.body);

    const { sessionId, available, lat, lng } = req.body;

    if (!sessionId || lat == null || lng == null || available == null) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log("📝 Saving response to DB...");

    const record = await AvailabilityResponse.create({
      sessionId,
      available,
      location: { lat, lng },
    });

    console.log("✅ Saved:", record._id.toString());

    res.json({ success: true, data: record });
  } catch (err) {
    console.error("❌ Availability Save Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
