import { describe, expect, it, jest } from "@jest/globals";
import Person from "../src/person.js";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("should throw an error if name is not provided", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.213.321-65"
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error("name is required"));
    });

    it("show throw an error if cpf is not provided", () => {
      const mockInvalidPerson = {
        name: "Joao da Silva",
        cpf: ""
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error("cpf is required"));
    });

    it("should not throw an error if name and cpf are provided", () => {
      const mockValidPerson = {
        name: "Joao da Silva",
        cpf: "123.213.321-65"
      };

      expect(() => Person.validate(mockValidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("should return a format person", () => {
      // Arrange = Prepara
      const mockPerson = {
        cpf: "123.213.321-65",
        name: "João da Silva"
      };

      // Act = Executa
      const mockFormatedPerson = Person.format(mockPerson);

      // Assert = Valida
      const expected = {
        cpf: "12321332165",
        name: "João",
        lastName: "da Silva"
      };

      expect(mockFormatedPerson).toStrictEqual(expected);
    });
  });

  describe("#save", () => {
    it("should throw an error if person is not valid", () => {
      // Arrange
      const mockInvalidPerson = {
        name: "Joao",
        lastName: "da Silva"
      };

      // Assert
      expect(() => Person.save(mockInvalidPerson)).toThrow(new Error(`person is not valid: ${JSON.stringify(mockInvalidPerson)}`));
    });

    it("should not throw an error if person is valid", () => {
      // Arrange
      const mockValidPerson = {
        name: "Joao",
        lastName: "da Silva",
        cpf: "12321332165"
      };

      console.log = jest.fn();

      expect(() => Person.save(mockValidPerson)).not.toThrow();
      expect(console.log).toHaveBeenCalledWith("registrado com sucesso");
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      // Não retestar o que já foi testado
      // Logo n preciso do validate e format
      jest.spyOn(Person, Person.validate.name).mockImplementation();

      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: "Joao",
        lastName: "da Silva",
        cpf: "12321332165"
      });

      jest.spyOn(Person, Person.save.name).mockReturnValue();

      // expect(() => Person.process()).not.toThrow();
      // Act
      const result = Person.process({
        name: "Joao",
        lastName: "da Silva",
        cpf: "12321332165"
      });

      const expected = "ok";

      expect(result).toStrictEqual(expected);
    });
  });
});
