let ar = [1, 2, 3, 4, 5];
let ar2 = [1, 6, 3, 8, 5, 2, 7, 4];
let countrys = ['isIsrael', 'isSpain', 'Italy', 'isCanada'];
let prefix = 'is';

console.log("/****************************task 1*****************************/");

function minMax(numbers) {
    return numbers.reduce((ab, element) => {
        if (element < ab[0]) {
            ab[0] = element;
        }
        else if (element > ab[1]) {

            ab[1] = element;
        }
        return ab;

    }, [numbers[0], numbers[0]]);

}
console.log(minMax(ar));

console.log("/****************************task 2*****************************/");

function deleteWithPrefix(countrys, prefix) {
    return countrys.filter(element => !element.startsWith(prefix));
}
console.log(`input: ${countrys}, prefix: ${prefix} output: ${deleteWithPrefix(countrys, prefix)}`);



console.log("/****************************task 3*****************************/");

function getSortedEvenOdd(numbers) {
    numbers.sort((a, b) => a % 2 == b % 2 ? (a - b) * (a % 2 ? -1 : 1) : a % 2 - b % 2);
    return numbers;
}
console.log(getSortedEvenOdd(ar2));