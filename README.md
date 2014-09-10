jquery.livedit
=======

Simple jquery wrapper around HTML contentEditable.

[Demo](http://trurl-master.github.io/livedit/)

#Usage:

##Example html
```
<div id="wrap">
  <div class="text">some text</div>
  <div class="text">some text2</div>
  <div class="textarea">some very long<br>multiline text</div>
</div>
```

##js
```
$('#wrap').livedit('.text', {
		type: 'text', // same behaviour as input[type=text], input triggers finish
		on_change: function(html, text) {
		  alert(html)
		}
})
 
$('#wrap').livedit('.textarea', {
		type: 'textarea', // same behaviour as textarea, by default shift-enter or blur triggers finish
		on_change: function(html, text) {
		  alert(html)
		}
})
```