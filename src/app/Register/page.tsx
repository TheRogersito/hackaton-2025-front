"use client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../../services/firebaseConfig";
import { useUserStore } from "@/store/userStore";

export default function Register() {
    const router = useRouter();
    const { setUser } = useUserStore();

    const handleRegister = async () => {
        try {
            const user = await signInWithGoogle();

            if (user) {
                setUser({
                    uid: user.uid,
                    name: user.displayName || "Usuario", // Ajuste aquí
                    tutorName: "", // Se deja vacío si no es requerido
                    email: user.email || "correo@ejemplo.com",
                    photoURL: user.photoURL || "",
                    role: "sender", // Valor por defecto
                    signalStatus: "offline", // Valor por defecto
                });

                router.push("/RegisterData");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Regístrate</h1>
            <button
                onClick={handleRegister}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
                Registrarse con Google
            </button>
        </div>
    );
}
