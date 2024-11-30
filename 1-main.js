import dbClient from './utils/db.mjs';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(async () => {
                i += 1;
                if (i >= 10) {
                    reject('Connection timeout');
                } else if (!await dbClient.isAlive()) {
                    repeatFct();
                } else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    });
};

(async () => {
    console.log(await dbClient.isAlive()); // Will now return true or false depending on MongoDB connection status
    await waitConnection();
    console.log(await dbClient.isAlive()); // This should print true once the connection is established
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();
