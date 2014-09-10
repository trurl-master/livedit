jquery.livedit
=======

Simple jquery wrapper around HTML contentEditable.

#Usage:

##Example html
```
<ul>
  <li class="text">some text
  <li class="text">some text2
  <li class="textarea">some very long<br>multiline text
</ul>
```

##js
```
$('ul').livedit('.text', {
		type: 'text', // same behaviour as input[type=text], input triggers finish
		on_change: function(html, text) {
		  alert(html)
		}
})
 
$('ul').livedit('.textarea', {
		type: 'textarea', // same behaviour as textarea, by default shift-enter or blur triggers finish
		on_change: function(html, text) {
		  alert(html)
		}
})
```