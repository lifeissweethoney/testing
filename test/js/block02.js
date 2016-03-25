$(function(){

	//產生圖片
	var artistList = '',
		artworkList = '',
		artistBgList = '',
		artworkBgList = '';
	var artistBg = new Array (
		"img/designerBig1.jpg",
		"img/productBig1.jpg",
		"img/designerBig1.jpg"
	);
	var artworkBg = new Array (
		"img/kitchen_adventurer_caramel.jpg",
		"img/kitchen_adventurer_cheesecake_brownie.jpg",
		"img/kitchen_adventurer_donut.jpg",
		"img/kitchen_adventurer_lemon.jpg"
	);
	var artist = new Array(
		"img/pic1.jpg",
		"img/pic2.jpg",
		"img/pic3.jpg",
		"img/pic3.jpg",
		"img/pic2.jpg",
		"img/pic1.jpg"
	);
	var artwork = new Array(
		"img/pic3.jpg",
		"img/pic2.jpg",
		"img/pic1.jpg",
		"img/pic1.jpg",
		"img/pic2.jpg",
		"img/pic3.jpg"
	);

	for(var i=0; i < artist.length; i++){
		artistList += "<span><img src='" + artist[i] + "'></span>";
	}
	for(var i=0; i < artwork.length; i++){
		artworkList += "<span><img src='" + artwork[i] + "'></span>";
	}
	$(".left").find(".menu").append(artistList);
	$(".left-draw").find(".menu").append(artistList);
	$(".right").find(".menu").append(artworkList);
	$(".right-draw").find(".menu").append(artworkList);

	for(var i=0;i<artistBg.length;i++){
		artistBgList += "<div><img src='" + artistBg[i] + "'></div>"
	}
	for(var i=0;i<artworkBg.length;i++){
		artworkBgList += "<div><img src='" + artworkBg[i] + "'></div>"
	}
	$(".left .scrollBg").append(artistBgList);
	$(".right .scrollBg").append(artworkBgList);

	var index_1 = 0,
		index_2 = 2,
		$setTime_1 = '',
		$setTime_2 = '';

	setWidth();
	$(window).resize(function(){
		console.log("resize");
		setWidth();
		index_1 = 0;
		index_2 = 0;
	});
	function setWidth(){
		$("section.Fool").height($(window).height());
		clearInterval($setTime_1);
		clearInterval($setTime_2);

		$(".left .scrollBg").find("div").css("width",$(".left").width());
		$(".right .scrollBg").find("div").css("width",$(".right").width());
		artistBgMove();
		artworkBgMove();
	};

	$(".left,.right").hover(function(){
		$(this).find(".menu").stop().fadeToggle();
	});

	//藝術家頭像
	$(".left span").click(function(){
		clearInterval($setTime_1);
		clearInterval($setTime_2);
		$("body").css("overflow","hidden");
		$("#mask,.left-draw .close").fadeIn();
		$(".left-draw").css("width","50%");
	});
	//作品頭像
	$(".right span").click(function(){
		clearInterval($setTime_1);
		clearInterval($setTime_2);
		$("body").css("overflow","hidden");
		$("#mask,.right-draw .close").fadeIn();
		$(".right-draw").css("width","50%");
	});
	//關閉藝術家和作品詳細資料
	$(".left-draw .close,.right-draw .close,#mask").on("click", function(){
		artistBgMove();
		artworkBgMove();
		$(".right-draw,.left-draw").css("width","");
		$("#mask,.left-draw .close,.right-draw .close").fadeOut(function(){
            $("body").removeAttr("style");
		});
	});
	//點選頭像展開相應的內容
	$(".left .menu,.left-draw .menu").on("click","span",function(){
		var spanIndex = $(this).index()-2;
		//console.log(spanIndex);
		$(".left-draw .artist").removeClass("selected");
		$(".left-draw .artist").eq(spanIndex).addClass("selected");
	});
	//點選作品展開相應的內容
	$(".right .menu,.right-draw .menu").on("click","span",function(){
		var spanIndex = $(this).index()-2;
		//console.log(spanIndex);
		$(".right-draw .artwork").removeClass("selected");
		$(".right-draw .artwork").eq(spanIndex).addClass("selected");
	});

	//背景圖輪播
	function artistBgMove(){
		//index1 = index[0];
		var wrap1 = $('.left .scrollBg');
		var length1 = $('.left .scrollBg').find("div").length;
		$setTime_1 =setInterval(function(){
			console.log("artistBgMove",index_1);
			BgChange(index_1,wrap1,length1);
		},5000);
	};
	function artworkBgMove(){
		//index2 = index[1];
		var	wrap2 = $('.right .scrollBg');
		var length2 = $('.right .scrollBg').find("div").length;
		$setTime_2 =setInterval(function(){
			console.log("artworkBgMove",index_2);
			BgChange(index_2,wrap2,length2);
		},5000);
	};
	function BgChange(index,wrap,length){
		console.log("BgScroll",index);
		//index<length-1?index+1:index=0;
		if(index<length-1){
			index++;
		}else{
			index = 0;
		}
		wrap.find("div").animate({opacity:"0"},300);
		wrap.find("div").eq(index).animate({opacity:"1"},300);
	};
/*	//背景圖輪播
	var index=0;
	function BgScroll(wrap,length,block){
		//console.log(index);
		if(index<length-1){
			index++;
		}else{
			index = 0;
		}
		var _width = -(index*block);
		wrap.animate({left:_width},500);
	};
	function artistBgMove(){
			wrap1 = $('.left .wrap');
			length1 = $('.left .wrap').find("div").length;
			block1 = $('.left').width();
		setInterval(function(){
			BgScroll(wrap1,length1,block1);
		},5000);
	};
	function artworkBgMove(){
		wrap2 = $('.right .wrap');
		length2 = $('.right .wrap').find("div").length;
		block2 = $('.right').width();
		setInterval(function(){
			BgScroll(wrap2,length2,block2);
		},5000);
	};
	artistBgMove();
	artworkBgMove();*/

	$(".Fo2 .wrap").css({
		"width":$(this).find("div.block").length*$(".Fo2 .inside").width(),
		"height":"100%",
		"position":"absolute"
	});

	var scrollNum = 0,
		$setTime_3 = setInterval(blockScroll,2000);
	function blockScroll(){
		if(scrollNum > $(".Fo2 .wrap .block").length-1){
			scrollNum = 0;
		}
		console.log(scrollNum);
		$(".Fo2 .wrap").animate({
			left:scrollNum*1024*-1
		},500);
		scrollNum++;
	};
	$("#blockPrev,#blockNext,.Fo2 .inside").mouseenter(function(){
		console.log("mouseenter");
		//clearInterval($setTime_3);
	});
	$("#blockPrev,#blockNext,.Fo2 .inside").mouseleave(function(){
		//$setTime_3 = setInterval(blockScroll,2000);
	});
/*	$("#blockPrev").click(function(){
		scrollNum = scrollNum+1;
		blockScroll();
	});
	$("#blockNext").click(function(){
		scrollNum = scrollNum-1;
		blockScroll();
	});*/
});
