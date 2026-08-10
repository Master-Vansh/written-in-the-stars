/* =========================================
   WRITTEN IN THE STARS
   LEO × NOVA
========================================= */

const chapters = [

    {
        number: "I",
        title: "Where It All Began",

        images: [
            "images/chapter1/image1.jpg",
            "images/chapter1/image2.jpg",
            "images/chapter1/image3.jpg"
        ]
    },

    {
        number: "II",
        title: "Somewhere Between Us",

        images: [
            "images/chapter2/image1.jpg",
            "images/chapter2/image2.jpg",
            "images/chapter2/image3.jpg"
        ]
    },

    {
        number: "III",
        title: "The Little Things",

        images: [
            "images/chapter3/image1.jpg",
            "images/chapter3/image2.jpg",
            "images/chapter3/image3.jpg"
        ]
    },

    {
        number: "IV",
        title: "A World of Our Own",

        images: [
            "images/chapter4/image1.jpg",
            "images/chapter4/image2.jpg",
            "images/chapter4/image3.jpg"
        ]
    },

    {
        number: "V",
        title: "Through the Storm",

        images: [
            "images/chapter5/image1.jpg",
            "images/chapter5/image2.jpg",
            "images/chapter5/image3.jpg"
        ]
    },

    {
        number: "VI",
        title: "Wherever We Go",

        images: [
            "images/chapter6/image1.jpg",
            "images/chapter6/image2.jpg",
            "images/chapter6/image3.jpg"
        ]
    },

    {
        number: "VII",
        title: "Written in the Stars",

        images: [
            "images/chapter7/image1.jpg",
            "images/chapter7/image2.jpg",
            "images/chapter7/image3.jpg"
        ]
    }

];


/* =========================================
   STATE
========================================= */

let currentChapter = 0;
let currentPage = 0;


/* =========================================
   ELEMENTS
========================================= */

const homeScreen =
    document.getElementById("homeScreen");

const readerScreen =
    document.getElementById("readerScreen");

const openStoryBtn =
    document.getElementById("openStoryBtn");

const backHomeBtn =
    document.getElementById("backHomeBtn");

const menuBtn =
    document.getElementById("menuBtn");

const closeMenuBtn =
    document.getElementById("closeMenuBtn");

const chapterMenu =
    document.getElementById("chapterMenu");

const chapterList =
    document.getElementById("chapterList");

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterTitle =
    document.getElementById("chapterTitle");

const headerChapter =
    document.getElementById("headerChapter");

const comicImage =
    document.getElementById("comicImage");

const imageLoading =
    document.getElementById("imageLoading");

const previousPageBtn =
    document.getElementById("previousPageBtn");

const nextPageBtn =
    document.getElementById("nextPageBtn");

const pageNumber =
    document.getElementById("pageNumber");

const pageTotal =
    document.getElementById("pageTotal");

const progressBar =
    document.getElementById("progressBar");

const chapterDots =
    document.getElementById("chapterDots");

const chapterEnd =
    document.getElementById("chapterEnd");

const nextChapterTitle =
    document.getElementById("nextChapterTitle");

const continueBtn =
    document.getElementById("continueBtn");


/* =========================================
   OPEN STORY
========================================= */

openStoryBtn.addEventListener("click", () => {

    homeScreen.classList.add("hidden");

    readerScreen.classList.remove("hidden");

    currentChapter = 0;
    currentPage = 0;

    renderChapter();

});


/* =========================================
   BACK HOME
========================================= */

backHomeBtn.addEventListener("click", () => {

    readerScreen.classList.add("hidden");

    chapterMenu.classList.add("hidden");

    chapterEnd.classList.add("hidden");

    homeScreen.classList.remove("hidden");

});


/* =========================================
   MENU
========================================= */

menuBtn.addEventListener("click", () => {

    buildChapterMenu();

    chapterMenu.classList.remove("hidden");

});


closeMenuBtn.addEventListener("click", () => {

    chapterMenu.classList.add("hidden");

});


chapterMenu.addEventListener("click", (event) => {

    if (event.target === chapterMenu) {

        chapterMenu.classList.add("hidden");

    }

});


/* =========================================
   CHAPTER MENU
========================================= */

function buildChapterMenu() {

    chapterList.innerHTML = "";

    chapters.forEach((chapter, index) => {

        const button =
            document.createElement("button");

        button.className =
            "chapter-list-button";

        if (index === currentChapter) {

            button.classList.add("active");

        }

        button.innerHTML = `

            <span>
                Chapter ${chapter.number}
            </span>

            <span>
                ${chapter.title}
            </span>

        `;

        button.addEventListener("click", () => {

            currentChapter = index;

            currentPage = 0;

            chapterMenu.classList.add("hidden");

            chapterEnd.classList.add("hidden");

            renderChapter();

        });

        chapterList.appendChild(button);

    });

}


