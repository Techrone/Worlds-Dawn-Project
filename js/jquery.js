/*Hover Effect*/
$(document).ready(function(){
	
/********************************************************************/
/*																	*/
/*					  	Global variables							*/
/*																	*/
/********************************************************************/
	var old_scroll_anim = "";
	
	var sideNav_infoBarArray = ['To Top', 'To Game Features', 
								'To Gametrailer'];
	var sideNav_widthSizes = [50, 130, 130];
	var sideNav_buttons = $('#sideNav').children();
	var triggered_arrow = false;
	


/********************************************************************/
/*																	*/
/*							Parallax								*/
/*																	*/
/********************************************************************/
	
	$(".single-parallax").each(function(){
		$(this).css({
				backgroundImage: "url('" + $(this).data('image') + "')"
			});
	});

	$('.multi-parallax').each(function(){
		$(this).css({
			backgroundImage: "url(" + $(this).data('image') + ")"
		})
	});

	

	
/********************************************************************/
/*																	*/
/*							SideNav bar								*/
/*																	*/
/********************************************************************/
	/****************************************/
	/* 	  Initialize data of sideNav bar	*/
	/****************************************/

	$('.addToNav').each(function(index, container)
	{
		var sideNav_button = $(sideNav_buttons[index]);
		
		var infoBar = $('<p class="infoBar">' + 
						$(this).data('idName') + '</p>'
					   );
		
		infoBar.
		hide().
		width($(this).data('idWidth'));	
		
		sideNav_button.append(infoBar);
	});



	/****************************************/
	/*		Hover / Animation effects		*/
	/****************************************/
	
	$('#sideNav .roundContainer')
	.on('mouseover',function(){		//When started hovering over  sideNav
		
		var infoBar = $(this).children()[1];
		infoBar = $(infoBar)			//Converting DOM to jquery object
		infoBar.show();

		setTimeout(function(){
			infoBar.animate({
				left: (infoBar.width() + 10) * -1
			}, 200);
		},200);

	})
	.on('mouseout',function(){		//When stopped hovering over sideNav
		var infoBar = $(this).children()[1];
		infoBar = $(infoBar)					//Converting DOM to jquery object
		infoBar.hide();
	})
	.on('click',function(event){	//When clicked on an item in sideNav
		event.preventDefault();
		var new_id = $(this);//.attr('href');
		
		new_id = $(new_id.children()[0].childNodes[0]);
		new_id = new_id.attr('href');

		/*if scroll animation is still active*/
		if (new_id != old_scroll_anim) {
			$('html, body').clearQueue().stop();
			old_scroll_anim = new_id;
		}
		else{
			return;
		}

		$('html, body').animate({
			scrollTop: $(new_id).offset().top
		}, 1000);
		old_scroll_anim = "";
	});

	$('.world_dawn .rotation img')
	.on('mousedown',function (e){	//When mouse click and hold on logo
		e.preventDefault();
	})
	.on('click', function (e){	 	//Clicked on logo
		e.preventDefault();
		$('.quickLink').each(function(index, element){
			if($(this).attr('href') == "#section1")
			{
				$(this).trigger('click');
			}
		});
	});

	$('#navBar img')
	.on('click',function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
		old_scroll_anim = "";
	})
	.on('mouseenter',function(){
		$(this).css({
			cursor: 'pointer'
		});
	})
	.on('mouseexit',function(){
		$(this).css({
			cursor: 'default'
		});
	});

	
	$('img')	
	.on('mousedown',function(e){	//Images being dragged
		e.preventDefault();
	});

	$(window).scroll(function (event) {	//Updates the sideNav depending on the location
		var scroll = $(window).scrollTop() + 5;
		var previous = null;
		
		var parallax = $($('.parallax-set')[0])
		currentLocation = parallax.position().top;
		var layers = parallax.children();
		var layer;
		for (var i = 0, len = layers.length; i < len; i++) {
			layer = $(layers[i]);
			depth = layer.data('depth');
			layer.css({
				top : -((scroll - currentLocation) * depth) 
			});
		}


		//Adds the animation for the navigation bar
		function addMainNavBar()
		{
			var previous = null;
			var navbar = $('#navBar').position();
			var logo_loc = $('#logo').position();
			if($(window).height() / 2 <= scroll)	//if window passed top header, create logo navbar
			{
				var modulus = logo_loc.top % scroll;
				var div = logo_loc.top / scroll;
				
				if(navbar.top <= -50) 
				{
					$('#navBar').animate({top: 0}, 200);
					setTimeout(function(){
						$('#navBar').clearQueue().stop();
					},200);
				}
			}
			else
			{
				if(navbar.top >= -50) 
				{
					$('#navBar').animate({top: -100}, 200);
					setTimeout(function(){
						$('#navBar').clearQueue().stop();
					},200);
				}	
			}
		}

		
		addMainNavBar();

		$('.addToNav').each(function(index, element){

			if(previous == null)
			{
				if($(this).position().top <= scroll)
				{
					var i = index;
					$('.inner').each(function(index, element){
						if(index == i)
						{
							$(this).css({
								backgroundColor: "#FFBD80"
							})
						}
						else{
							$(this).css({
								backgroundColor: "#812538"
							})
						}
					});
				}
				
			}
			else if($(this).position().top <= scroll && previous.position().top >= scroll)
			{
				var i = index;
				$('.inner').each(function(index, element){
					if(index == i)
					{
						$(this).css({
							backgroundColor: "#FFBD80"
						})
					}
					else{
						$(this).css({
							backgroundColor: "#812538"
						})
					}
				});
			}
		});
	});

	$(window).trigger('scroll');

	/********************************************************************/
	/*																	*/
	/*						Light Box									*/
	/*																	*/
	/********************************************************************/

	//Opening light box
	$(".layout-item-image").on("click",function(event){
		event.preventDefault();
		var image_src = $(this).attr("src")
		
		if ($("#lightbox").length > 0) {
			$('#image-content img').attr('src',image_src);
			//show lightbox window - you can use a transition here if you want, i.e. .show('fast')
			$('#lightbox').show();
		}
		else{
			var lightbox = 
				'<div id="lightbox" onclick="removeLightBox(this)">' +
					'<span onclick="removeLightBox(this)">X</span>' +
					'<div id="image-content">' +
						'<img src="' + image_src + '"/>' +
					'</div>' +
				'</div>';

			$('body').append(lightbox);
			
		}
	});

	//Opening light box
	$("#close").click(function(event){
		event.preventDefault();
			$('body').remove('#lightbox');
		console.log("Fire!!!!");
	});

});