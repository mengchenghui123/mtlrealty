/*----------------------------------
	//----- JQUERY COUNTER UP -----//
	-----------------------------------*/
$(document).ready(function () {
	$('.counter').counterUp({
		delay: 10,
		time: 5000,
		offset: 100,
		beginAt: 0,
		formatter: function (n) {
			return n.replace(/,/g, '.');
		}
	});
});
