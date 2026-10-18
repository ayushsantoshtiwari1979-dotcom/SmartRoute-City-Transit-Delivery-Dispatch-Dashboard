// ==========================================
// 1. GLOBAL STATE & INDIA COORDINATES
// ==========================================
let state = {
    dispatchedCount: 0, mapInstance: null, routeLayer: null,
    trafficMode: false, weatherMode: false, chartInstance: null,
    fleet: [
        { id: 'IND-901', status: 'Idle', fuel: 98, order: '-', dest: '-' },
        { id: 'IND-902', status: 'Idle', fuel: 85, order: '-', dest: '-' },
        { id: 'IND-903', status: 'Idle', fuel: 76, order: '-', dest: '-' },
        { id: 'IND-904', status: 'Idle', fuel: 100, order: '-', dest: '-' }
    ],
    dispatchHistory: [],
    visualLayers: {
        traffic: null,
        weather: null
    }
};

let orderCounter = 8001;
let truckCounter = 905;

// INITIALIZE DSA GRAPH (Ensure dsa-algorithms.js is linked properly)
const indiaNetwork = typeof Graph !== 'undefined' ? new Graph() : null;
const orderQueue = typeof PriorityQueue !== 'undefined' ? new PriorityQueue() : null;

// EXPANDED CITIES DATABASE
const hubs = {
    "Agartala": [23.8315, 91.2868], "Agra": [27.1767, 78.0081], "Ahmedabad": [23.0225, 72.5714], "Aizawl": [23.7271, 92.7176], "Ajmer": [26.4499, 74.6399],
    "Aligarh": [27.8974, 78.0880], "Allahabad": [25.4358, 81.8463], "Ambala": [30.3782, 76.7767], "Amravati": [20.9320, 77.7523], "Amritsar": [31.6340, 74.8723],
    "Asansol": [23.6739, 86.9524], "Aurangabad": [19.8762, 75.3433], "Bangalore": [12.9716, 77.5946], "Bareilly": [28.3670, 79.4304], "Belagavi": [15.8497, 74.4977],
    "Bhatapara": [21.7333, 81.9333], "Bhavnagar": [21.7645, 72.1519], "Bhilai": [21.1895, 81.3533], "Bhopal": [23.2599, 77.4126], "Bhubaneswar": [20.2961, 85.8245],
    "Bikaner": [28.0229, 73.3119], "Bilaspur": [22.0797, 82.1409], "Chandigarh": [30.7333, 76.7794], "Chennai": [13.0827, 80.2707], "Coimbatore": [11.0168, 76.9558],
    "Cuttack": [20.4625, 85.8830], "Dehradun": [30.3165, 78.0322], "Delhi": [28.7041, 77.1025], "Dhanbad": [23.7957, 86.4304], "Durg": [21.1938, 81.2849],
    "Durgapur": [23.5204, 87.3119], "Erode": [11.3410, 77.7172], "Faridabad": [28.4089, 77.3178], "Gaya": [24.7914, 85.0002], "Ghaziabad": [28.6692, 77.4538],
    "Gorakhpur": [26.7606, 83.3732], "Gulbarga": [17.3297, 76.8343], "Guntur": [16.3067, 80.4365], "Gurgaon": [28.4595, 77.0266], "Guwahati": [26.1445, 91.7362],
    "Gwalior": [26.2124, 78.1772], "Hubli": [15.3647, 75.1240], "Hyderabad": [17.3850, 78.4867], "Imphal": [24.8170, 93.9368], "Indore": [22.7196, 75.8577],
    "Jabalpur": [23.1815, 79.9864], "Jaipur": [26.9124, 75.7873], "Jalandhar": [31.3260, 75.5762], "Jalgaon": [21.0077, 75.5626], "Jammu": [32.7266, 74.8570],
    "Jamnagar": [22.4707, 70.0577], "Jamshedpur": [22.8046, 86.2029], "Jhansi": [25.4484, 78.5685], "Jodhpur": [26.2389, 73.0243], "Kakinada": [16.9891, 82.2475],
    "Kannur": [11.8745, 75.3704], "Kanpur": [26.4499, 80.3319], "Kharagpur": [22.3302, 87.3237], "Kochi": [9.9312, 76.2673], "Kolhapur": [16.7050, 74.2433],
    "Kolkata": [22.5726, 88.3639], "Kollam": [8.8932, 76.6141], "Korba": [22.3595, 82.7501], "Kota": [25.2138, 75.8648], "Kozhikode": [11.2588, 75.7804],
    "Kurnool": [15.8281, 78.0373], "Lucknow": [26.8467, 80.9462], "Ludhiana": [30.9010, 75.8573], "Madurai": [9.9252, 78.1198], "Mangalore": [12.9141, 74.8560],
    "Mathura": [27.4924, 77.6737], "Meerut": [28.9845, 77.7064], "Moradabad": [28.8386, 78.7733], "Mumbai": [19.0760, 72.8777], "Mysuru": [12.2958, 76.6394],
    "Nagpur": [21.1458, 79.0882], "Nanded": [19.1383, 77.3210], "Nashik": [19.9975, 73.7898], "Nellore": [14.4426, 79.9865], "Noida": [28.5355, 77.3910],
    "Patiala": [30.3398, 76.3869], "Patna": [25.5941, 85.1376], "Pondicherry": [11.9416, 79.8083], "Pune": [18.5204, 73.8567], "Raigarh": [21.8974, 83.3950],
    "Raipur (HQ)": [21.2514, 81.6296], "Rajahmundry": [17.0005, 81.8040], "Rajkot": [22.3039, 70.8022], "Rajnandgaon": [21.1011, 80.9701], "Ranchi": [23.3441, 85.3096],
    "Rourkela": [22.2604, 84.8536], "Saharanpur": [29.9640, 77.5460], "Salem": [11.6643, 78.1460], "Sangli": [16.8524, 74.5815], "Shillong": [25.5788, 91.8933],
    "Shimla": [31.1048, 77.1734], "Siliguri": [26.7271, 88.3953], "Solapur": [17.6599, 75.9064], "Srinagar": [34.0837, 74.7973], "Surat": [21.1702, 72.8311],
    "Thiruvananthapuram": [8.5241, 76.9366], "Thrissur": [10.5276, 76.2144], "Tilda-Neora": [21.5361, 81.7643], "Tiruchirappalli": [10.7905, 78.7047], "Tirunelveli": [8.7139, 77.7567],
    "Tirupati": [13.6288, 79.4192], "Tiruppur": [11.1085, 77.3411], "Udaipur": [24.5854, 73.7125], "Ujjain": [23.1765, 75.7885], "Vadodara": [22.3072, 73.1812],
    "Varanasi": [25.3176, 82.9739], "Vellore": [12.9165, 79.1325], "Vijayawada": [16.5062, 80.6480], "Visakhapatnam": [17.6868, 83.2185], "Warangal": [17.9689, 79.5941]
};

