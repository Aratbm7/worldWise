import { createContext, useContext, useReducer } from "react";

const UserAuthContext = createContext();

const FAKE_USER = {
  name: "Behanm",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case "logout":
      return { ...state, user: false, isAuthenticated: false, error: "" };

    case "wrongInfo":
      return { ...state, error: "Your email or password is wrong🔴!" };
    default:
      throw new Error("Unknown action from UserAuthContext");
  }
}

function UserAuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      return;
    }

    dispatch({ type: "wrongInfo" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <UserAuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
        error,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

function useUserAuth() {
  const context = useContext(UserAuthContext);

  if (context === "undifiend")
    throw new Error("UserAuthProvider is used in out of context");

  return context;
}

export { UserAuthProvider, useUserAuth };
