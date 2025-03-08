document.addEventListener("DOMContentLoaded", function () {
  // Get all the necessary elements
  const launchpad = document.getElementById("launchpad");
  const launchpadMenu = document.getElementById("launchpad-menu");
  const galleryMenuItem = document.querySelector(
    ".menu-left li:nth-child(2) a"
  );
  const gallerySection = document.getElementById("gallery");
  const galleryDockItem = document.querySelector(".dock-item:nth-child(4) a"); // Gallery in dock
  const closeButton = document.querySelector(".window-control.close");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const gallerySearch = document.querySelector(".gallery-search");

  // Project data - add all your projects here
  const projects = [
    {
      image: "assets/gallery/notetify.png",
      title: "Notetify",
      description:
        "A simple note-taking application with cloud sync capabilities.",
      link: "#",
      category: "web",
      color: "#FF6B6B",
    },
    {
      image: "assets/gallery/sulaptugas.png",
      title: "Sulap Tugas",
      description:
        "Task management application for students and professionals.",
      link: "#",
      category: "web",
      color: "#4ECDC4",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Weather App",
      description: "Real-time weather forecasting application.",
      link: "#",
      category: "web",
      color: "#FFD166",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Portfolio",
      description: "Personal portfolio website template.",
      link: "#",
      category: "web",
      color: "#6A0572",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Fitness Tracker",
      description: "Mobile app to track fitness activities and goals.",
      link: "#",
      category: "mobile",
      color: "#118AB2",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Chat App",
      description: "Real-time messaging application for mobile devices.",
      link: "#",
      category: "mobile",
      color: "#073B4C",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Food Delivery",
      description: "Food ordering and delivery mobile application.",
      link: "#",
      category: "mobile",
      color: "#06D6A0",
    },
    {
      image: "assets/gallery/placeholder.png",
      title: "Music Player",
      description: "Elegant music player application for mobile devices.",
      link: "#",
      category: "mobile",
      color: "#EF476F",
    },
    // Add more projects as needed
  ];

  // Function to show gallery and load projects
  function showGallery() {
    if (gallerySection) {
      gallerySection.style.display = "block";

      // Handle sidebar category selection
      const categoryItems = document.querySelectorAll(".gallery-sidebar li");
      if (categoryItems) {
        categoryItems.forEach((item) => {
          item.addEventListener("click", function () {
            // Remove active class from all items
            categoryItems.forEach((i) => i.classList.remove("active"));
            // Add active class to clicked item
            this.classList.add("active");
          });
        });
      }

      // Handle search
      if (gallerySearch) {
        gallerySearch.addEventListener("input", function () {
          const searchTerm = this.value.toLowerCase();
          const projectCards = document.querySelectorAll(".project-card");

          projectCards.forEach((card) => {
            const title = card
              .querySelector(".card-title")
              .textContent.toLowerCase();
            if (title.includes(searchTerm)) {
              card.style.display = "flex";
            } else {
              card.style.display = "none";
            }
          });
        });
      }

      // Handle project card clicks
      const projectCards = document.querySelectorAll(".project-card");
      if (projectCards) {
        projectCards.forEach((card) => {
          card.addEventListener("click", function () {
            // Show project details (you could implement a modal here)
            const title = this.querySelector(".card-title").textContent;
            console.log(`Clicked on project: ${title}`);
            // You can add code to show a detailed view of the project
          });
        });
      }
    }
  }

  // Function to close gallery
  function closeGallery() {
    if (gallerySection) {
      gallerySection.style.display = "none";
    }
  }

  // Setup event listeners

  // Open gallery from menu bar
  if (galleryMenuItem) {
    galleryMenuItem.addEventListener("click", function (event) {
      event.preventDefault();
      if (launchpadMenu) launchpadMenu.style.display = "none";
      showGallery();
    });
  }

  // Open gallery from dock
  if (galleryDockItem) {
    galleryDockItem.addEventListener("click", function (event) {
      event.preventDefault();
      if (launchpadMenu) launchpadMenu.style.display = "none";
      showGallery();
    });
  }

  // Close gallery with close button
  if (closeButton) {
    closeButton.addEventListener("click", closeGallery);
  }

  // Open launchpad
  if (launchpad && launchpadMenu) {
    launchpad.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (
        launchpadMenu.style.display === "none" ||
        launchpadMenu.style.display === ""
      ) {
        launchpadMenu.style.display = "block";
        if (gallerySection) gallerySection.style.display = "none";
      } else {
        launchpadMenu.style.display = "none";
      }
    });
  }

  // Close when clicking outside
  document.addEventListener("click", function (event) {
    // Close launchpad when clicking outside
    if (
      launchpadMenu &&
      launchpadMenu.style.display === "block" &&
      !launchpadMenu.contains(event.target) &&
      event.target !== launchpad
    ) {
      launchpadMenu.style.display = "none";
    }

    // Close gallery when clicking outside (but not on gallery controls)
    if (
      gallerySection &&
      gallerySection.style.display === "block" &&
      !gallerySection.contains(event.target) &&
      !galleryMenuItem?.contains(event.target) &&
      !galleryDockItem?.contains(event.target)
    ) {
      closeGallery();
    }
  });

  // Filter apps in launchpad
  if (searchInput) {
    searchInput.addEventListener("input", filterApps);
  }

  if (searchButton) {
    searchButton.addEventListener("click", filterApps);
  }

  function filterApps() {
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll(".launchpad-item");
    let hasMatch = false;

    items.forEach(function (item) {
      const textElement = item.querySelector("p");
      if (textElement) {
        const text = textElement.textContent.toLowerCase();
        if (text.includes(filter)) {
          item.style.display = "";
          hasMatch = true;
        } else {
          item.style.display = "none";
        }
      }
    });

    const noResult = document.querySelector(".no-result");
    if (noResult) {
      noResult.style.display = hasMatch ? "none" : "block";
    }
  }

  // Initialize time updates
  function updateTime() {
    const timeElement = document.getElementById("time");
    if (timeElement) {
      const now = new Date();
      timeElement.innerText = now.toLocaleTimeString();
    }
  }

  setInterval(updateTime, 1000);
  updateTime();
});
