import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthScreen } from "./Components/Auth/AuthScreen";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./Components/Auth/RequireAuth";
import PersistLogin from "./Components/Auth/PersistLogin";
import { QueryClient, QueryClientProvider } from "react-query";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<AuthScreen />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/*" element={<App />} />
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);
