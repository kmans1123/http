// 아이콘 및 뒤로가기 버튼 기능 포함

document.getElementById('goIndexBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

const mainMenu = document.getElementById('mainMenu');
const backBtn = document.getElementById('backBtn');

const rouletteSection = document.getElementById('rouletteSection');
const drawSection = document.getElementById('drawSection');
const ladderSection = document.getElementById('ladderSection');
const diceSection = document.getElementById('diceSection');

const btnRoulette = document.getElementById('btnRoulette');
const btnDraw = document.getElementById('btnDraw');
const btnLadder = document.getElementById('btnLadder');
const btnDice = document.getElementById('btnDice');

btnRoulette.addEventListener('click', () => {
  showSection(rouletteSection);
  setupRoulette();
});
btnDraw.addEventListener('click', () => {
  showSection(drawSection);
});
btnLadder.addEventListener('click', () => {
  showSection(ladderSection);
});
btnDice.addEventListener('click', () => {
  showSection(diceSection);
});

backBtn.addEventListener('click', () => {
  showSection(mainMenu, true);
});

function showSection(sectionToShow, isBack = false) {
  [mainMenu, rouletteSection, drawSection, ladderSection, diceSection].forEach(sec => {
    sec.classList.add('hidden');
  });
  sectionToShow.classList.remove('hidden');
  if (sectionToShow === mainMenu) {
    backBtn.classList.add('hidden');
  } else {
    backBtn.classList.remove('hidden');
  }
  if (!isBack && sectionToShow === rouletteSection) {
    drawResult.textContent = '';
    ladderResult.textContent = '';
    diceResult.textContent = '';
  }
}

// 룰렛 관련 변수 및 함수 (원래 잘 되던 버전으로 복구 및 개선)
const rouletteCanvas = document.getElementById('rouletteCanvas');
const ctx = rouletteCanvas.getContext('2d');
const startRouletteBtn = document.getElementById('startRouletteBtn');
const rouletteNamesInput = document.getElementById('rouletteNames');
const rouletteSegmentsInput = document.getElementById('rouletteSegments'); // 구간 수 표시용 (사용자 입력 무시)
const result = document.getElementById('result');

const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']; // 무지개 색상

let startAngle = 0;
let arc = 0;
let spinTimeout = null;
let spinArcStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let segments = [];
let segmentCount = 6;

// 구간 이름 입력 시 바로 룰렛 다시 그리기
rouletteNamesInput.addEventListener('input', () => {
  setupRoulette();
});

function drawRouletteWheel() {
  const width = rouletteCanvas.width;
  const height = rouletteCanvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  arc = Math.PI * 2 / segmentCount;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  for (let i = 0; i < segmentCount; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i % colors.length];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, width / 2 - 10, angle, angle + arc, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.stroke();

    // 글자 표시
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.font = "bold 16px 'Arial'";
    ctx.fillText(segments[i], width / 2 - 30, 10);
    ctx.restore();
  }

  // 중앙 원 그리기
  ctx.beginPath();
  ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#333';
  ctx.stroke();

  // 화살표 표시
  ctx.fillStyle = "#d83535";
  ctx.beginPath();
  ctx.moveTo(centerX - 10, centerY - (width / 2 - 10));
  ctx.lineTo(centerX + 10, centerY - (width / 2 - 10));
  ctx.lineTo(centerX, centerY - (width / 2 - 40));
  ctx.closePath();
  ctx.fill();
}

