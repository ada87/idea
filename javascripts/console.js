/*!
 * Console v0.1
 * www.xdnote.com
 *
 * Copyright (c) xdnote
 * Available under the BSD and MIT licenses
 */
/*
 * Console.js 为xdnote前段一个测试API,包括功能点:
 * 模式设置 <script src="console.js" debug="ture" / > 只有true为调试模式,非true值或无值都为false;
 * @authors xdnote.com
 */
! function(document, window) {
  if (document && window) {
    var scripts = document.getElementsByTagName('script'),
      debug = false,
      support = window.console ? true : false;
    for (var i = 0, j = scripts.length; i < j; i++) {
      var script = scripts[i];
      if (script.getAttribute('debug')) {
        debug = (script.getAttribute('debug') == 'true') ? true : false;
        break;
      }
    }
    var compatibility = function() {
      var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
      var debugNotSupport = function(str) {
        window.alert(str);
      };
      var productMode = function() {};
      console = window.console = {};
      var i = 0,
        j = methods.length;
      if (debug && !support) {
        for (i = 0; i < j; i++) {
          console[methods[i]] = window.console[methods[i]] = debugNotSupport;
        }
      } else {
        for (i = 0; i < j; i++) {
          console[methods[i]] = window.console[methods[i]] = productMode;
        }
      }
    };
    var expHelp = function() {
      var comands = [{
        'key': '$$',
        'des': ''
      }, {
        'key': '$x',
        'des': ''
      }, {
        'key': 'dir',
        'des': ''
      }, {
        'key': 'dirxml',
        'des': ''
      }, {
        'key': 'keys',
        'des': ''
      }, {
        'key': 'values',
        'des': ''
      }, {
        'key': 'profile',
        'des': ''
      }, {
        'key': 'profileEnd',
        'des': ''
      }, {
        'key': 'monitorEvents',
        'des': ''
      }, {
        'key': 'unmonitorEvents',
        'des': ''
      }, {
        'key': 'inspect',
        'des': ''
      }, {
        'key': 'copy',
        'des': ''
      }, {
        'key': 'clear',
        'des': ''
      }, {
        'key': 'getEventListeners',
        'des': ''
      }, {
        'key': 'debug',
        'des': ''
      }, {
        'key': 'undebug',
        'des': ''
      }, {
        'key': 'unmonitor',
        'des': ''
      }, {
        'key': 'monitor',
        'des': ''
      }, {
        'key': 'table',
        'des': ''
      }, {
        'key': '$0',
        'des': ''
      }, {
        'key': '$1',
        'des': ''
      }, {
        'key': '$2',
        'des': ''
      }, {
        'key': '$3',
        'des': ''
      }, {
        'key': '$4',
        'des': ''
      }, {
        'key': '$_',
        'des': ''
      }];
      var cmdStyle = 'display:block;width:100px;color:red;font-size:16px;text-align:right;';
      var desStyle = 'color:blue;font-size:16px;';
      var args = [];
      window.console.help = console.help = function() {

        for (var i = 0, j = comands.length; i < j; i++) {
          var helptxt = '';
          helptxt += '%c' + comands[i]['key'] + ':';
          helptxt += '%c' + '   da'+comands[i]['des'];
        }
      };
    };
    // 1: 调试模式,浏览器支持:保持原样
    // 2: 调试模式,浏览器不支持:将所有的console方法定义为window.alert()
    // 3: 产品模式,浏览器支持:将所有的console方法注销,没有任何操作
    // 4: 产品模式,浏览器不支持:将所有的console方法注销,没有任何操作
    if (support && debug) {
      expHelp();
      console.log('%c进入调试模式', 'font-size:x-large;color:red;');
      return;
    } else if (support && !debug) {
      console.log('%c产品模式,不会再输出控制台', 'font-size:x-large;color:red;');
    } else if (!support && debug) {
      window.alert('你的浏览器不支持console,建议上线时不要设置debug为true');
    } else {

    }
    compatibility();
  }
}(document, window);