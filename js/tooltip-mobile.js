$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

(function()
{
	var titles = $("[title]");
	var n = 1000; //hover time
	var t;
	var counter = 0;

	$(document).bind("tapone", "[title]", function()
	{
		var that = $(this);

		var el = {
			"element"	: that,
			"offset"	: that.offset(),
			"content"	: that.attr("title")
		};

		that.attr("title", "");

		var tt = showTooltip(el);

		setTimeout(function(){ killtooltip(el, that, tt); }, 3000);

		checkExistence();

		function checkExistence()
		{
			//check the existence of the item, destroy the tooltip if doesn't exist

			setTimeout(function()
			{
				if( $("body").find(that).length == 0 )
					killtooltip(el, that);
				else
					checkExistence();

			}, 300);
		}

	});

	function showTooltip(el)
	{
		var tt = $("<div>").attr("class", "pytooltip")
			.attr("id", "pytt-" + counter)
			.css(
			{
				"top"	: el.offset.top - el.element.outerHeight(),
			})
			.html( el.content )
			.append( $("<div>").attr("class", "ttarrow") )
			.appendTo("body")
			.fadeIn();

		tt.css(
		{
			"left" 	: el.offset.left + ( el.element.outerWidth() / 2 ) - ( tt.outerWidth() / 2 ),
			"top"	: el.offset.top - tt.outerHeight() - 12
		});

		counter++;

		return tt;
	}

	function killtooltip(el, that, tt)
	{
		clearTimeout(t);

		el.element.attr("title", el.content);
		tt.remove();
	}

})();