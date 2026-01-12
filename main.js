// selecting
const sections = document.querySelectorAll("section");
const productsSection = document.querySelector(".product-section");
const productsContainer = document.querySelector(".products-container");
const products = document.querySelectorAll(".product-one-container");

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
