"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { fetchLoginUser } from '../Fetchs';
import { ValidationLogin } from '../ValidationLogin';

export interface IUserLogin {
  email: string;
  password: string;
}

export default function LoginUser() {
  
  const [dataUser, setDataUser] = useState<IUserLogin>({ email: "", password: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  
  const router = useRouter();

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });

  
    const validationErrors = ValidationLogin(dataUser);
    setErrors(validationErrors);
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  
    const validationErrors = ValidationLogin(dataUser);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;  

    try {
      const credentials = { email: dataUser.email, password: dataUser.password };
      const success = await fetchLoginUser(credentials); 

      if (success) {
        setNotificationMessage(`Bienvenido`);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          router.push("/quizz");
        }, 3000);
      } else {
        setErrorMessage("Credenciales inválidas. Verifica tu correo electrónico y contraseña.");
        setShowErrorNotification(true);
        setTimeout(() => setShowErrorNotification(false), 3000); 
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido."); 
      setShowErrorNotification(true); 
      setTimeout(() => setShowErrorNotification(false), 3000); 
    }
  };

  return (
    <div className="container">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">¡Nos alegra verte aquí!</h1>
        <p className="mt-4 text-gray-500">
          Ingresa a tu cuenta para realizar el exámen
        </p>
      </div>

      
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-16 max-w-md space-y-4 p-8 shadow-2xl shadow-gray-500/50 rounded-lg">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={dataUser.email}
              onChange={handleChange}
              className="input-form"
            />
           
            {errors.email && <h5 className="text-red-500 text-sm">{errors.email}</h5>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={dataUser.password}
              onChange={handleChange}
              className="input-form"
            />
           
            {errors.password && <h5 className="text-red-500 text-sm">{errors.password}</h5>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-sm text-gray-500">
            ¿No tienes cuenta?
            <a className="underline hover:font-bold" href="/register"> Registrate aquí</a>
          </h6>

          <button
            type="submit"
            className="inline-block rounded-lg bg-tertiary hover:bg-orange-400 px-5 py-3 text-sm font-medium text-white"
          >
            Ingresar
          </button>
        </div>
      </form>

      
      {showNotification && <div className="mt-4 text-green-500">{notificationMessage}</div>}
      {showErrorNotification && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </div>
  );
}
