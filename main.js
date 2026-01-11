//selection
const allProductsContainer = document.querySelector(".products-container");
const aboutContainer = document.querySelector(".about-section"); 

let hasJumped = false;
//probaj sa aboutSection
aboutContainer.addEventListener("wheel", (e) => {
    if (hasJumped) return;

    const section = aboutContainer.getBoundingClientRect();

    //now it must be in current viewport
    const isInView = section.top <= 0 && section.bottom > aboutContainer.innerHeight / 2;

    if(!hasJumped && isInView && e.deltaY > 0)
        e.preventDefault();

    hasJumped = true;

    allProductsContainer.scrollIntoView({
        behavior: "smooth"
    })
}, {passive : false});

aboutContainer.addEventListener("scroll", () => {
    const section = aboutContainer.getBoundingClientRect();

    if(section.top >= 0) {
        hasJumped = false;
    }
})

// wheel on all container
allProductsContainer.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        allProductsContainer.scrollLeft += e.deltaY;
    }
}, { passive: false });


// Sad mi treba da popravim skrol na dole sa about na product sekciju i onda da se skrolom na gore vrati gore 