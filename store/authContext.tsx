"use client";
import { createContext } from "react";

const AuthContext = createContext<{
  user?: {};
}>({
  user: {},
});

export default AuthContext;
