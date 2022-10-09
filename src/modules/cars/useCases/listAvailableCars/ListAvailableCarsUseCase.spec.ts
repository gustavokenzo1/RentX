import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "brand": "Car 1",
      "category_id": "category_id",
      "daily_rate": 140,
      "description": "Car 1 description",
      "fine_amount": 100,
      "license_plate": "ABC-1234",
      "name": "Audi A4"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaliable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "brand": "Car Brand",
      "category_id": "category_id",
      "daily_rate": 140,
      "description": "Car 1 description",
      "fine_amount": 100,
      "license_plate": "ABC-1234",
      "name": "Audi A4"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "Audi A4"
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaliable cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "brand": "Car Brand",
      "category_id": "category_id",
      "daily_rate": 140,
      "description": "Car 1 description",
      "fine_amount": 100,
      "license_plate": "ABC-1234",
      "name": "Audi A4"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car Brand"
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all avaliable cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "brand": "Car Brand",
      "category_id": "12345",
      "daily_rate": 140,
      "description": "Car 1 description",
      "fine_amount": 100,
      "license_plate": "ABC-1234",
      "name": "Audi A4"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    })

    expect(cars).toEqual([car])
  })
})