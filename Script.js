myID = document.getElementById("header-text");
logo = document.getElementById("logo");
homebtn = document.getElementById("homebtn");

var myScrollFunc = function() {
  var y = window.scrollY;
  // if (y >= 400) {
  if(homebtn.className!="active"){
    myID.className = "visble-text"
    logo.className = "hide-text"
  } else {
    
    myID.className = "hide-text"
    logo.className = "visble-text"
  }
};

window.addEventListener("scroll", myScrollFunc);





const typed = new Typed(".multiple-text", {
  strings: ["Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});







let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};





//project list

let currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    const totalItems = 5;
    const visibleItems = 2;
    const itemWidth = 410;

    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    function updateArrows() {
      // leftArrow.style.display = currentIndex === 0 ? 'none' : 'flex';
      // leftArrow.style.color = currentIndex === 0 ? 'transparent' : 'var(--text-color)' ;
      // leftArrow.style.backgroundColor = currentIndex === 0 ? 'transparent' : 'rgba(249, 245, 245, 0.23)' ;
      // leftArrow.classValue = currentIndex === 0 ? 'inactive' : 'active' ;
      // document.getElementById("box").classList.add(classValue);
      rightArrow.style.display = currentIndex >= totalItems - visibleItems ? 'none' : 'block';

      
      if (currentIndex === 0) {
        leftArrow.classList.remove('active');
        leftArrow.classList.add('inactive');
      } else {
        leftArrow.classList.remove('inactive');
        leftArrow.classList.add('active');
      }

    }

    function moveCarousel(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > totalItems - visibleItems) currentIndex = totalItems - visibleItems;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      updateArrows();
    }

    updateArrows();




// -----------------------------------------------------------------------------------------------------------------



document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
});


// document.getElementById("message").addEventListener("input", function () {
//   const maxWords = 3;
//   const words = this.value.trim().split(/\s+/);
//   if (words.length > maxWords) {
//     this.value = words.slice(0, maxWords).join(" ");
//   }
// });

const textarea = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const maxLength = 300;

  textarea.addEventListener("input", () => {
    const remaining = maxLength - textarea.value.length;
    charCount.textContent = `${remaining}/300 remaining`;
  });



  // const form = document.getElementById("form");
  // const formSubmitMsg = document.getElementById("form-submission-msg");
  

  // form.addEventListener("submit", function (event) {
  //   event.preventDefault(); // Prevent actual submission for demo
  //  form.style.display="none";
   
  //  setTimeout(function () {
  //   formSubmitMsg.style.display="block";
  // }, 2000);
    
  //   // You can also set a flag or perform other actions here
  // });








const canvas = document.getElementById('explosionCanvas');
        const ctx = canvas.getContext('2d');
        const blastButton = document.getElementById('blastButton');

        // Set canvas dimensions (e.g., fixed size or percentage)
        canvas.width = 800; // Example fixed width
        canvas.height = 450; // Example fixed height

        // Or, if you want it to fill a percentage of the parent/window:
        // canvas.width = window.innerWidth * 0.8;
        // canvas.height = window.innerHeight * 0.6;


        const particles = [];
        const colors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845', '#FFF']; // Explosion colors, added white

        class Particle {
            constructor(x, y, radius, color, velocity) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.velocity = velocity;
                this.alpha = 1; // Opacity
                this.gravity = 0.05; // Simulate gravity
                this.friction = 0.98; // Air resistance
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.y += this.gravity; // Apply gravity
                this.velocity.x *= this.friction; // Apply friction
                this.velocity.y *= this.friction; // Apply friction
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.02; // Fade out
                this.radius -= 0.05; // Shrink slightly
            }
        }

        function createExplosion(x, y) {
            const particleCount = 100; // More particles for a bigger blast
            for (let i = 0; i < particleCount; i++) {
                const radius = Math.random() * 6 + 2; // Random radius
                const color = colors[Math.floor(Math.random() * colors.length)];
                const angle = Math.random() * Math.PI * 2; // Random direction (0 to 2PI)
                const speed = Math.random() * 12 + 4; // Random speed (stronger initial blast)

                const velocity = {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed
                };
                particles.push(new Particle(x, y, radius, color, velocity));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.update();
                particle.draw();

                // Remove particles that have faded or shrunk too much
                if (particle.alpha <= 0 || particle.radius <= 0.5) {
                    particles.splice(i, 1);
                }
            }
        }

        // Trigger explosion when the button is clicked
        blastButton.addEventListener('click', () => {
            // Explode at the center of the canvas
            // const centerX = canvas.width / 2;
            // const centerY = canvas.height / 2;
            // createExplosion(centerX, centerY);
        });

        // Start the animation loop
        animate();