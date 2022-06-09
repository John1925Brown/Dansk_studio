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