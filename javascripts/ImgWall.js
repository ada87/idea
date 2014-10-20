(function( fn ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = fn();
	} else {
		fn(true);
	}
})(function(gobal){
	var debug = function(o){
		for(i in o){
			var str = '';
//			if(o.hasOwnProperty(i)){
				str+=i+':'+o[i]+'\n';
//			}
		}
		alert(str);
//		console.log(o);
	}
	var _self = null;
	var CONFIG = {
		CONTAINER_ID : '',
		TRANS_MODE : true,
		TRANS_HIDE : true,
		AUTO_OPEN : true,
		AUTO_PLAY : false,
		AUTO_PLAY_LIMIT : 0,
		DATAS:[]
	};
	var STYLE = {
		WIN_WIDTH:0,
		WIN_HEIGHT:0,
		OPACTIY:'0.5',
		HEAD_BG:'#4B4B4B',
		HEAD_HEIGHT:'3em',
		HEAD_BG:'#4B4B4B',
		HEAD_HEIGHT:'3em'
	};
	var ELEMENTS = {
		ROOT:null,
		HEAD:null,
		WALL:null,
		FOOT:null
	};
	var EVENTS = {
		OPEN_EVENT:null,
		CLOSE_EVENT:null,
		SWITCH_EVENT:null,
		TOUTH_EVENT:null
	};
	var STATE = {
		BAR_SHOW:true,
		CURRENT_INDEX:0,
		PAN_LAST:null
	};
	var TOUTH = null;
	function _initDefault(config){
		CONFIG.CONTAINER_ID = typeof config.id!='undefined'?config.id:'';
		CONFIG.TRANS_MODE = typeof config.trans_mode!='undefined' ? config.trans_mode:CONFIG.TRANS_MODE;
		CONFIG.TRANS_HIDE = typeof config.trans_hide!='undefined' ? config.trans_hide:CONFIG.TRANS_HIDE;
		CONFIG.AUTO_OPEN = typeof config.auto_open!='undefined' ? config.auto_open:CONFIG.AUTO_OPEN;
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
		
		TOUTH = Hammer(ELEMENTS.WALL);
		TOUTH.LOCK = false;
		//点击屏幕
		var tapHandder = function(evt){
			if(CONFIG.TRANS_MODE){
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
		}
		//移动
		var panendHandder = function(evt){
			console.log(evt);
			debug(evt);
	    	if(evt.deltaX<0){
	    		var index = STATE.CURRENT_INDEX-1;
	    		index = index<0?0:index;
	    	}else{
	    		var index = STATE.CURRENT_INDEX+1;
	    		index = index>CONFIG.DATAS.length?CONFIG.DATAS.length:index;
	    	}
	    	_self.toIndex(index);
		}
	    TOUTH.on('tap', tapHandder);
	    TOUTH.on('panend', panendHandder);
	    
		var wallImgs = '';
		for(var i=0,j=CONFIG.DATAS.length;i<j;i++){
			var img = CONFIG.DATAS[i];
			wallImgs += '<div class="iw_img" style="background-image:url(' + img.imgUrl +');width:'+STYLE.WIN_WIDTH+'px;"></div>';
		}
		ELEMENTS.WALL.innerHTML = wallImgs;
	}
	function stepup(){
		_buildHTML();
		if(CONFIG.AUTO_OPEN){
//			_self.open();
		}
	};
	var ImgWall = function(config){
		_self=this;
		_initDefault(config);
		stepup();
	}

	ImgWall.prototype = {
		toIndex:function(index){
			STATE.CURRENT_INDEX = index%CONFIG.DATAS.length;
			ELEMENTS.WALL.style.transform = 'translate(-'+STYLE.WIN_WIDTH*STATE.CURRENT_INDEX+'px)';
		},
		open:function(){
			alert('open');
		},
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

