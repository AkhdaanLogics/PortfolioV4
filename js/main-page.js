document.addEventListener("DOMContentLoaded", function () {
  // Get all the necessary elements

  // Fix: Change the selector to target the correct menu item (3rd li element)
  const galleryMenuItem = document.querySelector(
    ".menu-left li:nth-child(3) a"
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
    console.log("Closing gallery..."); // Debug log
    if (gallerySection) {
      gallerySection.style.display = "none";
    }
  }

  // Setup event listeners

  // Fix: Add a debug log to check if gallery menu item is found
  console.log("Gallery menu item:", galleryMenuItem);

  // Open gallery from menu bar
  if (galleryMenuItem) {
    galleryMenuItem.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Gallery menu item clicked"); // Debug log
      showGallery();
    });
  } else {
    console.log("Gallery menu item not found!"); // Debug log
  }

  // Open gallery from dock
  if (galleryDockItem) {
    galleryDockItem.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Gallery dock item clicked"); // Debug log
      showGallery();
    });
  } else {
    console.log("Gallery dock item not found!"); // Debug log
  }

  // Close gallery with close button
  if (closeButton) {
    closeButton.addEventListener("click", closeGallery);
  }

  // Close when clicking outside
  document.addEventListener("click", function (event) {
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
