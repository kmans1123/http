function calcConcentrate() {
  const rC = parseFloat(document.getElementById('ratioConcentrate').value);
  const rW = parseFloat(document.getElementById('ratioWater').value);
  const vW = parseFloat(document.getElementById('volumeWater').value);
  const result = document.getElementById('dilutionResult');

  if (!isNaN(rC) && !isNaN(rW) && !isNaN(vW)) {
    const vC = (vW * rC) / rW;
    document.getElementById('volumeConcentrate').value = vC.toFixed(2);
    result.innerHTML = `계산된 원액 용량: <strong style="color:red">${vC.toFixed(2)} ml</strong>`;
  }
}

function calcWater() {
  const rC = parseFloat(document.getElementById('ratioConcentrate').value);
  const rW = parseFloat(document.getElementById('ratioWater').value);
  const vC = parseFloat(document.getElementById('volumeConcentrate').value);
  const result = document.getElementById('dilutionResult');

  if (!isNaN(rC) && !isNaN(rW) && !isNaN(vC)) {
    const vW = (vC * rW) / rC;
    document.getElementById('volumeWater').value = vW.toFixed(2);
    result.innerHTML = `계산된 물 용량: <strong style="color:red">${vW.toFixed(2)} ml</strong>`;
  }
}
