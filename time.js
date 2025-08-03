window.onload = () => {
  addTimeRow();
  addTimeRow();
};

function addTimeRow() {
  const container = document.getElementById("timeInputs");
  const count = container.children.length + 1;

  const group = document.createElement("div");
  group.className = "time-group";

  const label = document.createElement("div");
  label.className = "time-label";
  label.textContent = `${count}번째 시간`;

  const wrapper = document.createElement("div");  // 여기에 wrapper 선언 추가
  wrapper.className = "wrapper"; // 클래스명 필요하면 추가

  const grid = document.createElement("div");
  grid.className = "input-grid";

  const inputs = ["일", "시", "분", "초"].map(unit => {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = unit;
    input.dataset.unit = unit;
    return input;
  });

  inputs.forEach(input => grid.appendChild(input));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";
  deleteBtn.onclick = () => {
    group.remove();
    updateLabels();
  };

  wrapper.appendChild(grid);
  wrapper.appendChild(deleteBtn);

  group.appendChild(label);
  group.appendChild(wrapper);
  container.appendChild(group);
}

function updateLabels() {
  const groups = document.querySelectorAll(".time-group .time-label");
  groups.forEach((label, i) => {
    label.textContent = `${i + 1}번째 시간`;
  });
}

function calcTime() {
  const mode = document.getElementById("mode").value;
  const rows = document.querySelectorAll(".time-group");
  let totalSeconds = 0;

rows.forEach((row, i) => {
  const inputs = row.querySelectorAll("input");
  let [d, h, m, s] = [...inputs].map(input => parseInt(input.value) || 0);
  const seconds = d * 86400 + h * 3600 + m * 60 + s;
  if (i === 0) {
    totalSeconds = seconds;
  } else {
    if (mode === "add") {
      totalSeconds += seconds;
    } else {
      totalSeconds -= seconds;
    }
  }
});


  const abs = Math.abs(totalSeconds);
  const sign = totalSeconds < 0 ? "-" : "";
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;

  document.getElementById("timeResult").textContent = `${sign}${d}일 ${h}시간 ${m}분 ${s}초`;
}

function convertFlexible() {
  const value = parseFloat(document.getElementById("convertValue").value);
  const unit = document.getElementById("convertUnit").value;
  if (isNaN(value)) {
    document.getElementById("convertResult").innerHTML = "숫자를 입력하세요.";
    return;
  }

  // 입력값을 초 단위로 변환
  let totalSeconds = 0;
  if (unit === "day") totalSeconds = value * 86400;
  else if (unit === "hour") totalSeconds = value * 3600;
  else if (unit === "minute") totalSeconds = value * 60;
  else totalSeconds = value;

  // 초 단위를 일시분초로 분해
  const d = Math.floor(totalSeconds / 86400);
  const remainderAfterDays = totalSeconds % 86400;
  const h = Math.floor(remainderAfterDays / 3600);
  const remainderAfterHours = remainderAfterDays % 3600;
  const m = Math.floor(remainderAfterHours / 60);
  const s = Math.floor(remainderAfterHours % 60);

  // 모든 단위에 대해 일 시 분 초로 변환한 결과 텍스트 생성
  let result = `${value} ${unit} = ${d}일 ${h}시간 ${m}분 ${s}초<br>`;

  // 각 단위를 소수점 2자리까지 표현하며 초 단위로 환산한 값을 추가로 표시
  result += `→ 일 단위: ${(totalSeconds / 86400).toFixed(2)}일<br>`;
  result += `→ 시간 단위: ${(totalSeconds / 3600).toFixed(2)}시간<br>`;
  result += `→ 분 단위: ${(totalSeconds / 60).toFixed(2)}분<br>`;
  result += `→ 초 단위: ${totalSeconds}초`;

  document.getElementById("convertResult").innerHTML = result;
}
