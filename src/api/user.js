/**
 * @desc Create a user.
 * @param {Object} user
 * @param {String} user.username
 * @returns {Object} response
 * @throws {Error}
 */
async function createUser(user) {
    const url = 'https://gl-interview.azurewebsites.net/users';

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.status === 200) {
        return data;
    }

    throw Error(data.detail);
}

/**
 * @desc Gets user by id.
 * @param {Number} id
 * @returns {Object|null} user
 * @throws {Error}
 */
async function getUser(id) {
    const url = 'https://gl-interview.azurewebsites.net/users';

    const response = await fetch(url);
    const users = await response.json();

    return users.find((user) => user.id === id);
}

/**
 * @desc Gets users.
 * @returns {Array} users
 * @throws {Error}
 */
async function getUsers() {
    const url = 'https://gl-interview.azurewebsites.net/users';

    const response = await fetch(url);
    const users = await response.json();

    return users;
}

/**
 * @desc Whether data is a valid user.
 * @param {Object} data
 * @returns {Boolean}
 * @throws {Error}
 */
function isValidUser(data) {
    return !!(data && data.id && data.username);
}

export { createUser, getUser, getUsers, isValidUser };
