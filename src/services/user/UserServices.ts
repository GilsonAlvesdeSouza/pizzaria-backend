import prismaClient from "../../prisma";
import validator from "validator";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async save({ name, email, password }: UserRequest) {
    if (!validator.isEmail(email)) {
      throw new Error("Please provide a valid email");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User Already exists");
    }

    const passwordHash = await hash(password, 8);

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return { newUser };
  }

  async detailUser() {
    return { ok: true };
  }
}

export { UserService };