const coreHubs = ['Raipur (HQ)', 'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Patna', 'Bhopal', 'Nagpur'];

if (indiaNetwork) {
    Object.keys(hubs).forEach(z => indiaNetwork.addNode(z));
    
    // CONNECT CORE BACKBONE
    indiaNetwork.addEdge('Raipur (HQ)', 'Nagpur', 280); indiaNetwork.addEdge('Raipur (HQ)', 'Bhopal', 500); indiaNetwork.addEdge('Raipur (HQ)', 'Kolkata', 830);
    indiaNetwork.addEdge('Nagpur', 'Hyderabad', 500); indiaNetwork.addEdge('Hyderabad', 'Bangalore', 570); indiaNetwork.addEdge('Bangalore', 'Chennai', 350); indiaNetwork.addEdge('Hyderabad', 'Chennai', 620);
    indiaNetwork.addEdge('Nagpur', 'Pune', 710); indiaNetwork.addEdge('Pune', 'Mumbai', 150); indiaNetwork.addEdge('Mumbai', 'Ahmedabad', 530);
    indiaNetwork.addEdge('Bhopal', 'Delhi', 750); indiaNetwork.addEdge('Bhopal', 'Jaipur', 600); indiaNetwork.addEdge('Jaipur', 'Delhi', 270); indiaNetwork.addEdge('Ahmedabad', 'Jaipur', 670);
    indiaNetwork.addEdge('Delhi', 'Lucknow', 500); indiaNetwork.addEdge('Lucknow', 'Patna', 530); indiaNetwork.addEdge('Patna', 'Kolkata', 580);

    // DYNAMICALLY CONNECT ALL OTHER CITIES TO THEIR NEAREST CORE HUB
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
        return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    }

    Object.keys(hubs).forEach(city => {
        if(!coreHubs.includes(city)) {
            let minDist = Infinity;
            let nearestHub = null;
            coreHubs.forEach(core => {
                let d = getDistance(hubs[city][0], hubs[city][1], hubs[core][0], hubs[core][1]);
                if(d < minDist) { minDist = d; nearestHub = core; }
            });
            if(nearestHub) {
                indiaNetwork.addEdge(city, nearestHub, minDist);
            }
        }
    });
}