function spin() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = spinArcStart - easeOut(spinTime, 0, spinArcStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout(spin, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  let index = Math.floor((360 - (degrees % 360)) / arcd);
  result.textContent = `🎉 결과: ${segments[index]}`;
  startAngle = startAngle % (2 * Math.PI);
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

function setupRoulette() {
  let inputNames = rouletteNamesInput.value.trim();
  if (!inputNames) {
    segments = ['빨강', '주황', '노랑', '초록', '파랑', '보라'];
  } else {
    segments = inputNames.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }
  segmentCount = Math.min(Math.max(segments.length, 2), 20);

  // 구간 수 표시만, 사용자는 변경 불가
  if (rouletteSegmentsInput) {
    rouletteSegmentsInput.value = segmentCount;
  }

  drawRouletteWheel();
}


startRouletteBtn.addEventListener('click', () => {
  if (segments.length < 2) {
    alert('적어도 두 개 이상의 구간 이름을 입력해주세요.');
    return;
  }
  spinArcStart = Math.floor(Math.random() * 360) + 360 * 4; // 최소 4바퀴 이상
  spinTime = 0;
  spinTimeTotal = 4000 + Math.random() * 2000; // 4~6초 랜덤 스핀
  spin();
});

// 초기 세팅
setupRoulette();

// 제비뽑기
const drawParticipantsInput = document.getElementById("drawParticipants");
const drawCountInput = document.getElementById("drawCount");
const drawBtn = document.getElementById("drawBtn");
const drawResult = document.getElementById("drawResult");

drawBtn.addEventListener("click", () => {
  const participants = drawParticipantsInput.value.split(",").map(s => s.trim()).filter(s => s);
  const count = parseInt(drawCountInput.value);
  if (participants.length === 0) {
    drawResult.textContent = "참여자 이름을 입력해주세요.";
    return;
  }
  if (isNaN(count) || count < 1 || count > participants.length) {
    drawResult.textContent = `뽑을 인원 수를 1 이상, 참여자 수(${participants.length}) 이하로 입력해주세요.`;
    return;
  }
  let winners = [];
  let tempParticipants = [...participants];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * tempParticipants.length);
    winners.push(tempParticipants.splice(idx, 1)[0]);
  }
  drawResult.textContent = `🎉 당첨자: ${winners.join(", ")}`;
});


// 사다리 타기 + 벌칙 기능 추가
const ladderParticipantsInput = document.getElementById("ladderParticipants");
const ladderPunishmentsInput = document.getElementById("ladderPunishments");
const ladderStartBtn = document.getElementById("ladderStartBtn");
const ladderResult = document.getElementById("ladderResult");

// 사다리 타기 - 심플 버전(랜덤으로 벌칙 매칭)
ladderStartBtn.addEventListener("click", () => {
  const participants = ladderParticipantsInput.value.split(",").map(s => s.trim()).filter(s => s);
  const punishments = ladderPunishmentsInput.value.split(",").map(s => s.trim()).filter(s => s);
  if (participants.length === 0) {
    ladderResult.textContent = "참여자 이름을 입력해주세요.";
    return;
  }
  if (punishments.length !== participants.length) {
    ladderResult.textContent = "참여자 수와 벌칙 수가 같아야 합니다.";
    return;
  }
  // 벌칙을 랜덤으로 섞기 (사다리 랜덤 효과 흉내)
  let shuffledPunishments = shuffleArray(punishments);

  // 결과 출력
  let resultsHTML = "<strong>🎉 사다리 결과</strong><br/>";
  participants.forEach((p, i) => {
    resultsHTML += `${p} → ${shuffledPunishments[i]}<br/>`;
  });
  ladderResult.innerHTML = resultsHTML;
});

// 배열 셔플 함수
function shuffleArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


// 주사위 굴리기 (간단한 애니메이션 포함)
const rollDiceBtn = document.getElementById("rollDiceBtn");
const diceResult = document.getElementById("diceResult");

rollDiceBtn.addEventListener("click", () => {
  diceResult.textContent = "";
  let rollCount = 0;
  const maxRolls = 15; // 애니메이션 회수
  const interval = setInterval(() => {
    rollCount++;
    const diceNum = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `🎲 결과: ${diceNum}`;
    if (rollCount >= maxRolls) {
      clearInterval(interval);
    }
  }, 100);
});

