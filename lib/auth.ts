import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_super_seguro_aqui';
const JWT_EXPIRES_IN = '7d';

// Converter a string secret para Uint8Array
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export class AuthService {
  static async generateToken(payload: TokenPayload): Promise<string> {
    console.log("🔐 Gerando token para:", payload.email);
    
    const jwt = await new SignJWT({
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(JWT_EXPIRES_IN)
      .setIssuedAt()
      .setSubject(payload.userId)
      .sign(secretKey);

    console.log("✅ Token gerado com sucesso");
    return jwt;
  }

  static async verifyToken(token: string): Promise<TokenPayload> {
    try {
      console.log("🔐 Verificando token...");
      
      const { payload } = await jwtVerify(token, secretKey);
      
      console.log("✅ Token verificado, payload:", payload);
      
      // Fazer type assertion
      const tokenPayload = {
        userId: (payload as any).userId,
        email: (payload as any).email,
        name: (payload as any).name,
        role: (payload as any).role
      };

      // Validar propriedades
      if (!tokenPayload.userId || !tokenPayload.email) {
        throw new Error('Token payload incompleto');
      }

      return tokenPayload;
    } catch (error: any) {
      console.error("❌ Erro na verificação do token:", error.message);
      throw new Error('Token inválido');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return hash(password, 12);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}