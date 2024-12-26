// shared/providers/QueryProvider.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Buat instance QueryClient
const queryClient = new QueryClient();

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
