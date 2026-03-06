import { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  function login(email, password, role) {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      setError('');
      return true;
    }
    setError('Invalid credentials or role mismatch.');
    return false;
  }

  function logout() {
    setUser(null);
    setError('');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
