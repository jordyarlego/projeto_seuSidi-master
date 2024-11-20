import axios from 'axios';
import { ILoggedUserData } from '../interfaces/ILoggedUSerData';

const API_URL = 'http://localhost:3000/usuarios';

// Login Request
export const loginRequest = async (email: string, password: string) => {
  try {
    // Recupera os usuários armazenados no localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); // Garante um array vazio caso seja null

    // Verifica se existe um usuário que corresponda ao email e senha fornecidos
    const user = storedUsers.find(
      (user: ILoggedUserData) =>
        user.email === email && user.senha === password
    );

    if (user) {
      console.log(user);
      return user; // Retorna o usuário se encontrado
    }

    return null; // Retorna null se nenhum usuário for encontrado
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return null; // Retorna null em caso de erro
  }
};

// Registro de usuário
export async function registerUser(newUser: ILoggedUserData) {
  try {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return null;
  }
}

// Recupera usuário do localStorage
export function getUserLocalStorage(): ILoggedUserData | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Armazena usuário no localStorage
export function setUserLocalStorage(user: ILoggedUserData): void {
  localStorage.setItem('user', JSON.stringify(user));
}

// Remove usuário do localStorage
export function removeUserLocalStorage(): void {
  localStorage.removeItem('user');
}
