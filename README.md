# SmartRoute: Pan-India Logistics & Dispatch Dashboard

## 📌 Project Overview
SmartRoute is an enterprise-grade fleet management dashboard built to visualize, manage, and optimize pan-India logistics. It implements core Data Structures and Algorithms (DSA) to solve real-world routing and dispatch prioritization problems.

## 🚀 Features
- **Dynamic Routing:** Calculates the shortest and most cost-effective path between 76+ Indian cities.
- **Priority Dispatching:** Queues orders based on urgency (Urgent, Express, Standard).
- **Live Environment Simulation:** Traffic and Weather toggles dynamically affect routing weights, ETAs, and costs.
- **Performance Analytics:** Real-time line charts tracking dispatch metrics.
- **Exportable Logs:** One-click detailed CSV report generation.

## 🧠 DSA Concepts Used
1. **Dijkstra's Algorithm (Graphs):** Used to find the shortest path across the Indian city network. Edge weights are dynamically modified based on simulated traffic and weather conditions.
2. **Priority Queue (Min-Heap):** Used to manage the dispatch queue. Ensures that emergency and high-priority deliveries are processed before standard ones.

## 💻 Tech Stack
- **Frontend:** HTML5, Tailwind CSS, FontAwesome
- **Logic & Algorithms:** Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js (OpenStreetMap)
- **Data Visualization:** Chart.js

## ⚙️ How to Run
1. Clone this repository.
2. Navigate to the `src` folder.
3. Open `index.html` in any modern web browser or use a local development server (like VS Code Live Server).
