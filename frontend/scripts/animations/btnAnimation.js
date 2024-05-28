document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll('.sandwichImg, .sandwichImg, .kaffeImg, .havregrynImg, .coldShowerImg, .hotShowerImg');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});