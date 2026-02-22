const closeBtn = document.querySelector('.menu-close-btn');   
const menuContent = document.querySelector('.mobile-menu'); 



closeBtn.addEventListener('click', () => {
  menuContent.classList.remove('is-open'); 
});