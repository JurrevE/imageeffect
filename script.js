// Event listener for when the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the SiteManager object
    SiteManager.init();
});

// SiteManager object containing properties and methods to manage the page
var SiteManager = {
    // Constants to control the behavior of the image addition
    MAX_IMAGES_ON_PAGE: 12,
    ADD_EVERY_X_COUNT: 10,

    // Counter to keep track of the current image being added
    nCurrentImage: 0,

    // Array containing image filenames
    aIMGs: ["1.png", "2.png","3.png", "4.png","5.png", "6.png","7.png",
            "8.png","9.png", "10.png","11.png", "12.png", "13.png", "14.png","15.png", "16.png","17.png", "18.png","19.png",
            "20.png","21.png", "22.png","23.png", "24.png", "25.png", "26.png", "27.png"],

    // Reference to the container for displaying images
    myImagesContainer: document.querySelector('.images-container'),

    // Array to store added images
    aAddedImages: [],

    // Counter to determine when to add a new image
    nAddCounter: 0,

    // Initialization function, setting up the mousemove event listener
    init: function() {
        document.addEventListener('mousemove', this.onMouseMoved.bind(this));
    },

    // Event handler for mouse movement
    onMouseMoved: function(e) {
        // Increment the add counter on each mouse movement
        this.nAddCounter++;

        // Check if it's time to add a new image based on the counter
        if (this.nAddCounter % this.ADD_EVERY_X_COUNT === 0) {
            // Add a new image at the current mouse position
            this.addImage(e.clientX, e.clientY);

            // Move to the next image in the array
            this.nCurrentImage++;
        }
    },

    // Function to add a new image to the page
    addImage: function(_x, _y) {
        // Create a new image element
        var newImage = document.createElement('img');

        // Add CSS class to the new image
        newImage.classList.add('funky-image');

        // Set the source of the image from the array of image filenames
        newImage.setAttribute('src', `${this.aIMGs[this.nCurrentImage % this.aIMGs.length]}`);

        // Set a unique ID for the image
        newImage.setAttribute('id', `img${this.nCurrentImage}`);

        // Position the image at the mouse coordinates
        newImage.style.left = _x + 'px';
        newImage.style.top = _y + 'px';

        // Append the new image to the images container
        this.myImagesContainer.appendChild(newImage);

        // Add the new image to the array of added images
        this.aAddedImages.push(newImage);

        // Check if the maximum number of images on the page is exceeded
        if (this.aAddedImages.length > this.MAX_IMAGES_ON_PAGE) {
            // Remove the oldest image from the page and the array
            var img = this.aAddedImages.shift();
            img.remove();
        }
    }
};
