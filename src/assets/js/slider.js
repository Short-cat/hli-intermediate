const slider = document.querySelector(".before-after__slider");
const afterImg = document.querySelector(".before-after__after-img");
const container = document.querySelector(".before-after");

if (!slider || !afterImg || !container) {
  console.error("One or more elements not found:", { slider, afterImg, container });
}

let isDragging = false;
let originalUserSelect = ''; // Store the original user-select value

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

const startDragging = () => {
  isDragging = true;
  // Store the original user-select value and disable text selection on the body
  originalUserSelect = document.body.style.userSelect || document.body.style.webkitUserSelect || '';
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none'; // For Safari
  console.log("Dragging started");
};

const stopDragging = () => {
  isDragging = false;
  // Restore the original user-select value
  document.body.style.userSelect = originalUserSelect;
  document.body.style.webkitUserSelect = originalUserSelect;
  console.log("Dragging stopped");
};

slider.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent text selection
  startDragging();
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    e.preventDefault(); // Prevent text selection
    moveSlider(e.clientX);
  }
});

document.addEventListener("mouseup", (e) => {
  e.preventDefault(); // Prevent text selection
  stopDragging();
});

// Touch support for mobile
slider.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent text selection
  startDragging();
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    e.preventDefault(); // Prevent text selection
    const touch = e.touches[0];
    moveSlider(touch.clientX);
  }
});

document.addEventListener("touchend", (e) => {
  e.preventDefault(); // Prevent text selection
  stopDragging();
});