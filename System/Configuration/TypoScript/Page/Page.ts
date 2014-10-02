page = PAGE
page {

	typeNum = 0

	shortcutIcon = {$filepaths.images}Favicon.png

	bodyTagCObject = TEXT
	bodyTagCObject.value = <body id="home">
	bodyTagCObject.if {
	    value = 37 
        equals.data = page:uid
	}
	
	10 = FLUIDTEMPLATE 
    10 {
        file.cObject = CASE  
        file.cObject {
            key.field = backend_layout
            key.ifEmpty.data = levelfield: -2, backend_layout_next_level, slide
            
            default = TEXT
            default.value = {$filepaths.templates}Overview.html
            
            1 = TEXT
            1.value = {$filepaths.templates}Home.html
            
            2 = TEXT
            2.value = {$filepaths.templates}Overview.html
            
            4 = TEXT
            4.value = {$filepaths.templates}Bankfinder.html
            
            8 = TEXT
            8.value = {$filepaths.templates}Content.html

        }
                
        partialRootPath = {$filepaths.partials}
        layoutRootPath = {$filepaths.layouts}
    }
}

ajax = PAGE
ajax {
    
    typeNum = 50
    
    config {
        disableAllHeaderCode = 1
        sendCacheHeaders = 0
        xhtml_cleaning = 0
        admPanel = 0
        additionalHeaders = Content-type: application/json
        no_cache = 1
        debug = 0
    }
 
    10 < page.10
    10 {
        file >
        file = {$filepaths.templates}Ajax.html
    }

}

infoWindow = PAGE
infoWindow < ajax
infoWindow {
    
    typeNum = 60  
    config.additionalHeaders = Content-type: text/html

}

