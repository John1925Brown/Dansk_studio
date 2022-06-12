const sliders = document.querySelectorAll('.swiper');

sliders.forEach((el) => {
  const swiper = new Swiper('.swiper', {
    loop: false,
    // slidesPerView: 3,
    // slidesPerGroup: 3,
    // direction: 'vertical',
    grid: {
      rows: 3,
      fill: 'row',
    },
    breakpoints: {
      320: {
        column: 1,
      },
      768: {
        column: 2,
      }
    },
    // If we need pagination
    pagination: {
      el: el.querySelector('.swiper-pagination'),
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>';
      }
    },

    // Navigation arrows
    navigation: {
      nextEl: el.querySelector('.swiper-button-next'),
      prevEl: el.querySelector('.swiper-button-prev'),
    }

  });

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var fraction = $('.swiper-pagination');

  next.css('left', prev.width() + 20 + fraction.width() + 30)
  fraction.css('left', prev.width() + 30)
});

$('.header__burger').on('click', function (e) {
  e.preventDefault;
  $(this).toggleClass('header__burger--active');
  $('.menu__nav').toggleClass('menu__nav--active');
  $('.friends').toggleClass('friends--active');
});

(function () {
  const header = document.querySelector('.header')
  window.onscroll = () => {
    if(window.pageYOffset > 50) {
      header.classList.add('header__scroll');
    }
      else{
        header.classList.remove('header__scroll')
      }
  };
  }());






/*
$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger,.menu__nav').toggleClass('active');
  });
}); */