import axios from 'axios';
import { ILoggedUserData } from '../interfaces/ILoggedUSerData';

const API_URL = 'http://localhost:3000/usuarios';

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    const user = users.find(
      (user: ILoggedUserData) =>
        (user.email === email || user.cpf === email) && user.senha === password
    );

    if (user) {
      console.log(user);
      return user;
    }
    return null;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return null;
  }
};

export async function registerUser(newUser) {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getUserLocalStorage() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function setUserLocalStorage(user: ILoggedUserData) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}
