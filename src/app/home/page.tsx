'use client';
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";
import { logout } from "../../services/firebaseConfig";
import { useEffect } from "react";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
    }

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
            <div className="absolute top-0 w-full h-1/3 bg-black rounded-b-xl"></div>
            <div className="relative flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-11/12 max-w-md z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido, {user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className={`mt-2 py-1 px-4 rounded-full text-white ${user.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                    Estado: {user.signalStatus === "online" ? "En línea" : "Desconectado"}
                </p>
                <button className="mt-6 bg-red-600 text-white text-lg font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-red-700 transition-colors" onClick={() => router.push("/Emergency")}>
                    🚨 PEDIR AYUDA
                </button>
                <div className="mt-4 flex flex-col items-center bg-gray-200 py-2 px-4 rounded-lg w-full">
                    <p className="text-sm text-gray-700">📍 Ubicación</p>
                    <p className="text-gray-800 font-medium">Lat: 41.4036 | Lng: 2.1744</p>
                </div>
                <div className="mt-4 flex gap-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">📡 Enviar Ubicación</button>
                    <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">🗺️ Ver Mapa</button>
                </div>
                <button onClick={handleLogout} className="mt-6 text-gray-600 text-sm underline cursor-pointer">Cerrar sesión</button>
            </div>
        </div>
    );
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        position: "relative",
    },
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "33%",
        backgroundColor: "#2563eb",
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem",
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.75rem",
        width: "90%",
        maxWidth: "400px",
        zIndex: 10,
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: "0.5rem",
    },
    email: {
        color: "#4b5563",
    },
    status: {
        marginTop: "0.5rem",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        color: "#fff",
    },
    emergencyButton: {
        marginTop: "1.5rem",
        backgroundColor: "#dc2626",
        color: "#fff",
        fontSize: "1.125rem",
        fontWeight: "600",
        padding: "1rem 2.5rem",
        borderRadius: "9999px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    locationContainer: {
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        width: "100%",
    },
    locationTitle: {
        fontSize: "0.875rem",
        color: "#374151",
    },
    locationText: {
        color: "#1f2937",
        fontWeight: "500",
    },
    buttonContainer: {
        marginTop: "1rem",
        display: "flex",
        gap: "1rem",
    },
    primaryButton: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    secondaryButton: {
        backgroundColor: "#6b7280",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    logoutText: {
        marginTop: "1.5rem",
        color: "#6b7280",
        fontSize: "0.875rem",
        textDecoration: "underline",
        cursor: "pointer",
    },
    loadingText: {
        textAlign: "center",
        marginTop: "2.5rem",
        color: "#6b7280",
    },
};
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
