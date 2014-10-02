lib.teaser = COA
lib.teaser {
    
    20 = CONTENT
    20 {
    	table = tt_content
    	select.orderBy = sorting
    	select.where = colPos=1
    	
    	# todo: evt rekursiv von parent laden -> leveluid:.... slide oder so was
    	
    	select.languageField = sys_language_uid
    	renderObj < lib.contentElementRendering
    	renderObj.wrap = <div class="teaser box"><div class="teaserElement">|</div></div>
	}
}
