import anime from "animejs";
import { magicMouse } from "magicmouse.js";
import "../styles/main.scss";

const wait = (secs: number) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, secs * 1000);
  });

// Hide Opacity all elements
anime({
  targets: [
    ".hero .hero__title",
    ".hero .hero__lead",
    ".header .header__group .header__link",
  ],
  opacity: 0,
  duration: 0,
});

window.onload = async () => {
  const options = {
    cursorOuter: "circle-basic",
    hoverEffect: "pointer-overlay",
    hoverItemMove: true,
    defaultCursor: false,
    outerWidth: 30,
    outerHeight: 30,
  };
  magicMouse(options);

  await wait(0.2);
  // Load in Nav bar
  anime({
    targets: ".header .header__group .header__link",
    opacity: 1,
    delay: anime.stagger(100), // increase delay by 100ms for each elements.
    duration: 400,
    easing: "easeInQuad",
  });

  await wait(1);
  // Load Images & Flip to avoid drastic cut.
  // Add fade for more natural load
  const dogs = document.querySelector("#dogs");
  const dogImg = document.querySelector(".hero__image-div--dogs");
  const meImg = document.querySelector(".hero__image-div--me");
  if (dogs) {
    // Begin flip
    dogImg!.classList.remove("hero__image-div--active");
    meImg!.classList.add("hero__image-div--active");
    await wait(0.1);
    // Fade in
    dogImg!.classList.remove("hero__image-fade");
    meImg!.classList.remove("hero__image-fade");
    // Handle mouse flipping
    dogs.addEventListener("mouseover", () => {
      dogImg!.classList.add("hero__image-div--active");
      meImg!.classList.remove("hero__image-div--active");
    });
    dogs.addEventListener("mouseout", () => {
      dogImg!.classList.remove("hero__image-div--active");
      meImg!.classList.add("hero__image-div--active");
    });
  }

  await wait(0.5);

  // Hero Text
  anime({
    targets: [".hero .hero__title", ".hero .hero__lead"],
    opacity: 1,
    translateX: [75, 0],
    delay: anime.stagger(500), // increase delay by 100ms for each elements.
    duration: 2000,
    easing: "easeOutElastic",
  });

  await wait(1);
};
