import { AuthProvider } from "@/components/providers/AuthProvider";

export default function Layout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}