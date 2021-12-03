$(function(){
	maibGnb();		// GNB
	agreechk()		// Sgin Up Checked
});

function maibGnb(){
	var btn = $(".btn__gnb");
	var gnb = $(".gnb");
	var close = $(".btn__gnb__close");
	btn.on("click",function(){
		if(!gnb.is(".gnb--active")){
			gnb.addClass("gnb--active");
			gnb.animate({"left":"0"},300, function(){
			})
		}
	});
	close.on("click",function(){
		if(gnb.is(".gnb--active")){
			gnb.animate({"left":"-100%"},300, function(){
				gnb.removeClass("gnb--active");
			})
		}
	});
}

function agreechk(){
	var chk = $(".input__chk-02 input");
	$.each(chk,function(){
		if($(this).is(":checked")){
			$(this).closest("dd").attr("aria-agree-checked",true);
		}else{
			$(this).closest("dd").attr("aria-agree-checked",false);
		}
	});
	chk.on("change",function(){
		if($(this).is(":checked")){
			$(this).closest("dd").attr("aria-agree-checked",true);
		}else{
			$(this).closest("dd").attr("aria-agree-checked",false);
		}
	});
}




