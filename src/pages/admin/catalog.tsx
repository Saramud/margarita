import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import prisma from "../../lib/prisma";

export interface Catalog {
    id: number;
    name: string;
    fileUrl: string;
}

interface CatalogPageProps {
    initialCatalogs: Catalog[];
}

export default function AdminCatalog({ initialCatalogs }: CatalogPageProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [catalogs, setCatalogs] = useState(initialCatalogs);
    const [name, setName] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    if (!session) {
        router.push("/admin/login");
        return null;
    }

    const handleAdd = async () => {
        const res = await fetch("/api/admin/catalogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, fileUrl }),
        });
        const added = await res.json();
        setCatalogs([...catalogs, added]);
        setName(""); setFileUrl("");
    };

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">Управление каталогами</h1>
            <div className="mb-6 space-y-2">
                <input placeholder="Название каталога" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" />
                <input placeholder="URL файла" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="border p-2 rounded w-full" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Добавить каталог</button>
            </div>
            <ul className="space-y-2">
                {catalogs.map(c => <li key={c.id}>{c.name} — <a href={c.fileUrl} className="text-blue-600">Ссылка</a></li>)}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const initialCatalogs = await prisma.catalog.findMany();
    return {
        props: {
            initialCatalogs: JSON.parse(JSON.stringify(initialCatalogs)),
        },
    };
}
