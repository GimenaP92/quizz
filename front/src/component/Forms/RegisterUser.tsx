"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validationRegister } from '../ValidationRegister';
import { fetchRegisterUser } from '../Fetchs';

export interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

export default function RegisterUser() {
    const router = useRouter();
    const [userRegister, setUserRegister] = useState<IUserRegister>({
        email: '',
        username: '',
        password: ''
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const updatedUser = { ...userRegister, [name]: value };
        setUserRegister(updatedUser);
        setErrors(validationRegister(updatedUser));  // Actualiza errores en cada cambio
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: IUserRegister = { ...userRegister };

        // Validación antes de enviar
        const validationErrors = validationRegister(user);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;  // Si hay errores, no enviamos el formulario

        try {
            const isRegistered = await fetchRegisterUser(user);
            if (isRegistered) {
                setNotificationMessage("Registro exitoso");
                setShowNotification(true);
                setTimeout(() => {
                    router.push("/quizz");
                }, 2000);
            } else {
                setErrors({ ...errors, general: "Registro inválido. Por favor, revisa los datos ingresados." });
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Error desconocido.");
            setShowErrorNotification(true);
            setTimeout(() => setShowErrorNotification(false), 3000);
        }
    };

    return (
        <div className="container">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">¡Hola, bienvenido/a!</h1>
                <p className="mt-4 text-gray-500">
                    Regístrate para realizar el examen.
                </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-2xl shadow-gray-500/50 lg:col-span-3 lg:p-12">
                <form action="#" onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="username" className="block text-sm text-gray-700">Nombre</label>
                            <input
                                className="input-form"
                              type="text"
                                id="name"
                                name="username"
                                value={userRegister.username}
                                onChange={handleChange}
                            />
                            {errors.username && <h5 className="text-red-500 text-sm">{errors.username}</h5>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                            <input
                                className="input-form"
                                 type="email"
                                id="email"
                                name="email"
                                value={userRegister.email}
                                onChange={handleChange}
                            />
                            {errors.email && <h5 className="text-red-500 text-sm">{errors.email}</h5>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-700">Contraseña</label>
                            <input
                                className="input-form"
                                 type="password"
                                id="password"
                                name="password"
                                value={userRegister.password}
                                onChange={handleChange}
                            />
                            {errors.password && <h5 className="text-red-500 text-sm">{errors.password}</h5>}
                        </div>
                    </div>

                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                    <div className="flex items-center justify-between">
                        <h6 className="text-sm text-gray-500">
                            ¿Ya tienes cuenta? 
                            <a className="underline hover:font-bold" href="/login"> Inicia sesión aquí</a>
                        </h6>

                        <button
                            type="submit"
                            className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-black"
                        >
                            Registrarme
                        </button>
                    </div>
                </form>
            </div>

            {showNotification && (
                <div className="mt-4 text-green-500">{notificationMessage}</div>
            )}

            {showErrorNotification && (
                <div className="mt-4 text-red-500">{errorMessage}</div>
            )}
        </div>
    );
}
