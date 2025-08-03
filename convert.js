const mbInput = document.getElementById('mb');
const psiInput = document.getElementById('psi');
const resultDiv = document.getElementById('convertResult');

// 1 mb = 0.0145038 psi
function convertFromMb() {
  const mb = parseFloat(mbInput.value);
  if (!isNaN(mb)) {
    const psi = mb * 0.0145038;
    psiInput.value = psi.toFixed(2);
    resultDiv.innerHTML = `계산된 psi 값: <strong style="color:red">${psi.toFixed(2)}</strong>`;
  } else {
    psiInput.value = '';
    resultDiv.innerHTML = '';
  }
}

function convertFromPsi() {
  const psi = parseFloat(psiInput.value);
  if (!isNaN(psi)) {
    const mb = psi / 0.0145038;
    mbInput.value = mb.toFixed(2);
    resultDiv.innerHTML = `계산된 mb 값: <strong style="color:red">${mb.toFixed(2)}</strong>`;
  } else {
    mbInput.value = '';
    resultDiv.innerHTML = '';
  }
}
