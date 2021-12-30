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

/* POPUP */
function layerPopup(fileurl,popId){
	var body = $("body");
	if(!body.is(".layer")){body.append($("<div class='trplayer'></div>"))}
	body.addClass("layer");
	body.append($("<div class='trplayerw'></div>"));

	$(".trplayerw").append($("<div class='pop__layer'></div>"));
	$(".pop__layer").load(fileurl,function(){
		var ths = $(this);
		var layerpopWidth = ths.width();
		var layerpopHeight = ths.height();
		ths.css("margin-left",-layerpopWidth/2+"px");
		ths.css("margin-top",-layerpopHeight/2+"px");

		function layerCssChange(width,height) {
			var width = parseInt(width);
			var height = parseInt(height);
			if(height < layerpopHeight){
				body.addClass("a-height");
			}else{
				body.removeClass("a-height");
			}
			if(width < layerpopWidth){
				body.addClass("a-width");
			}else{
				body.removeClass("a-width");
			}
		}
		$(function() {
			$(window).resize(function() {
				layerCssChange($(this).width(), $(this).height());
			}).resize();
		});
		layerHide();
	});
}
function layerHide(){
	var close = $("[aria-pop-close]");
	close.click(function(){
		var x = $(".trplayerw").length;
		if(x <= 1){
			$("body").removeClass("layer");
			$(".trplayer").remove();
		}
		$(this).closest(".trplayerw").remove();
	});
}


