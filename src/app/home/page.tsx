'use client';
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";
import { addDoc, collection, db, logout } from "../../services/firebaseConfig";
import { useEffect } from "react";
import type { Emergency } from "../emergency/EmergencyCard";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();


    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const createEmergency = async (emergency: Emergency ) => {
        const colRef = collection(db, 'emergencies');
        const data = await addDoc(colRef, emergency);
        return data.id;
    };

    const handleEmergency = async () => {
        try {
            await createEmergency({
                id: "",
                name: user?.name ?? "Desconocido",
                lastName: user?.email ?? "Desconocido",
                signalStatus: "online",
                location: {
                    lat: 41.4036,
                    lng: 2.1744
                }
            });
        } catch (e) {
            console.log("Error creating emergency", e);
        }
    };
    

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
                <button className="mt-6 bg-red-600 text-white text-2xl font-semibold p-28  rounded-full shadow-lg hover:bg-red-700 transition-colors" onClick={handleEmergency}>
                    
                    🚨<br />  PEDIR AYUDA
                </button>
                
                <div className="mt-4 flex flex-col items-center bg-gray-200 py-2 px-4 rounded-lg w-full">
                    <p className="text-sm text-gray-700">📍 Ubicación</p>
                    <p className="text-gray-800 font-medium">Lat: 41.4036 | Lng: 2.1744</p>
                </div>
                <button onClick={handleLogout} className="mt-6 text-gray-600 text-sm underline cursor-pointer">Cerrar sesión</button>
            </div>
        </div>
    );
}
