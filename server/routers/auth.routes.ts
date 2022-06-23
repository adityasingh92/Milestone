import router from "express";

// controllers import
import {registerUser, login, changePassword} from '../controllers/auth';

const route = router.Router();

route.post('/user/register', registerUser);
route.post('/user/login', login);
route.post('/user/update-password', changePassword);

export default route;