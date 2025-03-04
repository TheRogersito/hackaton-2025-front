"use client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from '../../services/firebaseConfig'
import { useUserStore } from "@/store/userStore";
import { FcGoogle } from "react-icons/fc";


import { kyc } from "@/services/kyc";


export default function Register() {
    const router = useRouter();
    const {setUser} = useUserStore();

    const handleRegister = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
            const kycPayload = {
                phoneNumber: "+34646519770", // Placeholder, should get from user input
                idDocument: "FIC80142", // Should be collected from the user
                name: user.displayName || "Unknown",
                givenName: user.displayName?.split(" ")[0] || "Unknown",
                familyName: user.displayName?.split(" ").slice(1).join(" ") || "Unknown",
                address: "Street example", // Should be collected from user
                streetName: "Example",
                streetNumber: "1",
                postalCode: "00000",
                region: "Region",
                locality: "City",
                country: "ES",
                birthdate: "2000-01-01", // Should be collected
                email: user.email || "",
                gender: "FEMALE", // Should be collected
            };

            // Call KYC API
            const kycReady = await kyc(kycPayload);
            if(kycReady.idDocumentMatch){

                    setUser({
                        uid: user.uid,
                        tutorName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: "sender", 
                    })
                    router.push("/RegisterData");
                }
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
