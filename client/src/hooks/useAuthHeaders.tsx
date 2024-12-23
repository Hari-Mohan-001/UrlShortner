import useAuth from "./useAuth";


export const useAuthHeaders = () => {
  const { user } = useAuth();

  return {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  };
};
