// Promises:
// Structure:
readFile('config.json')
    .then(...)
    .then(...)
    .catch(...);

// simple example:
sleep(1000)
    .then(() => {
        console.log('one');
        return sleep(1000);
    })
    .then(() => {
        console.log('two');
        return sleep(1000);
    })
    then(() => {
        console.log('three');
    });
/*
 * Complex example:
 *  -> fetchJSON, when done fetch all friends of user
 *  -> then resolve promise
 *      -> or catch error
 */
fetchJSON('/user-profile')
    .then((user) => {
        return fetchJSON(`/user/${user.id}/friends`)
    })
    .then((firendsId) => {
        let promise = firendsId.map((id) => {
            return fetchJSON(`/users/${id}`);
        });

        return Promise.all(promise);
    })
    .then((friends) => {
        console.log(friends);
    })
    .catch(error => {
        console.log(error);
    })
/*
 * GENERATOR FUNCTION: Pause one function while we are waiting for some process to finish 
 */
function* generatorFunction() {
    let result = fetch('/user');
    // pause execution by yielding
    yield result;
    // Later something caused us to resume
    console.log('were back');
}
/*
 * ASYNC/AWAIT: Pause the function while a promise is resolving
 */
async function getUsers() {
    // the right side with await always has to be a promise
    let results = await fetchJSON('/users');
    console.log(results);
}
// read a file with asyn/await:
async function readConfig() {
    try {
        let file = await readFile('config.json');
        let obj  = JSON.parse(file.toString());
        console.log(obj);
    } catch (error) {
        console.log(`An error occured ${error}`);
    }
}
// rewrite of the upper nested promise:
async function getUserFriends() {
    let user     = await fetchJSON('/users/me');
    let friendId = await fetchJSON(`/friends/${user.id}`);
    let friendsArray = friendId.map((id) => {
        return fetchJSON(`/users/${id}`);
    });

    let friends = Promise.all(friendsArray);
    console.log(friends);
}

let promise = getUserFriends();
// can also be used for a command line tool, by makeing a readline function that returns a promis:
async function getUserInfo() {
    let name = await readLine('What is your name? ');
    console.log(`your name is: ${name}`);

    let age = await readLine('What is your age? ')
    console.log(`your age is: ${age}`);

    console.log('Thank you');
    process.exit();
}