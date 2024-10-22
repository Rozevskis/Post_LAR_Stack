import { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({});

    async function getUser() {
        const res = await fetch('/api/user',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        setUser(data);
    }
    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    return(
        <AppContext.Provider value={{token, setToken, user}}>
            {children}
        </AppContext.Provider>
    )
}