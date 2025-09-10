import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; // редирект происходит в useEffect

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
                className="mt-4 px-4 py-2 border rounded"
                onClick={() => signOut()}
            >
                Logout
            </button>
            {/* Здесь будут компоненты редактирования контента, фото, клиентов, каталога */}
        </div>
    );
}

