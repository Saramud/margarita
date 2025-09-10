import { useState } from "react";

interface ContactFormProps { }

export default function ContactForm(props: ContactFormProps) {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Message sent from ${email}: ${message}`);
        setMessage("");
        setEmail("");
        // Здесь можно сделать API вызов для отправки сообщения
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mt-1"
                />
            </label>
            <label>
                Сообщение:
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 w-full rounded mt-1"
                />
            </label>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Отправить
            </button>
        </form>
    );
}
