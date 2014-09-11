jquery.livedit
=======

Simple jquery wrapper around HTML contentEditable.

[Demo](http://trurl-master.github.io/livedit/)



#Syntax

    $.livedit(selector, options)

Events are bound to body by default, this can be changed by 'root' option.
Note that not only all current, but all future elements that match 'selector' and are descendants of options.root (body in this case) will be editable.

The alternate (and preferred) syntax is:

    $('.some-wrapper').livedit(selector, options)

In this case events are bound to .some-wrapper and is equivalent to:

    $.livedit(selector, {root: $('.some-wrapper')})


#Behaviour

Finish event is triggered by:
- blur
- <kbd>shift-enter</kbd>
- if options.finish_on_enter is true by <kbd>Enter</kbd>
- if options.finish_on_enter is 'auto' and options.type is 'text' by <kbd>Enter</kbd>


#Options

	root:  $('body')        - default element to bind events to
	type:  'text'           - mimic behaviour of input[type=text] or textarea
	lazy: false             - if true then plugin will not initialize element until user clicks on it
	finish_on_enter: 'auto' - enter triggers finish: true/false; 'auto' - true for text, false for textarea, shift-enter always work
	start_return: true      - what click on element returns
	empty: {                - empty options
		restore: false,     - restore original value on empty
		className: 'empty', - class name to add to empty element
		text: '_____'       - empty text
	},

##Callbacks
	on_finish: function(innerHTML, textContent){}, this - original element
	on_change: function(innerHTML, textContent){}, this - original element


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
