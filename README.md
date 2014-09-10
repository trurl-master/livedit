jquery.livedit
=======

Simple jquery wrapper around HTML contentEditable.

[Demo](http://trurl-master.github.io/livedit/)



#Syntax

    $.livedit(selector, options)

Events are bound to body by default, this can be changed by 'root' option.
Note that not only all current, but all future elements that match 'selector' and are descendants of options.root (body in this case) will be editable.

The alternate syntax is:

    $('.some-wrapper').livedit(selector, options)

In this case events are bound to .some-wrapper and is equivalent to:

    $.livedit(selector, {root: $('.some-wrapper')})

#Options

	root:  $('body')         - default element to bind events to
	type:  'text'            - mimic behaviour of input[type=text] or textarea
	finish_on_enter: 'auto'  - enter triggers finish: true/false; 'auto' - true for text, false for textarea, shift-enter always work
	start_return: true       - what click on element returns
	empty: {                 - empty options
		restore: false,      - restore original value on empty
		className: 'empty',  - class name to add to empty element
		text: '_____'        - empty text
	},

##Callbacks
	on_finish: null,             // function(innerHTML, textContent){}, this - original element
	on_change: null              // function(innerHTML, textContent){}, this - original element


#Example usage:

##html
```
<div id="wrap">
  <div class="text">some text</div>
  <div class="text">some text2</div>
  <div class="textarea">some very long<br>multiline text</div>
</div>
```

##js
```
$('#wrap')
	.livedit('.text', {
		type: 'text',
		on_change: function(html, text) {
		  alert(html)
		}
	})
 	.livedit('.textarea', {
		type: 'textarea',
		on_change: function(html, text) {
		  alert(html)
		}
	})
```
