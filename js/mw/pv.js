!(function ($, mw) {
  $(function () {
    mw.loader.load('https://xh.localhost.mco.moe/mw/pv.js');
    console.log('Hello, ' + mediaWiki.config.get('wgPageName'))
  })
}) (jQuery, mediaWiki)
