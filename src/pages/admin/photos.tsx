import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import prisma from "../../lib/prisma";

export interface PhotoAdmin {
    id: number;
    url: string;
    page: string;
    author: string;
}

interface AdminPhotosProps {
    initialPhotos: PhotoAdmin[];
}

export default function AdminPhotos({ initialPhotos }: AdminPhotosProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [photos, setPhotos] = useState(initialPhotos);
    const [newUrl, setNewUrl] = useState("");
    const [page, setPage] = useState("design");
    const [author, setAuthor] = useState("");

    if (!session) {
        router.push("/admin/login");
        return null;
    }

    const handleAdd = async () => {
        const res = await fetch("/api/admin/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: newUrl, page, author }),
        });
        const added = await res.json();
        setPhotos([...photos, added]);
        setNewUrl("");
        setAuthor("");
    };

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">Управление фото</h1>

            <div className="mb-6">
                <select value={page} onChange={(e) => setPage(e.target.value)} className="border p-2 rounded mr-2">
                    <option value="design">Design</option>
                    <option value="photography">Photography</option>
                </select>
                <input
                    type="text"
                    placeholder="URL изображения"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-2 rounded mr-2"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Добавить</button>
            </div>

            <ul className="space-y-2">
                {photos.map((p) => (
                    <li key={p.id}>{p.page} — {p.author} — {p.url}</li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const initialPhotos = await prisma.photo.findMany();
    return {
        props: {
            initialPhotos: JSON.parse(JSON.stringify(initialPhotos)),
        },
    };
}
