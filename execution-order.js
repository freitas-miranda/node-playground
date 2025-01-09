
// setImmediate: Macro-task -> Executadas após a finalização do ciclo de eventos.
setImmediate(() => {
  console.log('8. Callback setImmediate (macro-task, após timeout)');
});

// setTimeout: Macro-task -> Executadas após a finalização do ciclo de eventos.
setTimeout(() => {
  console.log('7. Callback setTimeout (macro-task)');
}, 0);


// process.nextTick: Micro-task -> Executa antes de qualquer outra micro-task.
process.nextTick(() => {
  console.log('4. process.nextTick (micro-task)');
});

// Síncrono: Executado diretamente, na ordem em que aparece.
console.log('1. Código síncrono');

// Promises: Micro-tasks ->  Executadas antes das macro-tasks.
Promise.resolve().then(() => {
  console.log('5. Promise resolvida (micro-task)');
});

(async () => {
  console.log('2. Início do async/await (síncrono)');
  
  // Resolução dessa promise vai para micro-task
  await Promise.resolve(); 

  console.log('6. await finalizado (micro-task)');
})();

console.log('3. Fim do código síncrono');


/*
# Ordem de Execução no Node.js

1. **Síncrono**  
   - `console.log()`  
   Executado diretamente, na ordem em que aparece no código.

2. **process.nextTick()**  
   Executa imediatamente após o código síncrono, antes de qualquer outra tarefa.

3. **Micro-tasks (Promises)**  
   - `Promise.then()`  
   - `await`  
   Essas tarefas são executadas logo após o `process.nextTick()` e antes das macro-tasks.

4. **Macro-tasks**  
   - `setTimeout()`  
     Executa após as micro-tasks, respeitando o tempo mínimo especificado.  
   - `setImmediate()`  
     Executa logo após todas as macro-tasks pendentes (como `setTimeout`).

5. **I/O Callbacks**  
   - Callbacks de leitura/escrita de arquivos ou operações de rede, se houver.  
     Executados no ciclo seguinte do Event Loop após as macro-tasks.

# Ordem de Execução no Event Loop
1. Código síncrono (imediato)
2. process.nextTick()
3. Promises e await
4. setTimeout()
5. setImmediate()
6. Callbacks de I/O

*/
