// Define um grafo usando uma lista de adjacência
const graph = {
  A: { B: 1, C: 4 },       // O nó A está conectado ao nó B com um peso de 1 e ao nó C com um peso de 4
  B: { A: 1, C: 2, D: 7 }, // ... e assim por diante para outros nós
  C: { A: 4, B: 2, D: 6 },
  D: { B: 7, C: 6 }
};

function dijkstra(graph, start) {
  // Cria um objeto para armazenar a menor distância do nó inicial para todos os outros nós
  let distances = {};

  // Um conjunto para rastrear todos os nós visitados
  let visited = new Set();

  // Obtém todos os nós do grafo
  let nodes = Object.keys(graph);

  // Inicialmente, define a menor distância para cada nó como Infinito
  for (let node of nodes) {
    distances[node] = Infinity;
  }
  
  // A distância do nó inicial para ele mesmo é 0
  distances[start] = 0;

  // Loop até que todos os nós sejam visitados
  while (nodes.length) {

    // Ordena os nós pela distância e escolhe o nó não visitado mais próximo
    nodes.sort((a, b) => distances[a] - distances[b]);
    let closestNode = nodes.shift();

    // Se a menor distância para o nó mais próximo ainda for Infinito, então os nós restantes são inacessíveis e podemos sair do loop
    if (distances[closestNode] === Infinity) break;

    // Marca o nó escolhido como visitado
    visited.add(closestNode);

    // Para cada nó vizinho do nó atual
    for (let neighbor in graph[closestNode]) {

      // Se o vizinho ainda não foi visitado
      if (!visited.has(neighbor)) {

        // Calcula a distância provisória para o nó vizinho
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];
        
        // Se a distância recém-calculada for menor que a distância previamente conhecida para este vizinho
        if (newDistance < distances[neighbor]) {

          // Atualiza a menor distância para este vizinho
          distances[neighbor] = newDistance;
        }
      }
    }
  }

  // Retorna a menor distância do nó inicial para todos os nós
  return distances;
}

// Exemplo: Encontra as menores distâncias do nó A para todos os outros nós no grafo
console.log(dijkstra(graph, "A")); // Saída: { A: 0, B: 1, C: 3, D: 4 }
