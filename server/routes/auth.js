const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  deleteUser,
} = require("../controllers/userController");
// Doctor controller
const { 
  loginDoctor, 
  registerDoctor, 
  deleteDoctor,
  getAllDoctors,
  doctor_setAvatar
} = require("../controllers/doctorController")

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/allusers", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.delete("/users/:id",deleteUser)

// Docotr routes

router.post("/doctor-login",loginDoctor);
router.post("/doctor-register",registerDoctor);
router.delete("/doctor-delete",deleteDoctor);
router.get("/doctor-getall",getAllDoctors);
router.post("/doctor-setavatar/:id", doctor_setAvatar);


module.exports = router;
