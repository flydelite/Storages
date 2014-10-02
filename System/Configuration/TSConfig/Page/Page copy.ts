
mod {
	SHARED {
		# Show only the chosen columns in the page module
		# 0=normal, 1=left, 2=right, 3=border
		# colPos_list = 1,0,2,3
		
		# Set the default label and flag
		defaultLanguageLabel = Deutsch
		defaultLanguageFlag = de.gif
	}
	/*wizards {
		# Show the content element wizard with tabs (for consistency)
		newContentElement {
		    renderMode = tabs
		    wizardItems {
    			common {
                    elements {
                        subNav {
                            icon = gfx/c_wiz/sitemap2.gif
                            title = Subnavigation
                            description = Erstellt eine Subnavigation aller Subseiten der aktuellen Seite
                            tt_content_defValues {
                                CType = menu
                            }
                        }
                        fileList {
                            icon = gfx/c_wiz/filelinks.gif
                            title = Datei Liste
                            description = Erstellt eine Liste von Dateien
                            tt_content_defValues {
                                CType = uploads
                            }
                        }
                    }
                    show := addToList(subNav)
                    show := addToList(fileList)
                    show = header,text,textpic,image,subNav,fileList,
                }
    			special.show = html
    			forms.show = 
            }
		}
	}
	web_list {
	    enableDisplayBigControlPanel = activated
	    enableClipBoard = deactivated
	    enableLocalizationView = activated
	    disableSearchBox = 1
	    #noExportRecordsLinks = 1
	}
	web_layout {
		enableShowHiddenContent = activated
		disableSearchBox = 1
	}*/
}
/*
mod.wizards.newContentElement.wizardItems.common.elements.header {
        icon = gfx/c_wiz/regular_text.gif
        title = Header
        description = Adds a header element only
        tt_content_defValues {
                CType = header
        }
}

TCEFORM {
	pages {
	    newUntil.disabled = 1
		layout.disabled = 1
		alias.disabled = 1
        content_from_pid.disabled = 1
        author.disabled = 1
        author_email.disabled = 1
        extendToSubpages.disabled = 1
        lastUpdated.disabled = 1
		
		backend_layout {
		    PAGE_TSCONFIG_ID=77
		    removeItems= -1
		    altLabels.0 = Vordefiniertes Layout
		}
		backend_layout_next_level {
		    PAGE_TSCONFIG_ID=77
		    removeItems= -1
		    altLabels.0 = Vordefiniertes Layout
		}
		title.label.default = Navigationtitle
		title.label.de = Navigationstitel
		subtitle.label.default = Sitetitle (only show in content area)
		subtitle.label.de = Seitentitel (wird nur im Inhaltsbereich angezeigt)
	}

	tt_content {
		# Remove the 'border' option from selectbox 'column' in content records
		colPos.keepItems = 1,0,2,3
		header_layout.altLabels.0 = Standard
		header_layout.altLabels.1 = &Uuml;berschrift 1
		header_layout.altLabels.2 = &Uuml;berschrift 2
		header_layout.altLabels.3 = &Uuml;berschrift 3
		header_layout.keepItems = 0,1,2,3
		header_position.disabled = 1
		subheader.disabled = 1
		date.disabled = 1
		#colPos.disabled = 1
		sys_language_uid.disabled = 1
		rte_enabled.disabled = 1
		layout.disabled = 1
		spaceBefore.disabled = 1
		spaceAfter.disabled = 1
		section_frame.disabled = 1
		image_zoom.disabled = 1
		imageheight.disabled = 1
		imagewidth.disabled = 1
		imageborder.disabled = 1
		image_effects.disabled = 1
		imagecols.disabled = 1
		image_noRows.disabled = 1
		imagecaption_position.disabled = 1
		image_compression.disabled = 1
		imageorient.disabled = 1
		file_collections.disabled = 1
		filelink_size.disabled = 1
	}
	
	tx_news_domain_model_news {
	    type.altLabels.0 = Termin (mit Detailansicht)
	    type.altLabels.1 = Interne Neuigkeit (Link)
	    type.altLabels.2 = Externe Neuigkeit (Link)
	}
}

// If an editor creates a page it should be visible to all editors and admins
TCEMAIN {
	  // group "all users"
	permissions.groupid = 5
    permissions.group = show,edit,delete,new,editcontent
    
	user = show,edit,delete,new,editcontent
	group = show,edit,delete,new,editcontent
	everybody =
}

# Use different views for the news plugin, those entries show up in the news content element configuration
tx_news {
    templateLayouts {
    	normal = Normal
    	latest = Latest
    	# You can even translate those if you create a custom ll-xml file.
    	#custom = fileadmin/Language/news-templates.xml:keyForCustom
    }
}

# Condition for home page
[PIDinRootline = 6]
	TCEFORM {
        sys_file_reference.title.label.de = alternativer Bildtext
        sys_file_reference.description.disabled = 1
	}
[END]

# Condition for news storage folder
[PIDinRootline = 18]
	mod.web_list {
		# Limit the creation of new records in this sysFolder to these types
		allowedNewTables = tx_news_domain_model_news,tx_news_domain_model_category,sys_note
	}

	# This will open the news singleView page (id 23) when clicking 'preview' for a news record
	tx_news.singlePid = 23


	TCEMAIN {
		# Clear cache of the News page after content of the News folder has changed
		clearCacheCmd = 23,30
		clearCache_pageSiblingChildren = 1
	}
[END]

# Condition for labor storage folder
[PIDinRootline = 76]
	mod.web_list {
		# Limit the creation of new records in this sysFolder to these types
		allowedNewTables = tx_laborlist_domain_model_canton, tx_laborlist_domain_model_label, tx_laborlist_domain_model_laboratory, tx_laborlist_domain_model_language, tx_laborlist_domain_model_productcategory, tx_laborlist_domain_model_region, tx_laborlist_domain_model_role, tx_laborlist_domain_model_salutation, tx_laborlist_domain_model_section
	}
[END]

# Condition for frontend user storage folder
[PIDinRootline = 29]
	mod.web_list {
		# limit the creation of new records in this sysFolder to these types
		allowedNewTables = fe_groups,fe_users,sys_note
	}
[END]

*/

