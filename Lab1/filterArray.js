/**
 * Write the necessary Node script to make this code work for all arrays: 
 * [1,2,3,4,5,6,7,8].even(); // [2,4,6,8] 
 * [1,2,3,4,5,6,7,8].odd(); // [1,3,5,7] Test your code in Node.JS CLI
 */
//[1,2,3,4,5,6,7,8].even(); // [2,4,6,8] 
Array.prototype.filterEvenNum = function () {
    return this.filter(num => num % 2 === 0);
}
let myEven = [1, 2, 3, 4, 5, 6, 7, 8].filterEvenNum();
console.log(myEven);

//[1,2,3,4,5,6,7,8].odd(); // [1,3,5,7]
Array.prototype.filterOddNum = function () {
    return this.filter(num => num % 2 !== 0);
}
let myOdd = [1, 2, 3, 4, 5, 6, 7, 8].filterOddNum();
console.log(myOdd);


