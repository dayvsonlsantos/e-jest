import { it, describe, expect, beforeEach, jest } from "@jest/globals";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import Service from "../src/service";

describe("#Service Test Suite", () => {
  let __service;
  const filename = "testfile.ndjson";
  const MOCKED_HASH_PWD = "2345235423534ftrgrtyh45";

  describe("#create - spies", () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
      });

      jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();

      __service = new Service({
        filename
      });
    });

    it("should call appendFile with right params", async () => {
      // AAA
      const expectedCreatedAt = new Date().toISOString();
      const input = {
        username: "user1",
        password: "pass1"
      };

      // Arrange
      jest.spyOn(Date.prototype, Date.prototype.toISOString.name).mockReturnValue(expectedCreatedAt);

      // Act
      await __service.create(input);

      // Assert
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");

      const hash = crypto.createHash("sha256");

      expect(hash.update).toHaveBeenCalledWith(input.password);
      expect(hash.digest).toHaveBeenCalledWith("hex");

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
