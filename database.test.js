const client = require("./src/database/database");

jest.setTimeout(10000);
const db = new client();
beforeAll(async () => {
  await db.connect();
});

test("create person", async () => {
  expect.assertions(1);
  const person = await db.Customer.create({
    phone: "01003237822",
    fname: "Sammy",
    mname: "Sammy",
    lname: "Davis Jr.",
    address: "sammy@example.com",
  });
  expect(person.fname).toEqual("Sammy");
});

test("get person", async () => {
  const person = await db.Customer.findAll({
    where: {
      fname: "Sammy",
    },
  });
  expect(person.fname).toEqual("Sammy");
  expect(person.lname).toEqual("Davis Jr.");
});

test("delete person", async () => {
  expect.assertions(1);
  await db.Customer.destroy({
    where: {
      fname: "Sammy",
    },
  });
  const person = await db.Customer.findByPk(1);
  expect(person).toBeNull();
});

afterAll(async () => {
  await db.end();
});
