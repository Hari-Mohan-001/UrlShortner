import { UserContext } from "@/context/userContext";

import { useContext } from "react";

const useAuth = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("failed");
  }
  return userContext;
};

export default useAuth;
