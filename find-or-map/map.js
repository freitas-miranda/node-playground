const data = require("./array.json");

// Pré-processamento para construir o Map
const typeMap = new Map(
  data.map(item => [item.transactionTypeId, item.statementTrasactionType])
);

// Implementando a busca
function getTypeUsingMap(transactionTypeId) {
  return typeMap.get(transactionTypeId);
}

// Exemplo de uso
const findKey = "00000000-0000-0000-0000-000000000001";
console.log(getTypeUsingMap(findKey));
