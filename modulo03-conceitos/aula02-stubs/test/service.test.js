import { it, describe, expect, beforeEach, jest } from "@jest/globals";
import fs from "node:fs/promises";
import Service from "../src/service";

describe("#Service Test Suite", () => {
  let __service;
  beforeEach(() => {
    __service = new Service({
      filename: "./testfile.ndjson"
    });
  });

  describe("#read", () => {
    it("should return an empty array if the file is empty", async () => {
      jest.spyOn(fs, fs.readFile.name).mockResolvedValue("");

      const result = await __service.read();

      expect(result).toEqual([]);
    });

    it("should return an array of users if the file is not empty", async () => {
      const mockReturn = [
        {
          username: "dayvsonl",
          password: "pass1",
          createdAt: new Date().toISOString()
        }
      ];

      const fileContents = mockReturn.map((item) => JSON.stringify(item).concat("\n")).join("\n");

      jest.spyOn(fs, "readFile").mockResolvedValue(fileContents);

      const result = await __service.read();

      const expected = mockReturn.map(({ password, ...rest }) => ({ ...rest }));

      expect(result).toEqual(expected);
    });

    it("should throw an error if the file is not found", async () => {
      jest.spyOn(fs, "readFile").mockRejectedValue([]);

      const result = await __service.read();

      expect(result).toEqual([]);
    });
  });
});
