var scrolling = false;

function scrollToSection(toNum) {

    scrolling = true;
    document.querySelector("#" + toNum).scrollIntoView({
        behavior: 'smooth'
    });


}


let ticking = false;
let isScrolling = false;


window.addEventListener('wheel', function (e) {

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {

        // Run the callback
        scrolling = false;

    }, 300);

    if (!ticking && !scrolling) {
        window.requestAnimationFrame(function () {

            let direction = null;

            if (e.deltaY > 0) {
                direction = "down"
            } else {
                direction = "up"
            }

            Object.values(e.path).forEach(check => {
                if (check.id === "section1") {
                    console.log('Section 1! ' + direction)
                    if (direction === "down") {
                        scrollToSection('section2');
                    }

                } else if (check.id === "section2") {
                    console.log('Section 2! ' + direction)
                    if (direction === "down") {
                        scrollToSection('section3');
                    }
                    if (direction === "up") {
                        scrollToSection('section1');
                    }

                } else if (check.id === "section3") {
                    console.log('Section 3! ' + direction)
                    if (direction === "up") {
                        scrollToSection('section2');
                    }
                }
            })


            ticking = false;
        });

        ticking = true;
    }
});

window.onscroll = function (e) {
    // print "false" if direction is down and "true" if up
    console.log(this.oldScroll > this.scrollY);
    this.oldScroll = this.scrollY;
}