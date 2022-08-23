import { createContext, useState, useEffect, useContext } from "react";
import { getString, getData } from "../api/asyncStorage";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [isLoadingSavedDetails, setIsLoadingSavedDetails] = useState(true);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const getSavedUserAndToken = async () => {
    setIsLoadingSavedDetails(true);

    const savedUser = await getData("user");
    const savedToken = await getString("token");

    setUser(savedUser);
    setToken(savedToken);

    setIsLoadingSavedDetails(false);
  };

  useEffect(() => {
    getSavedUserAndToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoadingSavedDetails,
        setIsLoadingSavedDetails,
        user,
        setUser,
        token,
        setToken,
        // refreshPosts,
        // setRefreshPosts
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserState = () => {
  return useContext(UserContext);
};
