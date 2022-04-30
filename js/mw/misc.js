/**
 * Display page view of an article
 **/
!(function ($, mw) {
	function getViewCount(data) {
		let sum = 0;
		for (day in data) {
			sum += data[day]
		}
		return sum
	}

	function showMonthlyPV(data) {
		let pvBtn = $('<span>').attr('class', 'mw-custom-monthly-pv').text('PV: ' + getViewCount(data).toLocaleString() + '/mo')

		pvBtn.css('font-size', 'small')
		    .css('font-weight', 'normal')
		    .css('margin-left', '0.6em')
		    .css('vertical-align', 'baseline')
		    .css('line-height', '1em')
		    .css('font-family', 'sans-serif')
		$('#firstHeading').append(pvBtn)
	}

	if (mw.config.get('wgIsArticle') && mw.config.get('wgAction') === "view") {
		let articleId = mw.config.get('wgArticleId') + '';
	    $.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: mw.util.wikiScript('api'),
	        data: {
	            'action': 'query',
	            'pageids': articleId,
	            'prop': 'pageviews',
	            'format': 'json'
	        },
	        success: function (data) {
	        	let pv = data.query.pages[articleId].pageviews
	        	showMonthlyPV(pv)
	        },
	        error: function (e) {
	        	console(e)
	        }
		})
	}
}) (jQuery, mediaWiki)

/**
 * Disable translator abuse check
 **/
!(function ($, mw) {
	let oldCheckFunction = mw.cx.TranslationController.prototype.getMTAbuseMsg

	mw.cx.TranslationController.prototype.getMTAbuseMsg = function() {
		let mtAbuseMsg = oldCheckFunction.apply(this, arguments)
		console.log(mtAbuseMsg)
		return null
	}

}) (jQuery, mediaWiki)
