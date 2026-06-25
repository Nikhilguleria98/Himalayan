import express from "express"
import {loginUser, loginAdmin, registerUser, verifyOTP, resendOTP, logoutUser, authMiddleware} from "../../controllers/auth/auth-controller.js"


const router = express.Router()

router.post('/register',registerUser)
router.post('/verify-otp',verifyOTP)
router.post('/resend-otp',resendOTP)
router.post('/login',loginUser)
router.post('/admin-login',loginAdmin)
router.post('/logout',logoutUser)

router.get('/check-auth',authMiddleware,(req,res)=> {
    const user = req.user;
    res.status(200).json({
        success : true,
        message : "Authenticated user!",
        user
    })
})

export default router
