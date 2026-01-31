// selecting
const sections = document.querySelectorAll("section");
const productsSection = document.querySelector("#product-section");
const productsContainer = document.querySelector(".products-container");
const products = document.querySelectorAll(".product-one-container");
const gallery = document.querySelector("#gallery-section");
const contactBtn = document.getElementById("contact-btn");
const closeBtn = document.querySelector(".close-btn");
const contactSidebar = document.querySelector(".contact-sidebar");
const overlay = document.querySelector(".overlay");

//state
let currentSectionIndex = 0;
let currentProductIndex = 0;
let isScrolling = false;

//helper functions
function scrollToSection(index) {
    isScrolling = true;

    sections[index].scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function scrollToProduct(index) {
    isScrolling = true;

    products[index].scrollIntoView({
        behavior: "smooth",
        inline: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function isInProductsSection() {
    const rect = productsSection.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > window.innerHeight / 2;
}
function isInGallerySection() {
    const rect = gallery.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > window.innerHeight / 2;
}

productsContainer.addEventListener("scroll", () => {
    const index = Math.round(
        productsContainer.scrollLeft / productsContainer.clientWidth
    );
    currentProductIndex = index;
});
//main wheel handler
window.addEventListener(
    "wheel",
    (e) => {
        if (isScrolling) return;

          if (isInGallerySection()) {
            return; 
        }
        //product section
        if (isInProductsSection()) {
            // scroll down -> right
            if (e.deltaY > 0) {
                if (currentProductIndex < products.length - 1) {
                    e.preventDefault();
                    currentProductIndex++;
                    scrollToProduct(currentProductIndex);
                    return;
                }
            }
            // scroll up -> left
            if (e.deltaY < 0) {
                if (currentProductIndex > 0) {
                    e.preventDefault();
                    currentProductIndex--;
                    scrollToProduct(currentProductIndex);
                    return;
                }
            }
        }
        if(isInGallerySection()) {
            
        }
        //global section scroll
        if (e.deltaY > 0) {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                scrollToSection(currentSectionIndex);
            }
        } else {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex);
            }
        }
    },
    { passive: false }
);

// -------------------------sidebar--------------------------------

contactBtn.addEventListener("click", (e) => {
     e.preventDefault();

    contactSidebar.classList.add("active");
    overlay.classList.add("active");

      lockScroll();
})

closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
    contactSidebar.classList.remove("active");
    overlay.classList.remove("active");

    unlockScroll();
}

//------functions for scrolling sitebar <-> background---------
function lockScroll() {
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.scrollY}px`;
}

function unlockScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}

//----------footer answers---------

const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const questionFour = document.getElementById("question-four");

