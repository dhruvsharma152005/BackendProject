import {Router} from "express";
import { logoutUser, registerUser,loginUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getWatchHistory } from "../controllers/user.controller.js";
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
router.route("/logout").post(verifyJWT, logoutUser) //verifyJwt middleware

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)  //verifyjwt means only logged in log hi kr paye  use badh method call
//means logged walo ke liye
router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)  //post meh saaridetail update ho jati ha

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT,upload.single("/coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/history").get(verifyJWT,getWatchHistory)
export default router;