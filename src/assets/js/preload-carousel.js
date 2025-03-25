/**
 * Preload Carousel Images
 * 
 * This script forces the loading of carousel images as soon as the DOM is ready,
 * solving the issue of delayed image loading in CSS-animated carousels.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all carousel items
    const carouselItems = document.querySelectorAll('.cs-carousel-item');
    
    // Immediately load all images by forcing browser to process them
    carouselItems.forEach(item => {
        const images = item.querySelectorAll('img');
        const sources = item.querySelectorAll('source');
        
        // Force browser to evaluate and download the images
        images.forEach(img => {
            // Create a new Image object to trigger immediate loading
            const preloader = new Image();
            
            // Set high priority loading by making it visible but off-screen
            img.loading = 'eager';
            
            // When image src is set, browser will load it immediately
            preloader.src = img.getAttribute('src');
        });
        
        // Also process source elements to load different formats
        sources.forEach(source => {
            const srcset = source.getAttribute('srcset');
            
            if (srcset) {
                // Create preloaded image from source srcset
                const preloader = new Image();
                preloader.srcset = srcset;
            }
        });
    });
    
    // Force immediate display of carousel
    const carouselTrack = document.querySelector('.cs-carousel-track');
    if (carouselTrack) {
        // Add a class that ensures visibility
        carouselTrack.classList.add('preloaded');
    }
});
