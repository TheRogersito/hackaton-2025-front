"use client";

import { createUser } from "@/services/usersFirebase";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterData = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    patientName: "",
  });

  const { user, setUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);

    try {
        if (!user || !user.uid) {
            throw new Error("User is not properly initialized.");
        }

        const updatedUser = {
            ...user,
            ...formData,
            uid: user.uid, // Asegura que `uid` siempre está presente
        };

        setUser(updatedUser); // Actualiza el store
        await createUser(updatedUser);
        alert("Form submitted!");
        router.push("/home");
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to submit form.");
    }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <label className="block mb-2">
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="border p-2 rounded w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="border p-2 rounded w-full"
            required
          />
        </label>

        <label className="block mb-4">
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient's name"
            className="border p-2 rounded w-full"
            required
          />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterData;
