import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password, driver_license }: ICreateUsersDTO) {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const hashedPassword = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    })
  }
}

export { CreateUserUseCase }