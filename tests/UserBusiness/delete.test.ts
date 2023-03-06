import { UserBusiness } from "../../src/business/UserBusiness";
import { DeleteUserInputDTO } from "../../src/dtos/userDTO";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("delete", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("delete requer token", async () => {
    expect.assertions(1);

    const input = {
      idToDelete: "id-mock",
      token: 0,
    };

    try {
      await userBusiness.deleteUser(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("requer token");
      }
    }
  });

  test("delete token invalido", async () => {
    expect.assertions(1);

    const input: DeleteUserInputDTO = {
      idToDelete: "id-mock",
      token: "aaaaa",
    };

    try {
      await userBusiness.deleteUser(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("token inválido");
      }
    }
  });

  test("delete apenas admin deleta conta", async () => {
    expect.assertions(1);

    const input: DeleteUserInputDTO = {
      idToDelete: "id-mock",
      token: "token-mock-normal",
    };

    try {
      await userBusiness.deleteUser(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("somente admins podem deletar contas");
      }
    }
  });

  test("delete error id não existe", async () => {

    const input: DeleteUserInputDTO = {
      idToDelete: "u099",
      token: "token-mock-admin",
    };

    expect(async () => {
        const response = await userBusiness.deleteUser(input)
        console.log(response)
    }).rejects.toThrow("'id' não existe")

  });
});
