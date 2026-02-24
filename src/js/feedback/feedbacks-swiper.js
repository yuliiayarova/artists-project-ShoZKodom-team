import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  loop: false,
  navigation: {
    nextEl: '.feedback-btn-next',
    prevEl: '.feedback-btn-prev',
    disabledClass: 'is-disabled',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
    renderBullet: function (index, className) {
      if (index < 3) {
        return `<span class="${className}" data-index="${index}"></span>`;
      }
      return '';
    },
  },
  on: {
    slideChange: function () {
      const bullets = document.querySelectorAll('.swiper-pagination-bullet');
      const total = this.slides.length;
      const current = this.realIndex;

      bullets.forEach(b =>
        b.classList.remove('swiper-pagination-bullet-active')
      );

      if (current === 0) {
        bullets[0].classList.add('swiper-pagination-bullet-active');
      } else if (current === total - 1) {
        bullets[2].classList.add('swiper-pagination-bullet-active');
      } else {
        bullets[1].classList.add('swiper-pagination-bullet-active');
      }
    },
  },
});

const btnNextFeedback = document.querySelector('.feedback-btn-next');
const btnPrevFeedback = document.querySelector('.feedback-btn-prev');

document
  .querySelector('.swiper-pagination')
  .addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('swiper-pagination-bullet')) {
      const bulletIndex = parseInt(target.getAttribute('data-index'));
      const totalSlides = swiper.slides.length;

      if (bulletIndex === 0) {
        swiper.slideTo(0);
      } else if (bulletIndex === 1) {
        swiper.slideTo(1);
      } else if (bulletIndex === 2) {
        swiper.slideTo(totalSlides - 1);
      }
    }
  });
