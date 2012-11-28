function lazyLoader()
{
	this.head = document.getElementsByTagName('head')[0];

	this.createElement = function(type, source) {
		var element = document.createElement(type);
		switch(type)
		{
			case 'script':
				element.type = 'text/javascript';
				element.src = source;
				break;
			case 'link':
				element.rel = 'stylesheet';
				element.type = 'text/css';
				element.href = source;
				break;
		}
		return element;
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
			}
		}
		else
		{
			element.onload = callback;
		}
		this.head.appendChild(element);
	};

	this.js = function(src, callback) {
		this.asset('script', src, callback);
	};

	this.css = function(src, callback) {
		this.asset('link', src, callback);
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
}