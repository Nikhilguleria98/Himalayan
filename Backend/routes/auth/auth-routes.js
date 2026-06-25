import express from "express"
import {
  loginUser,
  loginAdmin,
  registerUser,
  logoutUser,
  authMiddleware,
  updateProfile,
} from "../../controllers/auth/auth-controller.js"
import User from "../../models/User.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/admin-login', loginAdmin)
router.post('/logout', logoutUser)

router.put("/update-profile", authMiddleware, updateProfile)

router.get('/check-auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "Authenticated user!",
            user
        })
    } catch (e) {
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
})

export default router
