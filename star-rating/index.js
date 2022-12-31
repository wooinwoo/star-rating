// do something!
const StarRating = $starRating => {
  
  const get = (target) => document.querySelector(target);
  const $script = get('script');

  const createCss = () => {
    const link = document.createElement( 'link' )
    link.href = "./star-rating/theme.css"
    link.rel = "stylesheet"
    $script.before(link)
  }

  const createStar = () => {
    const container = document.createElement( 'div' )
    container.classList.add('star-rating-container')
    for (let i=0; i<$starRating.dataset.maxRating; i++){
      container.innerHTML += `<i class='bx bxs-star'></i>`
    }
    $starRating.innerHTML = String(container.outerHTML)
  }

  const cursorIn = (e) => {
    if (e.target === $starRating.firstChild) return
    let draw = true;
    for (let star of $starRating.firstChild.childNodes){
      draw == true ? star.classList.add('hovered') : star.classList.remove('hovered')
      if (e.target == star) draw = false;
    }
  }

  const cursorOut = (e) => {
    for (let star of $starRating.firstChild.childNodes){
      star.classList.remove('hovered')
    }
  }

  const Selected = (e) => {
    if (e.target === $starRating.firstChild) return
    let draw = true;
    let count = 0;
    for (let star of $starRating.firstChild.childNodes){
      draw == true ? star.classList.add('selected') : star.classList.remove('selected')
      count++;
      if (e.target == star){
        draw = false;
        const ratingEvent = new CustomEvent('rating-change',{detail : count})
        $starRating.dispatchEvent(ratingEvent)
      }
    }
  }


  const init = () => {
    createCss()
    createStar()
    $starRating.addEventListener("mouseover",cursorIn)
    $starRating.addEventListener("mouseout",cursorOut)
    $starRating.addEventListener("click",Selected)
  }

  init()
}



export default StarRating;