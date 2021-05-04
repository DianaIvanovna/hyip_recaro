import "./style.scss";

(function(){
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