// ==========================================
// 2. INITIALIZATION (Map & Chart)
// ==========================================
function initMap() {
    try {
        state.mapInstance = L.map('live-map').setView([22.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap', maxZoom: 19
        }).addTo(state.mapInstance);

        state.visualLayers.traffic = L.layerGroup().addTo(state.mapInstance);
        state.visualLayers.weather = L.layerGroup().addTo(state.mapInstance);

        Object.keys(hubs).forEach(z => {
            let isHQ = z === 'Raipur (HQ)';
            let isCore = coreHubs.includes(z);
            let radius = isHQ ? 10 : (isCore ? 7 : 4);
            let color = isHQ ? "#ef4444" : (isCore ? "#3b82f6" : "#9ca3af");
            
            let m = L.circleMarker(hubs[z], { 
                radius: radius, fillColor: color, 
                color: "#fff", weight: isCore ? 2 : 1, opacity: 1, fillOpacity: 0.9 
            }).addTo(state.mapInstance);
            m.bindPopup(`<b style="color:black; font-size:14px">${z}</b>`);
        });
    } catch (e) { console.error("Map Init Error:", e); }
}

const chartDataSets = {
    'day': { labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], data: [12, 19, 15, 25, 22, 10] },
    'week': { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [150, 230, 180, 290, 310, 120, 80] },
    'month': { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [850, 920, 1100, 1050] }
};

function initAnalytics() {
    try {
        const canvas = document.getElementById('mainChart');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            let gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

            state.chartInstance = new Chart(ctx, {
                type: 'line', 
                data: {
                    labels: chartDataSets['day'].labels,
                    datasets: [{
                        label: 'Dispatches', 
                        data: chartDataSets['day'].data,
                        borderColor: '#3b82f6', backgroundColor: gradient,
                        borderWidth: 3, tension: 0.4, fill: true,
                        pointBackgroundColor: '#ef4444', pointBorderColor: '#ffffff',
                        pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 7
                    }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { grid: { color: 'rgba(75, 85, 99, 0.2)' }, ticks: { color: '#9ca3af' } },
                        x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
                    }
                }
            });
        }
    } catch (e) { console.error("Chart Init Error:", e); }
}

function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute:'2-digit', second:'2-digit' };
    const timeString = now.toLocaleTimeString('en-US', options) + ' IST';
    const clockEl = document.getElementById('real-time-clock');
    if(clockEl) clockEl.innerText = timeString;
}

