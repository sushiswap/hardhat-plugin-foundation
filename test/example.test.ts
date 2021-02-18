import { assert } from "chai";
import path from "path";

import { ExampleHardhatRuntimeEnvironmentField } from "../src/ExampleHardhatRuntimeEnvironmentField";

import { resetHardhatContext } from "hardhat/plugins-testing";
import { HardhatRuntimeEnvironment } from "hardhat/types";

declare module "mocha" {
  interface Context {
    hre: HardhatRuntimeEnvironment;
  }
}

export function useEnvironment() {
  beforeEach("Loading hardhat environment", function () {
    process.chdir(path.join(__dirname, "fixture"));

    this.hre = require("hardhat");
  });

  afterEach("Resetting hardhat", function () {
    resetHardhatContext();
  });
}

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment();

    it("Should add the example field", function () {
      assert.instanceOf(
        this.hre.example,
        ExampleHardhatRuntimeEnvironmentField
      );
    });

    it("The example filed should say hello", function () {
      assert.equal(this.hre.example.sayHello(), "hello");
    });
  });

  describe("HardhatConfig extension", function () {
    useEnvironment();

    it("Should add the newPath to the config", function () {
      assert.equal(
        this.hre.config.paths.newPath,
        path.join(process.cwd(), "asd")
      );
    });
  });
});

describe("Unit tests examples", function () {
  describe("ExampleHardhatRuntimeEnvironmentField", function () {
    describe("sayHello", function () {
      it("Should say hello", function () {
        const field = new ExampleHardhatRuntimeEnvironmentField();
        assert.equal(field.sayHello(), "hello");
      });
    });
  });
});