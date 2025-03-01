document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const launchpad = document.getElementById('launchpad');
    const launchpadMenu = document.getElementById('launchpad-menu');

    function updateTime() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString();
    }

    function filterApps() {
        const filter = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.launchpad-item');
        let hasMatch = false;

        items.forEach(function(item) {
            const textElement = item.querySelector('p');
            if (textElement) {
                const text = textElement.textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.style.display = '';
                    hasMatch = true;
                } else {
                    item.style.display = 'none';
                }
            }
        });

        const noResult = document.querySelector('.no-result');
        noResult.style.display = hasMatch ? 'none' : 'block';
    }

    function updateBatteryStatus() {
        navigator.getBattery().then(function(battery) {
            const batteryLevel = Math.round(battery.level * 100);
            const batteryIcon = document.getElementById('battery');
            const batteryTooltip = document.getElementById('battery-tooltip');
            
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
        });
    }

    function updateWifiStatus() {
        const wifiIcon = document.getElementById('wifi');
        const wifiTooltip = document.getElementById('wifi-tooltip');

        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const isConnected = connection.effectiveType !== 'none';
            const wifiLevel = connection.effectiveType;
            const networkName = connection.type;

            if (isConnected) {
                wifiIcon.className = "bi bi-wifi";
                wifiTooltip.innerText = `Connected to ${networkName} (${wifiLevel.charAt(0).toUpperCase() + wifiLevel.slice(1)})`;
            } else {
                wifiIcon.className = "bi bi-wifi-off";
                wifiTooltip.innerText = "Wi-Fi: Disconnected";
            }
        }
    }

    // Handle klik Launchpad
    launchpad.addEventListener('click', function(event) {
        event.stopPropagation();
        if (launchpadMenu.style.display === 'none' || launchpadMenu.style.display === '') {
            launchpadMenu.style.display = 'block';
        } else {
            launchpadMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (launchpadMenu.style.display === 'block' && !launchpadMenu.contains(event.target)) {
            launchpadMenu.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', filterApps);
    searchButton.addEventListener('click', filterApps);
    setInterval(updateTime, 1000);
    updateTime();
    updateBatteryStatus();
    updateWifiStatus();
});