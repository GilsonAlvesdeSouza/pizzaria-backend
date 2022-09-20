import { Request, Response } from "express";
import { UserService } from "../../services/user/UserServices";

const userServices = new UserService();
class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await userServices.save({ name, email, password });
    return res.json(user);
  }

  async detailUser(req: Request, res: Response) {
    const detail = await userServices.detailUser();
    return res.json(detail);
  }
}

export { UserController };
