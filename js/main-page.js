function updateTime() {
    const now = new Date();
    document.getElementById('time').innerText = now.toLocaleTimeString();
}

function updateBatteryStatus() {
    navigator.getBattery().then(function(battery) {
        const batteryLevel = Math.round(battery.level * 100);
        const batteryIcon = document.getElementById('battery');
        const batteryTooltip = document.getElementById('battery-tooltip');
        
        // Update icon class based on battery level
        if (battery.charging) {
            batteryIcon.className = "bi bi-battery-charging";
            batteryTooltip.innerText = `Battery: ${batteryLevel}% (Charging)`;
        } else if (batteryLevel < 20) {
            batteryIcon.className = "bi bi-battery";
            batteryTooltip.innerText = `Battery: ${batteryLevel}% (Low)`;
        } else if (batteryLevel < 80) {
            batteryIcon.className = "bi bi-battery-half";
            batteryTooltip.innerText = `Battery: ${batteryLevel}%`;
        } else {
            batteryIcon.className = "bi bi-battery-full";
            batteryTooltip.innerText = `Battery: ${batteryLevel}%`;
        }
        
        // Listen for battery events
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
    });
}

function updateWifiStatus() {
    const wifiIcon = document.getElementById('wifi');
    const wifiTooltip = document.getElementById('wifi-tooltip');
    
    // In a real application, you would check actual connection
    // This is a simulation
    const isConnected = true; 
    const wifiLevel = 2; // Simulating Wi-Fi level (0: off, 1: low, 2: medium, 3: full)
    const networkName = "Akhdaan WiFi"; // Example network name
    
    if (wifiLevel === 3) {
        wifiIcon.className = "bi bi-wifi";
        wifiTooltip.innerText = `Connected to ${networkName} (Excellent)`;
    } else if (wifiLevel === 2) {
        wifiIcon.className = "bi bi-wifi-2";
        wifiTooltip.innerText = `Connected to ${networkName} (Good)`;
    } else if (wifiLevel === 1) {
        wifiIcon.className = "bi bi-wifi-1";
        wifiTooltip.innerText = `Connected to ${networkName} (Weak)`;
    } else {
        wifiIcon.className = "bi bi-wifi-off";
        wifiTooltip.innerText = "Wi-Fi: Disconnected";
    }
}

// Check if connection status changes (simulated)
function checkConnectionChanges() {
    // In a real application, you would use the Network Information API
    // or other methods to detect actual changes
    setInterval(function() {
        updateWifiStatus();
    }, 10000); // Check every 10 seconds
}

setInterval(updateTime, 1000);

window.onload = function() {
    updateTime();
    updateBatteryStatus();
    updateWifiStatus();
    checkConnectionChanges();
};