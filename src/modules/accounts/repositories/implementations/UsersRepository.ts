import { ICreateUsersDTO } from "modules/accounts/dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, email, driver_license, password }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({ name, email, driver_license, password })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      email
    })

    return user;
  }
}

export { UsersRepository }