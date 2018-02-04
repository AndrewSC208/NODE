const fs = require('fs');
const { exec } = require('child_process');
/*
    steps for automatic building client app, and server

    1. build client dir
    2. move /client/build to public folder
    3. Somehow register index.html on index.hbs?
*/
/*
 *  RUN THE CLIENT BUILD SCRIPT IN CREATE REACT SCRIPTS
 */
const compileClient = () => {
    return new Promise((resolve, reject) => {
        // exec('', (err, stdout, stderr) => {
        //     if (err) {
        //         // node couldn't execute the command
        //         return;
        //     }
    });
};
/*
 *  MOVE CLIENT BUNDLE SERVER PUBLIC SERVER  DIR FOR DEPLOYMENT
 */
const moveFolder = () => {
    return new Promise((resolve, reject) => {

        const dirOld = __dirname + '/client/build'
        const dirNew = __dirname + '/server/public'
        
        fs.rename(dirOld, dirNew, (data) => {
            console.log(data);
            resolve(data);
        });
    });
};

const blend = () => {
    return new Promise((resolve, reject) => {

    });
}

async function build() {
    // const compiledClient = await compileClient();
    const mvToServer = await moveFolder();
    // const blend = await blend();
    // return true;
}

build();
// const built = build().then();