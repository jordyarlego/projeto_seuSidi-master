import { ILoggedUserData } from '../interfaces/ILoggedUSerData';
import { loginRequest as loginUserRequest } from '../services/users';

export function setUserLocalStorage(user: ILoggedUserData | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

export const getUserLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export async function loginRequest(email: string, password: string) {
  try {
    const response = await loginUserRequest(email, password);

    return response;
  } catch (error) {
    if (error instanceof Error) console.log(error);

    return null;
  }
}
