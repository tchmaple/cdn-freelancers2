var faker = require('faker');

var database = { users: []};

for (var i = 1; i<= 20; i++) {
  database.users.push({
    id: i,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    skillsets: faker.lorem.words(),
    hobby: faker.lorem.words()
  });
}

console.log(JSON.stringify(database));