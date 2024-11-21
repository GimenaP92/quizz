"use client";
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../Fetchs';

export interface IUserResponse {
    username: string;
    email: string;
}

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState<IUserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");

        if (token) {
            fetchUserProfile(token)
                .then((data) => {
                    setUserProfile(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener el perfil:", error);
                    setLoading(false);
                });
        } else {
            console.log("Usuario no autenticado");
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Cargando...</div>;

    if (!userProfile) return <div>No se encontraron datos de perfil.</div>;

    return (
        <div>
            <h1>Perfil de {userProfile.username}</h1>
            <p>Email: {userProfile.email}</p>
            {/* Aquí puedes mostrar otros campos del perfil */}
        </div>
    );
};

export default UserProfile;
