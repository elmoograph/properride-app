import { useEffect, useState } from "react";

import { AuthUser } from "../types/auth.types";
import { getCurrentUser } from "../repositories/auth.repository";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    }

    loadUser();
  }, []);

  return {
    user,
  };
}
