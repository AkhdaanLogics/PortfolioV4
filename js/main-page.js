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

    // Check if the Network Information API is supported
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isConnected = connection.effectiveType !== 'none';
        const wifiLevel = connection.effectiveType; // Use effectiveType for connection quality
        const networkName = connection.type; // Get the connection type

        if (isConnected) {
            wifiIcon.className = "bi bi-wifi";
            wifiTooltip.innerText = `Connected to ${networkName} (${wifiLevel.charAt(0).toUpperCase() + wifiLevel.slice(1)})`;
        } else {
            wifiIcon.className = "bi bi-wifi-off";
            wifiTooltip.innerText = "Wi-Fi: Disconnected";
        }
    } else {
        // Fallback for browsers that do not support the Network Information API
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('launchpad').addEventListener('click', function() {
        const launchpadMenu = document.getElementById('launchpad-menu');
        if (launchpadMenu.style.display === 'none' || launchpadMenu.style.display === '') {
            launchpadMenu.style.display = 'block'; // Show the menu
        } else {
            launchpadMenu.style.display = 'none'; // Hide the menu
        }
    });

    setInterval(updateTime, 1000);
    updateTime();
    updateBatteryStatus();
    updateWifiStatus();
    checkConnectionChanges();
});
