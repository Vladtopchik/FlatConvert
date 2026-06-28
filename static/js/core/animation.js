const aboutAnimationContainer = document.getElementById("about-animation-container");
const aboutFirstAnimation = aboutAnimationContainer.firstElementChild;

const aboutAnimations = [aboutFirstAnimation];

function getFitCount(mainContainer, item) {
    const mainWidth = mainContainer.offsetWidth;

    const style = window.getComputedStyle(item);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

    const itemTotalWidth = item.offsetWidth + margin;

    if (itemTotalWidth <= 0) return 0;

    return Math.ceil(mainWidth / itemTotalWidth);
}

function createAnimations() {
    const fitCount = getFitCount(aboutAnimationContainer, aboutFirstAnimation)
        - aboutAnimationContainer.children.length;

    if (fitCount <= 0) return;

    for (let i = 0; i < fitCount; i++) {
        const element = aboutFirstAnimation.cloneNode(true);
        aboutAnimationContainer.appendChild(element);
        aboutAnimations.push(element);
    }

    aboutAnimations.forEach(el => {
       el.classList.remove('about-animation-svg');

       setTimeout(() => el.classList.add('about-animation-svg'));
    });
}

createAnimations();

window.addEventListener('resize', createAnimations);