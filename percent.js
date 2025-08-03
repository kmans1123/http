function calculatePercent() {
  const total = parseFloat(document.getElementById('total').value);
  const percent = parseFloat(document.getElementById('percent').value);
  const partial = parseFloat(document.getElementById('partial').value);
  const resultDiv = document.getElementById('percentResult');
  resultDiv.innerHTML = '';

  // 1. 전체값과 일부값이 있을 때 -> 비율값 구하기
  if (!isNaN(total) && !isNaN(partial) && isNaN(percent)) {
    const p = (partial / total) * 100;
    resultDiv.innerHTML = `계산된 비율값: <strong style="color:red">${p.toFixed(2)}%</strong>`;
  }
  // 2. 일부값과 비율값이 있을 때 -> 전체값 구하기
  else if (!isNaN(percent) && !isNaN(partial) && isNaN(total)) {
    const t = partial * 100 / percent;
    resultDiv.innerHTML = `계산된 전체값: <strong style="color:red">${t.toFixed(2)}</strong>`;
  }
  // 3. 전체값과 비율값이 있을 때 -> 일부값 구하기
  else if (!isNaN(total) && !isNaN(percent) && isNaN(partial)) {
    const part = total * percent / 100;
    resultDiv.innerHTML = `계산된 일부값: <strong style="color:red">${part.toFixed(2)}</strong>`;
  }
  else {
    resultDiv.innerHTML = '두 값만 입력해주세요.';
  }
}
