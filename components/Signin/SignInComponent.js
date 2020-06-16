import React, { useContext } from "react";
import { useAuth } from "../../util/auth.js";
import firebase from "../../util/firebase";
import router from "next/router";

export default () => {
  const auth = useAuth();
  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    auth
      .signInWithPopup(authProvider)
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  };
  return (
    <button onClick={() => authenticate("Google")}>
      Iniciar sesión con Google
    </button>
  );
};
