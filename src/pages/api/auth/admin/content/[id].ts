import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { ContentType } from "@/types/content";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContentType | { error: string }>) {
    const id = Number(req.query.id);

    if (req.method === "PUT") {
        const { title, text } = req.body as { title: string; text?: string };
        try {
            const updated = await prisma.pageContent.update({
                where: { id },
                data: { title, text },
            });
            res.status(200).json(updated);
        } catch (e) {
            res.status(500).json({ error: "Ошибка при обновлении контента" });
        }
    } else {
        res.status(405).json({ error: "Метод не поддерживается" });
    }
}