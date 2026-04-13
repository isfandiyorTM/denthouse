import { useState } from "react";
import { ADMIN_PASSWORD } from "../data/constants";

export function useAdmin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError]       = useState("");

  function login(password) {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
      return true;
    }
    setError("Incorrect password. Try: denthouse2024");
    return false;
  }

  function logout() {
    setLoggedIn(false);
    setError("");
  }

  return { loggedIn, error, login, logout };
}
