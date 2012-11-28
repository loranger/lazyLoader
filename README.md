lazyLoader
==========

A Javascript snippet for assets lazy loading

Embed loazyloader.js in your webpage :
```html
<script src="lazyloader.js" type="text/javascript" charset="utf-8"></script>
```
Note : You can also paste the whole lazyloader.js' code directly in your webpage header in order to make it instantly available.

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

load.assets(['/js/scripts.js', '/js/forms.js', '/css/extra-styles.css'], function(){
	alert('Ready, steady, go');
});
```