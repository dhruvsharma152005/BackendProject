import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()


//in post request shoud be post
router.route("/register").post(registerUser)



export default router