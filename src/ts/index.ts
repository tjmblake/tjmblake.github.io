import anime from "animejs";
import { magicMouse } from "magicmouse.js";
import Observer from "./observer";

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
    ".projects",
    ".skills",
  ],
  opacity: 0,
  duration: 0,
});

anime({
  targets: [".projects p"],
  translateX: anime.stagger(500, { grid: [2, 2], from: "center", axis: "x" }),
  opacity: 0,
  duration: 0,
});

anime({
  targets: [`#experienced *`, `#learning *`, `#interested *`],
  scale: 0,
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

  // HERO ARROW

  const heroArrowAnimation = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    anime({
      targets: ".hero__scroll-icon",
      opacity: [1, 0],
      easing: "easeInOutSine",
      duration: 100,
    });
  };

  const HeroArrowObserver = new Observer(".hero__scroll-icon", {
    callback: heroArrowAnimation,
    intOptions: {
      threshold: 0.5,
      rootMargin: "-60% 0% 0% 0%",
    },
    isIntersecting: false,
  });

  // PROJECTS SECTION

  const projectSectionAnimation = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    anime({
      targets: ".projects",
      keyframes: [
        { translateY: 30, opacity: 0 },
        { translateY: 0, opacity: 1 },
      ],
      easing: "easeInOutSine",
      duration: 800,
    });

    // Each Project
    anime({
      targets: ".projects p",
      translateX: anime.stagger(0, {
        grid: [2, 2],
        from: "center",
        axis: "x",
      }),
      opacity: 1,

      easing: "easeInOutSine",
      delay: anime.stagger(200, { start: 300 }),
      duration: 1000,
    });
  };

  const ProjectObserver = new Observer(".projects", {
    callback: projectSectionAnimation,
    isIntersecting: true,
  });

  // SKILLS SECTION

  const skillSectionAnimation = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) =>
    anime({
      targets: ".skills",
      keyframes: [
        { translateY: 30, opacity: 0 },
        { translateY: 0, opacity: 1 },
      ],
      easing: "easeInOutSine",
      duration: 200,
    });

  const SkillsObserver = new Observer(".skills", {
    callback: skillSectionAnimation,
    isIntersecting: true,
  });

  // SKILLS (EACH GROUP)

  const skillsGroupAnimation = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) =>
    anime({
      targets: `#${entries[0].target.id} *`,
      scale: [0, 1],
      duration: 1000,
      delay: anime.stagger(30, { start: 200 }),
      easing: "easeOutElastic",
    });

  const skillsGroups = [
    ...(document.querySelectorAll(
      ".skills .skills__group"
    ) as unknown as HTMLElement[]),
  ];

  const SkillsGroupObserver = skillsGroups?.map(
    (el) =>
      new Observer(`#${el.id}`, {
        callback: skillsGroupAnimation,
        isIntersecting: true,
        devMode: true,
      })
  );

  // Load in Nav bar
  anime({
    targets: ".header .header__group .header__link",
    opacity: 1,
    delay: anime.stagger(100), // increase delay by 100ms for each elements.
    duration: 400,
    easing: "easeInQuad",
  });

  await wait(0.7);
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

  const scrollIcon = document.querySelector(
    ".hero__scroll-icon"
  ) as HTMLElement;
  if (scrollIcon) {
    scrollIcon.style.transition = "all 0.5s";
    await wait(0.5);
    scrollIcon.style.opacity = "1";
  }

  // Hero Text
  anime({
    targets: [".hero .hero__title", ".hero .hero__lead"],
    opacity: 1,
    translateX: [75, 0],
    delay: anime.stagger(500, { start: 700 }), // increase delay by 100ms for each elements.
    duration: 2000,
    easing: "easeOutElastic",
  });
};
