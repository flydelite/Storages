lib.stdheader.3 >
lib.stdheader.5 >
lib.stdheader.7 >
lib.stdheader.10.1.dataWrap = <h1>|</h1>
lib.stdheader.10.2.dataWrap = <h2>|</h2>
lib.stdheader.10.3.dataWrap = <h3>|</h3>
lib.stdheader.10.4.dataWrap = <h4>|</h4>
lib.stdheader.20.default.wrap = <h2>|</h2>
lib.stdheader.30 > 
lib.stdheader.40 > 
lib.stdheader.98 > 
lib.stdheader.stdWrap.dataWrap >

tt_content {

	# Define different wrappers for content elements depending on the page column
	stdWrap {
	    outerWrap { 
	        cObject = CASE
	        cObject {
    		    # Define wrappers for each column position (colPos 0,1,2,3)
        		key.field = colPos
        		
        		# Default is no wrapper
        		default = TEXT
        		default.value = |
        
        		# Add wrapper for content in right column (colPos=2)
        		# we use this to style the box around content in this column
        		2 = CASE
        		2 {
        			# Add wrapping to all content elements
        			default = TEXT
        			default.value = <div class="secondaryContentSection">|</div>
        			
        			# But - exclude inserted records from being wrapped
        			key.field = CType
        			shortcut = TEXT
        			shortcut.value = |
        			image = TEXT
        			image.value = |
        			html = TEXT
        			html.value = |
        		}
    	    }
        }
	    innerWrap.cObject.default.20.10.value = contentElement
	}

    image.20 {
        # Define max image width for each content column separately
	    maxW.cObject = CASE
	    maxW.cObject {
    		key.field = colPos
    		default = TEXT
    		default.value = 500
    		# normal
    		0 = TEXT
    		0.value = 500
    		# left
    		1 = TEXT
    		1.value = 150
    		# right
    		2 = TEXT
    		2.value = 150
        }
        maxWInText.cObject = CASE
    	maxWInText.cObject {
    		key.field = colPos
    		default = TEXT
    		default.value = 120
    		# normal
    		0 = TEXT
    		0.value = 120
    		# left
    		1 = TEXT
    		1.value = 70
    		# right
    		2 = TEXT
    		2.value = 70
        }
        imageStdWrap.dataWrap >
        imageStdWrapNoWidth.wrap >
        imageColumnStdWrap.dataWrap >
        layout.default.value = ###IMAGES######TEXT###
        
        addClassesImage >
        rendering {
            singleNoCaption {
                allStdWrap.wrap.override = |
                singleStdWrap.wrap.override = <figure> |###CAPTION###</figure>
            }
            singleCaption {    
                rowStdWrap.wrap = |
                noRowsStdWrap.wrap = |
                lastRowStdWrap.wrap = |
                columnStdWrap.wrap = |
                singleStdWrap.wrap.override = <figure> |###CAPTION###</figure>
                caption.wrap.override = <figcaption> | </figcaption>
            }
            singleNoCaption.allStdWrap.innerWrap >  
        }
    }
    textpic.20 {
        imgMax = 1
        text.wrap =  | 
        
    }
    
    # *****************
    # CType: textpic
    # *****************
    tt_content.textpic = COA
    tt_content.textpic {
    	10 = COA
    	10.if.value = 25
    	10.if.isLessThan.field = imageorient
    	10.10 = < lib.stdheader
    
    	20  = < tt_content.image.20
    	20 {
    		text.10 = COA
    		text.10 {
    			if.value = 24
    			if.isGreaterThan.field = imageorient
    			10 = < lib.stdheader
    			10.stdWrap.dataWrap = <div class="csc-textpicHeader csc-textpicHeader-{field:imageorient}">|</div>
    		}
    		text.20 = < tt_content.text.20
    		text.wrap = <div class="csc-textpic-text"> | </div>
    	}
    }


    uploads.20 {
    	stdWrap.dataWrap = <ul>|</ul>
    	renderObj {
    		15 >
    		15 = IMAGE
			15 {
				file.import = typo3/gfx/fileicons/
				file.import.data = file:current:extension
				file.import.case = lower
				file.import.wrap = |.gif
				stdWrap.typolink < tt_content.uploads.20.renderObj.10.stdWrap.typolink	
			}

			20 >
			20 = TEXT
			20 {
				data = file:current:name
				htmlSpecialChars = 1
				required = 1

				replacement {
					# equivalent to former useSpacesInLinkText = 0; remove using > to disable it
					10 {
 						search = _
 						replace.char = 32
					}

					# equivalent to former stripFileExtensionFromLinkText = 0; move "_20" to "20" to enable it. Disabled by default.
					_20 {
						search = /(.*)(\..*)/
						replace = \1
						useRegExp = 1
					}
				}

				typolink < tt_content.uploads.20.renderObj.10.stdWrap.typolink

				wrap = <span class="csc-uploads-fileName">|</span>
			}
    	
    		20.wrap = <span class="fileName">|</span>
    		30.wrap = <span class="description">|</span>
    		
			40 >
			40 = TEXT
			40 {
				data = file:current:size
				wrap = <span class="fileSize">|</span>
				bytes = 1
				bytes.labels = {$styles.content.uploads.filesizeBytesLabels}
			}
			50 < .30
			30 >
    		wrap.cObject {
	    		10 {
					elementClass = fileItem {file:current:extension}
		    	}
		    	20 {
		    		value = <li class="{register:elementClass}">|</li>
		    	}
		    }
        }
    }
}

#only home page
[globalVar = TSFE:id = 1]
tt_content {
    image.20 {
        addClassesImage >
        layout.default.value = ###IMAGES###
        rendering {
            singleNoCaption {
                allStdWrap.wrap.override = <section class="links">|</section> 
            }
            splitCaption {    
                rowStdWrap.wrap = |
                noRowsStdWrap.wrap = |
                lastRowStdWrap.wrap = |
                columnStdWrap.wrap = |
                singleStdWrap.wrap.override = <figure> |###CAPTION###</figure>
                caption.wrap.override = <figcaption> | </figcaption>
            }
            singleNoCaption.allStdWrap.innerWrap >   
        }
        maxW >
        maxH >
        1.file.width.field >
		1.file.width = 225c
		1.file.height = 160c
    }
    stdWrap.innerWrap >
}
[global]

#only intro pages
/*
[globalVar = TSFE:page|backend_layout = 3] && [globalVar = TSFE:page|colPos = 1]
tt_content {
	image.20 {
        addClassesImage >
        layout.default.value = ###IMAGES###
        rendering {
            singleNoCaption {
                allStdWrap.wrap.override = <section class="introImage">|</section> 
            }
            singleCaption {    
                rowStdWrap.wrap = |
                noRowsStdWrap.wrap = |
                lastRowStdWrap.wrap = |
                columnStdWrap.wrap = |
                singleStdWrap.wrap.override = <figure> |###CAPTION###</figure>
                caption.wrap.override = <figcaption> | </figcaption>
            }
            singleNoCaption.allStdWrap.innerWrap >   
        }
        
        maxW >
        maxH >
        1.file.width.field >
		1.file.width = 960c
		1.file.height = 200c
    }
}
[global]
*/