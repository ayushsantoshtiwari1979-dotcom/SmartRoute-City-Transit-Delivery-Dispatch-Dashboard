# Project Report: SmartRoute

## Abstract
SmartRoute is an interactive dashboard developed as a practical application of Data Structures and Algorithms. The goal of the project is to optimize logistics delivery across India by applying Graph Theory and Priority Queues.

## Methodology
- **Network Mapping:** We modeled 76+ cities as 'Nodes' and highways as 'Edges'.
- **Optimization:** Dijkstra's Algorithm finds the shortest path, while a Min-Heap sorts daily dispatch orders by urgency.
- **Simulation:** Real-time constraints like weather and traffic dynamically update the Edge weights, testing the adaptability of the algorithms.

## Results
The system successfully routes packages dynamically while maintaining O(E log V) complexity for pathfinding, ensuring real-world scalability.
