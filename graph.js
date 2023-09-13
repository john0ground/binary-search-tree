class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
    
    addVertex(v) {
        this.AdjList.set(v, []);
    }
    
    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }

    printGraph() {
        const getKeys = this.AdjList.keys();

        for (const i of getKeys) {
            const getValues = this.AdjList.get(i);
            let conc = '';

            getValues.forEach(v => {
                conc += v + ' ';
            });

            console.log(i + '->' + conc);
        }
    }
 
    // bfs(v)
    // dfs(v)
}

const g = new Graph(6);
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

vertices.forEach(v => {
    g.addVertex(v);
});

g.addEdge('A', 'B');
g.addEdge('A', 'D');
g.addEdge('A', 'E');
g.addEdge('B', 'C');
g.addEdge('D', 'E');
g.addEdge('E', 'F');
g.addEdge('E', 'C');
g.addEdge('C', 'F');

g.printGraph();