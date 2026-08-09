/* =====================================================
   WRITTEN IN THE STARS
   LEO × NOVA

   EXACTLY 3 IMAGE SLOTS PER CHAPTER
===================================================== */


const chapters = [

    {
        number: "CHAPTER I",
        title: "The Beginning",

        images: [
            "images/chapter1/image1.jpg",
            "images/chapter1/image2.jpg",
            "images/chapter1/image3.jpg"
        ]
    },

    {
        number: "CHAPTER II",
        title: "Orbit",

        images: [
            "images/chapter2/image1.jpg",
            "images/chapter2/image2.jpg",
            "images/chapter2/image3.jpg"
        ]
    },

    {
        number: "CHAPTER III",
        title: "The First Movie",

        images: [
            "images/chapter3/image1.jpg",
            "images/chapter3/image2.jpg",
            "images/chapter3/image3.jpg"
        ]
    },

    {
        number: "CHAPTER IV",
        title: "The Moment Everything Changed",

        images: [
            "images/chapter4/image1.jpg",
            "images/chapter4/image2.jpg",
            "images/chapter4/image3.jpg"
        ]
    },

    {
        number: "CHAPTER V",
        title: "Beyond the Horizon",

        images: [
            "images/chapter5/image1.jpg",
            "images/chapter5/image2.jpg",
            "images/chapter5/image3.jpg"
        ]
    },

    {
        number: "CHAPTER VI",
        title: "When the Stars Flicker",

        images: [
            "images/chapter6/image1.jpg",
            "images/chapter6/image2.jpg",
            "images/chapter6/image3.jpg"
        ]
    },

    {
        number: "CHAPTER VII",
        title: "Written in the Stars",

        images: [
            "images/chapter7/image1.jpg",
            "images/chapter7/image2.jpg",
            "images/chapter7/image3.jpg"
        ]
    }

];


let currentChapter = 0;
let currentPage = 0;


/* ELEMENTS */

const homeScreen =
    document.getElementById("homeScreen");

const readerScreen =
    document.getElementById("readerScreen");

const openStoryBtn =
    document.getElementById("openStoryBtn");

const backHomeBtn =
    document.getElementById("backHomeBtn");

const chapterMenuBtn =
    document.getElementById("chapterMenuBtn");

const closeMenuBtn =
    document.getElementById("closeMenuBtn");

const chapterMenu =
    document.getElementById("chapterMenu");

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterTitle =
    document.getElementById("chapterTitle");

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

const chapterList =
    document.getElementById("chapterList");

const chapterEnd =
    document.getElementById("chapterEnd");

const endChapterTitle =
    document.getElementById("endChapterTitle");

const continueBtn =
    document.getElementById("continueBtn");


/* OPEN STORY */

openStoryBtn.addEventListener("click", () => {

    currentChapter = 0;
    currentPage = 0;

    homeScreen.classList.add("hidden");

    readerScreen.classList.remove("hidden");

    chapterEnd.classList.add("hidden");

    renderChapter();

});


/* BACK HOME */

backHomeBtn.addEventListener("click", () => {

    readerScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

    chapterMenu.classList.add("hidden");

    chapterEnd.classList.add("hidden");

});


/* NEXT */

nextPageBtn.addEventListener("click", nextPage);


/* PREVIOUS */

previousPageBtn.addEventListener(
    "click",
    previousPage
);


/* CLICK IMAGE */

comicImage.addEventListener(
    "click",
    function(event) {

        const bounds =
            comicImage.getBoundingClientRect();

        const clickPosition =
            event.clientX - bounds.left;

        if (
            clickPosition >
            bounds.width / 2
        ) {

            nextPage();

        } else {

            previousPage();

        }

    }
);


/* NEXT PAGE */

function nextPage() {

    const chapter =
        chapters[currentChapter];


    if (
        currentPage <
        chapter.images.length - 1
    ) {

        currentPage++;

        renderPage();

        return;

    }


    showChapterEnd();

}


/* PREVIOUS PAGE */

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        renderPage();

        return;

    }


    if (currentChapter > 0) {

        currentChapter--;

        currentPage =
            chapters[currentChapter]
                .images.length - 1;

        renderChapter();

    }

}


/* RENDER CHAPTER */

function renderChapter() {

    const chapter =
        chapters[currentChapter];


    chapterNumber.textContent =
        chapter.number;

    chapterTitle.textContent =
        chapter.title;


    currentPage = 0;


    renderPage();

    createChapterDots();

    createChapterList();

}


/* RENDER PAGE */

