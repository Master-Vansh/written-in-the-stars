/* ==========================================
   WRITTEN IN THE STARS
   LEO × NOVA
========================================== */


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


let chapter = 0;
let page = 0;


/* ELEMENTS */

const home =
    document.getElementById("home");

const reader =
    document.getElementById("reader");

const openStory =
    document.getElementById("openStory");

const homeButton =
    document.getElementById("homeButton");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const menu =
    document.getElementById("chapterMenu");

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterTitle =
    document.getElementById("chapterTitle");

const topChapter =
    document.getElementById("topChapter");

const comicImage =
    document.getElementById("comicImage");

const loader =
    document.getElementById("loader");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const currentPage =
    document.getElementById("currentPage");

const totalPages =
    document.getElementById("totalPages");

const progress =
    document.getElementById("progress");

const chapterDots =
    document.getElementById("chapterDots");

const chapterList =
    document.getElementById("chapterList");

const chapterEnd =
    document.getElementById("chapterEnd");

const nextChapter =
    document.getElementById("nextChapter");

const continueButton =
    document.getElementById("continueButton");


/* OPEN */

openStory.onclick = function () {

    home.classList.add("hidden");

    reader.classList.remove("hidden");

    chapter = 0;
    page = 0;

    chapterEnd.classList.add("hidden");

    render();

};


/* HOME */

homeButton.onclick = function () {

    reader.classList.add("hidden");

    menu.classList.add("hidden");

    chapterEnd.classList.add("hidden");

    home.classList.remove("hidden");

};


/* MENU */

menuButton.onclick = function () {

    createChapterMenu();

    menu.classList.remove("hidden");

};

closeMenu.onclick = function () {

    menu.classList.add("hidden");

};

menu.onclick = function (e) {

    if (e.target === menu) {
        menu.classList.add("hidden");
    }

};


/* RENDER */

function render() {

    const current =
        chapters[chapter];

    chapterNumber.textContent =
        "CHAPTER " + current.number;

    topChapter.textContent =
        "CHAPTER " + current.number;

    chapterTitle.textContent =
        current.title;

    createDots();

    loadImage();

}


/* LOAD IMAGE */

function loadImage() {

    const current =
        chapters[chapter];

    const source =
        current.images[page];

    loader.classList.remove("hidden");

    comicImage.classList.remove("visible");

    comicImage.style.transform =
        "translateX(0)";

    comicImage.onload = function () {

        loader.classList.add("hidden");

        comicImage.classList.add("visible");

    };

    comicImage.onerror = function () {

        loader.classList.add("hidden");

        console.error(
            "IMAGE NOT FOUND:",
            source
        );

    };

    comicImage.src = source;

    updateControls();

}


/* CONTROLS */

function updateControls() {

    const current =
        chapters[chapter];

    const total =
        current.images.length;

    currentPage.textContent =
        String(page + 1).padStart(2, "0");

    totalPages.textContent =
        String(total).padStart(2, "0");

    progress.style.width =
        ((page + 1) / total * 100) + "%";

    previousButton.disabled =
        page === 0;

}


/* NEXT */

function nextPage() {

    const current =
        chapters[chapter];

    if (
        page <
        current.images.length - 1
    ) {

        page++;

        changePage("next");

    } else {

        showChapterEnd();

    }

}


/* PREVIOUS */

function previousPage() {

    if (!chapterEnd.classList.contains("hidden")) {

        chapterEnd.classList.add("hidden");

        return;

    }

    if (page > 0) {

        page--;

        changePage("previous");

    }

}


/* PAGE CHANGE */

function changePage(direction) {

    comicImage.classList.remove("visible");

    comicImage.style.transform =
        direction === "next"
            ? "translateX(25px)"
            : "translateX(-25px)";

    setTimeout(function () {

        comicImage.style.transform =
            "translateX(0)";

        loadImage();

    }, 100);

}


/* BUTTONS */

nextButton.onclick =
    nextPage;

previousButton.onclick =
    previousPage;


/* CLICK IMAGE */

comicImage.onclick =
    nextPage;


/* ==========================================
   CHAPTER END
========================================== */

function showChapterEnd() {

    const last =
        chapter === chapters.length - 1;

    if (last) {

        nextChapter.textContent =
            "The End... for now";

        continueButton.querySelector("span")
            .textContent =
            "START AGAIN";

        continueButton.querySelector("b")
            .textContent =
            "↻";

        continueButton.onclick =
            function () {

                chapter = 0;
                page = 0;

                chapterEnd.classList.add("hidden");

                render();

            };

    } else {

        const next =
            chapters[chapter + 1];

        nextChapter.textContent =
            "Chapter " + next.number;

        continueButton.querySelector("span")
            .textContent =
            "CHAPTER " + next.number;

        continueButton.querySelector("b")
            .textContent =
            "→";

        continueButton.onclick =
            function () {

                chapter++;

                page = 0;

                chapterEnd.classList.add("hidden");

                render();

            };

    }

    chapterEnd.classList.remove("hidden");

}


/* ==========================================
   DOTS
========================================== */

function createDots() {

    chapterDots.innerHTML = "";

    chapters.forEach(function (item, index) {

        const dot =
            document.createElement("div");

        dot.className =
            "chapter-dot";

        if (index === chapter) {
            dot.classList.add("active");
        }

        dot.onclick = function () {

            chapter = index;
            page = 0;

            chapterEnd.classList.add("hidden");

            render();

        };

        chapterDots.appendChild(dot);

    });

}


/* ==========================================
   CHAPTER MENU
========================================== */

function createChapterMenu() {

    chapterList.innerHTML = "";

    chapters.forEach(function (item, index) {

        const button =
            document.createElement("button");

        button.className =
            "chapter-choice";

        if (index === chapter) {
            button.classList.add("active");
        }

        button.innerHTML = `
            <span>Chapter ${item.number}</span>
            <span>${item.title}</span>
        `;

        button.onclick = function () {

            chapter = index;
            page = 0;

            menu.classList.add("hidden");

            chapterEnd.classList.add("hidden");

            render();

        };

        chapterList.appendChild(button);

    });

}


/* ==========================================
   KEYBOARD
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (reader.classList.contains("hidden")) {
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

            menu.classList.add("hidden");

            chapterEnd.classList.add("hidden");

        }

    }
);


/* START */

createDots();
updateControls();