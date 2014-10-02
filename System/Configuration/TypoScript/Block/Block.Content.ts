lib.content = COA
lib.content {
    
    20 = CONTENT
    20 {
    	table = tt_content
    	select.orderBy = sorting
    	select.where = colPos=0
    	select.languageField = sys_language_uid
    	renderObj < lib.contentElementRendering
    	renderObj.wrap = <div class="contentElement">|</div>
	}
}