/* =========================================
   RENDER CHAPTER
========================================= */

function renderChapter() {

    const chapter =
        chapters[currentChapter];

    chapterNumber.textContent =
        `CHAPTER ${chapter.number}`;

    headerChapter.textContent =
        `CHAPTER ${chapter.number}`;

    chapterTitle.textContent =
        chapter.title;

    currentPage = 0;

    buildChapterDots();

    loadPage();

}


/* =========================================
   CHAPTER DOTS
========================================= */

function buildChapterDots() {

    chapterDots.innerHTML = "";

    chapters.forEach((chapter, index) => {

        const dot =
            document.createElement("div");

        dot.className =
            "chapter-dot";

        if (index === currentChapter) {

            dot.classList.add("active");

        }

        dot.title =
            `Chapter ${chapter.number}`;

        dot.addEventListener("click", () => {

            currentChapter = index;

            currentPage = 0;

            chapterEnd.classList.add("hidden");

            renderChapter();

        });

        chapterDots.appendChild(dot);

    });

}


/* =========================================
   LOAD PAGE
========================================= */

function loadPage() {

    const chapter =
        chapters[currentChapter];

    const imagePath =
        chapter.images[currentPage];

    imageLoading.classList.remove("hidden");

    comicImage.classList.remove("visible");

    comicImage.onload = () => {

        imageLoading.classList.add("hidden");

        comicImage.classList.add("visible");

    };

    comicImage.onerror = () => {

        imageLoading.classList.add("hidden");

        comicImage.classList.remove("visible");

    };

    comicImage.src = imagePath;

    updateControls();

}


/* =========================================
   CONTROLS
========================================= */

function updateControls() {

    const chapter =
        chapters[currentChapter];

    const total =
        chapter.images.length;

    pageNumber.textContent =
        String(currentPage + 1).padStart(2, "0");

    pageTotal.textContent =
        String(total).padStart(2, "0");

    const percentage =
        ((currentPage + 1) / total) * 100;

    progressBar.style.width =
        `${percentage}%`;

    previousPageBtn.disabled =
        currentPage === 0;

    nextPageBtn.disabled =
        currentPage === total - 1;

}


/* =========================================
   NEXT PAGE
========================================= */

function nextPage() {

    const chapter =
        chapters[currentChapter];

    if (
        currentPage <
        chapter.images.length - 1
    ) {

        currentPage++;

        animatePage("next");

        return;

    }

    showChapterEnd();

}


/* =========================================
   PREVIOUS PAGE
========================================= */

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        animatePage("previous");

    }

}


/* =========================================
   PAGE ANIMATION
========================================= */

function animatePage(direction) {

    comicImage.classList.remove("visible");

    comicImage.style.transform =
        direction === "next"
            ? "translateX(25px)"
            : "translateX(-25px)";

    setTimeout(() => {

        comicImage.style.transform =
            "translateX(0)";

        loadPage();

    }, 120);

}


/* =========================================
   BUTTONS
========================================= */

nextPageBtn.addEventListener(
    "click",
    nextPage
);

previousPageBtn.addEventListener(
    "click",
    previousPage
);


/* =========================================
   CLICK IMAGE
========================================= */

comicImage.addEventListener(
    "click",
    nextPage
);


/* =========================================
   CHAPTER END
========================================= */

function showChapterEnd() {

    const isLastChapter =
        currentChapter ===
        chapters.length - 1;

    if (isLastChapter) {

        nextChapterTitle.textContent =
            "The End... for now";

        continueBtn.textContent =
            "BACK TO BEGINNING";

        continueBtn.onclick = () => {

            currentChapter = 0;

            currentPage = 0;

            chapterEnd.classList.add("hidden");

            renderChapter();

        };

    } else {

        const nextChapter =
            chapters[currentChapter + 1];

        nextChapterTitle.textContent =
            `Chapter ${nextChapter.number}`;

        continueBtn.textContent =
            "CONTINUE →";

        continueBtn.onclick = () => {

            currentChapter++;

            currentPage = 0;

            chapterEnd.classList.add("hidden");

            renderChapter();

        };

    }

    chapterEnd.classList.remove("hidden");

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            readerScreen.classList.contains(
                "hidden"
            )
        ) {
            return;
        }

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

        if (event.key === "Escape") {

            chapterMenu.classList.add(
                "hidden"
            );

            chapterEnd.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

function initialize() {

    buildChapterDots();

    updateControls();

}

initialize();