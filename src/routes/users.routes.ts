import { Router } from "express";
import multer from "multer";

import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import uploadConfig from '../config/upload'

const usersRouter  = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRouter.post("/", createUserController.handle)
usersRouter.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { usersRouter }