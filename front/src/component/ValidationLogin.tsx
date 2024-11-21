import { IUserLogin } from "./Forms/LoginUser";

export const ValidationLogin = (userRegister: IUserLogin) => {
  const errors: { email?: string; password?: string; } = {};

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userRegister.email) {
    errors.email = "Debes ingresar un correo electrónico";
  } else if (!emailRegex.test(userRegister.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  // Validar contraseña
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
  if (!userRegister.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (!passwordRegex.test(userRegister.password)) {
    errors.password =
      "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)";
  }

  return errors;
};