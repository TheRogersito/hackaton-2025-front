"use client";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";
import { logout } from "../../services/firebaseConfig";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    if (!user) {
        return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
    }

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            {/* Fondo con onda azul */}
            <div className="absolute top-0 w-full h-1/3 bg-blue-600 rounded-b-3xl"></div>

            {/* Contenido principal */}
            <div className="relative flex flex-col items-center p-6 bg-white shadow-lg rounded-xl w-11/12 max-w-md z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Bienvenido, {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>

                {/* Estado del usuario */}
                <p className={`mt-2 px-4 py-1 rounded-lg text-white ${user.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                    Estado: {user.signalStatus === "online" ? "En línea" : "Desconectado"}
                </p>

                {/* Botón grande para pedir ayuda */}
                <button
                    onClick={() => router.push("/Emergency")}
                    className="mt-6 bg-red-600 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-md hover:bg-red-700 transition-all"
                >
                    🚨 PEDIR AYUDA
                </button>

                {/* Información de ubicación */}
                <div className="mt-4 flex flex-col items-center bg-gray-200 px-4 py-2 rounded-lg w-full">
                    <p className="text-sm text-gray-700">📍 Ubicación</p>
                    <p className="text-gray-800 font-medium">Lat: 41.4036 | Lng: 2.1744</p>
                </div>

                {/* Botones adicionales */}
                <div className="mt-4 flex gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        📡 Enviar Ubicación
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                        🗺️ Ver Mapa
                    </button>
                </div>

                {/* Botón de cerrar sesión */}
                <button onClick={handleLogout} className="mt-6 text-gray-500 text-sm underline">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
