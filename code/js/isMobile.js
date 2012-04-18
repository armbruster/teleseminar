/* a simplefied script for User agent parsing
	   if a platform is mobile (at least iPod, iPhone, iPad, Android of any kind, Nokia Symbian and Windos Phone Devices)
	   we're redirecting to a page optimized for touch UI. Otherwise, the "desktop" version is loaded. Default is
	   "desktop" version, if a mobile device doesn't fall into one of the categories defined up, it will end up in default, 
	   and in that way load wrong page. That is the risk we'll have to take ...
	*/		
	function isMobile() {
		
		//var ua = navigator.userAgent;
		
		var client = function () {
			
			var system = {
				// mobile devices
			   iPhone: false,
			   iPod: false,
			   iPad: false,
			   android: false,
			   winPhone: false,
			   nokiaN: false
			}; 
			
			// get user agent
			var ua = navigator.userAgent;
			
			system.iPhone = ua.indexOf("iPhone") > -1;
			system.iPod = ua.indexOf("iPod") > -1;
			system.iPad = ua.indexOf("iPad") > -1;
			system.nokiaN = ua.indexOf("NokiaN") > -1;
			system.android = ua.indexOf("Android") > -1;
			system.winPhone = ua.indexOf("Windows Phone") > -1;
			
			//return
			return {
				system: system,
				ua: ua
			};
		}();
		
		//window.alert(ua);
		var info = document.getElementById("info");
		
		if ((client.system.iPhone) || (client.system.iPod) || (client.system.iPad) || (client.system.nokiaN) || (client.system.android) || (client.system.winPhone)) {
			// mobile device 			
			return true;
		} else {
			return false;
		}
	}
	
	
	
	function isIOS() {
		
		//var ua = navigator.userAgent;
		
		var client = function () {
			
			var system = {
				// mobile devices
			   iPhone: false,
			   iPod: false,
			   iPad: false,
			   android: false,
			   winPhone: false,
			   nokiaN: false
			}; 
			
			// get user agent
			var ua = navigator.userAgent;
			
			system.iPhone = ua.indexOf("iPhone") > -1;
			system.iPod = ua.indexOf("iPod") > -1;
			system.iPad = ua.indexOf("iPad") > -1;
			system.nokiaN = ua.indexOf("NokiaN") > -1;
			system.android = ua.indexOf("Android") > -1;
			system.winPhone = ua.indexOf("Windows Phone") > -1;
			
			//return
			return {
				system: system,
				ua: ua
			};
		}();
		
		//window.alert(ua);
		var info = document.getElementById("info");
		
		if ((client.system.iPhone) || (client.system.iPod) || (client.system.iPad)) {
			// mobile device 			
			return true;
		} else {
			return false;
		}
	}
