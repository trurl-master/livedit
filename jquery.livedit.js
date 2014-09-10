/**
 * ver. 1.0
 * 09-07-2014
 * author: Ivan Galyatin
 * email: trurl-master@ya.ru
 */

;(function( $ ) {

	$.fn.livedit = function( selector, user_settings ) {
		return $.livedit( selector, $.extend(true, {}, user_settings, { root: $(this) }))
	}

	$.livedit = function( selector, user_settings ) {

		var o = $.extend(true, {}, $.livedit.defaults, user_settings);


		if( o.finish_on_enter === 'auto' ) {
			o.finish_on_enter = o.type === 'text';
		}

		// set empty className initially
		o.root.find(selector).addClass('livedit').each(function() {
			if( this.textContent.trim() === '' && o.empty && o.empty.className ) {
				var $t = $(this)
				$t.addClass(o.empty.className)
				if( typeof o.empty.text !== 'undefined' )
					$t.text(o.empty.text)
			} else {
				$(this).removeClass(o.empty.className)
			}
		})


		o.root.on('click', selector, function() {

			var $el = $(this);

			if( $el.hasClass('livedit-active') )
				return;

			$el.addClass('livedit-active')

			if( !$el.hasClass('livedit') ) {
				$el.addClass('livedit')
			}

			if( !this.isContentEditable ) {
				$el.attr('contenteditable', true).focus();
			}

			if( $el.hasClass('empty') ) {
				this.innerHTML = "<br>"; // we need something so element doesn't collapse
				$el.data( 'original', '' )
			} else {
				$el.data( 'original', this.innerHTML );
			}

			return o.start_return;
		})

		o.root
			.on('keydown', selector, function(e) {
				if( e.keyCode === 13 && (o.finish_on_enter || e.shiftKey) ) {
					$(this).trigger('blur')
				}
			})
			.on('blur', selector, function() {
				var $el = $(this)
				   ,new_html = this.innerHTML.replace(/(<br>\s*)+$/, '')
				   ,new_text = this.textContent.trim();

				if( new_text === '' && typeof o.empty !== 'undefined' ) {
					if( o.empty.restore ) {
						this.innerHTML = $el.data('original')
					} else {
						this.textContent = o.empty.text
					}
					$el.addClass(o.empty.className)
				} else {
					$el.removeClass(o.empty.className);
				}

				if( typeof o.on_change === 'function' && new_html !== $el.data('original') ) {
					o.on_change.call( $el, new_html, new_text )
				}

				if( typeof o.on_finish === 'function' ) {
					o.on_finish.call( $el, new_html, new_text );
				}

				$el.removeClass('livedit-active')

			})


		return this;

	}

	$.livedit.defaults = {
		root: $('body'),
		type: 'text',                // same behaviour as input[type=text] or as textarea
		finish_on_enter: 'auto',     // enter triggers finish: true/false; 'auto' - true for text, false for textarea, shift-enter always work
		start_return: true,          // what click returns
		empty: {                     // empty options
			restore: false,          // restore original value on empty
			className: 'empty',      // class name to add to empty element
			text: '_____'            // empty text
		},
		// events
		on_finish: null,             // function(innerHTML, textContent){}, this - original element
		on_change: null              // function(innerHTML, textContent){}, this - original element
	}

}( jQuery ));