$(window).on('scroll', function(){

});

$(function(){
	fileInclude();	// File Include
	navAction();	// Nav
	pathAction();	// Path
	tabs();			// Tab
	addFile();
	addFileImg();

	$(window).resize(function(){

	}).resize();
});

/* File Include */
function fileInclude(){
	$(".header").load("../../bcc/inc/inc_header.html");
	$(".footer").load("../../bcc/inc/inc_footer.html");
}

/* NAV */
function navAction(){
	var nav = $(".nav");
	var item = $(".nav__item",nav);
	var link = $(".nav__link",nav);
	var sub = $(".nav__sub",nav);
	var active = "active";
	var state = ".active";
	var current = ".current";
	item.each(function(){
		if($(this).is(current)){$(this).addClass(active);}
	});
	link.on("click",function(){
		var ths = $(this);
		var btn = ths.closest(item);
		if(btn.is(state)){
			btn.find(sub).slideUp(100,function(){
				btn.removeClass(active);
			});
		}else{
			item.removeClass(active);
			sub.slideUp(100);
			btn.find(sub).slideDown(100,function(){
				btn.addClass(active);
			});
		}
		return false;
	});
}

/* Path */
function pathAction(){
	var path = $(".path");
	var select = $(".path__select",path);
	var selected = $(".path__selected",path);
	var option = $(".path__option",path);
	var optionList = $(".path__option a",path);

	select.on("mouseenter", function(){
		$(this).find(option).stop().slideDown(200,function(){
			$(this).addClass("on");
		});
	}).on("mouseleave",function(){
		$(this).find(option).stop().slideUp(200,function(){
			$(this).removeClass("on");
		});
	})
	optionList.on("click",function(){
		var ths = $(this);
		var box = ths.closest(select);
		var opt = box.find(option);
		box.find(selected).text($(this).text());
		opt.stop().slideUp(100,function(){
			box.removeClass("on");
		});
	});
}

/* TAB */
function tabs(){
	var tabs = $(".tabs");
	var btn = $(".tabs__btn",tabs);
	var box = $(".tabs__contents",tabs);
	var act = "tabs--active";

	btn.on("click",function(){
		var idx = $(this).index();
		btn.eq(idx).addClass(act).siblings().removeClass(act);
		box.eq(idx).addClass(act).siblings().removeClass(act);
	});
}

/* toggle list */
toggleList();
function toggleList(){
	var list =  $(".toggle__list");
	var item = $(".toggle__item",list);
	var btn = $(".toggle__btn",list);
	var board = $(".board__list",list);
	var active = "toggle--active";
	var state = ".toggle--active";

	btn.on("click",function(){
		var box = $(this).closest(item);
		if(box.is(state)){
			box.removeClass(active);
			box.find(board).slideUp(100);
		}else{
			item.removeClass(active);
			board.slideUp(100);
			box.addClass(active);
			box.find(board).slideDown(100);
		}
	});
}

/* POPUP */
function modalPopup(fileurl){
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
function modalHide(){
	$("body").removeClass("modal");
	$(".trplayer").remove();
	$(".trplayerw").remove();
	$(".pop__modal").remove();
}

function addFile(){
	var file = $("[class^=input__set__file]");
	var btn = $("[class^=input__btn-del]",file);
	var text = $("[class^=input__file-name]",file);
	var target = $(".input__file-hidden",file);
	var active = "active";

	target.on("change",function(){
		var _file = $(this).closest(file);
		var _text = _file.find(text);
		if(window.FileReader){var fileName = $(this)[0].files[0].name;}
		_file.addClass(active);
		_text.text(fileName);
	});

	btn.on("click",function(){
		var _file = $(this).closest(file);
		var _text = _file.find(text);
		_file.removeClass(active);
		_text.text("");
	});
}

function addFileImg(){
	var imgTarget = $('.input__set__photo .input__file-hidden');
	var box = $("[aria-photobox]");
	imgTarget.on('change', function(){
		box.children('img').remove();
		if(window.FileReader){
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				box.prepend('<img src="'+src+'">');
			}
			reader.readAsDataURL($(this)[0].files[0]);
		}
	});
}

