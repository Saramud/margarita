import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { PhotoAdmin } from "../../../../pages/admin/photos";

export default async function handler(req: NextApiRequest, res: NextApiResponse<PhotoAdmin | { error: string }>) {
    if (req.method === "POST") {
        const { url, page, author } = req.body as { url: string; page: "design" | "photography"; author: string };
        try {
            const created = await prisma.photo.create({
                data: { url, page, author },
            });
            res.status(200).json(created);
        } catch (e) {
            res.status(500).json({ error: "Ошибка при добавлении фото" });
        }
    } else {
        res.status(405).json({ error: "Метод не поддерживается" });
    }
}
