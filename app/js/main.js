document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".collection-box-slider-track");
  const slides = document.querySelectorAll(".slide");
  const leftArrow = document.querySelector(".collection-box-arrows-left");
  const rightArrow = document.querySelector(".collection-box-arrows-right");

  const slidesPerView = 4;
  const slideGap = 26;
  const slideWidth = slides[0].offsetWidth + slideGap;

  let currentIndex = 0;

  rightArrow.addEventListener("click", () => {
    const maxIndex = slides.length - slidesPerView;
    if (currentIndex + slidesPerView <= maxIndex) {
      currentIndex += slidesPerView;
    } else {
      currentIndex = maxIndex;
    }
    const newPosition = -slideWidth * currentIndex;
    track.style.transform = `translateX(${newPosition}px)`;
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex - slidesPerView >= 0) {
      currentIndex -= slidesPerView;
    } else {
      currentIndex = 0;
    }
    const newPosition = -slideWidth * currentIndex;
    track.style.transform = `translateX(${newPosition}px)`;
  });
});

const formHandle = () => {
  alert("Вы подписались на нас!");
};

const sizes = document.querySelectorAll(".header-size-variable");
sizes.forEach((size) => {
  size.addEventListener("click", () => {
    if (size.classList.contains("disabled")) return;

    sizes.forEach((s) => s.classList.remove("filled"));
    size.classList.add("filled");
  });
});

const colorsNike = document.querySelectorAll(".header-color-variable");
colorsNike.forEach((color) => {
  color.addEventListener("click", () => {
    if (color.classList.contains("checked")) {
      return;
    } else {
      colorsNike.forEach((s) => s.classList.remove("checked"));
      color.classList.add("checked");
    }
  });
});

const imageList = [
  "../images/header-banner1.png",
  "../images/header-banner2.png",
  "../images/header-banner3.png",
  "../images/header-banner4.png",
];
let currentIndex = 0;
const mainImg = document.querySelector(".mainImg");
const arrow = document.querySelector(".move-toggle-slider");
const toggleImg = (src) => {
  currentIndex = imageList.indexOf(src);
  mainImg.src = src;
};
arrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  mainImg.src = imageList[currentIndex];
});

