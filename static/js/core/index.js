const aboutAnimationFirstContainer = document.getElementById("animation-first-element");
const aboutAnimationMainContainer = document.getElementById("animation-container");

function createAnimation(container, animationData, startFrame=0) {
    const anim =  lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData
    });

    anim.goToAndPlay(startFrame, true);
    anim.setSpeed(1);
    anim.setSubframe(false);

    return anim;
}



const item = sessionStorage.getItem("animation");
let animation;
let initialAnimation;

if (item === null) {
    fetch(aboutAnimationPath)
        .then(res => res.text())
        .then(text => {
            sessionStorage.setItem("animation", text);
            animation = JSON.parse(text);
            initialAnimation = createAnimation(aboutAnimationFirstContainer, animation);
            createAnimationsToFit();
        });
} else {
    animation = JSON.parse(item);
    initialAnimation = createAnimation(aboutAnimationFirstContainer, animation);
    createAnimationsToFit();
}

function getFitCount(mainContainer, item) {
    const mainWidth = mainContainer.offsetWidth;

    const style = window.getComputedStyle(item);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

    const itemTotalWidth = item.offsetWidth + margin;

    if (itemTotalWidth <= 0) return 0;

    return Math.ceil(mainWidth / itemTotalWidth);
}

function createAnimationsToFit() {
    const containersCount = aboutAnimationMainContainer.children.length;
    const maxContainersCount = getFitCount(aboutAnimationMainContainer, aboutAnimationFirstContainer);

    const containersToFit = maxContainersCount - containersCount;

    if (containersToFit > 0) {
        for (let i = 0; i < containersToFit; i++) {
            const el = aboutAnimationFirstContainer.cloneNode(false);
            aboutAnimationMainContainer.appendChild(el);
            createAnimation(el, animation, initialAnimation.currentFrame);
        }
    } else {
        for (let i = 0; i > containersToFit; i--) {
            aboutAnimationMainContainer.lastElementChild.remove();
        }
    }



}

window.addEventListener('resize', createAnimationsToFit);