RTE.classes >
RTE.classesAnchor >
RTE.default >
RTE.config >
RTE.colors >

/*RTE.classes {
    lead {
        name = Einleitungs-Text
        value = font: bold 1.000em/1.500em 'Arial', sans-serif; color: #64b9e4;
    }
}*/

RTE.classesAnchor {
	externalLink {
		class = external-link
		type = url
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:external_link_new_window_titleText
	}
	internalLink {
		class = internal-link
		type = page
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:internal_link_titleText
	}
	downloadLink {
		class = download-link
		type = file
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:internal_link_titleText
	}
	tableLink {
		class = table-link
		type = page
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:internal_link_titleText
	}
}




RTE.default {
    skin = EXT:t3skin/rtehtmlarea/htmlarea.css
    contentCSS = Storages/System/Resources/Public/Css/Rte.css
        
    proc {
        dontConvBRtoParagraph = 1
        # Gleiche Klassen müssen im oben referenzierten CSS style vorhanden sein. (Wichtig für Blockstyles -> immer p.klassenname)
        allowedClasses (
    		external-link, internal-link, download-link, table-link
        )
        /*
        showButtons := addToList(user)
        removeTags := removeFromList(user)
        allowTags := addToList(div)
        allowTagsOutside := addToList(div)
        */
        HTMLparser_rte.allowTags < RTE.default.proc.allowTags
        HTMLparser_db.allowTags < RTE.default.proc.allowTags
        entryHTMLparser_db.allowTags < RTE.default.proc.allowTags
    }
    
    buttons.link.properties.class.allowedClasses = external-link, internal-link, download-link, table-link
    buttons.link.page.properties.class.default = internal-link
    buttons.link.url.properties.class.default = external-link
    buttons.link.file.properties.class.default = download-link
    
    showButtons (
          bold
        , italic
        , blockstyle
        , blockstylelabel
        , orderedlist
        , unorderedlist
        , insertcharacter
        , link
        , undo
        , redo
        , removeformat
        , chMode
        , tableproperties
        , rowproperties
        , rowinsertabove
        , rowinsertunder
        , rowdelete
        , rowsplit
        , columninsertbefore
        , columninsertafter
        , columndelete
        , columnsplit
        , cellproperties
        , cellinsertbefore
        , cellinsertafter
        , celldelete
        , cellsplit
        , cellmerge
        , toggleborders
        , table

    )
    hideButtons (
          fontstyle
        , textstyle
        , fontsize
        , strikethrough
        , lefttoright
        , righttoleft
        , textcolor
        , bgcolor
        , textindicator
        , emoticon
        , spellcheck
        , inserttag
        , outdent
        , indent
        , justifyfull
        , subscript
        , superscript
        , acronym
        , copy
        , cut
        , user
        , paste
        , showhelp
        , about
        , underline
        , left
        , center
        , right
        , findreplace
        , line
        , formatblock
    )
}

