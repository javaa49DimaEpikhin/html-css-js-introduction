// function sumDigits(number) {
//     if (number < 0)
//         number = -number;
//     let rem = 0, sum = 0;
//     do {
//         rem = number % 10;
//         sum = sum + rem;
//         number = number / 10;

//     } while (number != 0);
//     return sum;
// }
// console.log(sumDigits(-123));


function sumDigits2(number) {
    if (number < 0)
        number = -number;
    let str = String(number);
    let sum = 0;
    for (let i = 0; i < str.length; i++) sum += Number(str[i]);
    return sum;
}
console.log(sumDigits2(-123))
