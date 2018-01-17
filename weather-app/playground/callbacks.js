// https://maps.googleapis.com/maps/api/geocode/json?address=3782 Centre St San Diego
let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Andrew'
    }

    setTimeout(() => {
        callback(user);
    }, 1000);
};

getUser(45, (user) => {
    console.log(user);
});