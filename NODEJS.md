## NODE JS

1. node js 다운
2. `npm init` -> npm init 로 프로젝트를 초기화
3. VScode 설치
4. `npm install express --save` -> npm 을 이용하여 express 를 package.json 에 등록과 함께 설치
5. index.js 생성 후 http://expressjs.com/ 이 페이지에 있는 기본 스크립트 작성
6. package.json에 scripts 부분에 `"start" : "node index.js"` 추가
7. `npm run start` -> index.js 실행 



### javascript 

- 변수와 상수
  - `let` – 모던한 변수 선언 키워드
  - `var` – 오래된 변수 선언 키워드. 잘 사용하지 않음 
  - `const` - `let`과 비슷하지만, 변수의 값을 변경할 수 없음

- **일치 연산자(strict equality operator) `===`를 사용하면 형 변환 없이 값을 비교할 수 있음.**

  일치 연산자는 엄격한(strict) 동등 연산자임. 자료형의 동등 여부까지 검사.

  `alert( null === undefined ); // false`

  `alert( null == undefined ); // true`

- 논리연산자

  NOT을 두 개 연달아 사용(`!!`)하면 값을 불린형으로 변환할 수 있습니다.

  ```javascript
  alert( !!"non-empty string" ); // true
  alert( !!null ); // false
  ```

  이때, 첫 번째 NOT 연산자는 피연산자로 받은 값을 불린형으로 변환한 후 이 값의 역을 반환하고, 두 번째 NOT 연산자는 첫 번째 NOT 연산자가 반환한 값의 역을 반환합니다. 이렇게 NOT을 연달아 사용하면 특정 값을 불린형으로 변환할 수 있습니다.

  참고로, 내장 함수 `Boolean`을 사용하면 `!!`을 사용한 것과 같은 결과를 도출할 수 있습니다.

  ```javascript
  alert( Boolean("non-empty string") ); // true
  alert( Boolean(null) ); // false
  ```

  `NOT` 연산자의 우선순위는 모든 논리 연산자 중에서 가장 높기 때문에 항상 `&&`나 `||` 보다 먼저 실행됩니다.



- 함수 표현식 vs 함수 선언문

  ```javascript
  // 함수 선언문
  function sum(a, b) {
      return a + b;
  }
  
  // 함수 표현식
  function sum = function(a, b) {
      return a + b;
  };
  ```

  - *함수 선언문:* 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재합니다.
  - *함수 표현식:* 함수는 표현식이나 구문 구성(syntax construct) 내부에 생성됩니다. 아래 예시에선 함수가 할당 연산자 `=`를 이용해 만든 “할당 표현식” 우측에 생성되었습니다.

  **함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성합니다. 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있습니다.**

  ```javascript
  let age = 16; 
  
  if (age < 18) {
    welcome();               // \   (실행)
                             //  |
    function welcome() {     //  |
      alert("안녕!");        //  |  함수 선언문은 함수가 선언된 블록 내
    }                        //  |  어디에서든 유효
                             //  |
    welcome();               // /   (실행)
  
  } else {
  
    function welcome() {
      alert("안녕하세요!");
    }
  }
  
  // 여기는 중괄호 밖이기 때문에
  // 중괄호 안에서 선언한 함수 선언문은 호출할 수 없음
  
  welcome(); // Error: welcome is not defined
  ```

  ```javascript
  let age = prompt("나이를 알려주세요.", 18);
  
  let welcome;
  
  if (age < 18) {
  
    welcome = function() {
      alert("안녕!");
    };
  
  } else {
  
    welcome = function() {
      alert("안녕하세요!");
    };
  
  }
  
  welcome(); // 제대로 동작
  ```

  ```javascript
  // ? 연산자를 사용하여 코드 단순화
  let age = prompt("나이를 알려주세요.", 18);
  
  let welcome = (age < 18) ?
    function() { alert("안녕!"); } :
    function() { alert("안녕하세요!"); };
  
  welcome(); // 제대로 동작
  ```

  



####  Elasticsearch와 node.js

es javascript API - Reference

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html



- 라우팅 안내서 

  https://expressjs.com/ko/guide/routing.html



@elastic/elasticsearch 모듈과 elasticsearch 모듈의 차이점 ???? 

@elastic/elasticsearch는 왜 안될까?!?!?













**git 사용 순서**

`git add [추가할 파일]`

`git add --all` // 한번에 다 추가

`git commit -m "comit message"`

`git status`

`git pull origin master`

`git push -u origin master`

