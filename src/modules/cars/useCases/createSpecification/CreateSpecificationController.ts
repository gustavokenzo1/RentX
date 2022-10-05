import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createSpeficiationUseCase = container.resolve(CreateSpecificationUseCase)

    await createSpeficiationUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateSpecificationController }