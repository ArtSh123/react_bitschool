// const obj = {
//     a: 11,
//     b: {
//         k: 3,
//         k1: {
//             f: 4,
//             h: [
//                 1, 2, 3
//             ]
//         }
//     }
// };
// const copy1 = Object.assign({}, obj);
// const copy2 = {...obj};
// // deep copy
// const copy3 = JSON.parse(JSON.stringify(obj));

// // copy1.a = 111;
// copy3.b.k = 4;
// copy3.b.k1.h.pop();

// console.log(obj);
// console.log(copy3);


// import log, { kk as kkk, kk1 } from "./module1.js";

// log();
// kkk();
// kk1();

// const getData = (url) => 
//     new Promise((resolve, reject) => 
//         fetch(url)
//             .then(response => response.json())
//             .then(json => resolve(json))
//             .catch(error => reject(error))
//     )

// getData('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => console.log(response))
//     .catch(error => console.log(error.message))

// const asyncFn = async () => {
//     return 'Success';
//     // throw new Error('Some error');
// }

// asyncFn()
//     .then(data => console.log(data))
//     .catch(err => console.log(err.message))

const getData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    
    return json;
}

const url = 'https://jsonplaceholder.typicode.com/todos/1';

try {
    const data = await getData(url);

    console.log(data);
} catch (err) {
    console.log(err.message);
}