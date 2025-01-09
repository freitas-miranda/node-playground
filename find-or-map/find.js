const data = require("./array.json");

// Implementando a busca
function getTypeUsingFind(transactionTypeId) {
  const result = data.find(item => item.transactionTypeId === transactionTypeId);
  return result?.statementTrasactionType;
}

// Exemplo de uso
const findKey = "00000000-0000-0000-0000-000000000001";
console.log(getTypeUsingFind(findKey));
