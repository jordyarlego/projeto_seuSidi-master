import { ILoggedUserData } from './ILoggedUSerData';

export interface IContext extends ILoggedUserData {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}
