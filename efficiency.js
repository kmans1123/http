function calculateFuel() {
  const distance = parseFloat(document.getElementById('distance').value);
  const efficiency = parseFloat(document.getElementById('efficiency').value);
  const price = parseFloat(document.getElementById('price').value);
  const fuelCost = parseFloat(document.getElementById('fuel-cost').value);
  const resultEl = document.getElementById('fuel-result');

  resultEl.textContent = '';

  // 1) 거리, 연비, 유가 → 예상 비용 계산
  if (!isNaN(distance) && distance > 0 &&
      !isNaN(efficiency) && efficiency > 0 &&
      !isNaN(price) && price > 0) {
    const cost = (distance / efficiency) * price;
    resultEl.textContent = `예상 비용은 약 ${cost.toFixed(2)}원 입니다.`;
    return;
  }

  // 2) 연비, 유가, 주유금액 → 갈 수 있는 거리 계산
  if (!isNaN(efficiency) && efficiency > 0 &&
      !isNaN(price) && price > 0 &&
      !isNaN(fuelCost) && fuelCost > 0) {
    const reachableDistance = (fuelCost / price) * efficiency;
    resultEl.textContent = `주유 금액으로 갈 수 있는 거리는 약 ${reachableDistance.toFixed(2)} km 입니다.`;
    return;
  }

  // 3) 주유금액, 유가, 거리 → 필요한 연비 계산
  if (!isNaN(fuelCost) && fuelCost > 0 &&
      !isNaN(price) && price > 0 &&
      !isNaN(distance) && distance > 0) {
    // 필요한 연비 = (주유금액 / 유가) / 거리 * 1000 (km/L)
    // 단위 맞추면: 필요한 연비 = (주유금액 / 유가) / 거리 * km/L
    // 다시 정리하면: (주유금액 / 유가) → 몇 L 주유 가능한지, 그걸로 거리 커버하려면 연비 = 거리 / 주유량 = distance / (fuelCost/price)
    const possibleLiters = fuelCost / price;
    const requiredEfficiency = distance / possibleLiters;

    resultEl.textContent = `주유 금액과 유가로 ${distance} km를 가려면\n필요한 연비는 약 ${requiredEfficiency.toFixed(2)} km/L 입니다.`;
    return;
  }

  alert('아래 세 가지 경우 중 하나의 세트로 정확히 입력해주세요:\n\n' +
    '1) 거리, 연비, 유가\n' +
    '2) 연비, 유가, 주유 금액\n' +
    '3) 주유 금액, 유가, 거리');
}

// 돌아가기 버튼 (임의로 메인 페이지 index.html로 설정)
document.getElementById('go-back-btn').addEventListener('click', () => {
  // 실제 메인 페이지 경로에 맞게 수정하세요
  window.location.href = 'index.html';
});

document.getElementById('fuel-calc-btn').addEventListener('click', calculateFuel);
