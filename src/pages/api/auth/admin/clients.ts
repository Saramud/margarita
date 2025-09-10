import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { ClientAdmin } from "@/types/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ClientAdmin | { error: string }>) {
    if (req.method === "POST") {
        const { name, project, description } = req.body as { name: string; project: string; description?: string };
        try {
            const created = await prisma.client.create({
                data: { name, project, description },
            });
            res.status(200).json(created);
        } catch (e) {
            res.status(500).json({ error: "Ошибка при добавлении клиента" });
        }
    } else {
        res.status(405).json({ error: "Метод не поддерживается" });
    }
}
