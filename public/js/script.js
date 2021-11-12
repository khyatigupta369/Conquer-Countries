// Map svg file 
var modalBtn = document.querySelectorAll('.Button');
var modalBg = document.querySelectorAll('.modal-bg');
var submitBtn = document.querySelectorAll('.submit-btn');
var modalClose = document.querySelectorAll('.modal-close');
var Btn1 = document.querySelector('.etherion');
var Btn2 = document.querySelector('.silven');
var Btn3 = document.querySelector('.gorene');
var Btn4 = document.querySelector('.yitanada');
var Btn5 = document.querySelector('.denera');
var Btn6 = document.querySelector('.arthora');
var Btn7 = document.querySelector('.miorbmark');
var Btn8 = document.querySelector('.idzora');
var Btn9 = document.querySelector('.qaevia');
var Btn10 = document.querySelector('.wrafuthen');

var armySize = document.querySelector('.army').id;

modalBtn[0].addEventListener('click',function(){
    modalBg[0].classList.add('bg-active');
});
submitBtn[0].addEventListener('click',function(){
    modalBg[0].classList.remove('bg-active');
});
modalClose[0].addEventListener('click',function(){
    modalBg[0].classList.remove('bg-active');
})


modalBtn[1].addEventListener('click',function(){
    modalBg[1].classList.add('bg-active');
});
submitBtn[1].addEventListener('click',function(){
    modalBg[1].classList.remove('bg-active');
});
modalClose[1].addEventListener('click',function(){
    modalBg[1].classList.remove('bg-active');
})


modalBtn[2].addEventListener('click',function(){
    modalBg[2].classList.add('bg-active');
});
submitBtn[2].addEventListener('click',function(){
    modalBg[2].classList.remove('bg-active');
});
modalClose[2].addEventListener('click',function(){
    modalBg[2].classList.remove('bg-active');
})

// etherion
Btn1.addEventListener('click',function(){
    if(armySize>=800)
    modalBg[3].classList.add('bg-active');
});
submitBtn[3].addEventListener('click',function(){
    modalBg[3].classList.remove('bg-active');
});
modalClose[3].addEventListener('click',function(){
    modalBg[3].classList.remove('bg-active');
})

// silven
Btn2.addEventListener('click',function(){
    if(armySize>=700)
    modalBg[4].classList.add('bg-active');
});
submitBtn[4].addEventListener('click',function(){
    modalBg[4].classList.remove('bg-active');
});
modalClose[4].addEventListener('click',function(){
    modalBg[4].classList.remove('bg-active');
})

// gorene
Btn3.addEventListener('click',function(){
    if(armySize>=400)
    modalBg[5].classList.add('bg-active');
});
submitBtn[5].addEventListener('click',function(){
    modalBg[5].classList.remove('bg-active');
});
modalClose[5].addEventListener('click',function(){
    modalBg[5].classList.remove('bg-active');
})

// yitanada
Btn4.addEventListener('click',function(){
    if(armySize>=1000)
    modalBg[6].classList.add('bg-active');
});
submitBtn[6].addEventListener('click',function(){
    modalBg[6].classList.remove('bg-active');
});
modalClose[6].addEventListener('click',function(){
    modalBg[6].classList.remove('bg-active');
})

// Denera
Btn5.addEventListener('click',function(){
    if(armySize>=300)
    modalBg[7].classList.add('bg-active');
    console.log("heyy");
});
submitBtn[7].addEventListener('click',function(){
    modalBg[7].classList.remove('bg-active');
    console.log("sumbitted");
});
modalClose[7].addEventListener('click',function(){
    modalBg[7].classList.remove('bg-active');
    console.log("hi");
});

// arthora
Btn6.addEventListener('click',function(){
    if(armySize>=500)
    modalBg[8].classList.add('bg-active');
});
submitBtn[8].addEventListener('click',function(){
    modalBg[8].classList.remove('bg-active');
});
modalClose[8].addEventListener('click',function(){
    modalBg[8].classList.remove('bg-active');
})

// miorbmark
Btn7.addEventListener('click',function(){
    if(armySize>=900)
    modalBg[9].classList.add('bg-active');
});
submitBtn[9].addEventListener('click',function(){
    modalBg[9].classList.remove('bg-active');
});
modalClose[9].addEventListener('click',function(){
    modalBg[9].classList.remove('bg-active');
})

// idzora
Btn8.addEventListener('click',function(){
    if(armySize>=500)
    modalBg[10].classList.add('bg-active');
});
submitBtn[10].addEventListener('click',function(){
    modalBg[10].classList.remove('bg-active');
});
modalClose[10].addEventListener('click',function(){
    modalBg[10].classList.remove('bg-active');
})

// qaevia
Btn9.addEventListener('click',function(){
    if(armySize>=700)
    modalBg[11].classList.add('bg-active');
});
submitBtn[11].addEventListener('click',function(){
    modalBg[11].classList.remove('bg-active');
});
modalClose[11].addEventListener('click',function(){
    modalBg[11].classList.remove('bg-active');
})

// wrafuthen
Btn10.addEventListener('click',function(){
    if(armySize>=600)
    modalBg[12].classList.add('bg-active');
});
submitBtn[12].addEventListener('click',function(){
    modalBg[12].classList.remove('bg-active');
});
modalClose[12].addEventListener('click',function(){
    modalBg[12].classList.remove('bg-active');
})