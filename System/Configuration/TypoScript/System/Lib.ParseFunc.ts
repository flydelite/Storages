#lib.parseFunc >
lib.parseFunc_RTE >

/*
lib.parseFunc {
	tags {
		link = TEXT
		link {
			current = 1
			typolink.parameter.data = parameters : allParams
			#typolink.extTarget = {$styles.content.links.extTarget}
 #Let's see, perhaps we find a way
			typolink.extTarget.cObject = COA 
			typolink.extTarget.cObject {
				1 = TEXT
				#1.data <  lib.parseFunc.tags.link
				#1.value = schnubbi
				#1.data = lib.parseFunc.tags.link.typolink.ATagParams
			}
			
			typolink.target = {$styles.content.links.target}
			parseFunc.constants = 1
		}
	}
	allowTags = {$styles.content.links.allowTags}
	denyTags = *
	sword = <span class="csc-sword">|</span>
	constants = 1

	nonTypoTagStdWrap.HTMLparser = 1
	nonTypoTagStdWrap.HTMLparser {
		keepNonMatchedTags = 1
		htmlSpecialChars = 2
	}
}
*/

# Creates persistent ParseFunc setup for RTE content (which is mainly HTML) based on the "ts_css" transformation.
lib.parseFunc_RTE < lib.parseFunc
lib.parseFunc_RTE {
	//  makelinks >

	# @description Parse certain block elements seperately
	externalBlocks = table, blockquote, ol,ul, div, dl, dd, a.icnDownload
	externalBlocks {
		# The blockquote content is passed into parseFunc again...
		blockquote.stripNL=1
		blockquote.callRecursive=1
		blockquote.callRecursive.tagStdWrap.HTMLparser = 1

		div.stripNL=1
		div.callRecursive = 1
		
		dl.stripNL=1
		dl.callRecursive = 1
		
		dd.stripNL=1
		dd.callRecursive = 1
		
		ol.stripNL=1
		ol.stdWrap.parseFunc = < lib.parseFunc

		ul.stripNL=1
		ul.stdWrap.parseFunc = < lib.parseFunc

		table.stripNL=1
		table.stdWrap.HTMLparser = 1

		table.stdWrap.HTMLparser.keepNonMatchedTags = 1
		# @description Do NOT add any unwanted p elements in table cells, and do NOT remove any p-elements
		#			   that have been added by authors!	
		table.HTMLtableCells=1
		table.HTMLtableCells.default.stdWrap.parseFunc =< lib.parseFunc
		
		a.icnDownload.stripNL=1
		a.icnDownload.callRecursive = 1
	}
	nonTypoTagStdWrap.encapsLines {
		encapsTagList = div,p,pre,h1,h2,h3,h4,h5,h6,dt,hr
		nonWrappedTag = P
		innerStdWrap_all.ifBlank = &nbsp;

	}
	nonTypoTagStdWrap.HTMLparser = 1
	nonTypoTagStdWrap.HTMLparser {
		keepNonMatchedTags = 1
		htmlSpecialChars = 2
	}
}
