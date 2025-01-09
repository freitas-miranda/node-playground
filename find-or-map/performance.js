const { performance, PerformanceObserver } = require('perf_hooks');

// Array grande simulado
const transactions = require('./array.json');
// const transactions = Array.from({ length: 1000000 }, (_, i) => ({
//   description: `Transaction ${i}`,
//   transactionTypeId: `00000000-0000-0000-0000-${i.toString().padStart(12, '0')}`,
//   statementTrasactionType: `type-${i}`,
// }));


// Função usando Array.find
function getTransactionTypeWithFind(transactionTypeId) {
  const result = transactions.find(
    (t) => t.transactionTypeId === transactionTypeId
  );
  return result ? result.statementTransactionType : null;
}

// Função usando Map
function getTransactionTypeWithMap(transactionTypeId, transactionMap) {
  return transactionMap.get(transactionTypeId) || null;
}

// Configurando o PerformanceObserver
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(3)}ms`);
  });
});
obs.observe({ entryTypes: ['measure'] });


// Testando performance para 1000 buscas
const transactionTypeIdToTest = '00000000-0000-0000-0000-000000000051'

// Medindo a busca com find
performance.mark('start-find');
for (let i = 0; i < 1000; i++) {
  getTransactionTypeWithFind(transactionTypeIdToTest);
}
performance.mark('end-find');
performance.measure('Using find', 'start-find', 'end-find');

// Medindo a busca com Map
performance.mark('start-map');
// Criando o Map uma vez
const transactionMap = new Map(
  transactions.map((item) => [item.transactionTypeId, item.statementTransactionType])
);
for (let i = 0; i < 1000; i++) {
  getTransactionTypeWithMap(transactionTypeIdToTest, transactionMap);
}
performance.mark('end-map');
performance.measure('Using Map', 'start-map', 'end-map');
