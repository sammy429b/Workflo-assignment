import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { set } from 'react-hook-form';

// Define the shape of the AuthContext
interface AuthContextType {
    userMailId: string;
    userId: string;
    setUserMailId: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    handleLoginAuth: (mail: string) => void;
    handleLogoutAuth: () => void;
    isMailId: boolean;
    setIsMailId: React.Dispatch<React.SetStateAction<boolean>>;
    isOTP: boolean;
    setIsOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props type
interface AuthProviderProps {
    children: ReactNode;
}

// Define the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userMailId, setUserMailId] = useState<string>(() => JSON.parse(localStorage.getItem("userMailId") || '""'));
    const [userId, setUserId] = useState<string>(() => JSON.parse(localStorage.getItem("userId") || '""'));
    const [isAuthenticated, setAuthenticated] = useState<boolean>(() => JSON.parse(localStorage.getItem("isAuthenticated") || 'false'));
    const [isOTP, setIsOTP] = useState<boolean>(false);
    const [isMailId, setIsMailId] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem("userMailId", JSON.stringify(userMailId));
        localStorage.setItem("userId", JSON.stringify(userId));
    }, [userMailId]);

    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const handleLoginAuth = (mail: string, id:string) => {
        setUserMailId(mail);
        setUserId(id);
        setAuthenticated(true);
    };

    const handleLogoutAuth = () => {
        setUserMailId("");
        setAuthenticated(false);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ userMailId, setUserMailId,isMailId, setIsMailId, isAuthenticated, handleLoginAuth, handleLogoutAuth, isOTP, setIsOTP, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

// Define and export the useAuth hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
