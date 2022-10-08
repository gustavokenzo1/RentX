import { AppError } from "@shared/errors/AppError"
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "B00B5",
      email: "user@test.com",
      name: "Test user",
      password: "mysecretpassword"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate a non-existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fake@user.com",
        password: "fake_password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate an user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        driver_license: "asdasdsadsa",
        email: "example@mail.com",
        name: "asdasdasda",
        password: "asdasdasad"
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: "example@mail.com",
        password: "incorrect password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})