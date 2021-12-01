$(function(){
	console.log(`START MAIN`);

	maibGnb();		// GNB
});


function maibGnb(){
	var btn = $(".btn__gnb");
	var gnb = $(".gnb");
	var wrapper = $(".wrapper");
	btn.on("click",function(){
		if(wrapper.is(".gnb--active")){
			wrapper.removeClass("gnb--active");
		}else{
			wrapper.addClass("gnb--active");
		}
	});
}






