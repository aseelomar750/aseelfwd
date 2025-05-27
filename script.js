document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Year Update ---
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // --- Basic Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });

        // Close menu when a link is clicked (for mobile)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            });
        });
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');
    let headerHeight = 0;
    if (header) {
        // Ensure header height is calculated after CSS is loaded and layout is stable
        // Using a small timeout or requestAnimationFrame can help, but for simplicity:
        headerHeight = header.offsetHeight; 
    }
    // Recalculate headerHeight on resize as it might change
    window.addEventListener('resize', () => {
        if (header) {
            headerHeight = header.offsetHeight;
        }
    });


    function changeNavActiveState() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight; // Adjusted for sticky header
            // Consider a small positive offset if sections are very close or for pixel-perfect scenarios
            const sectionVisiblePoint = sectionTop - 60; // 60px buffer, adjust as needed

            if (pageYOffset >= sectionVisiblePoint) { // Check if the top of the section (minus header and buffer) is above the viewport top
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Fallback for the first section if scrolled to the very top
        if (pageYOffset < (sections[0].offsetTop - headerHeight - 60)) {
            currentSectionId = sections[0].getAttribute('id'); // Default to 'hero' or first section
        }
        // If at the very bottom of the page, the last section should be active
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
             currentSectionId = sections[sections.length - 1].getAttribute('id');
        }


        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Check if the link's href matches the currentSectionId
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }

    // Initial call in case page loads on a section or for initial setup
    if (sections.length > 0 && navLinks.length > 0) {
        // Initial call might need a slight delay if headerHeight isn't stable immediately
        setTimeout(changeNavActiveState, 100); 
        window.addEventListener('scroll', changeNavActiveState);
    }

});
