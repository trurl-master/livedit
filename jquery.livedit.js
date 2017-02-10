/**
 * ver. 1.0
 * author: Ivan Galyatin
 */

;(function($) {

	$.fn.livedit = function(selector, user_settings) {

		if (user_settings === 'destroy') {
			$.livedit(selector, $.extend(true, {}, user_settings, { root: $(this) }), 'destroy')
		} else {
			$.livedit(selector, $.extend(true, {}, user_settings, { root: $(this) }))
		}
		
		return this;
	}

	$.livedit = function(selector, user_settings, action) {

		var o = $.extend(true, {}, $.livedit.defaults, user_settings)

		if (action === 'destroy') {

			o.root
				.off('click', selector)
				.off('keydown', selector)
				.off('blur', selector)

			o.root.find(selector).removeAttr('contenteditable')
			o.root.removeData('livedit')

			return;
		}

		//
		if (o.root.data('livedit')) {
			return
		} else {
			o.root.data('livedit', true)
		}


		//
		if (o.finish_on_enter === 'auto') {
			o.finish_on_enter = o.type === 'text';
		}

		if (!o.lazy) {
			o.root.find(selector).addClass('livedit').each(function() {

				var $t = $(this)

				// set empty className initially
				if (this.textContent.trim() === '' && o.empty && o.empty.className) {
					
					$t.addClass(o.empty.className)
					if (typeof o.empty.text !== 'undefined')
						$t.text(o.empty.text)
				} /*else {
					$t.removeClass(o.empty.className)
				}*/
			})
		}


		o.root.on('click', selector, function() {

			var $el = $(this);

			if ($el.hasClass('livedit-active')) {
				return;
			}

			$el.addClass('livedit-active')

			if (!$el.hasClass('livedit')) {
				$el.addClass('livedit')
			}

			if (!this.isContentEditable) {
				$el.attr('contenteditable', true);
			}

			$el.focus()

			if ($el.hasClass('empty')) {
				this.innerHTML = "&#x2007;"; // we need something so element doesn't collapse
				$el.data('original', '')
			} else {
				$el.data('original', this.innerHTML);
			}

			return o.start_return;
		})

		o.root
			.on('keydown', selector, function(e) {
				if (e.keyCode === 13 && (o.finish_on_enter || e.shiftKey)) {
					$(this).trigger('blur')
				}
			})
			.on('paste', selector, function(e) {
				if (!o.paste_as_text) {
					return;
				}

				e.preventDefault();
				var text = e.originalEvent.clipboardData.getData("text/plain");
				document.execCommand("insertHTML", false, text);
			})
			.on('blur', selector, function() {
				var $el = $(this)
				   ,new_html = this.innerHTML.replace(/(<br>|\s)+$/, '').replace(/^(<br>|\s)+/, '') // trim whitespaces and html br's
				   ,new_text = this.textContent.trim();

				if (new_text === '' && typeof o.empty !== 'undefined') {
					if (o.empty.restore) {
						this.innerHTML = $el.data('original')
					} else {
						this.textContent = o.empty.text
					}
					$el.addClass(o.empty.className)
				} else {
					$el.removeClass(o.empty.className);
				}

				if (typeof o.on_change === 'function' && new_html !== $el.data('original')) {
					o.on_change.call( $el, new_html, new_text)
				}

				if (typeof o.on_finish === 'function') {
					o.on_finish.call( $el, new_html, new_text);
				}

				$el.removeClass('livedit-active')
			})


		return this;

	}

	$.livedit.defaults = {
		root: $('body'),
		lazy: false,
		type: 'text',                // same behaviour as input[type=text] or as textarea
		finish_on_enter: 'auto',     // enter triggers finish: true/false; 'auto' - true for text, false for textarea, shift-enter always work
		start_return: true,          // what click returns
		empty: {                     // empty options
			restore: false,          // restore original value on empty
			className: 'empty',      // class name to add to empty element
			text: '_____'            // empty text
		},
		paste_as_text: true,
		// events
		on_finish: null,             // function(innerHTML, textContent){}, this - original element
		on_change: null              // function(innerHTML, textContent){}, this - original element
	}

}(jQuery));