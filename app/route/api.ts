import express from 'express';
import { authorize, checkAccess } from '../middleware/authorization';
import { addCars, getCars, getCarskById ,deleteCars , updateCars} from "../controller/car-controller";
import uploadOnMemory from "../middleware/multerMemory";
import { registerAdmin, whoAmI } from '../controller/user-controllers';
export const apiRouter = express.Router()
apiRouter.use(authorize)


// API USER
apiRouter.get("/api/v1/users/me" , whoAmI)
apiRouter.post("/api/v1/register-admin", checkAccess(['super-admin']) , registerAdmin)

// CAR API
apiRouter.delete("/api/v1/cars/:id", checkAccess(['super-admin', 'admin']), deleteCars);
apiRouter.post("/api/v1/cars", checkAccess(['super-admin', 'admin']) ,uploadOnMemory.single('image_url'), addCars)
apiRouter.put("/api/v1/cars/:id", checkAccess(['super-admin', 'admin']) , uploadOnMemory.single('image_url'), updateCars)