import { Navigate } from 'react-router-dom';

export default function PrivateRouter({children}){
  const isAuthenticated = localStorage.getItem('authToken');

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }

  return children;
}