const 정답 = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  //엔터키를 눌렀을때
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      // 입력한 글자가 위치랑 글자가 맞으면 초록 ,글자만 맞으면 노랑, 안맞으면 회색
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    //5글자 다 맞았을때 , gameover 아닐때 다음줄로
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  //backspace키를 눌렀을때 하나씩 지워지게하기
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //자판을 눌렀을때,
  //keyCode 65번~90번까지만 입력 가능하며 ,
  //대문자로 들어갈 수 있도록 하고, Backspace시 지워지며, Enter키 눌렀을때 맞은개수 파악
  //toUpperCase = 대문자로 들어갈 수 있도록 함 (문자열만 가능)
  const handleKeydown = (event) => {

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);

      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `Time:${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }

    //초단위로 늘어남
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 되었습니다.";
    //이렇게 js에서도 style 다룰 수 있음, 단 오탈자 주의 (그래서 사용 잘 안함)
    div.style =
      " background-color:white; color:black; font-size:40px; font-weight:bold; display:flex; justify-content:center; align-items:center; position:fixed; top:47vh; left:37vw; ";
    document.body.appendChild(div);
  };

  //gameover시 "게임이 종료 되었습니다." 출력 및 timer 멈춤
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
}

appStart();
