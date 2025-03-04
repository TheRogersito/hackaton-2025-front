"use client"
import { signInWithGoogle } from "@/services/firebaseConfig";
import { useUserStore } from "@/store/userStore"
import { createUser } from "@/services/usersFirebase";
import { useRouter } from "next/navigation";

const RegisterMedic =()=>{
    const {setUser} = useUserStore()
    const router = useRouter()

    const handleRegister=async()=>{
        try{
            const user = await signInWithGoogle();
            if(user){
                const newUser={
                    uid: user.uid,
                    tutorName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "funcionario", 
                }
                setUser(newUser);
                await createUser(newUser);
                router.push('/emergency');
            }
        }catch(e){
            console.log("Error en el registro de médico: ",e)
        }
    }

    return (<>
    <h1>Register Medic</h1>
    <button onClick={handleRegister}>Register with google</button>
    </>)
}

export default RegisterMedic