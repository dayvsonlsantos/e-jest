import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { mapPerson } from "../src/person.js";

describe("Person Test Suit", () => {
  describe("happy path", () => {
    it("should map person", () => {
      const personStr = '{"name": "dayvson", "age": 23}';
      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: "dayvson",
        age: 23,
        createdAt: expect.any(Date)
      });
    });
  });

  describe("what coverage does not cover", () => {
    it("should not map person given invalid JSON string", () => {
      const personStr = '{"name": ';

      expect(() => mapPerson(personStr)).toThrow("Unexpected end of JSON input");
    });

    it("should not map person given invalid JSON data", () => {
      const personStr = "{}";
      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      });
    });
  });
});
