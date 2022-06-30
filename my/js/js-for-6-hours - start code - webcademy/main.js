/* • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
• • • • • JavaScript необходимые основы для начинающих • • • • •
• • • • • • • • • • • • практический курс • • • • • • • • • • •
• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • */
// ================== 0. Настройка окружения ===============
/*
- Установка редактора
- Установка плагина liveServer
- Моя тема Ayu
- Создание проекта
*/

// =================== 1. Подключение ===================
/*
- index.html
- файл main.js
- тег <script src></script>
- Запуск в liveServer
- команда console.log для вывода информации в консоль браузера
- комментарии
*/
// let h2 = document.querySelector('h2');
// h2.classList.remove('green');
// h2.classList.add('red');

// const div = document.getElementById('elementsContainer');
// const h1 = document.createElement('h1');
// h1.innerText = 'New Header';
// div.append(h1);
// console.log(div, h1)

// const mainHeader = document.querySelector('header');
// const headerCopy = mainHeader.cloneNode();
// const headerCopyWithContent = mainHeader.cloneNode(true);
// div.append(headerCopy);
// div.append(headerCopyWithContent);

// const newElement = `
//     <h2>H@@@@@@@</h2>
// `;
// const newElement1 = `
//     <h2>H1111111111111</h2>
// `;

// div.insertAdjacentHTML('beforebegin', newElement1);

// div.insertAdjacentHTML('beforeend', newElement)


// Todo list

// const list = document.querySelector('#todo-list');
// const form = document.querySelector('#todo-form');
// const input = document.querySelector('#todo-input');

// form.addEventListener('submit', formHandler);

// function formHandler(e) {
//     e.preventDefault();

//     const inpText = input.value;

//     // const newTask = `
//     //     <li>${inpText}</li>
//     // `;
//     // list.insertAdjacentHTML('beforeend', newTask);

//     const newTask = document.createElement('li');
//     newTask.innerText = inpText;
    
//     const delBtn = document.createElement('button');
//     delBtn.setAttribute('role', 'button');
//     // delBtn.classList.add('delBtn');
//     delBtn.innerText = 'Delete';
//     delBtn.style['margin-left'] = '15px';

//     newTask.append(delBtn);

//     delBtn.addEventListener('click', function() {
//         this.closest('li').remove();
//     });

//     list.append(newTask);

//     input.value = '';
//     input.focus();
// }


// Timer

// const startBtn = document.getElementById('start');
// const pauseBtn = document.getElementById('pause');
// const resetBtn = document.getElementById('reset');
// const counter = document.getElementById('counter');
// let counterNum = 0;
// let timerID;

// startBtn.onclick = function() {
//     timerID = setInterval(function() {
//         counterNum++;
//         counter.innerText = counterNum;
//     }, 1000)
// };
// pauseBtn.onclick = function pauseHandler() {
//     clearInterval(timerID);
// }
// resetBtn.onclick = function() {
//     clearInterval(timerID);
//     counterNum = 0;
//     counter.innerText = counterNum;
// }

// Plan to trip with Promise

// checkRooms()
//     .then(checkTickets)
//     .then(success)
//     .catch(failed);

// function checkRooms() {
//     return new Promise((resolve, reject) => {
//         console.log('-check rooms-');

//         const isAvailableRooms = true;
        
//         if(isAvailableRooms) {
//             const message = 'Rooms available';
//             resolve(message);
//         } else {
//             const message = 'No free rooms';
//             reject(message);
//         }
        
//     })
// }
// function checkTickets(message) {
//     return new Promise(function(resolve, reject) {
//         console.log(message);
//         console.log('--check tickets--');

//         const isTicketsAvailable = true;

//         if(isTicketsAvailable) {
//             const message = 'Tickets available';
//             resolve(message);
//         } else {
//             const message = 'No free tickets';
//             reject(message);
//         }
//     })
    
// }
// function failed(message) {
//     console.log(message);
//     console.log('---Cancel trip---');
// }
// function success(message) {
//     console.log(message);
//     console.log('>>>>>>> Go >>>>>>');
// }


// Async functions

// function promiseFunction() {
//     return new Promise((resolve, reject) => {
//         setTimeout(function() {
//             const result = false;
            
//             if(result) {
//                 resolve('Done!');
//             } else {
//                 reject('Fail!');
//             }
//         }, 500)
//     })
// }
// // console.log(promiseFunction());

// async function startPromise() {
//     try {
//         const result = await promiseFunction();
//         console.log(result);
//     } catch(err) {
//         console.log(err);
//     }
// }

// startPromise();

// function checkRooms() {
//     return new Promise((resolve, reject) => {
//         console.log('-check rooms-');

//         const isAvailableRooms = true;
        
//         if(isAvailableRooms) {
//             const message = 'Rooms available';
//             resolve(message);
//         } else {
//             const message = 'No free rooms';
//             reject(message);
//         }
        
//     })
// }
// function checkTickets(message) {
//     return new Promise(function(resolve, reject) {
//         console.log(message);
//         console.log('--check tickets--');

//         const isTicketsAvailable = true;

//         if(isTicketsAvailable) {
//             const message = 'Tickets available';
//             resolve(message);
//         } else {
//             const message = 'No free tickets';
//             reject(message);
//         }
//     })
    
// }
// function failed(message) {
//     console.log(message);
//     console.log('---Cancel trip---');
// }
// function success(message) {
//     console.log(message);
//     console.log('>>>>>>> Go >>>>>>');
// }

// async function checkVacation() {
//     try {
//         const roomsResult = await checkRooms();
//         const ticketsResult = await checkTickets(roomsResult);

//         success(ticketsResult);

//     } catch(err) {
//         failed(err);
//     }
// }

// checkVacation();

// fetch api promise get Currencies
// https://www.cbr-xml-daily.ru

// const response = fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((response) => {
//     return response.json();
// }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

async function getCurrencies() {
    try {
        const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
        const response = await fetch(url);
        const data = await response.json();

        const usdRate = data.Valute.USD.Value.toFixed(2);
        const eurRate = data.Valute.EUR.Value.toFixed(2);
        const amdRate = data.Valute.AMD.Value.toFixed(2);

        console.log(usdRate, eurRate, data.Valute.AMD)

        document.querySelector('#usd').innerText = usdRate;
        document.querySelector('#eur').innerText = eurRate;

    } catch(err) {
        console.log(err);
    }
}
getCurrencies();