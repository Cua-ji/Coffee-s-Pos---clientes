import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isGuest: boolean;
  guestName: string;
  login: (email: string, pin: string) => { success: boolean; message?: string };
  signup: (name: string, email: string, pin: string) => { success: boolean; message?: string };
  guestLogin: (name?: string) => void;
  logout: () => void;
  updateProfile: (name: string, pin?: string) => void;
  toggleFavorite: (productId: string) => void;
  addGranos: (amount: number) => void;
  resetPin: (email: string, newPin: string) => { success: boolean; message?: string };
  usersList: User[];
}

const DEFAULT_USERS: User[] = [
  {
    id: 'user-sofia',
    name: 'Sofía',
    email: 'sofia@coffeespos.com',
    pin: '1234',
    granos: 145,
    favorites: ['prod-flat-white', 'prod-croissant-almendras', 'prod-caramel-iced-latte'],
  },
  {
    id: 'user-alex',
    name: 'Alex',
    email: 'alex@coffeespos.com',
    pin: '9876',
    granos: 80,
    favorites: ['prod-caramel-iced-latte', 'prod-matcha-ceremonial'],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('taffy_users_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('taffy_active_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem('taffy_is_guest') === 'true';
  });

  const [guestName, setGuestName] = useState<string>(() => {
    return localStorage.getItem('taffy_guest_name') || 'Invitado';
  });

  useEffect(() => {
    localStorage.setItem('taffy_users_db', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('taffy_active_user', JSON.stringify(currentUser));
      setIsGuest(false);
      localStorage.removeItem('taffy_is_guest');
    } else {
      localStorage.removeItem('taffy_active_user');
    }
  }, [currentUser]);

  const login = (email: string, pin: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => {
      const uEmail = u.email.toLowerCase();
      return (
        uEmail === normalizedEmail ||
        uEmail.replace('@taffycoffee.com', '@coffeespos.com') === normalizedEmail ||
        uEmail === normalizedEmail.replace('@coffeespos.com', '@taffycoffee.com')
      );
    });

    if (!user) {
      return { success: false, message: 'No existe una cuenta con este correo.' };
    }

    if (user.pin !== pin) {
      return { success: false, message: 'El PIN ingresado es incorrecto.' };
    }

    setCurrentUser(user);
    setIsGuest(false);
    return { success: true };
  };

  const signup = (name: string, email: string, pin: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      return { success: false, message: 'Ya existe una cuenta con este correo. Por favor inicia sesión.' };
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return { success: false, message: 'El PIN debe ser exactamente de 4 dígitos numéricos.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Cliente',
      email: normalizedEmail,
      pin,
      granos: 50,
      favorites: ['prod-flat-white'],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsGuest(false);
    return { success: true };
  };

  const guestLogin = (name = 'Invitado') => {
    setIsGuest(true);
    setGuestName(name);
    setCurrentUser(null);
    localStorage.setItem('taffy_is_guest', 'true');
    localStorage.setItem('taffy_guest_name', name);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsGuest(false);
    localStorage.removeItem('taffy_active_user');
    localStorage.removeItem('taffy_is_guest');
    localStorage.removeItem('taffy_guest_name');
  };

  const updateProfile = (name: string, pin?: string) => {
    if (currentUser) {
      const updated = {
        ...currentUser,
        name: name.trim() || currentUser.name,
        pin: pin && /^\d{4}$/.test(pin) ? pin : currentUser.pin,
      };
      setCurrentUser(updated);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } else if (isGuest) {
      setGuestName(name.trim() || 'Invitado');
      localStorage.setItem('taffy_guest_name', name.trim() || 'Invitado');
    }
  };

  const toggleFavorite = (productId: string) => {
    if (!currentUser) return;
    const isFav = currentUser.favorites.includes(productId);
    const updatedFavorites = isFav
      ? currentUser.favorites.filter((id) => id !== productId)
      : [...currentUser.favorites, productId];

    const updated = { ...currentUser, favorites: updatedFavorites };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const addGranos = (amount: number) => {
    if (!currentUser) return;
    const updated = { ...currentUser, granos: currentUser.granos + amount };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const resetPin = (email: string, newPin: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      return { success: false, message: 'No encontramos ninguna cuenta con ese correo.' };
    }

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      return { success: false, message: 'El nuevo PIN debe tener exactamente 4 dígitos.' };
    }

    const updatedUser = { ...users[userIndex], pin: newPin };
    const updatedList = [...users];
    updatedList[userIndex] = updatedUser;
    setUsers(updatedList);

    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isGuest,
        guestName,
        login,
        signup,
        guestLogin,
        logout,
        updateProfile,
        toggleFavorite,
        addGranos,
        resetPin,
        usersList: users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
