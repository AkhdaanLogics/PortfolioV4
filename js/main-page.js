document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const launchpad = document.getElementById('launchpad');
    const launchpadMenu = document.getElementById('launchpad-menu');
    const galleryMenuItem = document.querySelector('.menu-left li:nth-child(2) a'); // Select the Gallery menu item
    const gallerySection = document.getElementById('gallery'); // Select the gallery section
    const galleryDockItem = document.querySelector('.dock-item:nth-child(4) a'); // Gallery in dock
    
    const projects = [
        {
            title: "Project 1",
            description: "Description of project 1",
            image: "images/project1.jpg",
            link: "https://project1-link.com"
        },
        {
            title: "Project 2",
            description: "Description of project 2",
            image: "images/project2.jpg",
            link: "https://project2-link.com"
        },
        {
            title: "Project 3",
            description: "Description of project 3",
            image: "images/project3.jpg",
            link: "https://project3-link.com"
        }
        // Add more projects as needed
    ];

    // Function to load projects into gallery
    function loadProjects() {
        // Get the project container
        const projectContainer = document.getElementById('project-container');
        
        // Clear existing content if any
        projectContainer.innerHTML = '';
        
        // Add projects to container
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="project-link">View Project</a>
                </div>
            `;
            
            projectContainer.appendChild(projectCard);
        });
    }

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

    // Initially hide the gallery section
    gallerySection.style.display = 'none';

    // Add click event listener to the Gallery menu item
    galleryMenuItem.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Hide launchpad if it's open
        launchpadMenu.style.display = 'none';
        
        // Toggle the display of the gallery section
        if (gallerySection.style.display === 'none') {
            gallerySection.style.display = 'block';
            loadProjects(); // Load projects when gallery is displayed
        } else {
            gallerySection.style.display = 'none';
        }
    });
    
    // Also add click event to Gallery icon in dock
    if (galleryDockItem) {
        galleryDockItem.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Hide launchpad if it's open
            launchpadMenu.style.display = 'none';
            
            // Show gallery and load projects
            gallerySection.style.display = 'block';
            loadProjects();
        });
    }
    
    // Add close button functionality
    const closeGallery = function() {
        gallerySection.style.display = 'none';
    };
    
    // Close gallery when clicking outside (optional)
    document.addEventListener('click', function(event) {
        if (gallerySection.style.display === 'block' && 
            !gallerySection.contains(event.target) && 
            !galleryMenuItem.contains(event.target) &&
            (!galleryDockItem || !galleryDockItem.contains(event.target))) {
            closeGallery();
        }
    });

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
