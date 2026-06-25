const aboutAnimationContainer = document.getElementsByClassName("about-animation");

function createAnimation(container, path) {
    return lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path
    });
}

createAnimation(aboutAnimationContainer[0], aboutAnimationPath);
