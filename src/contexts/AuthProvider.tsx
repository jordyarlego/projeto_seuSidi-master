import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IAuthProvider } from '../interfaces/IAuthProvider';
import { IUser } from '../interfaces/IUser';
import { AuthContext } from './AuthContext'; // Importa o contexto separado

import {
  getUserLocalStorage,
  loginRequest,
  removeUserLocalStorage,
  setUserLocalStorage,
} from './utils';

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = getUserLocalStorage();
    if (userLocalStorage) {
      setUser(userLocalStorage);
    }
  }, []);

  // Memoriza a função de login
  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    if (response) {
      setUser(response);
      setUserLocalStorage(response);
      navigate('/inicio');
    } else {
      alert('Usuário ou senha inválidos');
    }
  }, [navigate]);

  // Memoriza a função de logout
  const handleLogout = useCallback(() => {
    setUser(null);
    removeUserLocalStorage();
    navigate('/');
  }, [navigate]);

  // UseMemo agora memoriza o contexto com as dependências corretas
  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout] // Adiciona handleLogin e handleLogout no array de dependências
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
