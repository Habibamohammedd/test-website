// Select toggle button and navigation menu
const toggleBtn = document.getElementById('toggle-btn');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// Toggle the menu display
toggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show'); 
  toggleBtn.classList.toggle('open');
  body.classList.toggle('no-scroll'); // Toggle no-scroll class on body
});

// Close menu on navigation link click
const navLinks = document.querySelectorAll('.nav-menu a'); 

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); 
    const sectionId = link.getAttribute('href').substring(1); 
    const section = document.getElementById(sectionId); 
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth' });

    // Hide the menu
    navMenu.classList.remove('show');
    toggleBtn.classList.remove('open'); 
    body.classList.remove('no-scroll'); // Remove no-scroll class from body
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////
//To prevent users from downloading or copying images
document.addEventListener("contextmenu", function(event) {
  if (event.target.tagName === "IMG") {
      event.preventDefault();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
      event.preventDefault();
  }
});
