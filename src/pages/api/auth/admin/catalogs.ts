import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { CatalogAdmin } from "@/types/catalog";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CatalogAdmin | { error: string }>) {
    if (req.method === "POST") {
        const { name, fileUrl } = req.body as { name: string; fileUrl: string };
        try {
            const created = await prisma.catalog.create({
                data: { name, fileUrl },
            });
            res.status(200).json(created);
        } catch (e) {
            res.status(500).json({ error: "Ошибка при добавлении каталога" });
        }
    } else {
        res.status(405).json({ error: "Метод не поддерживается" });
    }
}
