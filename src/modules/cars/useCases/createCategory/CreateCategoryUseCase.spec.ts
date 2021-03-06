import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import AppError from "@shared/errors/AppError";

describe("Create category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Teste",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with exists name", async () => {
    try {
      const category = {
        name: "Category Test",
        description: "Category description Teste",
      };

      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
