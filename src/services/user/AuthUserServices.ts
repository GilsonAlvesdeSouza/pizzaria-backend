import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async auth({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) {
      throw new Error("User/password incorrect.");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect.");
    }

		

    return { ok: true };
  }
}

export { AuthUserService };
