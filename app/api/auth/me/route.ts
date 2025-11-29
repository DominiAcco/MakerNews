import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/admin";
import { AuthService } from "@/lib/auth";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log("🔐 API /auth/me chamada");
    
    await connectDB();

    // Obter token do cookie da request
    const token = req.cookies.get('token')?.value;

    if (!token) {
      console.log("❌ Nenhum token encontrado");
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      const payload = await AuthService.verifyToken(token); // Agora é async
      console.log("✅ Token válido, userId:", payload.userId);
      
      const admin = await Admin.findById(payload.userId).select('-password');
      
      if (!admin) {
        console.log("❌ Admin não encontrado no banco");
        return NextResponse.json({ user: null }, { status: 200 });
      }

      console.log("✅ Admin encontrado:", admin.email);
      
      return NextResponse.json({
        user: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });

    } catch (tokenError: any) {
      console.log("❌ Erro na verificação do token:", tokenError.message);
      return NextResponse.json({ user: null }, { status: 200 });
    }

  } catch (error) {
    console.error("❌ Erro interno em /auth/me:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}