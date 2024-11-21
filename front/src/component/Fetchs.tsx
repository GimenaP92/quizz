import { IUserRegister } from "./Forms/RegisterUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegisterUser = async (user: IUserRegister) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`${apiUrl}/api/auth/local/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user), 
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido'); 
  }

  const data = await response.json();
  return data; 
};


export const fetchLoginUser = async (user: { email: string, password: string }) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`${apiUrl}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: user.email,  
      password: user.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error desconocido');
  }

  const data = await response.json();
  return data; 
};


  
  export const fetchUserProfile = async (token:string) => {
    const response = await fetch("http://localhost:1337/usuarios/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,  // Enviar el token de autenticación en la cabecera
      },
    });
  
    const data = await response.json();
    return data;  // Retorna los datos del perfil del usuario
  };
  