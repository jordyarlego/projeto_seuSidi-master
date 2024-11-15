import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inside from '../components/aside/meu_ponto/ponto';
import ProtectedLayout from '../components/ProtectedLayout/ProtectedLayout';
import { AuthProvider } from '../contexts/AuthProvider';
import Login from '../pages/login/Login';
import Register from '../pages/register/register';
import { routes } from './routes';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path={routes.inicio}
          element={
            <ProtectedLayout>
              <Inside />
            </ProtectedLayout>
          }
        />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.cadastro} element={<Register />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
