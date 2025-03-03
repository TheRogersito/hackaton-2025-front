'use client';
import { useUserStore } from "../../store/userStore";
import { useRouter } from "next/navigation";
import { logout } from "../../services/firebaseConfig";
import { useEffect } from "react";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    if (!user) {
        return <p style={styles.loadingText}>Cargando...</p>;
    }

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div style={styles.container}>
            <div style={styles.header} />
            <div style={styles.card}>
                <h1 style={styles.title}>Bienvenido, {user.name}</h1>
                <p style={styles.email}>{user.email}</p>
                <p style={{ ...styles.status, backgroundColor: user.signalStatus === "online" ? "#22c55e" : "#ef4444" }}>
                    Estado: {user.signalStatus === "online" ? "En línea" : "Desconectado"}
                </p>
                <button style={styles.emergencyButton} onClick={() => router.push("/Emergency")}>
                    🚨 PEDIR AYUDA
                </button>
                <div style={styles.locationContainer}>
                    <p style={styles.locationTitle}>📍 Ubicación</p>
                    <p style={styles.locationText}>Lat: 41.4036 | Lng: 2.1744</p>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.primaryButton}>📡 Enviar Ubicación</button>
                    <button style={styles.secondaryButton}>🗺️ Ver Mapa</button>
                </div>
                <button onClick={handleLogout} style={styles.logoutText}>Cerrar sesión</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        position: "relative",
    },
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "33%",
        backgroundColor: "#2563eb",
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem",
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.75rem",
        width: "90%",
        maxWidth: "400px",
        zIndex: 10,
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: "0.5rem",
    },
    email: {
        color: "#4b5563",
    },
    status: {
        marginTop: "0.5rem",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        color: "#fff",
    },
    emergencyButton: {
        marginTop: "1.5rem",
        backgroundColor: "#dc2626",
        color: "#fff",
        fontSize: "1.125rem",
        fontWeight: "600",
        padding: "1rem 2.5rem",
        borderRadius: "9999px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    locationContainer: {
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        width: "100%",
    },
    locationTitle: {
        fontSize: "0.875rem",
        color: "#374151",
    },
    locationText: {
        color: "#1f2937",
        fontWeight: "500",
    },
    buttonContainer: {
        marginTop: "1rem",
        display: "flex",
        gap: "1rem",
    },
    primaryButton: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    secondaryButton: {
        backgroundColor: "#6b7280",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    logoutText: {
        marginTop: "1.5rem",
        color: "#6b7280",
        fontSize: "0.875rem",
        textDecoration: "underline",
        cursor: "pointer",
    },
    loadingText: {
        textAlign: "center",
        marginTop: "2.5rem",
        color: "#6b7280",
    },
};
