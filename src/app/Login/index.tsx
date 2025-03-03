"use client";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/services/firebaseConfig";
import { useUserStore } from "../../store/userStore";

export default function Login() {
  const router = useRouter();
<<<<<<< HEAD
  const { setUser } = useUserStore(); // Accessing setUser from the store

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();

      if (user) {
        // Set user data to the store
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "sender",  // Adjust role accordingly
        });
=======
  const setUser = useUserStore((state) => state.setUser);

import {signInWithGoogle}  from "@/services/firebaseConfig";

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
          role: "sender", 
      })
        router.push("/home");
>>>>>>> 770d2cf5d6ea6943a96ef4c3a32b86b9425573f8

        // Redirect user based on role
        if (user.role === "funcionario") {
          router.push("/emergency");
        } else {
          router.push("/home");
        }
        
        console.log(user);
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
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
