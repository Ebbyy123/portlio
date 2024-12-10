let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    navbar.classList.add('hidden'); // Menyembunyikan navbar saat scroll ke bawah
  } else {
    navbar.classList.remove('hidden'); // Menampilkan navbar saat scroll ke atas
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Mencegah scroll negatif
});
// Ambil semua tautan di navbar
const links = document.querySelectorAll('.navbar a');

// Tambahkan event listener untuk klik pada tautan
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default (scroll langsung ke bagian)

    // Ambil id dari href dan temukan elemen tujuan
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // Scroll dengan animasi ke elemen tujuan
    targetElement.scrollIntoView({
      behavior: 'smooth', // Pilihan untuk scroll halus
      block: 'start' // Menjaga posisi di bagian atas elemen
    });
  });
});

const words = [
    "Rifky Tirta Zakaria",
    "Multi-Platform Developer",
    "Gamer",
    "IoT Developer",
    "Network Engineer",
    "Web Developer"
];

const typewriterElement = document.querySelector('.typewriter');
const typingSpeed = 150;  // Speed of typing (ms per character)
const delayBetweenWords = 1500;  // Delay before changing to the next word (ms)
const deletingSpeed = 75; // Speed for deleting (ms per character)

let currentWordIndex = 0;

function typeWord(word, callback) {
    let charIndex = 0;
    typewriterElement.textContent = ''; // Clear previous word
    typewriterElement.classList.add('typing'); // Add typing animation

    const typingInterval = setInterval(() => {
        typewriterElement.textContent += word.charAt(charIndex);
        charIndex++;
        if (charIndex === word.length) {
            clearInterval(typingInterval); // Stop typing when the word is fully typed
            setTimeout(() => deleteWord(callback), delayBetweenWords); // Start deleting after delay
        }
    }, typingSpeed);
}

function deleteWord(callback) {
    let charIndex = typewriterElement.textContent.length;
    typewriterElement.classList.remove('typing'); // Remove typing class
    typewriterElement.classList.add('deleting'); // Add deleting animation

    const deletingInterval = setInterval(() => {
        typewriterElement.textContent = typewriterElement.textContent.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            clearInterval(deletingInterval); // Stop deleting when word is fully deleted
            setTimeout(callback, delayBetweenWords); // Callback after delay
        }
    }, deletingSpeed);
}

function startTyping() {
    typeWord(words[currentWordIndex], () => {
        currentWordIndex = (currentWordIndex + 1) % words.length; // Move to the next word, loop back to the start
        startTyping(); // Repeat the typing process
    });
}

document.addEventListener('DOMContentLoaded', startTyping);


  // Mendapatkan elemen .about-me
const aboutMeSection = document.querySelector('.about-me');

// Fungsi untuk memeriksa apakah elemen sudah masuk dalam viewport
function checkAboutMeSection() {
  const sectionTop = aboutMeSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Jika bagian About Me sudah masuk ke viewport, tambahkan kelas "animate"
  if (sectionTop < windowHeight - 150) { // Muncul ketika 150px dari bawah viewport
    aboutMeSection.classList.add('animate');
  }
}

// Menambahkan event listener untuk scroll
window.addEventListener('scroll', checkAboutMeSection);

// Memeriksa status saat halaman pertama kali dimuat
checkAboutMeSection();



  // Mendapatkan semua elemen skill-item
const skillItems = document.querySelectorAll('.skill-item');

// Fungsi untuk memeriksa apakah elemen sudah terlihat saat di-scroll
function checkSkillItemsVisibility() {
  const windowHeight = window.innerHeight;

  // Periksa setiap item skill apakah sudah terlihat di viewport
  skillItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    // Jika elemen berada di dalam viewport, beri kelas untuk animasi
    if (itemTop < windowHeight - 150) { // Muncul ketika 150px dari bawah viewport
      item.classList.add('show-animation'); // Menambahkan kelas untuk memicu animasi
      // Atur delay berdasarkan urutan elemen untuk muncul satu per satu
      item.style.animationDelay = `${index * 0.2}s`; // Setiap item muncul 0.2 detik setelah sebelumnya
    }
  });
}

// Menambahkan event listener scroll
window.addEventListener('scroll', checkSkillItemsVisibility);

// Jalankan fungsi untuk memeriksa status elemen ketika pertama kali halaman dimuat
checkSkillItemsVisibility();




  
  document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".project-item");
  
    // Fungsi untuk mengecek apakah elemen ada di viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    };
  
    // Fungsi untuk menambahkan kelas "visible" ketika elemen masuk viewport
    const handleScroll = () => {
      projectItems.forEach((item) => {
        if (isInViewport(item)) {
          item.classList.add("visible");
        }
      });
    };
  
    // Tambahkan event listener untuk scroll
    window.addEventListener("scroll", handleScroll);
  
    // Panggil fungsi saat halaman pertama kali dimuat
    handleScroll();
  });
  
  let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};