function renderPage() {

    const chapter =
        chapters[currentChapter];

    const image =
        chapter.images[currentPage];


    comicImage.classList.remove(
        "visible"
    );

    imageLoading.classList.remove(
        "hidden"
    );


    const preload =
        new Image();


    preload.onload = function() {

        comicImage.src =
            image;

        comicImage.classList.add(
            "visible"
        );

        imageLoading.classList.add(
            "hidden"
        );

    };


    preload.onerror = function() {

        comicImage.src =
            createPlaceholder(
                chapter.number,
                currentPage + 1
            );

        comicImage.classList.add(
            "visible"
        );

        imageLoading.classList.add(
            "hidden"
        );

    };


    preload.src = image;


    pageNumber.textContent =
        String(currentPage + 1)
            .padStart(2, "0");


    pageTotal.textContent =
        String(chapter.images.length)
            .padStart(2, "0");


    const progress =
        ((currentPage + 1) /
        chapter.images.length) * 100;


    progressBar.style.width =
        progress + "%";


    previousPageBtn.disabled =
        currentChapter === 0 &&
        currentPage === 0;


    updateDots();

}


/* CHAPTER END */

function showChapterEnd() {

    const chapter =
        chapters[currentChapter];


    endChapterTitle.textContent =
        chapter.title;


    chapterEnd.classList.remove(
        "hidden"
    );


    if (
        currentChapter ===
        chapters.length - 1
    ) {

        continueBtn.textContent =
            "Return to Beginning";

    } else {

        continueBtn.textContent =
            "Next Chapter →";

    }

}


/* CONTINUE */

continueBtn.addEventListener(
    "click",
    function() {

        chapterEnd.classList.add(
            "hidden"
        );


        if (
            currentChapter ===
            chapters.length - 1
        ) {

            currentChapter = 0;

            currentPage = 0;

            renderChapter();

            return;

        }


        currentChapter++;

        currentPage = 0;

        renderChapter();

    }
);


/* DOTS */

function createChapterDots() {

    chapterDots.innerHTML = "";


    chapters[currentChapter]
        .images
        .forEach(
            function(_, index) {

                const dot =
                    document.createElement(
                        "span"
                    );


                dot.className =
                    "chapter-dot";


                if (
                    index === currentPage
                ) {

                    dot.classList.add(
                        "active"
                    );

                }


                dot.addEventListener(
                    "click",
                    function() {

                        currentPage = index;

                        renderPage();

                    }
                );


                chapterDots.appendChild(
                    dot
                );

            }
        );

}


/* UPDATE DOTS */

function updateDots() {

    const dots =
        document.querySelectorAll(
            ".chapter-dot"
        );


    dots.forEach(
        function(dot, index) {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        }
    );

}


/* MENU */

chapterMenuBtn.addEventListener(
    "click",
    function() {

        chapterMenu.classList.remove(
            "hidden"
        );

        createChapterList();

    }
);


closeMenuBtn.addEventListener(
    "click",
    function() {

        chapterMenu.classList.add(
            "hidden"
        );

    }
);


chapterMenu.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            chapterMenu
        ) {

            chapterMenu.classList.add(
                "hidden"
            );

        }

    }
);


/* CHAPTER LIST */

function createChapterList() {

    chapterList.innerHTML = "";


    chapters.forEach(
        function(chapter, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "chapter-list-button";


            if (
                index === currentChapter
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.innerHTML = `
                <span>${chapter.number}</span>
                <strong>${chapter.title}</strong>
            `;


            button.addEventListener(
                "click",
                function() {

                    currentChapter = index;

                    currentPage = 0;

                    chapterMenu.classList.add(
                        "hidden"
                    );

                    chapterEnd.classList.add(
                        "hidden"
                    );

                    renderChapter();

                }
            );


            chapterList.appendChild(
                button
            );

        }
    );

}


/* KEYBOARD */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            readerScreen.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            !chapterMenu.classList.contains(
                "hidden"
            )
        ) {

            if (
                event.key === "Escape"
            ) {

                chapterMenu.classList.add(
                    "hidden"
                );

            }

            return;

        }


        if (
            !chapterEnd.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousPage();

        }

    }
);


/* PLACEHOLDER */

function createPlaceholder(
    chapter,
    page
) {

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="900"
            height="1400"
            viewBox="0 0 900 1400"
        >

            <rect
                width="900"
                height="1400"
                fill="#fffaf2"
            />

            <circle
                cx="450"
                cy="600"
                r="180"
                fill="none"
                stroke="#d6bd91"
                stroke-width="2"
            />

            <text
                x="450"
                y="580"
                text-anchor="middle"
                font-family="Georgia"
                font-size="30"
                fill="#8d795c"
            >
                ${chapter}
            </text>

            <text
                x="450"
                y="640"
                text-anchor="middle"
                font-family="Arial"
                font-size="18"
                letter-spacing="4"
                fill="#aaa"
            >
                IMAGE ${page}
            </text>

        </svg>
    `;


    return (
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg)
    );

}


/* START */

createChapterList();