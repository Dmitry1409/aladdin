$(function() {
	$('#square').keyup(function(){
		var square = $(this).val();
		$('#price').val(square*300)
		if(square > 25){
			$('#square').val(25)
			$('#price').val(7500)
		}
		if(square >= 1 && square <= 18){
			square = square * 150
			$('#price').val(square+2500)
		}
	});
	$('#price').keyup(function(){
		var price = $(this).val();
		if (price < 2650) {
			$('#square').val(0)
		}
		if (price >= 2650 && price < 5200){
			pr = price - 2500
			$('#square').val((pr/150).toFixed(1))
		}
		if(price >= 5200 && price <= 10000){
			$('#square').val((price / 300).toFixed(1))
		}
		if(price > 10000){
			$('#square').val((price/350).toFixed(1))
		}
	});

	$('.ask-blocks .item h4').click(function(){
		var thisH4 = $(this),
			thisSpan = $('div', $(this).parent()),
			outherH4 = $('.ask-blocks .item h4').not(thisH4),
			outherSpan = $('.ask-blocks .item div').not(thisSpan);
		outherH4.removeClass('active');
		outherSpan.hide().removeClass('active');
		thisH4.toggleClass('active');
		thisSpan.fadeToggle().toggleClass('active');
	});
    ymaps.ready(init);
    var myMap, 
        myPlacemark;

    function init(){ 
		if( ($(window).width() <= 767)  ) {
	        myMap = new ymaps.Map("map", {
		            center: [56.472033, 43.613863],
		            zoom: 12,
		            behaviors: ['default', 'scrollZoom']
		        }); 
		} else {
	        myMap = new ymaps.Map("map", {
	            center: [56.472033, 43.613863],
	            zoom: 12,
	            behaviors: ['default', 'scrollZoom']
	        }); 			
		}
			clusterer = new ymaps.Clusterer({
			preset: 'islands#invertedDarkBlueClusterIcons',
			groupByCoordinates: false,
			clusterDisableClickZoom: true,
			clusterHideIconOnBalloonOpen: false,
			geoObjectHideIconOnBalloonOpen: false
			}),
			 
			getPointData = [
			{balloonContentBody: "<div class='ballon-point'>Адрес: Нижегородская обл., г. Балахна, Челюскинцев ул., д. 29<br>", clusterCaption: "09:00 — 17:00"},
			{balloonContentBody: "<div class='ballon-point'>Адрес: Нижегородская обл., г. Нижний Новгорода, ш. Московская, д. 105<br>", clusterCaption: "09:00 — 19:00"},
			],
			 
			getPointOptions = function () {
			return {
			preset: 'islands#DarkBlueIcon'
			};
			},
			 
			points = [
			[56.472033, 43.613863],[56.316893, 43.909444],],
			geoObjects = [];
			 
			for(var i = 0, len = points.length; i < len; i++) {
			geoObjects[i] = new ymaps.Placemark(points[i], getPointData[i], getPointOptions());
			}
			 
			clusterer.options.set({
			gridSize: 80,
			clusterDisableClickZoom: true
			});
			 
			clusterer.add(geoObjects);
			myMap.geoObjects.add(clusterer);
			 
			myMap.setBounds(clusterer.getBounds(), {
			checkZoomRange: true
			});
			myMap.behaviors.disable('scrollZoom');
    		}
    $('.up').click(function(e){
    	e.preventDefault();
    	$('html,body').animate({
          scrollTop: 0
        }, 1000);
    });
    $("input.tel").click(function(){
    	$(this).val('+7');
    });
	$(window).scroll(function() {
		var pos = 86;
		if( ($(window).width() <= 1199) || ($(window).width() >= 768) ) {
			pos = 150;
		}
		if( ($(window).width() <= 767) || ($(window).width() >= 576) ) {
			pos = 150;
		}
		if($(window).width() <= 575) {
			pos = 290;
		}

		if($(this).scrollTop() >= pos) {
			$('nav').addClass('stickytop');
		}
		else{
			$('nav').removeClass('stickytop');
		}
	});
    $('.smoothScroll').click(function(event) {
        event.preventDefault();
        var href=$(this).attr('href');
        var target=$(href);
        var top=target.offset().top;
        $('html,body').animate({
          scrollTop: top
        }, 1000);
    });

	$('.modal').on('hidden.bs.modal', function (e) {
	  $('input:not(.type)', $(this)).val('');
	});
	$('form').submit(function(e){
	    e.preventDefault();
		var form_data = {
			'name':$(".name", $(this)).val(),
			'tel':$(".tel", $(this)).val(),
			'price':$("#price", $(this)).val(),
			'square':$("#square", $(this)).val(),
			'type':$(".type", $(this)).val()
		};
		$.ajax({
		  type: "POST",
		  url: "mail.php",
		  data: form_data,
		  success: function(){
		    $('.modal').modal('hide');
		    setTimeout(function() {
		    	$('.success').fadeToggle();
		    }, 1000);
		    setTimeout(function() {
		    	$('.success').fadeToggle();
		    }, 2500);
		  },
		  error: function() {
		  	alert("Произошла какая то ошибка!");
		  }
		}); 
	});
	new WOW().init();
});