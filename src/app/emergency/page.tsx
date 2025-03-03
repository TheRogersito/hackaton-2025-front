"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

interface Emergency {
    id: string;
    name: string;
    lastname: string;
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
                ...doc.data(),
            })) as Emergency[];

            setEmergencies(emergencyList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Emergencias Actuales</h1>

            {emergencies.length === 0 ? (
                <p className="text-gray-500">No hay emergencias registradas.</p>
            ) : (
                emergencies.map((emergency) => (
                    <div key={emergency.id} className="border p-4 mb-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold">
                            {emergency.name} {emergency.lastname}
                        </h2>
                        <p className={`mt-2 px-4 py-1 rounded-lg text-white ${emergency.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                            Estado: {emergency.signalStatus === "online" ? "En línea" : "Desconectado"}
                        </p>
                        <p>Ubicación: {emergency.location.lat}, {emergency.location.lng}</p>
                    </div>
                ))
            )}
        </div>
    );
}
