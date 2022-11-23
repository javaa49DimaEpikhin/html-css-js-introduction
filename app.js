function getOccurrences(word) {
    let wordAr = Array.from(word);
    const occurrences = {};
    wordAr.forEach(element => {
        if (occurrences[element]) {
            occurrences[element]++;
        } else {
            occurrences[element] = 1;
        }
    });
    return occurrences;
}

function isAnagram(str1, str2) {
    if (str1.length != str2.length) {
        return false;
    }
    console.log(str1, str2);
    let occurrences1 = getOccurrences(str1.toLowerCase());
    console.log('BEFORE', occurrences1);
    let arr2 = Array.from(str2.toLowerCase());
    for (let i = 0; i < arr2.length; i++) {
        if (occurrences1[arr2[i]] == undefined) {
            console.log('AFTER', occurrences1);
            return false;
        }

        if (--occurrences1[arr2[i]] < 0) {
            console.log('AFTER', occurrences1);
            return false;
        }
    }
    console.log('AFTER', occurrences1);
    return true;


}
const str1 = 'yellow';
const str2 = 'weloly';
console.log(isAnagram(str1, str2));

console.log('*********************************************************************');

const word = 'Yellow';
//TRUE
console.log('1. ', word, 'weloly', isAnagram(word, 'weloly'));
console.log('2. ', word, 'leloyw', isAnagram(word, 'leloyw'));

console.log('*********************************************************************');
//FALSE
console.log('3. ', word, 'weloll', isAnagram(word, 'weloll'));
console.log('4. ', word, 'leloy', isAnagram(word, 'leloy'));

