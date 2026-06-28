const appearAnimationElements = document.getElementsByClassName('appear-animation');
const numberAnimationElements = document.getElementsByClassName('number-animation');

const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(
                () => {
                    entry.target.classList.remove("animation-hidden");
                }, 75
            );
            appearObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px -25px 0px'
});

const numberObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(
                () => {
                    entry.target.classList.remove("animation-hidden");
                    startNumberAnimation(entry.target, 0, parseInt(entry.target.dataset.number));
                }, 75
            );
            numberObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px -25px 0px'
});

function startNumberAnimation(el, from = 0, to = 1000, duration = 1500) {
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = easeOutCubic(progress);
        el.textContent = `${Math.floor(from + (to - from) * eased)}${el.dataset.postfix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

for (let el of appearAnimationElements) {
    el.classList.remove("appear-animation");
    el.classList.add("animation-hidden");
    el.classList.add("appear-animation");
    appearObserver.observe(el);
}

for (let el of numberAnimationElements) {
    el.classList.remove("number-animation");
    el.classList.add("animation-hidden");
    el.classList.add("number-animation");
    numberObserver.observe(el);
}
