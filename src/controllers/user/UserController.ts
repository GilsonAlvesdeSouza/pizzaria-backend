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
    const user_id = req.user_id;
    const detail = await userServices.detailUser(user_id);
    return res.json(detail);
  }
}

export { UserController };
