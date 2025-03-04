"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import EmergencyCard from "./EmergencyCard";

interface Emergency {
    id: string;
    name: string;
    lastName: string; // Se corrige a `lastName`
    signalStatus: "online" | "offline";
    location: {
        lat: number;
        lng: number;
    };
}

export default function Emergency() {
    const [emergencies, setEmergencies] = useState<Emergency[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "emergencies"), (snapshot) => {
            const emergencyList = snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name ?? "Desconocido", // Se asegura que haya un valor
                lastName: doc.data().lastName ?? "No disponible", // Se asegura que haya un valor
                signalStatus: doc.data().signalStatus ?? "offline", // Se asegura un estado por defecto
                location: doc.data().location ?? { lat: 0, lng: 0 }, // Se asegura que haya una ubicación válida
            })) as Emergency[];

            setEmergencies(emergencyList); 
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Emergencias Actuales</h1>

            {emergencies.length === 0 ? (
                <p className="text-gray-500">No hay emergencias registradas.</p>
            ) : (
                emergencies.map((emergency) => <EmergencyCard emergency={emergency} key={emergency.id} />)
            )}
        </div>
    );
}
