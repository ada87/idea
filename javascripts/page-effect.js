/**
*@atuhor http://www.xdnote.com/
*使用方法一：直接嵌入
* <script type="text/javascript" src="http://www.xdnote.com/javascripts/page-effect.js" ></script>
*使用方法二：将以下脚本拖到书签，点
javascript: void((function() {if(pageEffect)return;var element = document.createElement('script');element.charset = 'utf-8';element.setAttribute('src', 'http://www.xdnote.com/javascripts/page-effect.js');document.body.appendChild(element);})())
*/
pageEffect = !function(document,window,undefined){
	'use strict';
	function Effects(){
		alert(0);
	}
	return {
		'effect':Effects;
	}
}(document,window);