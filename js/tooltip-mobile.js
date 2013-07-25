$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

(function()
{	
	var titles = $("[title]");
	var n = 1000; //hover time
	var t;
	var counter = 0;

	$("[title]").bind("tapone", function()
	{
		if (typeof variable === 'undefined')
			_Global_Tooltips = "undefined";

		var that = $(this);

		var el = {
			"element"	: that,
			"offset"	: that.offset(),
			"content"	: that.attr("title"),
			"position"	: ( that.hasAttr("tool-position") ? that.attr("tool-position") : "top" )
		};

		that.attr("title", "");

		var tt = showTooltip(el);

		if( _Global_Tooltips.toLowerCase() == "persist" )
			$("#pytt-" + (counter - 2)).remove();
		else
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
		var position = el.position;
		var arrow = $("<div>").attr("class", "ttarrow");

		arrow.addClass( position );

		var tt = $("<div>").attr("class", "pytooltip")
			.attr("id", "pytt-" + counter)
			.css(
			{
				"top"	: el.offset.top - el.element.outerHeight(),
			})
			.html( el.content )
			.append( arrow )
			.appendTo("body")
			.fadeIn();

		if( position == "right" )
		{
			tt.css(
			{
				"left"	: el.offset.left + el.element.outerWidth() + 12,
				"top"	: el.offset.top + ( el.element.outerHeight() / 2) - (tt.outerHeight() / 2)
			});
		}
		else if( position == "left" )
		{
			tt.css(
			{
				"left"	: el.offset.left - tt.outerWidth() - 12,
				"top"	: el.offset.top + ( el.element.outerHeight() / 2) - (tt.outerHeight() / 2)
			});
		}
		else if( position == "top" )
		{
			tt.css(
			{
				"left" 	: el.offset.left + ( el.element.outerWidth() / 2 ) - ( tt.outerWidth() / 2 ),
				"top"	: el.offset.top - tt.outerHeight() - 12
			});
		}
		else if( position == "bottom" )
		{
			tt.css(
			{
				"left"	: el.offset.left + ( el.element.outerWidth() / 2 ) - ( tt.outerWidth() / 2 ),
				"top"	: el.offset.top + el.element.outerHeight() + 12
			});
		}

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