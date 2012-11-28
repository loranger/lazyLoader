lazyLoader
==========

A Javascript snippet for assets lazy loading

Insert the following code in your webpage :

```javascript
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
	}


}
```

Now you can lazyLoad your assets :

```javascript
var load = new lazyLoader();

var myCallback = function(){
	alert('Wow, myscript is loaded !');
}

load.js('http://www.site.com/myscript.js', myCallback);

load.css('http://www.csszengarden.com/zengarden-sample.css', function(){
	alert('I love Feng-Shui');
});
```

You can even "lazyLoad" jQuery in order to write less and do more :

```javascript
var load = new lazyLoader();

load.jquery(function(){
	$('body').append('<h1>jQuery is now avalaible</h1>');
	load.js('/js/fireworks.js', function(){
		alert('Kaboom');
	});
});
```

TODO : Handle an array of assets to be loaded, in order to simplify calls :
```javascript
var load = new lazyLoader();

load.js(['/js/scripts.js', '/js/forms.js', '/css/extra-styles.css'], function(){
	alert('Ready, steady, go');
});
```