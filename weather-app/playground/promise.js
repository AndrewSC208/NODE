// let somePromise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve('Hey, it worked'); 
//     // }, 2000);
//     setTimeout(() => {
//         reject('Hey, it faild');
//     }, 2000)
    
// });
// // Only gets called if the prmose is resolved, and with the data that was returned from the asyn action.
// somePromise.then((data) => {
//     console.log('Success:', data);
// }, (error) => {
//     console.log('Fail: ', error);
// });

// Another more complex example: passing data to prmise and chaining
const asyncAdd = (a, b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Args must be numbers');
            }
        }, 1500)
    })
}

asyncAdd(45, 50).then((res) => {
    console.log('sum 0: ', res)
    const someData = 8888;
    return asyncAdd(res, someData);
}).then((res) => {
    console.log('sum 1: ', res)
    const someMoreData = 555;
    return asyncAdd(res, someMoreData);
}).then((res) => {
    console.log('sum 2: ', res);
}).catch((err) => {
    console.log(err);
});