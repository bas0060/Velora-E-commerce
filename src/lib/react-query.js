import { QueryClient } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});