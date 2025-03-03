import { create } from "zustand";
import { auth, db, logout } from "@/services/firebaseConfig";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



interface User {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    role: "sender" | "receiver"; 
}

interface UserState {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logoutUser: () => Promise<void>;
}

// Crear el estado global con Zustand
export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user, loading: false }),

    logoutUser: async () => {
        await logout();
        set({ user: null });
    },
}));

// Escuchar cambios de autenticación y actualizar Zustand
onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    const setUser = useUserStore.getState().setUser;

    if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            setUser(userSnap.data() as User);
        }
    } else {
        setUser(null);
    }
});
