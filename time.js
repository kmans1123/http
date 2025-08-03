function calcTime() {
  const h1 = parseInt(document.getElementById("h1").value) || 0;
  const m1 = parseInt(document.getElementById("m1").value) || 0;
  const s1 = parseInt(document.getElementById("s1").value) || 0;

  const h2 = parseInt(document.getElementById("h2").value) || 0;
  const m2 = parseInt(document.getElementById("m2").value) || 0;
  const s2 = parseInt(document.getElementById("s2").value) || 0;

  const mode = document.getElementById("mode").value;
  const result = document.getElementById("timeResult");

  let t1 = h1 * 3600 + m1 * 60 + s1;
  let t2 = h2 * 3600 + m2 * 60 + s2;
  let total = mode === "add" ? t1 + t2 : t1 - t2;

  if (total < 0) total = 0;

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  result.innerHTML = `결과: <strong style="color:red">${hours}시간 ${minutes}분 ${seconds}초</strong>`;
}

function convertDay() {
  const day = parseFloat(document.getElementById("day").value);
  const result = document.getElementById("dayResult");

  if (!isNaN(day)) {
    const hours = day * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;

    result.innerHTML =
      `계산 결과: <strong style="color:red">${hours}시간 / ${minutes}분 / ${seconds}초</strong>`;
  } else {
    result.innerHTML = '';
  }
}
