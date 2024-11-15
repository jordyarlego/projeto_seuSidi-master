import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      return navigate('/');
    }
  }, [email]);

  if (!email) {
    return <h1>You don&lsquo;t have access</h1>;
  }

  return children;
};

export default ProtectedLayout;
