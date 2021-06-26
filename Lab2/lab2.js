/**
 * Create a simple Node script that converts 'www.miu.edu' domain name to 
 * the equivalent IP address. (Search and learn 'dns' module, resolve4)
 */
// const dns = require('dns');
// dns.lookup('www.miu.edu', (error, value) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(value);
// });

const dns = require('dns');
dns.resolve4('www.miu.edu', (error, value) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(value);
});
