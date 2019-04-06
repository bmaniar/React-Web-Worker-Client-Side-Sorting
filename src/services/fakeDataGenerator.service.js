import faker from 'faker';

export function fetchUsers() {
    const users = [];

    for (let i = 0; i < 25000; i++) {
        let id = faker.random.number();
        let name = faker.name.findName();
        let email = faker.internet.email();
        let user = {
            id,
            name,
            email
        };
        users.push(user);
    }
    return Promise.resolve(users);
}