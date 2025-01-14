
import { createContext, useContext, useReducer } from "react";
import { UserDataReducer } from "../reducer/UserDataReducer";

const UserDataContext = createContext(null);

const useUserData = () => useContext(UserDataContext);

const initialUserDataState =  {
    cart: {
      items:[],
      total:null
    }
} 

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useReducer(
    UserDataReducer,
    initialUserDataState
  );
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { useUserData, UserDataProvider };
