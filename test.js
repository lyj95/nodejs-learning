// file system 모듈
const fs = require('fs');

let data = fs.readFileSync('input.txt');
console.log(data.toString());


let Users =[
    {name: '일', age: 25},
    {name: '이', age: 23}
]

// 배열에 데이터 추가할 때 -> push()
Users.push({name: '삼', age: 3});

console.log(Users[2].age);

// 배열에 함수도 추가 가능
let fun = function(a, b){
    return a+b+'함수추가';
}

Users.push(fun);

console.log(Users[3](4,5));

