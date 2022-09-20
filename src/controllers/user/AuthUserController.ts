import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserServices";

class AuthUserController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    const auth = await authUserService.auth({ email, password });
    return res.json(auth);
  }
}

export { AuthUserController };
