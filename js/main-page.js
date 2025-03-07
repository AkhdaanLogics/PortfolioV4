document.addEventListener('DOMContentLoaded', function () {
    // Get all the necessary elements
    const launchpad = document.getElementById('launchpad');
    const launchpadMenu = document.getElementById('launchpad-menu');
    const galleryMenuItem = document.querySelector('.menu-left li:nth-child(2) a');
    const gallerySection = document.getElementById('gallery');
    const galleryDockItem = document.querySelector('.dock-item:nth-child(4) a'); // Gallery in dock
    const closeButton = document.querySelector('.window-control.close');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Project data - add all your projects here
    const projects = [
        { 
            image: "assets/gallery/notetify.png",
            title: "Notetify",
            description: "A simple note-taking application with cloud sync capabilities.",
            link: "#"
        },
        { 
            image: "assets/gallery/sulaptugas.png",
            title: "Sulap Tugas",
            description: "Task management application for students and professionals.",
            link: "#"
        }
        // Add more projects as needed
    ];

    let currentSlide = 0;

    // Function to load projects into the slider
    function loadProjects() {
        const projectContainer = document.getElementById('project-container');
        if (!projectContainer) {
            console.error('Project container not found');
            return;
        }
        
        projectContainer.innerHTML = '';

        projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title || 'Project Image'}">
                    </div>
                    <div class="project-details">
                        <h3>${project.title || 'Project Title'}</h3>
                        <p>${project.description || 'Project description goes here.'}</p>
                        <a href="${project.link || '#'}" class="project-link">View Project</a>
                    </div>
                </div>
            `;
            projectContainer.appendChild(slide);
        });

        // Position the slides correctly
        updateSlidePosition();
    }

    // Function to update slide position
    function updateSlidePosition() {
        const slides = document.querySelector('.slides');
        if (slides) {
            slides.style.transform = `translateX(${-currentSlide * 100}%)`;
        }
    }

    // Function to change slide
    function changeSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        if (totalSlides === 0) return;
        
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Function to show gallery
    function showGallery() {
        if (gallerySection) {
            gallerySection.style.display = 'block';
            loadProjects();
            
            // Make sure the navigation buttons work
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            
            if (prevButton) {
                prevButton.onclick = function() {
                    changeSlide(-1);
                };
            }
            
            if (nextButton) {
                nextButton.onclick = function() {
                    changeSlide(1);
                };
            }
        }
    }

    // Function to close gallery
    function closeGallery() {
        if (gallerySection) {
            gallerySection.style.display = 'none';
        }
    }

    // Setup event listeners
    
    // Open gallery from menu bar
    if (galleryMenuItem) {
        galleryMenuItem.addEventListener('click', function(event) {
            event.preventDefault();
            if (launchpadMenu) launchpadMenu.style.display = 'none';
            showGallery();
        });
    }

    // Open gallery from dock
    if (galleryDockItem) {
        galleryDockItem.addEventListener('click', function(event) {
            event.preventDefault();
            if (launchpadMenu) launchpadMenu.style.display = 'none';
            showGallery();
        });
    }

    // Close gallery with close button
    if (closeButton) {
        closeButton.addEventListener('click', closeGallery);
    }

    // Open launchpad
    if (launchpad && launchpadMenu) {
        launchpad.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (launchpadMenu.style.display === 'none' || launchpadMenu.style.display === '') {
                launchpadMenu.style.display = 'block';
                if (gallerySection) gallerySection.style.display = 'none';
            } else {
                launchpadMenu.style.display = 'none';
            }
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        // Close launchpad when clicking outside
        if (launchpadMenu && launchpadMenu.style.display === 'block' && 
            !launchpadMenu.contains(event.target) && 
            event.target !== launchpad) {
            launchpadMenu.style.display = 'none';
        }
        
        // Close gallery when clicking outside (but not on gallery controls)
        if (gallerySection && gallerySection.style.display === 'block' &&
            !gallerySection.contains(event.target) &&
            !galleryMenuItem?.contains(event.target) &&
            !galleryDockItem?.contains(event.target)) {
            closeGallery();
        }
    });

    // Filter apps in launchpad
    if (searchInput) {
        searchInput.addEventListener('input', filterApps);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', filterApps);
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
        if (noResult) {
            noResult.style.display = hasMatch ? 'none' : 'block';
        }
    }

    // Initialize time updates
    function updateTime() {
        const timeElement = document.getElementById('time');
        if (timeElement) {
            const now = new Date();
            timeElement.innerText = now.toLocaleTimeString();
        }
    }
    
    setInterval(updateTime, 1000);
    updateTime();
});