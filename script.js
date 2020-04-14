// Animation for navigation bar heading
var textWrapper = document.querySelector('.nav-header .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.nav-header .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.nav-header .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  })
  
  // //Portfolio page expand
  // var imgBtns = document.getElementsByClassName("img-btn")
  //   for (var i = 0; i < imgBtns.length; i++) {
  //     imgBtns[i].onclick = function() {
  //       var expandedContent = this.nextElementSibling

  //       if (expandedContent.style.maxHeight) {
  //             expandedContent.style.maxHeight = 0
  //       }
  //       else {
  //             expandedContent.style.maxHeight = expandedContent.scrollHeight + "px"
  //       }
  //       console.log(imgBtns.length)
  //   }
  // }

var accordions = document.getElementsByClassName("accordion-btn");

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    var content = this.nextElementSibling;
    console.log(accordions.length)
    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}

  