const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});



    // GSAP animation
    gsap.utils.toArray(".testimonial").forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2
      });
    });

    // Load Lottie animations
    const animations = [
      { id: 'lottie-1', path: 'https://assets2.lottiefiles.com/packages/lf20_touohxv0.json' },
      { id: 'lottie-2', path: 'https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json' }
    ];

    animations.forEach(anim => {
      lottie.loadAnimation({
        container: document.getElementById(anim.id),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: anim.path
      });
    });
