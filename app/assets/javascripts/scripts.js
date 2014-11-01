/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.2
 * Copyright 2014. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  $(function () {

	$(".rotate").textrotator({
		animation: "fade", // dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
		separator: ";",
		speed: 2000
	});

	$('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},3000);
	});

	$('.languages .lang').each(function(){

		var pieVal = $(this).find('.lang-pie').data('value');
		$(this).find('.lang-pie').circleProgress({
			value: pieVal/100,
			startAngle: -Math.PI / 2 * 1,
			fill: {
				color: '#fd6e6e'
			},
		}).on('circle-animation-progress', function(event, progress) {
		    $(this).find('strong').html(parseInt(100 * pieVal/100) + '<i>%</i>');
		});
		
	});

  });

})(jQuery, window, document);
