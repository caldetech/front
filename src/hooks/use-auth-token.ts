import { useAuth } from "@/contexts/AuthContext";

const useAuthToken = (): [string | null, (token: string | null) => void] => {
  const { token, setToken } = useAuth();
  return [token, setToken];
};

export default useAuthToken;
