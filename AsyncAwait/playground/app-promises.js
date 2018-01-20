const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 86
    },{
        id: 2,
        schoolId: 999,
        grade: 100
    },{
        id: 3,
        schoolId: 101,
        grade: 80
    }
];
const users = [
    {
        id: 1,
        name: 'Andrew',
        schoolId: 101
    },{
        id: 2,
        name: 'Brittany',
        schoolId: 999
    }
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if(user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    })
}

const getStatus = (id) => {
    let user;

    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if(grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        console.log(average);
    });
};

getUser(2).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
});

getGrades(101).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
});
