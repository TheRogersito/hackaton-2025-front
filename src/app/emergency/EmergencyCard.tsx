"use client";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

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

const EmergencyCard = ({ emergency }: { emergency: Emergency }) => {
    const mapContainerStyle = { width: "100%", height: "200px" };
    const defaultCenter = { lat: emergency.location.lat, lng: emergency.location.lng };

    // Obtener la clave de la API de Google Maps
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
        console.error("Falta la variable de entorno NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
        return <p>Error: Falta la API Key de Google Maps</p>;
    }

    return (
        <div className="border p-4 mb-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
                {emergency.name} {emergency.lastname}
            </h2>
            <p className={`mt-2 text-3xl px-4 py-1 rounded-lg text-white ${emergency.signalStatus === "online" ? "bg-green-500" : "bg-red-500"}`}>
                Estado: {emergency.signalStatus === "online" ? "En línea" : "Desconectado"}
            </p>
            <p>Ubicación: {emergency.location.lat}, {emergency.location.lng}</p>

            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={15}>
                    <Marker position={defaultCenter} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default EmergencyCard;
