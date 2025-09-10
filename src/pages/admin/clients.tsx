import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import prisma from "../../lib/prisma";

export interface Client {
    id: number;
    name: string;
    project: string;
    description?: string;
}

interface ClientsPageProps {
    initialClients: Client[];
}

export default function AdminClients({ initialClients }: ClientsPageProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [clients, setClients] = useState(initialClients);
    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");

    if (!session) {
        router.push("/admin/login");
        return null;
    }

    const handleAdd = async () => {
        const res = await fetch("/api/admin/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, project, description }),
        });
        const added = await res.json();
        setClients([...clients, added]);
        setName(""); setProject(""); setDescription("");
    };

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">Управление клиентами</h1>
            <div className="mb-6 space-y-2">
                <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" />
                <input placeholder="Проект" value={project} onChange={(e) => setProject(e.target.value)} className="border p-2 rounded w-full" />
                <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Добавить клиента</button>
            </div>
            <ul className="space-y-2">
                {clients.map(c => <li key={c.id}>{c.name} — {c.project}</li>)}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const initialClients = await prisma.client.findMany();
    return {
        props: {
            initialClients: JSON.parse(JSON.stringify(initialClients)),
        },
    };
}
