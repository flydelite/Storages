page {
	includeJSlibs {
		modernizr = {$filepaths.js}Libs/Modernizr-2.8.3.min.js
		jquery =
	}
	includeJSFooterlibs {
		powermailJQuery =
		jquery = https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
		jquery.external = 1
		jquery.forceOnTop = 1
	}
	includeJSFooter {
		plugin = {$filepaths.js}Plugins.js
		script = {$filepaths.js}Script.js
	}
	jsFooterInline {
	    	    
	    30 = TEXT
	    30.value (
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
               (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
               m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
         
            ga('create', 'UA-54435088-1', 'auto');
            ga('send', 'pageview');
	    )
	}
}

[globalVar = TSFE:id=38] || [globalVar = TSFE:id=37]
    page.includeJSFooterlibs.googleMaps = https://maps.googleapis.com/maps/api/js?language=de&libraries=geometry,places&key={$bankfinder.googleApiKey}
[GLOBAL]