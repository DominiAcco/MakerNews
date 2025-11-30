import { redirect } from "next/navigation";
import { getAuthUser } from "@/services/authService";

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {
    const user = await getAuthUser();

    if (!user || user.role !== "admin") {
        redirect("/login");
    }

    return <>{children}</>;
}
