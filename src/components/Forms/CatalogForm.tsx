import { useState } from "react";

interface CatalogFormProps { }

export default function CatalogForm(props: CatalogFormProps) {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Catalog request sent to: ${email}`);
        setEmail("");
        // Здесь можно добавить API вызов для отправки каталога на email или WA
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <label>
                Email или WhatsApp:
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mt-1"
                />
            </label>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Отправить
            </button>
        </form>
    );
}
