import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3002/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.ok ? res.json() : null)
                .then((data) => {
                    if (data) setUser({ ...data, token });
                });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        fetch("http://localhost:3002/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data) setUser({ ...data, token });
            });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
