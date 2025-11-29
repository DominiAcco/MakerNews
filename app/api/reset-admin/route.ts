// app/api/reset-admin/route.ts
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { AuthService } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    
    // Deletar admin existente
    await Admin.deleteOne({ email: "teste2@gmail.com" });
    
    // Criar novo admin com senha conhecida
    const hashedPassword = await AuthService.hashPassword("Senha123!");
    const admin = await Admin.create({
      name: "Teste Admin",
      email: "teste2@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    return Response.json({
      success: true,
      message: "Admin resetado com sucesso",
      admin: {
        id: admin._id,
        email: admin.email,
        password: "Senha123!" // Mostrar a senha para teste
      }
    });
  } catch (error) {
    console.error("Erro ao resetar admin:", error);
    return Response.json({ error: "Erro ao resetar admin" }, { status: 500 });
  }
}