import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { logoutUser } from '../api/users';

export default function LogoutButton(){
  const navigate = useNavigate();
  const { setState } = useUser();

  const handleLogout = async () => {
    const response = await logoutUser();
    if(response){
      setState({ user: null, loading: false });
      navigate('/logout');
    }
  };
  
  return(
    <button onClick={handleLogout}>
      Log out
    </button>
  );
}
