import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface UserContextType {
  user: any;
  saveUser: (userData: any) => void;
  signOut: () => void;
  isAuthenticated:boolean
}

// Set up default values for the context
const defaultUserContext: UserContextType = {
  user: null,
  saveUser: () => {},
  signOut: () => {},
  isAuthenticated : false,
};

// Create the UserContext with default values
export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: any) => { 
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, []);

  const saveUser = useCallback((userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
    setIsAuthenticated(true)
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  }, [navigate]);

  return(
    <UserContext.Provider value={{saveUser,signOut,user, isAuthenticated}}>
             {children}
    </UserContext.Provider>
  )
};
