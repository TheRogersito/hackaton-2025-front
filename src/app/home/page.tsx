"use client";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    if (!user) {
        return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-2">Bienvenido, {user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className={`mt-2 px-4 py-1 rounded-lg text-white ${user.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                Estado: {user.signalStatus === "online" ? "En línea" : "Desconectado"}
            </p>

            {user.role === "funcionario" && (
                <button
                    onClick={() => router.push("/Emergency")}
                    className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                    Ver Emergencias
                </button>
            )}
        </div>
    );
}
