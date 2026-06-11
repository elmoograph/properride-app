import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "./AuthProvider";

import { getProfile } from "@/features/profile/repositories/profile.repository";

import { ProfileContextType } from "@/features/profile/types/profile-context.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshProfile();
  }, [user?.id]);

  async function refreshProfile() {
    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const data = await getProfile(user.id);

    setProfile(data);

    setLoading(false);
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }

  return context;
}
