lib.contentElementRendering = COA
lib.contentElementRendering {
    20 = CASE
    20 {
        key.field = CType
    
        header = COA
        header {
            10 = TEXT
            10.field = header
            10.required = 1
            10.wrap = <h4>|</h4>
        }
        
        text = COA
        text {
            10 =< lib.content.20.renderObj.20.header
            20 = TEXT
            20.field = bodytext
            20.brTag = <br/>
            20.parseFunc = < lib.parseFunc_RTE
        }
        
        html = COA
        html {
            10 =< lib.content.20.renderObj.20.header
            20 = TEXT
            20.field = bodytext
        }
        
        image = COA
        image {
            10 =< lib.content.20.renderObj.20.header
            20 = FILES
            20 {
                references {
                    table = tt_content
                    uid.field = uid
                    fieldName = image
                }
                renderObj = COA
                renderObj {
                    10 = IMAGE
                    10 {
                        file {
                            import.data = file:current:publicUrl
                            maxW = 460
                        }
                        titleText.data = file:current:title
                        altText.data = file:current:alternative
                    }
                    20 = TEXT
                    20 {
                        field = imagecaption
                        required = 1
                        wrap = <figcaption> | </figcaption>
                    }
                    wrap = <figure> | </figure>
                }
            }
        }
        
        textpic = COA
        textpic {
            10 =< lib.content.20.renderObj.20.header
            20 =< lib.content.20.renderObj.20.image.20
            20.renderObj.wrap = <figure class="imgFloat clear"> | </figure>
            20.renderObj.10.file.maxW = 180
            30 =< lib.content.20.renderObj.20.text.20
            wrap = <div class="textPic"> | </div>
        }
        
        list < tt_content.list
        list.10 =< lib.content.20.renderObj.20.header
        
        login < tt_content.login
        login.10 =< lib.content.20.renderObj.20.header
        
        menu = COA
        menu {
            10 =< lib.content.20.renderObj.20.header
            20 =< menu.content
        }
        
        uploads = COA
        uploads {
            
            10 < temp.title 
            10.stdWrap.override.cObject =< lib.content.20.renderObj.20.header
            10.stdWrap.override.cObject.10.wrap = <h3>|</h3>
            10.wrap = <h3>|</h3>
        
            20 = FILES
            20 {
                # get from file references:
        		references {
        			table = tt_content
        			fieldName = media
        		}
        
        		collections.field = file_collections
        
        		# get from path (backwards compatibility, contains strings like "fileadmin/user_uploads/")
        		folders.field = select_key
        
        		sorting.field = filelink_sorting
        
        		# render the files
        		renderObj = COA
        		renderObj {       
        			        
        			# filename
        			20 = TEXT
        			20 {
        				data = file:current:title // file:current:name
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
        				typolink.ATagParams = class="icnFile"
        
        				wrap = |
        			}
                
        			# file size
        			40 = TEXT
        			40 {
        				data = file:current:size
        				wrap = <span class="fileSize">&#124;&nbsp;|</span>
        				bytes = 1
        				bytes.labels = " | K| M| G"
        			}
        
        			wrap.cObject = COA
        			wrap.cObject {
        				10 = TEXT
        				10 {
        					value = <li>|</li>
        				}
        			}
        		}
        
        		# wrap around whole content element with <ul> and editIcons
        		stdWrap {
        			editIcons = tt_content: media, layout [table_bgColor|table_border|table_cellspacing|table_cellpadding], filelink_size
        			editIcons.iconTitle.data = LLL:Storages/System/Resources/Private/Language/locallang.xlf:eIcon.filelist
        			prefixComment = 2 | File list:
        			dataWrap = <ul class="fileList">|</ul>
        		}
            }
        }
    }
}