// ==========================================
// 3. CORE UI UPDATES
// ==========================================
function updateQueueUI() {
    try {
        document.getElementById('stat-pending').innerText = orderQueue ? orderQueue.items.length : 0;
        document.getElementById('stat-completed').innerText = state.dispatchedCount;
        const container = document.getElementById('live-queue-container');
        container.innerHTML = '';
        
        if(!orderQueue || orderQueue.isEmpty()) {
            container.innerHTML = `<div class="text-center text-gray-500 mt-10">Queue Empty</div>`;
            return;
        }

        orderQueue.items.forEach(item => {
            let typeClass = item.type === 'Hazmat' ? 'text-orange-500' : (item.type === 'Cold Chain' ? 'text-blue-400' : 'text-gray-400');
            container.innerHTML += `
                <div class="queue-item prio-${item.priority} bg-gray-900 p-3 rounded mb-2 border border-gray-700 shadow flex justify-between items-center">
                    <div class="w-3/4">
                        <div class="font-bold text-white text-sm">${item.element} <span class="text-[10px] bg-gray-800 px-1 ml-1 rounded ${typeClass}">${item.type}</span></div>
                        <div class="text-[11px] text-gray-400 mt-1 truncate" title="${item.fullAddress}">
                            <i class="fa-solid fa-user mr-1 text-gray-500"></i>${item.senderName} • <i class="fa-solid fa-envelope mx-1 text-gray-500"></i>${item.email} • <i class="fa-solid fa-location-dot mx-1 text-gray-500"></i>${item.fullAddress}
                        </div>
                    </div>
                    <div class="text-[10px] font-black bg-gray-800 px-2 py-1 rounded text-white border border-gray-600 whitespace-nowrap">P${item.priority}</div>
                </div>
            `;
        });
    } catch(e) { console.error("Queue UI Error", e); }
}

function updateFleetTable() {
    try {
        const tbody = document.getElementById('fleet-table-body');
        tbody.innerHTML = '';
        state.fleet.forEach(trk => {
            let status = trk.status === 'Idle' ? '<span class="text-gray-400">Standby</span>' : '<span class="text-green-400 animate-pulse">In Transit</span>';
            tbody.innerHTML += `<tr class="border-b border-gray-800"><td class="p-4 font-mono text-sm">${trk.id}</td><td class="p-4">${status}</td><td class="p-4 text-sm">${trk.fuel}%</td><td class="p-4 text-sm">${trk.order}</td><td class="p-4 text-sm">${trk.dest}</td></tr>`;
        });
    } catch(e) { console.error("Fleet UI Error", e); }
}

