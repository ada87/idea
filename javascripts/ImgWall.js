(function( fn ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = fn();
	} else {
		fn(true);
	}
})(function(gobal){
	//单例模式
	var _self = null;
	//配置及数据存放
	var CONFIG = {
		CONTAINER_ID : '',			//	容器ID
		SCALE:true,					//	开启放大缩小
		ROTATE:false,				//	开启旋转
		AUTO_OPEN : true,			//	自动启动,如果设为false，只会new一个imgwall,手动调用一下imgwall.open方法即可打开
		AUTO_PLAY : false,			//	是否自动播放
		AUTO_PLAY_LIMIT : 0,		//	自动播放时间设置
		DATAS:[]					//	图片数组
	};
	//计算样式的数据
	var STYLE = {
		WIN_WIDTH:0,				//	浏览器宽度
		WIN_HEIGHT:0,				//	浏览器高度
		TRANSFORM:(function () {	//	浏览器的变化属性名
	  		var tmpStyle = document.createElement("div").style;
	  		var lists = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
	  		var transform = '';
		  	for (var i = 0, iLen = lists.length; i < iLen; i++) {
		  		transform = lists[i] + 'ransform';
		  		if (transform in tmpStyle) {
		  			return transform;
		  		}
		  	}
		  	return transform;
	  	}())
	};
	//页面元素
	var ELEMENTS = {
		ROOT:null,					//	图片墙-容器根节点
		HEAD:null,					//	头部工具条
		WALL:null,					//	图片墙-列表根节点
		FOOT:null					//	尾部工具条
	};
	//事件
	var EVENTS = {
		OPEN_EVENT:null,			//	打开时的事件
		CLOSE_EVENT:null,			//	关闭时的事件
		SWITCH_EVENT:null,			//	切换图片时的事件
		TOUTH_EVENT:null			//	点击图片时的事件
	};
	//状态存储
	var STATE = {
		BAR_SHOW:true,				//	状态栏是否正在显示
		SCALE_LAST:1,				//	最后一次的SCALE的大小
		LOCATE_LAST:1,				//	最后一次旋转的大小
		CURRENT_INDEX:0				//	当前浏览图片的位置
		
	};
	//触屏对象
	var TOUTH = null;
	function _initDefault(config){
		CONFIG.CONTAINER_ID = typeof config.id!='undefined'?config.id:'';
		CONFIG.AUTO_OPEN = typeof config.auto_open!='undefined' ? config.auto_open:CONFIG.AUTO_OPEN;
		
		
		CONFIG.SCALE = typeof config.scale!='undefined' ? config.scale:CONFIG.SCALE;
		CONFIG.ROTATE = typeof config.rotate!='undefined' ? config.rotate:CONFIG.ROTATE;
		
		CONFIG.AUTO_PLAY = typeof config.auto_play!='undefined' ? config.auto_play:CONFIG.AUTO_PLAY;
		CONFIG.AUTO_PLAY_LIMIT = typeof config.auto_play_limit!='undefined' ? config.auto_play_limit:CONFIG.AUTO_PLAY_LIMIT;
		CONFIG.DATAS = typeof config.data!='undefined' ? config.data:CONFIG.DATAS;
		
		STYLE.WIN_HEIGHT=document.body.offsetHeight;
		STYLE.WIN_WIDTH = document.body.offsetWidth;
		
		
		ELEMENTS.ROOT = document.getElementById(config.id);
	};
	function _buildHTML(){
//		delete Hammer.defaults.cssProps.userSelect;
		var hid = CONFIG.CONTAINER_ID+'_header', wid = CONFIG.CONTAINER_ID+'_wall', fid = CONFIG.CONTAINER_ID+'_footer';
		if(ELEMENTS.ROOT==null){
			ELEMENTS.ROOT=document.createElement('article');
			document.body.appendChild(ELEMENTS.ROOT);
		}
		var headerHTML = '<section class="iw_header" id="'+hid+'">返回</section>';
		var wallHTML = '<section class="iw_wall"><div id="'+wid+'" class="iw_wall_ct"></div></section>';
		var footHTML = '<section class="iw_footer" id="'+fid+'"></section>';
		ELEMENTS.ROOT.innerHTML = headerHTML+wallHTML+footHTML;
		ELEMENTS.HEAD = document.getElementById(hid);
		ELEMENTS.WALL = document.getElementById(wid);
		ELEMENTS.FOOT = document.getElementById(fid);
		
		ELEMENTS.ROOT.className+=' iw_container';
		ELEMENTS.ROOT.style.height = STYLE.WIN_HEIGHT+'px';
		ELEMENTS.ROOT.style.width = STYLE.WIN_WIDTH+'px';
		ELEMENTS.WALL.style.width = STYLE.WIN_WIDTH*CONFIG.DATAS.length+'px';
	    
		var wallImgs = '';
		for(var i=0,j=CONFIG.DATAS.length;i<j;i++){
			var img = CONFIG.DATAS[i];
			wallImgs += '<div class="iw_img" style="background-image:url(' + img.imgUrl +');width:'+STYLE.WIN_WIDTH+'px;"></div>';
		}
		ELEMENTS.WALL.innerHTML = wallImgs;
	}
	function _initEvent(){
		TOUTH = Hammer(ELEMENTS.WALL);
		TOUTH.LOCK = false;
		//点击屏幕
		var tapHandder = function(evt){
			if(STATE.BAR_SHOW){
				ELEMENTS.HEAD.style.display='none';
				ELEMENTS.FOOT.style.display='none';
				STATE.BAR_SHOW=false;
			}else{
				ELEMENTS.HEAD.style.display='block';
				ELEMENTS.FOOT.style.display='block';
				STATE.BAR_SHOW=true;
			}
		}
		var panHandder = function(evt){
//			console.log(evt);
			_self.slightMove(evt.deltaX);
		}
		//移动
		var panendHandder = function(evt){
	    	if(evt.deltaX > 0){
	    		var index = STATE.CURRENT_INDEX-1;
	    		index = index<0?0:index;
	    	}else{
	    		var index = STATE.CURRENT_INDEX+1;
	    		index = index>CONFIG.DATAS.length?CONFIG.DATAS.length:index;
	    	}
	    	_self.toIndex(index);
		}
	    TOUTH.on('tap', tapHandder);
	    TOUTH.on('pan', panHandder);
	    TOUTH.on('panend', panendHandder);
		
		
		//放大缩小
		var pinchHandder = function(evt){
		}
		//旋转
		var rotateHandder = function(evt){
			alert(evt.rotation);
//			alert('rotateend');
		}
		
		var defaultAction  = function(evt){
			alert(evt.type);
		}

//		var pinch = new Hammer.Pinch();
//		var rotate = new Hammer.Rotate();
//		pinch.recognizeWith(rotate);
//		TOUTH.add([pinch, rotate]);
		
//	    TOUTH.on('pinchstart', defaultAction);
//	    TOUTH.on('pinchmove', defaultAction);
//	    TOUTH.on('pinchend', defaultAction);
//	    TOUTH.on('pinchcancel', defaultAction);
//	    TOUTH.on('pinchin', defaultAction);
//	    TOUTH.on('pinchout', defaultAction);
//	    
//	    TOUTH.on('rotatestart', defaultAction);
//	    TOUTH.on('rotatemove', defaultAction);
//	    TOUTH.on('rotateend', defaultAction);
//	    TOUTH.on('rotatecancel', defaultAction);
	    
//	    TOUTH.on('pinchend', pinchendHandder);
//	    TOUTH.on('rotateend', rotateendHandder);		
	}
	function stepup(){
		_buildHTML();
		_initEvent();
		if(CONFIG.AUTO_OPEN){
			_self.open();
		}
	};
	var ImgWall = function(config){
		_self=this;
		//有些手机浏览器有BUG（加载时获得的宽高不正确），给点延时
		window.setTimeout(function(){
			_initDefault(config);
			stepup();
		},50)
	}

	ImgWall.prototype = {
		slightMove:function(offset){
			ELEMENTS.WALL.style[STYLE.TRANSFORM] = 'translate(-'+(STYLE.WIN_WIDTH*STATE.CURRENT_INDEX - offset)+'px)';
		},
		toIndex:function(index){
			STATE.CURRENT_INDEX = index%CONFIG.DATAS.length;
			ELEMENTS.WALL.style[STYLE.TRANSFORM] = 'translate(-'+STYLE.WIN_WIDTH*STATE.CURRENT_INDEX+'px)';
		},
		//放大、缩小、旋转
		resize:function(scale,rotate){
			
		},
		//移动
		translate:function(x,y){
			
		},
		//打开
		open:function(){
//			alert('open');
		},
		//关闭
		close:function(){
			
		},
		onOpen:function(fn){
			
		},
		onClose:function(fn){
			
		},
		onSwitch:function(fn){
			
		}
	}
	if(gobal)window.ImgWall = ImgWall;
	return ImgWall;
});

