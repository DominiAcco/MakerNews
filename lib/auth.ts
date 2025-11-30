import { getAuthUser } from "@/services/authService";

export async function requireAdmin() {
    const user = await getAuthUser();

    if (!user || user.role !== "admin") {
        return null;
    }

    return user;
}
