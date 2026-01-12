// selecting
const sections = document.querySelectorAll("section");
const productsSection = document.querySelector(".product-section");
const productsContainer = document.querySelector(".products-container");
const products = document.querySelectorAll(".product-one-container");
const gallery = document.querySelector(".gallery-section")
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

//gallery section

const galleryImages = [
    "images&videos/gallery-products/1.jpg",
    "images&videos/gallery-products/2.jpg",
    "images&videos/gallery-products/3.jpg",
    "images&videos/gallery-products/4.jpg",
    "images&videos/gallery-products/5.jpg",
    "images&videos/gallery-products/6.jpg",
    "images&videos/gallery-products/7.jpg",
    "images&videos/gallery-products/8.jpg",
    "images&videos/gallery-products/9.jpg",
    "images&videos/gallery-products/10.jpg",
    "images&videos/gallery-products/11.jpg",
    "images&videos/gallery-products/12.jpg",
    "images&videos/gallery-products/13.jpg",
    "images&videos/gallery-products/14.jpg",
    "images&videos/gallery-products/15.jpg",
    "images&videos/gallery-products/16.jpg",
    "images&videos/gallery-products/17.jpg",
    "images&videos/gallery-products/18.jpg",
    "images&videos/gallery-products/19.jpg",
    "images&videos/gallery-products/20.jpg",
    "images&videos/gallery-products/21.jpg",
    "images&videos/gallery-products/23.jpg",
    "images&videos/gallery-products/24.jpg",
    "images&videos/gallery-products/25.jpg",
    "images&videos/gallery-products/26.jpg",
    "images&videos/gallery-products/27.jpg",
    "images&videos/gallery-products/28.jpg",
    "images&videos/gallery-products/29.jpg",
    "images&videos/gallery-products/30.jpg",
    "images&videos/gallery-products/31.jpg",
    "images&videos/gallery-products/32.jpg",
    "images&videos/gallery-products/1.jpg",
    "images&videos/gallery-products/2.jpg",
    "images&videos/gallery-products/3.jpg",
    "images&videos/gallery-products/4.jpg",
     "images&videos/gallery-products/22.jpg",
];

galleryImages.forEach( src => {
    const img = document.createElement("img");

    img.src = src;
    img.className = "gallery-image";
    gallery.appendChild(img);
})