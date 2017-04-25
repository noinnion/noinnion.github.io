
function isEmailValid(email) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return filter.test(email);
}

function isMobile() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isScrolledIntoView(elem)
{
  var centerY = ($(window).height()/2) + $(window).scrollTop();
  var elementTop = $(elem).offset().top;
  var elementBottom = elementTop + $(elem).outerHeight();
  return elementTop <= centerY  && elementBottom >= centerY;
}

function countDown() {
	var BigDay = new Date("14 March 2017, 12:00:00");
	var msPerDay = 24 * 60 * 60 * 1000;
	var today = new Date();
	var timeLeft = (BigDay.getTime() - today.getTime());
	var e_daysLeft = timeLeft / msPerDay;
	var daysLeft = Math.floor(e_daysLeft);
	var e_hrsLeft = (e_daysLeft - daysLeft)*24;
	var hrsLeft = Math.floor(e_hrsLeft);
	var e_minsLeft = (e_hrsLeft - hrsLeft)*60;
	var minsLeft = Math.floor(e_minsLeft);
	var e_secsLeft = (e_minsLeft - minsLeft)*60;
	var secsLeft = Math.floor(e_secsLeft);
	var timeString = daysLeft + "d " + hrsLeft + "h " + minsLeft + "m " + secsLeft + "s left";
	if (BigDay.getTime() > today.getTime()) {
		$('#countdown').html(timeString);
	} else {
		$('#countdown').html("ended");
	}
}

$(document).ready(function() {
	$(function introAnimation() {
		setTimeout(function() {
	    $('.screenshot-container img').css({'visibility':'visible'}).addClass('animated slideInUp');
	  }, 500);
	});
	// $(countDown());
	// window.setInterval(function(){
	// 	countDown();
	// }, 1000);
	$(function menuButton() {
	  var menuVisible = false;
	  $('#menubutton').click(function() {
	    if (menuVisible) {
	      $('nav').slideUp();
	      menuVisible = false;
	      return;
	    }
	    $('nav').slideDown().css({'display':'block'});
	    menuVisible = true;
	  });
	});
	if (isMobile()) {
		$('video').attr('onclick','this.paused?this.play():this.pause();');
		$('video').attr('controls', '');
		$('video').on('play', function () {
			if (!$('video').paused) {
		   $(this).removeAttr('controls', '');
			}
		});
		$('video').on('pause', function () {
		  $('video').attr('controls', '');
		});
	}
  $('#signupForm').on('submit',function(e) {
  	e.preventDefault();
  	if ( isEmailValid($('#email').val()) ){
  		var base= 'http://binarynights.com/newsletter_signup.php';
  		var verStr = '2464195387';
  		var newsletterType='ForkLift3-MainPage';
  		$.get(base+'?verificationString='+verStr+'&newsletter='+newsletterType+'&email='+$('#email').val(), function (data,status) {
  			if ( status == 'success'){
  				$('#submit').val('Thank you');
					$('#submit').prop('disabled', true);
  				$('#submit').css('background-color','#34c653');
					$('#submit').css({'border':'1px solid #2daa47'});
					$('#submit').css({'border-left':'0'});
  				$('#submit').attr('disabled','disabled');
  				$('#email').attr('readonly','readonly');}
  		});
  	} else {
  		$('#submit').val('Invalid');
			$('#submit').prop('disabled', true);
  		$('#submit').css('background-color','#eb4e5e');
			$('#submit').css({'border':'1px solid #bb3e4b'});
			$('#submit').css({'border-left':'0'});
  	}
  	return false;
  });
  $('#email').keydown(function(e) {
  if ( $('#submit').val() == 'Invalid' ) {
  	$('#submit').val('Subscribe');
		$('#submit').prop('disabled', false);
  	$('#submit').css({'background-color':'#00d2ff'});
		$('#submit').css({'border':'1px solid #00b6dd'});
		$('#submit').css({'border-left':'0'});
    }
  });

	//resend
	$('#resendForm').on('submit',function(e) {
  	e.preventDefault();
  	if ( isEmailValid($('#resendEmail').val()) ){
  		var base= 'https://support.binarynights.com/php/resend_license_key.php';
			$.ajax({
				url: base+'?email='+$('#resendEmail').val(),
				success: function (data) {
					$('#resendSubmit').val('Email Sent');
					$('#resendSubmit').prop('disabled', true);
					$('#resendSubmit').css('background-color','#34c653');
					$('#resendSubmit').css({'border':'1px solid #2daa47'});
					$('#resendSubmit').css({'border-left':'0'});
  				$('#resendSubmit').attr('disabled','disabled');
  				$('#resendEmail').attr('readonly','readonly');
					},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$('#resendSubmit').val('Error');
					$('#resendSubmit').prop('disabled', true);
					$('#resendSubmit').css('background-color','#eb4e5e');
					$('#resendSubmit').css({'border':'1px solid #bb3e4b'});
					$('#resendSubmit').css({'border-left':'0'});
				},
				statusCode: {
					404: function () {
						$('#resendSubmit').val('No License');
						$('#resendSubmit').prop('disabled', true);
						$('#resendSubmit').css('background-color','#eb4e5e');
						$('#resendSubmit').css({'border':'1px solid #bb3e4b'});
						$('#resendSubmit').css({'border-left':'0'});
					}
				}
			});
  	} else {
			$('#resendSubmit').val('Invalid');
			$('#resendSubmit').prop('disabled', true);
  		$('#resendSubmit').css('background-color','#eb4e5e');
			$('#resendSubmit').css({'border':'1px solid #bb3e4b'});
			$('#resendSubmit').css({'border-left':'0'});
  	}
  	return false;
  });
  $('#resendEmail').keydown(function(e) {
  if (( $('#resendSubmit').val() == 'Invalid' ) || ( $('#resendSubmit').val() == 'No License' ) || ( $('#resendSubmit').val() == 'Error' )){
  	$('#resendSubmit').val('Submit');
		$('#resendSubmit').prop('disabled', false);
  	$('#resendSubmit').css({'background-color':'#00d2ff'});
		$('#resendSubmit').css({'border':'1px solid #00b6dd'});
		$('#resendSubmit').css({'border-left':'0'});
    }
  });

	var watch_serial_timer = null;
	$('input[name=fl2-serial]').on("keyup input propertychange paste",function (e) {
		if ( watch_serial_timer )
		{
			clearTimeout(watch_serial_timer);
		}
		watch_serial_timer = setTimeout(watch_serial,0);
	});

});


$(window).scroll(function() {

	$('video').each(function() {
    if (isScrolledIntoView($(this).parent().parent()) && !isMobile()) {
      this.play();
    } else {
      if (!isMobile()) {
        this.pause();
      }
    }
  });

  if ($('#feature article').is(':in-viewport()')) {
    $('#feature article:in-viewport(0)').addClass('animated fadeIn slower').css({'opacity':'1'});
  }

  if ($('#main-feature.centerd').is(':in-viewport(1)') || $('#feature').is(':in-viewport(-1)')) {
    $('#main-feature.centerd').addClass('darken');
    $('#d0').addClass('hidden');
    $('#d1').removeClass('hidden');
  }
});


$(window).bind('scroll', function() {
	if (($(window).scrollTop() > 60) && ($(window).width() > 999)) {
		$('#navman').addClass('ontop');
	}
	else if (($(window).scrollTop() > 120) && ($(window).width() > 767)) {
		$('#navman').addClass('ontop');
	}
	else {
		$('#navman').removeClass('ontop');
	}
});