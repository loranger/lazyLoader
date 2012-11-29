lazyLoader
==========

A Javascript snippet for assets lazy loading

***

Getting Started
---------------
Embed loazyloader.js in your webpage :
```html
<script src="lazyloader.js" type="text/javascript" charset="utf-8"></script>
```
Note : You can also paste the whole lazyloader.js' code directly in your webpage header in order to make it instantly available, or you can use the alternative **[autoload method](#autoload-method)**

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

***


Autoload method
---------------
Another way to use lazyLoader is to defer loading, and kind of lazyLoad the lazyLoader itself :
```javascript
// Define an array named lzl (sorry you cannot change this name)
var lzl = lzl || [];

// Populate it with two dimensionnal arrays (the first dimension is the asset url, the second one is the callback)
lzl.push(['http://www.site.com/myscript.js', myCallback]);

lzl.push(['http://www.csszengarden.com/zengarden-sample.css', function(){
	alert('I love Feng-Shui');
}]);

lzl.push(['jQuery', function(){
	$('body').append('<h1>jQuery is now avalaible</h1>');
}]);

// Then paste the following anonymous function (make sure you replaced the dummy url by the real url you use to store lazyLoader.js script)
(function() {
	var ll = document.createElement('script'); ll.type = 'text/javascript';
	ll.src = 'http://cdn.my-website.com/js/lazyLoader.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ll, s);
})();
```
That's all : lazyLoader will automatically loaded and then will lazyLoad your assets as requested.

***

TODO
----
Handle an array of assets to be loaded, in order to simplify calls :
```javascript
var load = new lazyLoader();

load.assets(['/js/scripts.js', '/js/forms.js', '/css/extra-styles.css'], function(){
	alert('Ready, steady, go');
});
```