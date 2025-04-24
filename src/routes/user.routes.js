import {Router} from "express";
import { logoutUser, registerUser,loginUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";


//in post request shoud be post
router.route("/register").post(
    //middleware before registerUser //inject middleware
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
//konsa method run krega inside post
router.route("/login").post(loginUser)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser) //verifyJwt middleware


export default router;