"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/userStore";
import { signInWithGoogle } from "@/services/firebaseConfig";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
  const router = useRouter();
  const {setUser} = useUserStore()


  const handleLogin = async () => {
    try {
      const googleUser = await signInWithGoogle();
      if (googleUser) {
        setUser({
          uid: googleUser.uid,
          name: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          role: "sender",  // Adjust role accordingly
        });
        router.push("/home");  // Redirect after successful login
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
          <FcGoogle className="text-xl" /> 
        Iniciar sesión con Google
      </button>
    </div>
  );
}
