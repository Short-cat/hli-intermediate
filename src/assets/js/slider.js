// Get the elements for the before-after slider
const slider = document.querySelector(".before-after__slider");
const afterImg = document.querySelector(".before-after__after-img");
const container = document.querySelector(".before-after");

// Only initialize the slider if all required elements exist
if (slider && afterImg && container) {
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
        }
    };

    const startDragging = () => {
        isDragging = true;
        // Store the original user-select value and disable text selection on the body
        originalUserSelect = document.body.style.userSelect || document.body.style.webkitUserSelect || '';
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none'; // For Safari
    };

    const stopDragging = () => {
        isDragging = false;
        // Restore the original user-select value
        document.body.style.userSelect = originalUserSelect;
        document.body.style.webkitUserSelect = originalUserSelect;
    };

    // Mouse events
    slider.addEventListener("mousedown", () => {
        startDragging();
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            moveSlider(e.clientX);
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            stopDragging();
        }
    });

    // Touch support for mobile
    slider.addEventListener("touchstart", (e) => {
        if (e.target === slider || slider.contains(e.target)) {
            e.preventDefault(); // Prevent scrolling when touching the slider
        }
        startDragging();
    });

    document.addEventListener("touchmove", (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            moveSlider(touch.clientX);
            e.preventDefault(); // Prevent scrolling while dragging
        }
    });

    document.addEventListener("touchend", () => {
        if (isDragging) {
            stopDragging();
        }
    });
} else {
    // Avoid console error in production, use a more subtle approach for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.info("Before-after slider elements not found on this page");
    }
}
