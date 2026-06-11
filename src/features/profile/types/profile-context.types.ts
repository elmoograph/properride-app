export type ProfileContextType = {
  profile: any;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};
