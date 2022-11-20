import { createContext, useContext, useState } from "react";
import { firebase, auth } from "../Firebase/firebase";

const UserContext = createContext();
const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  firebase.auth().onAuthStateChanged((res) => {
    if (res) {
      setUser(res.multiFactor.user);
      setIsLogin(true);
    } else {
      setUser([]);
      setIsLogin(false);
    }
  });

  const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithRedirect(provider)
      .then((result) => {
        setUser(result?.user?.multiFactor?.user);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const signOutGoogle = () => {
    auth
      .signOut(auth)
      .then(() => {
        console.log(user);
        // Sign-out successful.
        setUser([]);
        console.log("çıktı");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const values = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    signWithGoogle,
    signOutGoogle,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { useAuth, UserProvider };
