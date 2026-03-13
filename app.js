document.querySelectorAll("nav a").forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});

});

});

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){
header.style.background="#020617";
}else{
header.style.background="#0f172a";
}

});
