import {useEffect} from 'react';
import {useAuth} from '../contexts/auth';

export default function Logout() {
  const {isAuthed, logout} = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <h1 className="text-5xl">Logging out...</h1>
    );
  }

  return (
    <h1 className="text-5xl">You were successfully logged out</h1>
  );
}
