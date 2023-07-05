import { useContext } from "react";

import { Auth } from "../context/AuthContext";

export function useAuth() {
  const auth = useContext(Auth);
  return auth;
}
