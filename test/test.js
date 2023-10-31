const { expect } = require("chai");

describe("SimpleStorage", function () {
  it("Should set and get a value", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    // Set a value
    const newValue = 42;
    await simpleStorage.setValue(newValue);

    // Get the value
    const storedValue = await simpleStorage.getValue();
    expect(storedValue).to.equal(newValue);
  });
});
