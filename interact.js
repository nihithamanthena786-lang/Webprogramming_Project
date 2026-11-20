
// SLIDESHOW

const track = document.getElementById("slide-track");
const slides = document.querySelectorAll(".recipe-slide");

const startButton = document.getElementById("start-slideshow");
const controls = document.getElementById("slide-controls");

const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");
const counter = document.getElementById("slide-counter");

let currentSlide = 0;

function showSlide(index) {

    if (index < 0 || index >= slides.length) {
        return;
    }

    currentSlide = index;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    counter.textContent = `${currentSlide + 1} / ${slides.length}`;

    // Hide navigation controls on the starting slide
    controls.style.display = currentSlide === 0 ? "none" : "flex";

    // Hide the previous button on the first cooking slide
    previousButton.style.visibility =
        currentSlide === 1 ? "hidden" : "visible";
}

// Starting slide: Next button
startButton.addEventListener("click", function () {
    showSlide(1);
});

// Previous slide
previousButton.addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

// Next slide
nextButton.addEventListener("click", function () {
    showSlide(currentSlide + 1);
});


// INDEPENDENT COOKING TIMERS

document.querySelectorAll(".slide-timer").forEach(timer => {

    const display = timer.querySelector(".timer-display");

    const start = timer.querySelector(".start-timer");
    const pause = timer.querySelector(".pause-timer");
    const reset = timer.querySelector(".reset-timer");

    const originalTime = Number(timer.dataset.duration);

    let remainingTime = originalTime;
    let interval = null;

    function updateDisplay() {

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        display.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
    }

    function stopTimer() {
        clearInterval(interval);
        interval = null;
    }

    start.addEventListener("click", function () {

        // Prevent multiple intervals
        if (interval !== null || remainingTime <= 0) {
            return;
        }

        interval = setInterval(function () {

            remainingTime--;

            updateDisplay();

            if (remainingTime <= 0) {

                stopTimer();

                display.textContent = "Time's up!";

                // Optional notification
                alert("Cooking timer finished!");
            }

        }, 1000);
    });

    pause.addEventListener("click", function () {
        stopTimer();
    });

    reset.addEventListener("click", function () {

        stopTimer();

        remainingTime = originalTime;

        updateDisplay();
    });

    // Show initial time
    updateDisplay();

});
