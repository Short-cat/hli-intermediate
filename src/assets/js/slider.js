const slider = document.querySelector(".before-after__slider");
const afterImg = document.querySelector(".before-after__after-img");
const container = document.querySelector(".before-after");

if (!slider || !afterImg || !container) {
  console.error("One or more elements not found:", { slider, afterImg, container });
}

let isDragging = false;

const moveSlider = (x) => {
  const containerRect = container.getBoundingClientRect();
  const newWidth = x - containerRect.left;
  const percentage = (newWidth / containerRect.width) * 100;

  // Constrain the slider between 0% and 100%
  if (percentage >= 0 && percentage <= 100) {
    // Update the clip-path to reveal more/less of the "after" image
    afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    slider.style.left = `${percentage}%`; // Move the slider
    slider.setAttribute("aria-valuenow", Math.round(percentage));
    console.log(`Slider moved to ${percentage}%`); // Debug log
  }
};

slider.addEventListener("mousedown", () => {
  isDragging = true;
  console.log("Dragging started"); // Debug log
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    moveSlider(e.clientX);
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  console.log("Dragging stopped"); // Debug log
});

// Touch support for mobile
slider.addEventListener("touchstart", () => {
  isDragging = true;
  console.log("Touch dragging started"); // Debug log
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    moveSlider(touch.clientX);
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
  console.log("Touch dragging stopped"); // Debug log
});