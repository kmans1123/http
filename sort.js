function sortNames() {
  const textarea = document.getElementById("nameList");
  const result = document.getElementById("sortedResult");

  let names = textarea.value.split('\n')
    .map(name => name.trim())
    .filter(name => name !== '');

  if (names.length > 100) {
    alert("100개 이하로 입력해주세요.");
    return;
  }

  names.sort((a, b) => a.localeCompare(b, 'ko'));
  result.innerHTML = '정렬된 결과:\n' + names.join('\n');
}
