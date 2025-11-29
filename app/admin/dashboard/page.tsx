
import { redirect } from "next/navigation";
import { getAuthUser } from "@/services/authService";
import DashboardClient from "./dashboard"; 

export default async function AdminPage() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    redirect("/login");
  }
  return <DashboardClient />;
}
