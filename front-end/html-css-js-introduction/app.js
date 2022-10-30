function sumDigits(number) {
    if (number < 0) {
        number = -number;
    }
    let sum = 0;
    while (number > 0) {
        sum += number % 10;
        number = Math.floor(number / 10);
    }
    return sum;
}
console.log('sum =', sumDigits(123))
////////////////////////////////////////////
function sumDigits1(number) {

    number = Math.abs(number);
    let sum = 0;
    number = Math.trunc(number);
    do {
        let digit = number % 10;
        number = (number - digit) / 10;
        sum += digit;

    } while (number != 0);
return sum;
}
console.log('sum =', sumDigits1(123));
