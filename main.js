
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



navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const sectionId = link.getAttribute('href');

    if (sectionId.startsWith("#")) {  // Only prevent default for internal links
      event.preventDefault();
      const section = document.getElementById(sectionId.substring(1));

      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });

        // Hide the menu after clicking
        navMenu.classList.remove('show');
        toggleBtn.classList.remove('open'); 
        body.classList.remove('no-scroll');
      }
    }
  });
});


//////////////////////////////////////stars///////////////////////////////////////

var canvas, context;
var screenH, screenW;
var stars = [];
var fps = 50;
var numStars = 10; // Fewer stars for a cleaner effect

$(document).ready(function () {
  screenH = $(window).height();
  screenW = $(window).width();

  canvas = $('#space');
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');

  for (var i = 0; i < numStars; i++) {
    var x = Math.random() * screenW;
    var y = Math.random() * screenH;
    var speed = 0.2 + Math.random() * 0.5; // Slower movement
    var direction = Math.random() < 0.5 ? 1 : -1;
    var length = 1 + Math.random() * 2;
    var opacity = 0.5 + Math.random() * 0.5; // Brighter stars

    stars.push(new Star(x, y, speed, direction, length, opacity));
  }

  setInterval(animate, 1000 / fps);
});

// Star constructor
function Star(x, y, speed, direction, length, opacity) {
  this.x = x;
  this.y = y;
  this.speedX = speed * direction; // Horizontal movement
  this.speedY = speed * 0.3; // Slower vertical movement
  this.length = length;
  this.opacity = opacity;
}

Star.prototype.draw = function () {
  context.save();
  context.translate(this.x, this.y);

  context.beginPath();
  for (var i = 5; i--;) {
    context.lineTo(0, this.length);
    context.translate(0, this.length);
    context.rotate(Math.PI * 2 / 10);
    context.lineTo(0, -this.length);
    context.translate(0, -this.length);
    context.rotate(-Math.PI * 6 / 10);
  }
  context.closePath();

  context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White stars
  context.shadowBlur = 5;
  context.shadowColor = '#ffffff'; // White glow effect
  context.fill();

  context.restore();
};

// Update animation
function animate() {
  context.clearRect(0, 0, screenW, screenH);

  stars.forEach(star => {
    star.x += star.speedX; // Move stars horizontally
    star.y += star.speedY; // Move stars slowly downward

    // Reset position when stars leave the screen
    if (star.x > screenW || star.y > screenH) {
      star.x = Math.random() * screenW;
      star.y = -10; // Restart from the top
    }

    star.draw(context);
  });
}

