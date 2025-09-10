import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import prisma from "../../lib/prisma";

type ContentType = {
    id: number;
    page: string;
    lang: string;
    title: string;
    text?: string;
};

export default function AdminContent({ initialContent }: { initialContent: ContentType[] }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [content, setContent] = useState(initialContent);

    if (!session) {
        router.push("/admin/login");
        return null;
    }

    const handleChange = (index: number, field: "title" | "text", value: string) => {
        const newContent = [...content];
        newContent[index][field] = value;
        setContent(newContent);
    };

    const handleSave = async (item: ContentType) => {
        await fetch(`/api/admin/content/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        alert("Сохранено");
    };

    return (
        <div className="p-4">
            <Header />
            <h1 className="text-2xl font-bold mb-4">Редактирование контента</h1>
            {content.map((item, index) => (
                <div key={item.id} className="mb-6 border p-4 rounded">
                    <h2 className="font-bold mb-2">{item.page} ({item.lang})</h2>
                    <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleChange(index, "title", e.target.value)}
                        className="border p-2 w-full mb-2 rounded"
                    />
                    <textarea
                        value={item.text || ""}
                        onChange={(e) => handleChange(index, "text", e.target.value)}
                        className="border p-2 w-full rounded mb-2"
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleSave(item)}
                    >
                        Сохранить
                    </button>
                </div>
            ))}
        </div>
    );
}

// SSR: получаем контент из базы
export async function getServerSideProps() {
    const initialContent = await prisma.pageContent.findMany();
    return {
        props: {
            initialContent: JSON.parse(JSON.stringify(initialContent)),
        },
    };
}
