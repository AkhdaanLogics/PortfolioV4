document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const launchpad = document.getElementById('launchpad');
    const launchpadMenu = document.getElementById('launchpad-menu');
    const galleryMenuItem = document.querySelector('.menu-left li:nth-child(2) a');
    const gallerySection = document.getElementById('gallery');
    const galleryDockItem = document.querySelector('.dock-item:nth-child(4) a');
    const closeButton = document.querySelector('.window-control.close');

    // Data proyek (hanya gambar)
    const projects = [
        { image: "assets/gallery/notetify.png" }, // Gambar 1
        { image: "assets/gallery/sulaptugas.png" }
    ];

    let currentSlide = 0;

    document.addEventListener('DOMContentLoaded', function () {
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
    
        // Fungsi untuk menggeser slide
        function changeSlide(direction) {
            const slides = document.querySelectorAll('.slide');
            const totalSlides = slides.length;
    
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
            const slideWidth = slides[0].clientWidth;
            document.querySelector('.slides').style.transform = `translateX(${-currentSlide * slideWidth}px)`;
        }
    
        // Event listener untuk tombol prev
        if (prevButton) {
            prevButton.addEventListener('click', function () {
                changeSlide(-1);
            });
        }
    
        // Event listener untuk tombol next
        if (nextButton) {
            nextButton.addEventListener('click', function () {
                changeSlide(1);
            });
        }
    });

    // Fungsi untuk memuat proyek ke dalam slider
    function loadProjects() {
        const projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '';

        projects.forEach((project) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="Project Image">
                </div>
            `;
            projectContainer.appendChild(slide);
        });

        // Set slide pertama sebagai aktif
        if (projectContainer.firstChild) {
            projectContainer.firstChild.classList.add('active');
        }
    }

    // Fungsi untuk menampilkan gallery
    function showGallery() {
        gallerySection.style.display = 'block';
        loadProjects();
    }

    // Fungsi untuk menutup gallery
    function closeGallery() {
        gallerySection.style.display = 'none';
    }

    // Event Listener untuk tombol close
    if (closeButton) {
        closeButton.addEventListener('click', closeGallery);
    }

    // Event Listener untuk Gallery di Menu
    if (galleryMenuItem) {
        galleryMenuItem.addEventListener('click', function (event) {
            event.preventDefault();
            launchpadMenu.style.display = 'none'; // Sembunyikan launchpad jika terbuka
            showGallery();
        });
    }

    // Event Listener untuk Gallery di Dock
    if (galleryDockItem) {
        galleryDockItem.addEventListener('click', function (event) {
            event.preventDefault();
            launchpadMenu.style.display = 'none'; // Sembunyikan launchpad jika terbuka
            showGallery();
        });
    }

    // Event Listener untuk menutup gallery saat klik di luar
    document.addEventListener('click', function (event) {
        if (gallerySection.style.display === 'block' &&
            !gallerySection.contains(event.target) &&
            !galleryMenuItem.contains(event.target) &&
            (!galleryDockItem || !galleryDockItem.contains(event.target))) {
            closeGallery();
        }
    });

    // Event Listener untuk Launchpad
    launchpad.addEventListener('click', function (event) {
        event.stopPropagation();
        if (launchpadMenu.style.display === 'none' || launchpadMenu.style.display === '') {
            launchpadMenu.style.display = 'block';
            gallerySection.style.display = 'none'; // Sembunyikan gallery jika launchpad dibuka
        } else {
            launchpadMenu.style.display = 'none';
        }
    });

    // Event Listener untuk menutup launchpad saat klik di luar
    document.addEventListener('click', function (event) {
        if (launchpadMenu.style.display === 'block' && !launchpadMenu.contains(event.target)) {
            launchpadMenu.style.display = 'none';
        }
    });

    // Fungsi untuk memperbarui waktu
    function updateTime() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString();
    }

    // Fungsi untuk memfilter aplikasi di Launchpad
    function filterApps() {
        const filter = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.launchpad-item');
        let hasMatch = false;

        items.forEach(function (item) {
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

    // Fungsi untuk memperbarui status baterai
    function updateBatteryStatus() {
        navigator.getBattery().then(function (battery) {
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

    // Fungsi untuk memperbarui status Wi-Fi
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

    // Event Listener untuk pencarian di Launchpad
    searchInput.addEventListener('input', filterApps);
    searchButton.addEventListener('click', filterApps);
    

    // Update waktu setiap detik
    setInterval(updateTime, 1000);
    updateTime();

    // Update status baterai dan Wi-Fi
    updateBatteryStatus();
    updateWifiStatus();
});