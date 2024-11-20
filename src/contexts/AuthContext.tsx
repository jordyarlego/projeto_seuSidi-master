import { createContext } from 'react';
import { IContext } from '../interfaces/IContext';

export const AuthContext = createContext<IContext>({} as IContext);
