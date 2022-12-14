const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__scales__item-percent'),
    lines = document.querySelectorAll('.skills__scales__item-scgray span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});    


$(window).scroll(function() {
  if ($(this).scrollTop() > 1600 && window.matchMedia("(min-width: 576px)").matches) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

// Add smooth scrolling to all links

$("a").on('click', function(event) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
      event.preventDefault();
    // Store hash
      var hash = this.hash;
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 300, function(){
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

new WOW().init();

//Form validation
$(document).ready(function(){

  function valideForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        text: {
          required: true,
          minlength: 2
        },
          checkbox: "required"
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите минимум {0} символа!")
        },
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        },
        text: {
          required: "Пожалуйста, введите сообщение",
          minlength: jQuery.validator.format("Введите минимум {0} символа!")
        },
        checkbox: ""
      }  
    });
  };

  valideForms('#contacts-form');

  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }

    $.ajax ({
      type:"POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");

      $('form').trigger('reset');
    });
    return false;
  });

});