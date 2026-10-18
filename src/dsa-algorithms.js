class PriorityQueue {
    constructor() { this.items = []; }
    enqueue(element, priority, id, destination, type) {
        let qElement = { element, priority, id, destination, type };
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement); contain = true; break;
            }
        }
        if (!contain) this.items.push(qElement);
    }
    dequeue() { return this.isEmpty() ? null : this.items.shift(); }
    isEmpty() { return this.items.length === 0; }
    clear() { this.items = []; }
}

class Graph {
    constructor() {
        this.nodes = new Set();
        this.edges = {};
        this.originalEdges = {};
    }
    addNode(node) {
        this.nodes.add(node);
        this.edges[node] = []; this.originalEdges[node] = [];
    }
    addEdge(node1, node2, weight) {
        this.edges[node1].push({ node: node2, weight: weight });
        this.edges[node2].push({ node: node1, weight: weight });
        this.originalEdges[node1].push({ node: node2, weight: weight });
        this.originalEdges[node2].push({ node: node1, weight: weight });
    }
    applyConditions(isHeavy, factor = 2) {
        this.nodes.forEach(node => {
            this.edges[node] = this.originalEdges[node].map(edge => {
                let newWeight = isHeavy ? edge.weight * (Math.floor(Math.random() * factor) + 1.5) : edge.weight;
                return { node: edge.node, weight: newWeight };
            });
        });
    }
    dijkstra(startNode, endNode) {
        let distances = {}; let backtrace = {}; let pq = new PriorityQueue();
        distances[startNode] = 0;
        this.nodes.forEach(n => { if (n !== startNode) distances[n] = Infinity; });
        pq.enqueue(startNode, 0);

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue(); let currentNode = shortestStep.element;
            this.edges[currentNode].forEach(neighbor => {
                let distance = distances[currentNode] + neighbor.weight;
                if (distance < distances[neighbor.node]) {
                    distances[neighbor.node] = distance; backtrace[neighbor.node] = currentNode;
                    pq.enqueue(neighbor.node, distance);
                }
            });
        }
        let path = [endNode]; let lastStep = endNode;
        while(lastStep !== startNode) {
            if(!backtrace[lastStep]) return { path: [], distance: 0 }; 
            path.unshift(backtrace[lastStep]); lastStep = backtrace[lastStep];
        }
        return { path: path, distance: Math.round(distances[endNode]) };
    }
}