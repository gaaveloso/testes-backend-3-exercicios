import { UserBusiness } from "../../src/business/UserBusiness";
import { DeleteUserInputDTO, GetByIdInputDTO } from "../../src/dtos/userDTO";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("getById", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("id não existe", async () => {

    const input: GetByIdInputDTO = {
        idToFind: "u099",
    };

    expect(async () => {
        const response = await userBusiness.getById(input)
        console.log(response)
    }).rejects.toThrow("'id' não existe")

  });

  test("new User error", async () => {
    
  })
});
