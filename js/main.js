(function () {
  const bar = document.getElementById("progress");

  window.addEventListener(
    "scroll",
    () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / scrollableHeight) * 100 + "%";
    },
    { passive: true }
  );

  const glow = document.getElementById("glow");
  document.addEventListener("mousemove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });

  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.tab;
      sections.forEach((section) => section.classList.remove("visible"));

      const selectedSection = document.getElementById(target);
      selectedSection.classList.add("visible");
      selectedSection
        .querySelectorAll(".portrait-item,.landscape-item,.ec-item")
        .forEach((item) => {
          item.style.animation = "none";
          item.offsetHeight;
          item.style.animation = "";
        });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".close");
  const previousButton = lightbox.querySelector(".prev");
  const nextButton = lightbox.querySelector(".next");
  let currentIndex = 0;
  let currentSection = "";
  let allImages = [];

  function getImages(sectionName) {
    return Array.from(
      document.querySelectorAll("#" + sectionName + " img")
    );
  }

  function openLightbox(sectionName, index) {
    currentSection = sectionName;
    currentIndex = index;
    allImages = getImages(sectionName);
    lightboxImage.src = allImages[index].src;
    lightboxImage.alt = allImages[index].alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function navigate(direction) {
    const images = allImages;
    currentIndex =
      (currentIndex + direction + images.length) % images.length;
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
  }

  document.querySelectorAll("img").forEach((image) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", () => {
      const section = image.closest("section").id;
      openLightbox(section, getImages(section).indexOf(image));
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigate(-1);
  });
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigate(1);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") navigate(-1);
    if (event.key === "ArrowRight") navigate(1);
  });

  window.addEventListener("load", () =>
    setTimeout(
      () => document.getElementById("preloader").classList.add("hidden"),
      900
    )
  );
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.classList.add("hidden");
  }, 2600);
})();
