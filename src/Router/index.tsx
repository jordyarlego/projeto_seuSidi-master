import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inside from '../pages/inside/Inside'; 
import { AuthProvider } from '../contexts/AuthProvider';
import Login from '../pages/login/Login';
import Register from '../pages/register/register';
import EsqueciSenha from '../pages/ForgotPassword/esqueciSenha';  
import { routes } from './routes';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Rota protegida para a página inicial / inside */}
        <Route path={routes.inicio} element={<Inside />} />
        
        {/* Rota para login */}
        <Route path={routes.login} element={<Login />} />
        
        {/* Rota para cadastro */}
        <Route path={routes.cadastro} element={<Register />} />
        
        {/* Rota para recuperação de senha */}
        <Route path={routes.esqueciSenha} element={<EsqueciSenha />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
