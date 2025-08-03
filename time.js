// 전역 상수: 최대 시간 입력 줄 수
const MAX_ROWS = 40;

// 페이지 로드 시 기본 2줄 시간 입력 생성
window.onload = () => {
  const container = document.getElementById("timeInputs");
  for (let i = 1; i <= 2; i++) {
    addTimeRow(i, container);
  }
};

// 시간 입력 줄 추가 함수 (index 자동 부여)
function addTimeRow(index, container = null) {
  container = container || document.getElementById("timeInputs");
  const currentCount = container.children.length;
  if (currentCount >= MAX_ROWS) {
    alert(`최대 ${MAX_ROWS}줄까지 추가할 수 있습니다.`);
    return;
  }
  const rowIndex = index || currentCount + 1;

  const div = document.createElement("div");
  div.className = "time-row";
  div.id = `timeRow${rowIndex}`;

  div.innerHTML = `
    <span class="time-label">${rowIndex}번째 시간</span>
    <input type="number" min="0" id="h${rowIndex}" placeholder="시" />
    <input type="number" min="0" id="m${rowIndex}" placeholder="분" />
    <input type="number" min="0" id="s${rowIndex}" placeholder="초" />
    <button class="delete-button" onclick="removeTimeRow(${rowIndex})" title="이 줄 삭제">×</button>
  `;

  container.appendChild(div);
}

// 입력된 각 줄 시간(시,분,초)를 초 단위로 변환
function getTimeInSeconds(index) {
  const h = parseInt(document.getElementById(`h${index}`)?.value) || 0;
  const m = parseInt(document.getElementById(`m${index}`)?.value) || 0;
  const s = parseInt(document.getElementById(`s${index}`)?.value) || 0;

  const totalSeconds = h * 3600 + m * 60 + s;
  return totalSeconds;
}

// 초를 시분초 포맷으로 변환하는 함수 (음수 처리 안함, 0 미만은 0으로 처리)
function secondsToHMS(total) {
  if (total < 0) total = 0;
  const days = Math.floor(total / 86400);
  total %= 86400;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return (days > 0 ? `${days}일 ` : "") + `${hours}시간 ${minutes}분 ${seconds}초`;
}

// 계산 함수 (더하기, 빼기 모드만 존재, 다중 줄 누적 계산)
function calcTime() {
  const mode = document.getElementById("mode").value;
  const result = document.getElementById("timeResult");
  const container = document.getElementById("timeInputs");
  const count = container.children.length;

  if (count < 2) {
    result.innerHTML = "최소 2줄의 시간을 입력해주세요.";
    return;
  }

  let total = 0;

  if (mode === "add") {
    // 모든 줄의 시간을 더함
    for (let i = 1; i <= count; i++) {
      total += getTimeInSeconds(i);
    }
  } else if (mode === "subtract") {
    // 첫 줄 시간에서 나머지 모두 뺌
    total = getTimeInSeconds(1);
    for (let i = 2; i <= count; i++) {
      total -= getTimeInSeconds(i);
    }
  }

  if (total < 0) total = 0;

  result.innerHTML = `결과: <strong style="color:red">${secondsToHMS(total)}</strong>`;
}

// 마지막 줄 삭제 함수
function removeLastTimeRow() {
  const container = document.getElementById("timeInputs");
  const count = container.children.length;
  if (count <= 2) {
    alert("최소 2줄은 유지되어야 합니다.");
    return;
  }
  container.removeChild(container.lastChild);
}

// 특정 줄 삭제 함수 (삭제 버튼에서 호출)
function removeTimeRow(rowIndex) {
  const container = document.getElementById("timeInputs");
  const row = document.getElementById(`timeRow${rowIndex}`);
  if (!row) return;

  const count = container.children.length;
  if (count <= 2) {
    alert("최소 2줄은 유지되어야 합니다.");
    return;
  }

  container.removeChild(row);

  // 삭제 후 번호 재정렬 (id, label, input id 모두 재조정)
  const rows = container.children;
  for (let i = 0; i < rows.length; i++) {
    const idx = i + 1;
    rows[i].id = `timeRow${idx}`;
    rows[i].querySelector(".time-label").textContent = `${idx}번째 시간`;
    rows[i].querySelector(`#h${rowIndex}`)?.setAttribute("id", `h${idx}`);
    rows[i].querySelector(`#m${rowIndex}`)?.setAttribute("id", `m${idx}`);
    rows[i].querySelector(`#s${rowIndex}`)?.setAttribute("id", `s${idx}`);

    // delete button onclick 이벤트 재설정
    const btn = rows[i].querySelector("button.delete-button");
    btn.setAttribute("onclick", `removeTimeRow(${idx})`);
  }
}

// 단위 변환 함수 (일, 시간, 분, 초 상호 변환)
function convertFlexible() {
  const val = parseFloat(document.getElementById("convertValue").value);
  const unit = document.getElementById("convertUnit").value;
  const res = document.getElementById("convertResult");

  if (isNaN(val) || val < 0) {
    res.innerText = "0 이상의 숫자를 입력해주세요.";
    return;
  }

  let seconds = 0;

  switch (unit) {
    case "day":
      seconds = val * 86400;
      break;
    case "hour":
      seconds = val * 3600;
      break;
    case "minute":
      seconds = val * 60;
      break;
    case "second":
      seconds = val;
      break;
  }

  const days = (seconds / 86400).toFixed(5);
  const hours = (seconds / 3600).toFixed(5);
  const minutes = (seconds / 60).toFixed(5);
  const secondsFixed = seconds.toFixed(5);

  res.innerHTML = `
    일: ${days} 일<br>
    시간: ${hours} 시간<br>
    분: ${minutes} 분<br>
    초: ${secondsFixed} 초
  `;
}
