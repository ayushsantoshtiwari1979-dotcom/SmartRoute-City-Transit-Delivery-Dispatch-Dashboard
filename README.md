# 🚀 SmartRoute: City Transit & Delivery Dispatch Dashboard

## 📌 1. Project Overview
- **🏷️ Project Title:** SmartRoute: City Transit & Delivery Dispatch Dashboard
- **👥 Team Members:** 
  - 👨‍💻 Ayush Tiwari - 6606631
  - 👨‍💻 Govind Sahu - 6606081
  - 👩‍💻 Priti Kumari - 6606770
  - 👩‍💻 Prerna Rajput - 6606532 
- **🛠️ Technology Stack:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6+), Leaflet.js, Chart.js, FontAwesome
- **🔥 Project Mentor:** Mrs. Aarshi Gupta
- **🎯 Project Objective:** SmartRoute is an enterprise-grade pan-India logistics and fleet management command center. It bridges theoretical Data Structures and Algorithms (DSA)—specifically Graph Theory (Dijkstra’s Algorithm) and Min-Heap Priority Queues—with real-world enterprise routing, automated dispatching, and dynamic environmental simulations.

## ⚠️ 2. Problem Statement
Traditional logistics and delivery operations face severe bottlenecks when coordinating pan-India freight across 115+ cities, managing custom local delivery addresses, and prioritizing emergency shipments. Manual routing fails to adapt in real-time to sudden disruptions such as highway congestion, roadblocks, or severe weather conditions. SmartRoute addresses this challenge by providing an intelligent, web-based dashboard that automates route calculations, optimizes edge weights dynamically, and streamlines priority queue dispatching to ensure minimum transit times and operational costs.

## ✨ 3. Features
- **🗺️ Interactive Pan-India Dispatch Map:** Real-time visualization of 115+ Indian cities, headquarters, and hubs powered by Leaflet.js and OpenStreetMap.
- **📦 Advanced Priority Queue & Order Modal:** Secure registration of orders capturing customer details, contact numbers, email addresses, package categories, custom package photos, and exact local delivery addresses sorted via Min-Heap logic.
- **⏱️ Real-Time Route Analytics & ETA Engine:** Instant computation of total distance, average traveling speeds, precise ETAs, and estimated operational costs from the Raipur Headquarters to any destination hub.
- **🌦️ Environmental Simulations (Traffic & Weather Toggles):** Real-world disruption simulators that dynamically alter graph edge weights, update routes, and render visual glow zones on the map.
- **🚛 Fleet Command & Batch Dispatch:** Dynamic vehicle status tracking (Standby vs. In Transit), fuel percentage monitoring, automated truck deployment, and single-click multi-order batch dispatches.
- **📊 Performance Analytics & CSV Reporting:** Responsive, smooth gradient line graphs featuring Daily, Weekly, and Monthly time filters, accompanied by a one-click CSV export utility for comprehensive dispatch history tracking.

## 💻 4. Technology Stack
- **🎨 Frontend Interface & Styling:** HTML5, Tailwind CSS, FontAwesome Icons
- **🗺️ Mapping & Data Visualization:** Leaflet.js, OpenStreetMap, Chart.js
- **⚙️ Core Algorithms & State Management:** 100% Vanilla JavaScript (ES6+)

## 📂 5. Project Structure
```text
Major-Project/
├── README.md
├── PPT.pptx
├── .gitignore
├── src/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── dsa-algorithms.js
├── docs/
│   └── Project_Report.md
└── screenshots/
    ├── Screenshot 2026-10-17 194904.jpg
    ├── Screenshot 2026-10-17 195257.jpg
    ├── Screenshot 2026-10-17 195429.png
    ├── Screenshot 2026-10-17 195439.png
    ├── Screenshot 2026-10-17 195449.png
    └── Screenshot 2026-10-17 195559.jpg

```
## 🚀 6. Installation and Execution
To run and test the project locally, follow these steps:
1. **📥 Clone or Download:** Clone the repository or extract the project ZIP archive.
2. **📂 Open Source Code:** Navigate to the `Major-Project/src/` directory.
3. **🌐 Run Locally:**
   - Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge).
   - Alternatively, open the folder in **Visual Studio Code** and use the **Live Server** extension to launch the dashboard at `http://127.0.0.1:5500`.

## 📸 7. Screenshots / Output

**🖥️ Dashboard Command Center:** Live pan-India network mapping and queue backlog statistics.
![Dashboard Command Center](screenshots/Screenshot%202026-10-17%20194904.png)

**📈 Route Analytics Card:** Real-time distance, speed, ETA, and cost metrics for selected routes.
![Route Analytics Card](screenshots/Screenshot%202026-10-17%20195257.png)

**🚚 National Fleet Command:** Vehicle tracking, fuel levels, and current cargo load statuses.
![National Fleet Command](screenshots/Screenshot%202026-10-17%20195429.png)

**📋 Tracking Logs:** Comprehensive dispatch archives with customer and delivery details.
![Tracking Logs](screenshots/Screenshot%202026-10-17%20195439.png)

**📉 Performance Analytics:** Interactive gradient trend lines across custom time ranges.
![Performance Analytics 1](screenshots/Screenshot%202026-10-17%20195449.png)

**📊 Additional Analytics & UI View:** 
![Additional View](screenshots/Screenshot%202026-10-17%20195559.png)

## 🧠 8. DSA Concepts Used
- **🔤 Arrays and Strings:** Managing hub coordinate lookups, string formatting for addresses, and data table filtering.
- **📥 Stack and Queue (Min-Heap Logic):** Implementing custom Priority Queue architecture to dynamically sort incoming dispatches by urgency levels (P1 to P3).
- **🕸️ Trees and Graphs:** Modeling the pan-India highway system as an undirected weighted Graph where cities represent Nodes and highways represent Edges.
- **🔍 Searching and Sorting Algorithms:** Executing Dijkstra’s Shortest Path Algorithm for cost-effective hub routing.
- **⚡ Time and Space Complexity:** Maintaining efficient $O(E \log V)$ traversal efficiency for instantaneous UI updates.

## 💡 9. Learning Outcomes
- Practical implementation of complex Data Structures (Graphs and Min-Heaps) within real-world web applications.
- Integrating third-party mapping (Leaflet.js) and charting (Chart.js) libraries for robust data visualization.
- Applying defensive programming techniques and modular state management in Vanilla JavaScript.

## 🔮 10. Future Scope
- **☁️ Backend Integration:** Connecting Node.js and MongoDB for secure persistent user sessions and live database records.
- **🛰️ GPS Telematics Integration:** Linking live vehicle hardware APIs to stream actual truck coordinates directly onto the Leaflet map.
- **🤖 AI Route Optimization:** Incorporating machine learning models for predictive traffic analysis and fuel-efficient dispatching.

## 📚 11. References
- Leaflet.js Documentation & OpenStreetMap Tile Usage Guidelines
- Chart.js Official Documentation
- Tailwind CSS Framework Reference
- Introduction to Algorithms (CLRS) — Graph Theory & Shortest Path Modules

## ⚖️ 12. License
This project is developed for academic evaluation purposes under the curriculum of Rungta Group of Institutions, Bhilai.
