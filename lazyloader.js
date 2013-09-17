function lazyLoader()
{
	this.head = document.getElementsByTagName('head')[0];

	this.createElement = function(type, source) {
		var element = document.createElement(type);
		switch(type)
		{
			case 'img':
				element.src = source;
				element.alt = source;
				break;
			case 'script':
				element.type = 'text/javascript';
				element.src = source;
				break;
			case 'link':
				element.rel = 'stylesheet';
				element.type = 'text/css';
				element.href = source;
				break;
			case 'audio':
			case 'video':
				element.src = source;
				break;
		}
		return element;
	};

	this.getExtension = function(url) {
		if (url.indexOf('?') >= 0) {
			url = url.substring( 0, url.indexOf('?') );
		}
		return url.split('.').pop();
	};

	this.asset = function(type, source, callback) {
		var element = this.createElement(type, source);
		var uid = source.replace(/[^a-z0-9]/ig, '');
		if ( element.readyState ) // IE 6 & 7
		{
			element.onreadystatechange = function() {
				if ( !window[uid] && (this.readyState == 'loaded' || this.readyState == 'complete') ) {
					window[uid] = true;
					callback();
				}
			};
		}
		else
		{
			element.onload = callback;
		}
		this.head.appendChild(element);
	};

	this.image = function(src, callback) {
		this.asset('img', src, callback);
	};

	this.js = function(src, callback) {
		this.asset('script', src, callback);
	};

	this.css = function(src, callback) {
		this.asset('link', src, callback);
	};

	this.audio = function(src, callback) {
		this.asset('audio', src, callback);
	};

	this.video = function(src, callback) {
		this.asset('video', src, callback);
	};

	this.jquery = function(callback) {
		if ( !window.jQuery )
		{
			this.js('http://code.jquery.com/jquery-latest.min.js', callback);
		}
		else
		{
			callback.call();
		}
	};

	this.load = function(src, callback) {
		if (src.toLowerCase() == 'jquery') {
			return this.jquery(callback);
		}
		else {
			var type;
			switch( this.getExtension(src) )
			{
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'gif':
				case 'apng':
				case 'svg':
				case 'bmp':
				case 'ico':
				case 'webp':
					type = 'img';
					break;
				case 'css':
					type = 'link';
					break;
				case 'js':
					type = 'script';
					break;
				case 'oga':
				case 'wav':
				case 'mp3':
				case 'aac':
				case 'weba':
				case 'aac':
				case 'aiff':
				case 'au':
				case 'flac':
				case 'midi':
				case 'wma':
					type = 'audio';
					break;
				case 'ogv':
				case 'ogg':
				case 'ogx':
				case 'mp4':
				case 'webm':
					type = 'video';
					break;
			}
			return this.asset(type, src, callback);
		}
	};
}

if ( window.lzl ) {
	var loader = new lazyLoader();
	for (var i = 0; i < window.lzl.length; i++) {
		var args = window.lzl[i];
		loader.load(args[0], args[1]);
	}
	window.lzl = loader;
}