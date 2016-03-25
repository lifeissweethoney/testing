$(function(){
	$.fn.BgChange = function(){
		var obj = this,
				timing = 1000;
		obj.each(function(index){
			var divLength = $(this).find("div").length;
			var _this = $(this);
			var	$resetTime = '';
			timeRound(index,divLength);

			$(document).ready(function(){setWidth();});
			$(window).resize(function(){setWidth();});
			_this.parent().mouseenter(function(e){
				clearInterval($resetTime);
			});
			_this.parent().mouseleave(function(e){
				timeRound(index,divLength);
			});
			//times rand opacity
			function timeRound(index,divLength){
				var _times = timing * (index + 1),
						_opacityTimes = timing * ((index+2)/2);
				var count = 0;
				var $length = divLength - 1;
				$resetTime = setInterval(function(){
		        if(count < $length){
		          count++;
		        }else{
		          count = 0;
		        }
						_this.find("div").animate({opacity:"0"},_opacityTimes);
						_this.find("div").eq(count).animate({opacity:"1"},_opacityTimes);
		    },_times);
			}
			function setWidth(){
				$("section.Fool").height($(window).height());
				_this.find("div").css("width",_this.parent().width());
			};
		});
	};

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
		artistList += "<span class='icon'><img src='" + artist[i] + "'></span>";
	}
	for(var i=0; i < artwork.length; i++){
		artworkList += "<span class='icon'><img src='" + artwork[i] + "'></span>";
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

	//頭像選單顯示
	$(".left,.right").hover(function(){
		$(this).find(".menu").stop().fadeToggle();
	});
	//藝術家頭像
	$(".left span.icon").click(function(){
		$("body").css("overflow","hidden");
		$("#mask,.left-draw .close").fadeIn();
		$(".left-draw").css("width","50%");
	});
	//作品頭像
	$(".right span.icon").click(function(){
		$("body").css("overflow","hidden");
		$("#mask,.right-draw .close").fadeIn();
		$(".right-draw").css("width","50%");
	});
	//關閉藝術家和作品詳細資料
	$(".left-draw .close,.right-draw .close,#mask").on("click", function(){
		$(".right-draw,.left-draw").css("width","");
		$("#mask,.left-draw .close,.right-draw .close").fadeOut(function(){
            $("body").removeAttr("style");
		});
	});
	//點選頭像展開相應的內容
	$(".left .menu,.left-draw .menu").on("click","span",function(){
		var spanIndex = $(this).index()-2;
		$(".left-draw .artist").removeClass("selected");
		$(".left-draw .artist").eq(spanIndex).addClass("selected");
	});
	//點選作品展開相應的內容
	$(".right .menu,.right-draw .menu").on("click","span",function(){
		var spanIndex = $(this).index()-2;
		$(".right-draw .artwork").removeClass("selected");
		$(".right-draw .artwork").eq(spanIndex).addClass("selected");
	});


	$(".left, .right").find(".scrollBg").BgChange();

	//$.fn.BlockScroll = function(){};
	////////////////第二樓特效///////////////////
	var scrollNum = 0;
	var	$setTime_1 = setInterval(blockScroll,2000);
	function blockScroll(){
		if(scrollNum >= $(".Fo2 .wrap .block").length){
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
	});
	$("#blockPrev,#blockNext,.Fo2 .inside").mouseleave(function(){
	});
});