// S : 임시 : 퍼블 LNB 확인용
function depth(depth1,depth2,depth3){

	//Nav
	var nav = $(".nav");
	var _depth1 = $("[aria-depth="+depth1+"]",nav);
	var _depth2 = depth2 - 1;

	_depth1.addClass("active");
	_depth1.find(".nav__sub li").eq(_depth2).addClass("current");

	//Path
	var path = $(".path");
	var menuType = path.attr("aria-menutype");
	var depth_1_box = $("[aria-depth-01] .path__selected span",path);
	var depth_1_text ;
	var depth_2_box = $("[aria-depth-02] .path__selected span",path);
	var depth_2_text ;
	var depth_2_list = $("[aria-depth-02] .path__option ul",path);
	var depth_2_sub ;
	var depth_3_box = $("[aria-depth-03] .path__selected span",path);
	var depth_3_text ;

	if(menuType == 1){//관리자
		if(depth1 === 1){
			depth_1_text = "확진자 관리";
			if(depth2 === 1){
				depth_2_text = "CCTV 관리";
			}else if(depth2 === 2){
				depth_2_text = "연동시스템";
			}
			depth_2_sub = [
				["CCTV 관리","../../bcc/cctv/list.html"],
				["연동시스템","../../bcc/psystem/interlock.html"]
			]
		}else if(depth1 === 2){
			depth_1_text = "사용자 관리";
			if(depth2 === 1){
				depth_2_text = "계정 관리";
			}else if(depth2 === 2){
				depth_2_text = "메뉴 권한 설정";
			}else if(depth2 === 3){
				depth_2_text = "사용자 작업이력";
			}else if(depth2 === 4){
				depth_2_text = "IP접근제어";
			}else if(depth2 === 5){
				depth_2_text = "CCTV범위설정";
			}else if(depth2 === 6){
				depth_2_text = "삭제기간설정";
			}
			depth_2_sub = [
				["계정 관리","../../bcc/adminMember/list.html"],
				["메뉴 권한 설정","../../bcc/adminMember/#.html"], //추가 : 211124
				["사용자 작업이력","../../bcc/adminMember/userhistory.html"],
				["IP접근제어","../../bcc/adminMember/terminal.html"], //수정 : 211124
				["CCTV범위설정","../../bcc/adminMember/cctvbounds.html"],
				["삭제기간설정","../../bcc/adminMember/deleteperiod.html"]
			]
		}else if(depth1 === 3){
			depth_1_text = "통계 관리";
			if(depth2 === 1){
				depth_2_text = "감염등록";
			}else if(depth2 === 2){
				depth_2_text = "AI분석영상";
			}
			depth_2_sub = [
				["감염등록","../../bcc/statistics/register.html"],
				["AI분석영상","../../bcc/statistics/analysis.html"]
			]
		}
	}else if(menuType == 2){//운영자
		if(depth1 === 1){
			depth_1_text = "확진자 관리";
			if(depth2 === 1){
				depth_2_text = "확진자 조회";
			}else if(depth2 === 2){
				depth_2_text = "확진자 등록";
			}else if(depth2 === 3){
				depth_2_text = "자가격리 종료대상";
			}
			depth_2_sub = [
				["확진자 조회","../../bcc/confirmed/list.html"],
				["확진자 등록","../../bcc/confirmed/reg.html"],
				["자가격리 종료대상","../../bcc/confirmed/end.html"]
			]
		}else if(depth1 === 2){
			depth_1_text = "접촉자 정보";
			if(depth2 === 1){
				depth_2_text = "접촉자 정보";
			}
			depth_2_sub = [
				["접촉자 정보","../../bcc/confirmed/view.html"]
			]
		}else if(depth1 === 3){
			depth_1_text = "감염위험";
			if(depth2 === 1){
				depth_2_text = "감염위험지역 정보";
			}else if(depth2 === 2){
				depth_2_text = "신규 감염자 예측";
			}else if(depth2 === 3){
				depth_2_text = "감염지역 확산정보";
			}
			depth_2_sub = [
				["감염위험지역 정보","../../bcc/infection/list.html"],
				["신규 감염자 예측","../../bcc/infection/list.html"],
				["감염지역 확산정보","../../bcc/infection/list.html"]
			]
		}else if(depth1 === 4){
			depth_1_text = "운영관리";
			if(depth2 === 1){
				depth_2_text = "감염 등록 통계";
			}else if(depth2 === 2){
				depth_2_text = "CCTV 범위 설정";
			}else if(depth2 === 3){
				depth_2_text = "삭제 기간 설정";
			}else if(depth2 === 4){
				depth_2_text = "사용자 작업이력";
			}
			depth_2_sub = [
				["감염 등록 통계","../../bcc/management/list.html"],
				["CCTV 범위 설정","../../bcc/management/list.html"],
				["삭제 기간 설정","../../bcc/management/list.html"],
				["사용자 작업이력","../../bcc/management/list.html"]
			]
		}
	}

	if(depth3){
		$("[aria-depth-03").removeAttr("aria-hidden");
		if(depth3 === 1){
			depth_3_text = "목록";
		}else if(depth3 === 2){
			depth_3_text = "상세조회";
		}
	}

	depth_1_box.html(depth_1_text);
	depth_2_box.html(depth_2_text);
	depth_3_box.html(depth_3_text);

	for (var i=0;i<depth_2_sub.length;i++){
		depth_2_list.append($("<li><a></a></li>"));
	}
	$.each(depth_2_sub,function(i,fn){
		depth_2_list.find("li:eq("+i+") a").text(fn[0]).attr("href",fn[1]);
	});
}
// E : 퍼블 LNB 확인용
