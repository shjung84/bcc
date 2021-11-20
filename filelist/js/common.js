$(function(){
	layout();
});

function layout(){
	// Tab
	$(".tab-btn button").on("click",function(){
		var idx = $(this).index();
		$(".tab-btn button").eq(idx).addClass("on").siblings().removeClass("on");
		$(".tab-content").eq(idx).addClass("on").siblings().removeClass("on");
	});

	$(".tab-content").each(function(){
		var box = $(this);
		var idx = box.attr('aria-content');
		box.load("tab-content-"+idx+".html");
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
	$(".modify").closest('tr').addClass("modify");		//수정중
	$(".new").closest('tr').addClass("new");			//업뎃
}

function reload(){
	progress()
	target();
	state()
}