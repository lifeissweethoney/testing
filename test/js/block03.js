$(function(){
	////////////////第一樓特效///////////////////
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
				$("section.Fool").height($(window).height()<768?768:$(window).height());
				_this.find("div").css("width",_this.parent().width());
			};
		});
	};
	////////////////第二樓特效///////////////////
	$.fn.BlockScroll = function(){
		var _this = $(this);//$(".Fo2").find("div.wrap")
		var blockLength = _this.find("div.block").length;
		var blockWidth,fullWidth;

		$(document).ready(function(){resetWidth();});
		$(window).resize(function(){resetWidth();});

		function resetWidth(){
			blockWidth = _this.parent().width();
			fullWidth = _this.find("div.block").length*blockWidth;
			_this.find("div.block").css('width', blockWidth);
			_this.css('width', fullWidth);
		};

		var scrollCount = 0;
		var	$setTime_1 = setInterval(Scroll,10000);
		function Scroll(){
			if(!_this.is(":animated")){
				scrollCount < blockLength-1 ?  scrollCount++ : scrollCount = 0;
				// console.log("blockScroll scrollCount_0 :"+scrollCount);
				_this.animate({left: blockWidth * scrollCount * -1}, 500);
			}
		};
		function ScrollBack(){
			if(!_this.is(":animated")){
				scrollCount < 1 ?  scrollCount = blockLength : scrollCount;
				scrollCount--;
				// console.log("ScrollBack scrollCount_0 :"+scrollCount);
				_this.animate({left: blockWidth * scrollCount * -1}, 500);
			}
		};
		$(".Fo2 div.wrap,#blockPrev,#blockNext").mouseenter(function() {
			clearInterval($setTime_1);
		});
		$(".Fo2 div.wrap,#blockPrev,#blockNext").mouseleave(function() {
			$setTime_1 = setInterval(Scroll,10000);
		});
		$("#blockPrev").on("click",function(){ScrollBack();});
		$("#blockNext").on("click",function(){Scroll();});
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

	for(var i=0, max=artist.length; i < max; i++){
		artistList += "<span class='icon'><img src='" + artist[i] + "'></span>";
	}
	for(var i=0, max = artwork.length; i < max; i++){
		artworkList += "<span class='icon'><img src='" + artwork[i] + "'></span>";
	}
	$(".left").find(".menu").append(artistList);
	$(".left-draw").find(".menu").append(artistList);
	$(".right").find(".menu").append(artworkList);
	$(".right-draw").find(".menu").append(artworkList);

	for(var i=0, max=artistBg.length;i<max;i++){
		artistBgList += "<div><img src='" + artistBg[i] + "'></div>"
	}
	for(var i=0, max=artworkBg.length;i<max;i++){
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

////////////////第一樓特效///////////////////
	$(".left, .right").find(".scrollBg").BgChange();
////////////////第二樓特效///////////////////
	$(".Fo2").find("div.wrap").BlockScroll();
////////////////第二樓-2特效///////////////////
$.fn.sliders = function(){
	var obj = this;

	obj.each(function(index){
		var liLength = $(this).find("ul.slides").find("li").length;
		var _this = $(this);
		var _slides = _this.find(".slides");
		var _slidesLi = _this.find(".slides").find("li");
		//console.log(_this);
		//圖片控制圓點
		_this.find(".picview").after("<div class='nav'></div>");
		var creatDot = '';
		for(var i = 0, max = liLength; i < max; i++){
			creatDot += "<span class='dot'></span>"
		}
		_this.find(".nav").append(creatDot);
		var blockWidth,fullWidth;
		//bloc寬度重設
		function resetWidth(){
			blockWidth = _this.find(".picview").width();
			fullWidth = liLength * blockWidth;
			_slidesLi.css({
				width: blockWidth,
				float:"left"
			});
			_slides.css({
				width:fullWidth,
				position:"absolute"
			});
		};
		$(document).ready(function() {resetWidth();});
		$(window).resize(function() {resetWidth();});

		var slideslCount = 0;
		var	$setTime_2 = setInterval(Slider,2000);
		function Slider(){
			if(slideslCount>=liLength-1){
				slideslCount = 0;
			}else{
				slideslCount ++;
			}
			console.log("liLength-1 :"+liLength+" ; slideslCount :"+slideslCount);
			_slides.animate({
				left:blockWidth*slideslCount*(-1)
			},500);
		};
	});
};
	$(".wrap .block").sliders();
});
