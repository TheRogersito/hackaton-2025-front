"use client";

import { useRouter } from "next/navigation";
import { logout } from "../../services/firebaseConfig";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const {user} = useUserStore()

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    useEffect(()=>{
        console.log(user)
    },[])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
}
