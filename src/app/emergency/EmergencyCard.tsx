"use client";
import { qosSession } from "@/services/qos";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export interface Emergency {
    id: string;
    name: string;
    lastName: string;
    signalStatus: "online" | "offline";
    location: {
        lat: number;
        lng: number;
    };
}

const EmergencyCard = ({ emergency }: { emergency: Emergency }) => {
    const mapContainerStyle = { width: "100%", height: "200px" };
    const defaultCenter = { lat: emergency.location.lat, lng: emergency.location.lng };

    // Obtener la clave de la API de Google Maps
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const handleCall = () => {
        qosSession('+34646519770')
        alert(`Calling patient ${emergency.name} ${emergency.lastName}, the line will be prioritized for the next 10 minutes`)
    }

    return (
        <div className="border p-4 mb-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
                {emergency.name} {emergency.lastName}
            </h2>
            <p className={`mt-2 text-3xl px-4 py-1 rounded-lg text-white ${emergency.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                State: {emergency.signalStatus === "online" ? "En línea" : "Desconectado"}
            </p>
            <p>Location: {emergency.location.lat}, {emergency.location.lng}</p>
            <button 
                onClick={handleCall} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Call patient
            </button>

            <LoadScript googleMapsApiKey={googleMapsApiKey ?? ""}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={15}>
                    <Marker position={defaultCenter} />
                </GoogleMap>
            </LoadScript>

        </div>
    );
};

export default EmergencyCard;