function updateTrackingLog() {
    try {
        const container = document.getElementById('tracking-log-container');
        if (state.dispatchHistory.length === 0) return;
        
        let html = '<div class="space-y-4">';
        [...state.dispatchHistory].reverse().forEach(log => {
            html += `
                <div class="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <p class="font-bold text-white text-lg">${log.orderId} <span class="text-sm font-normal text-gray-400">(${log.item})</span></p>
                            <p class="text-xs text-blue-400 mt-1 font-mono"><i class="fa-solid fa-truck"></i> Assigned to: ${log.truckId}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-500">${log.date} ${log.time}</p>
                            <p class="text-xs font-bold text-green-500 mt-1">Dispatched</p>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-3 rounded mt-2 border border-gray-700 text-xs text-gray-300 grid grid-cols-2 gap-2">
                        <div><span class="text-gray-500 block">Customer Name</span> ${log.name}</div>
                        <div><span class="text-gray-500 block">Contact & Email</span> ${log.phone} | ${log.email}</div>
                        <div class="col-span-2"><span class="text-gray-500 block">Delivery Address</span> ${log.address}</div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    } catch(e) { console.error("Tracking UI Error", e); }
}

function showAlert(message) {
    const c = document.getElementById('alert-container');
    if(!c) return;
    const a = document.createElement('div');
    a.className = `alert-box bg-gray-800 text-white px-5 py-3 rounded-lg shadow-2xl border border-gray-600 text-sm font-bold flex items-center gap-3`;
    a.innerHTML = `<i class="fa-solid fa-circle-check text-green-400"></i> ${message}`;
    c.appendChild(a);
    setTimeout(() => { a.classList.add('alert-fade-out'); setTimeout(() => a.remove(), 400); }, 3500);
}

// ==========================================
// 4. TAB NAVIGATION & MODALS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    setInterval(updateClock, 1000); updateClock();

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let targetId = e.currentTarget.getAttribute('data-target');
            document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
            document.querySelectorAll('.nav-btn').forEach(n => {
                n.classList.replace('bg-blue-600', 'hover:bg-gray-700');
                n.classList.remove('text-white');
                n.classList.add('text-gray-400');
            });
            document.getElementById(targetId).classList.remove('hidden');
            e.currentTarget.classList.replace('hover:bg-gray-700', 'bg-blue-600');
            e.currentTarget.classList.replace('text-gray-400', 'text-white');
            document.getElementById('page-title').innerText = e.currentTarget.innerText.trim();
            if(targetId === 'view-dashboard' && state.mapInstance) setTimeout(() => state.mapInstance.invalidateSize(), 200);
        });
    });

    document.getElementById('open-modal-btn').addEventListener('click', () => document.getElementById('add-order-modal').classList.remove('hidden'));
    document.getElementById('close-modal-btn').addEventListener('click', () => document.getElementById('add-order-modal').classList.add('hidden'));
    document.getElementById('open-support-btn').addEventListener('click', () => document.getElementById('support-modal').classList.remove('hidden'));
    document.getElementById('close-support-btn').addEventListener('click', () => document.getElementById('support-modal').classList.add('hidden'));
    
    document.getElementById('support-form').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('support-modal').classList.add('hidden');
        document.getElementById('support-form').reset();
        showAlert('Query submitted successfully. Our team will contact you soon.');
    });

    // ==========================================
    // 5. BUSINESS LOGIC (Form, Route, Dispatch)
    // ==========================================
    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if(!orderQueue) return showAlert("DSA Queue not initialized properly!");

        let name = document.getElementById('input-name').value;
        let phone = document.getElementById('input-phone').value;
        let email = document.getElementById('input-email').value;
        let item = document.getElementById('input-item').value;
        let hub = document.getElementById('input-hub').value; 
        let address = document.getElementById('input-address').value;
        let priority = parseInt(document.getElementById('input-priority').value);
        let type = document.getElementById('input-type').value;
        
        let id = `ORD-${orderCounter++}`;
        let customQElement = { 
            element: item, priority: priority, id: id, destination: hub, type: type,
            senderName: name, phone: phone, email: email, fullAddress: address 
        };
        
        let contain = false;
        for (let i = 0; i < orderQueue.items.length; i++) {
            if (orderQueue.items[i].priority > customQElement.priority) {
                orderQueue.items.splice(i, 0, customQElement);
                contain = true; break;
            }
        }
        if (!contain) orderQueue.items.push(customQElement);

        document.getElementById('add-order-modal').classList.add('hidden');
        document.getElementById('order-form').reset();
        updateQueueUI();
        showAlert(`Order ${id} registered successfully!`);
    });

    document.getElementById('calculate-route-btn').addEventListener('click', () => {
        if (!orderQueue || orderQueue.isEmpty()) return showAlert('Queue empty. Add an order first.');
        if (!indiaNetwork) return showAlert('Graph Network missing.');
        
        const dest = orderQueue.items[0].destination;
        const result = indiaNetwork.dijkstra('Raipur (HQ)', dest);
        
        if (state.routeLayer) state.mapInstance.removeLayer(state.routeLayer);

        const latlngs = result.path.map(node => hubs[node]);
        let color = state.weatherMode ? '#eab308' : (state.trafficMode ? '#ef4444' : '#3b82f6');
        state.routeLayer = L.polyline(latlngs, {color: color, weight: 4, dashArray: '10, 10'}).addTo(state.mapInstance);
        state.mapInstance.fitBounds(state.routeLayer.getBounds(), {padding: [50, 50]});

        let actualDistance = result.distance; 
        let baseSpeed = 75; 
        if (state.trafficMode) baseSpeed -= 30; 
        if (state.weatherMode) baseSpeed -= 20; 
        if (baseSpeed < 15) baseSpeed = 15; 

        let timeInHours = actualDistance / baseSpeed;
        let hrs = Math.floor(timeInHours);
        let mins = Math.round((timeInHours - hrs) * 60);
        let totalCost = actualDistance * 18;
        if(state.trafficMode) totalCost += (totalCost * 0.2);

        document.getElementById('info-dist').innerText = `${actualDistance} KM`;
        let speedEl = document.getElementById('info-speed');
        speedEl.innerText = `${baseSpeed} km/h`;
        speedEl.className = `text-lg font-black ${baseSpeed < 40 ? 'text-red-500' : 'text-yellow-400'}`;
        document.getElementById('info-eta').innerText = `${hrs}h ${mins}m`;
        document.getElementById('info-cost').innerText = `₹${Math.round(totalCost).toLocaleString()}`;
        document.getElementById('route-info-card').classList.remove('hidden');
    });

    function executeDispatch() {
        const order = orderQueue.dequeue();
        state.dispatchedCount++;

        let truck = state.fleet.find(t => t.status === 'Idle');
        if (!truck) truck = state.fleet[Math.floor(Math.random()*state.fleet.length)];
        
        truck.status = 'In Transit';
        truck.order = `${order.id}`;
        truck.dest = order.destination;
        truck.fuel -= Math.floor(Math.random()*15)+5; 
        if(truck.fuel < 0) truck.fuel = 100;

        let currentDate = new Date();
        state.dispatchHistory.push({ 
            orderId: order.id, item: order.element, dest: order.destination, 
            truckId: truck.id, 
            time: currentDate.toLocaleTimeString(),
            date: currentDate.toLocaleDateString(),
            name: order.senderName, phone: order.phone, email: order.email, address: order.fullAddress, type: order.type
        });

        updateQueueUI(); updateFleetTable(); updateTrackingLog();
        if (state.routeLayer) state.mapInstance.removeLayer(state.routeLayer);
        document.getElementById('route-info-card').classList.add('hidden');
    }

    document.getElementById('dispatch-action-btn').addEventListener('click', () => {
        if (!orderQueue || orderQueue.isEmpty()) return; executeDispatch(); showAlert("Order Dispatched.");
    });
    document.getElementById('batch-dispatch-btn').addEventListener('click', () => {
        if (!orderQueue || orderQueue.isEmpty()) return;
        let c = Math.min(orderQueue.items.length, 3);
        for(let i=0; i<c; i++) executeDispatch();
        showAlert(`${c} Orders batch dispatched!`);
    });
    
    document.getElementById('add-vehicle-btn').addEventListener('click', () => {
        state.fleet.push({ id: `IND-${truckCounter++}`, status: 'Idle', fuel: 100, order: '-', dest: '-' });
        updateFleetTable();
        showAlert(`New vehicle IND-${truckCounter-1} deployed.`);
    });
    
    document.getElementById('export-csv-btn').addEventListener('click', () => {
        if(state.dispatchHistory.length === 0) return showAlert('No data to export', true);
        
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "OrderID,Sender Name,Contact,Email,Package Type,Item,Destination City,Detailed Address,Assigned Truck,Dispatch Date,Dispatch Time,Status\n";
        
        state.dispatchHistory.forEach(row => {
            let cleanAddress = row.address ? row.address.replace(/,/g, ' - ') : 'N/A';
            let cleanName = row.name ? row.name.replace(/,/g, '') : 'N/A';
            let cleanPhone = row.phone ? row.phone.replace(/,/g, '') : 'N/A';
            let cleanEmail = row.email ? row.email.replace(/,/g, '') : 'N/A';
    
            csvContent += `${row.orderId},${cleanName},${cleanPhone},${cleanEmail},${row.type},${row.item},${row.dest},${cleanAddress},${row.truckId},${row.date},${row.time},In Transit\n`;
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dispatch_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlert("CSV Report Downloaded!");
    });
    
    document.querySelectorAll('.analytics-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.analytics-tab').forEach(t => {
                t.classList.remove('bg-blue-600', 'text-white');
                t.classList.add('text-gray-400');
            });
            e.currentTarget.classList.add('bg-blue-600', 'text-white');
            e.currentTarget.classList.remove('text-gray-400');

            const range = e.currentTarget.getAttribute('data-range');
            if(state.chartInstance) {
                state.chartInstance.data.labels = chartDataSets[range].labels;
                state.chartInstance.data.datasets[0].data = chartDataSets[range].data;
                state.chartInstance.update();
            }
        });
    });

    document.getElementById('weather-btn').addEventListener('click', (e) => {
        state.weatherMode = !state.weatherMode;
        const btn = e.currentTarget;
        
        if(state.weatherMode) {
            btn.innerHTML = `<i class="fa-solid fa-cloud-bolt text-yellow-400 mr-2"></i> Weather: Storms`;
            if(indiaNetwork) indiaNetwork.applyConditions(true, 3);
            
            L.circle(hubs['Chennai'], {color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 0.4, radius: 150000}).addTo(state.visualLayers.weather);
            L.circle(hubs['Kolkata'], {color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 0.4, radius: 120000}).addTo(state.visualLayers.weather);
            showAlert("Storm Warning: Coastal routes delayed.", true);
        } else {
            btn.innerHTML = `<i class="fa-solid fa-cloud-sun text-gray-300 mr-2"></i> Weather: Clear`;
            if(indiaNetwork) indiaNetwork.applyConditions(state.trafficMode, 2);
            
            state.visualLayers.weather.clearLayers();
            showAlert("Weather clear.");
        }
        if(!document.getElementById('route-info-card').classList.contains('hidden')) document.getElementById('calculate-route-btn').click();
    });

    document.getElementById('toggle-traffic-btn').addEventListener('click', (e) => {
        state.trafficMode = !state.trafficMode;
        const btn = e.currentTarget;
        const txt = document.getElementById('traffic-status-text');
        
        if(state.trafficMode) {
            btn.classList.replace('bg-gray-700', 'bg-red-900');
            txt.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2 text-red-500"></i> Congested Highway`;
            txt.classList.replace('text-blue-400', 'text-red-400');
            if(indiaNetwork) indiaNetwork.applyConditions(state.trafficMode || state.weatherMode, 2);
            
            L.circle(hubs['Delhi'], {color: '#ef4444', fillColor: '#f87171', fillOpacity: 0.5, radius: 80000}).addTo(state.visualLayers.traffic);
            L.circle(hubs['Mumbai'], {color: '#ef4444', fillColor: '#f87171', fillOpacity: 0.5, radius: 60000}).addTo(state.visualLayers.traffic);
            L.circle(hubs['Bangalore'], {color: '#ef4444', fillColor: '#f87171', fillOpacity: 0.5, radius: 70000}).addTo(state.visualLayers.traffic);
            
        } else {
            btn.classList.replace('bg-red-900', 'bg-gray-700');
            txt.innerHTML = `<i class="fa-solid fa-check-circle mr-2 text-green-500"></i> Clear (Optimal)`;
            txt.classList.replace('text-red-400', 'text-blue-400');
            if(indiaNetwork) indiaNetwork.applyConditions(state.trafficMode || state.weatherMode, 2);
            
            state.visualLayers.traffic.clearLayers();
        }
        if(!document.getElementById('route-info-card').classList.contains('hidden')) document.getElementById('calculate-route-btn').click();
    });

    initMap(); initAnalytics(); updateQueueUI(); updateFleetTable();
});