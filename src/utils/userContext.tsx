"use client";

import { createContext, useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";

export const UserContext = createContext<{
  data: string;
  changeCurrentUser: (value: string) => void;
}>({
  data: "",
  changeCurrentUser(value) {},
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const localData: any = getLocalStorage("user");
    setUser(localData.currentUser);
  }, []);

  useEffect(() => {
    const localData: any = getLocalStorage("user");
    saveLocalStorage("user", { ...localData, currentUser: user });
  }, [user]);

  const changeCurrentUser = (value: string) => {
    setUser(value);
  };

  return (
    <UserContext.Provider value={{ data: user, changeCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
