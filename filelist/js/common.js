$(function(){
	layout();
});

function layout(){
	// Tab
	var btn = $(".tab-btn button");
	var cnt = $(".tab-content");
	var on = $(".tab-btn .on");
	var i = on.index()+1;
	cnt.load("tab-content-0"+i+".html");
	btn.on("click",function(){
		var idx = $(this).index();
		var _idx = idx+1;
		btn.eq(idx).addClass("on").siblings().removeClass("on");
		cnt.load("tab-content-0"+_idx+".html");
	});
}

function target(){
	$("table").each(function(){
		$(this).find("a").attr("target","_blank");
	});
}
function progress(){
	// Progress
	$(".progress").each(function(){
		var progress = $(this).closest(".tab-content");
		var total = $("table td.state",progress).length;
		var complete = $("table td.complete",progress).length;
		var modify = $("table td.modify",progress).length;
		$(".total",$(this)).text(total);
		$(".complete",$(this)).text(complete);
		$(".modify",$(this)).text(modify);
	});
}
function state(){
	$(".step-01").closest('tr').addClass("step-01");	//컨펌전
	$(".step-02").closest('tr').addClass("step-02");	//진행중
	$(".complete").closest('tr').addClass("complete");	//완료
	$(".new").closest('tr').addClass("new");	//완료
	$(".modify").closest('tr').addClass("modify");		//수정중
	$(".update").closest('tr').addClass("update");			//업뎃
}

/* POPUP */
function modalPopup(fileurl) {
	$("body").addClass("modal");
	$("body").append($("<div class='trplayer'></div>"));
	$("body").append($("<div class='trplayerw'></div>"));

	$(".trplayerw").append($("<div class='pop__modal'></div>"));
	$(".pop__modal").load(fileurl, function(){
		var modalpopWidth = $(".pop__modal").width();
		$(".pop__modal").css("margin-left",-modalpopWidth/2+"px");
		var modalpopHeight = $(".pop__modal").height();
		$(".pop__modal").css("margin-top",-modalpopHeight/2+"px");
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		function modalCssChange(width, height) {
			var width = parseInt(width);
			var height = parseInt(height);
			if (height < modalpopHeight){
				$("body").addClass("a-height");
			} else {
				$("body").removeClass("a-height");
			}
			if (width < modalpopWidth){
				$("body").addClass("a-width");
			} else {
				$("body").removeClass("a-width");
			}
		}
		$(function() {
			$(window).resize(function() {
				modalCssChange($(this).width(), $(this).height());
			}).resize();
		});
	});
}
function modalHide() {
	$("body").removeClass("modal");
	$(".trplayer").remove();
	$(".trplayerw").remove();
	$(".pop__modal").remove();
}

function reload(){
	progress();
	target();
	state();
}