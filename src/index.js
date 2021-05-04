import "./style.scss";

(function(){ // плавные ссылки
  document.querySelector('.tableOfContents_list').addEventListener("click", (event)=>{
    event.preventDefault();
    console.log(event.target.tagName == "A");
    if (event.target.tagName == "A" && event.target.getAttribute('href')!='#'){
      console.log(event.target.getAttribute('href'))
      smoothScroll(event.target.getAttribute('href'));
    }
  })

  function smoothScroll(link) {
    const element = document.querySelector(link);
    console.log(element);
    if (element !== null) {
      let rect = element.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let elementTop = rect.top + scrollTop;
      window.scroll({
        left:0,
        top: elementTop,
        behavior: 'smooth'
      })
    }
  }

})();

// LAZY LOADING IMAGE
(function () {

  document.addEventListener("DOMContentLoaded", function() {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const lazyPicture = entry.target;
          const lazyImage = lazyPicture.getElementsByTagName("img");
          const sourseLazyImage = lazyPicture.getElementsByTagName("source");

          Array.from(sourseLazyImage).forEach((item)=>{
            item.setAttribute('srcset', item.getAttribute('data-srcset'))
          })
          lazyImage[0].setAttribute('srcset', lazyImage[0].getAttribute('data-srcset'));
          lazyPicture.classList.remove("lazy_image");
          imgObserver.unobserve(lazyPicture);
        }
      })
    });
    const lazyImages = document.querySelectorAll('.lazy_image');
    lazyImages.forEach((v) => {
      imageObserver.observe(v);
    })
  })

})();
