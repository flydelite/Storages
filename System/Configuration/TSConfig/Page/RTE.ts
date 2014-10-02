RTE.classes >
RTE.classesAnchor >
RTE.default >
RTE.config >
RTE.colors >

RTE.classesAnchor {
	externalLink {
		class = externalLink
		type = url
		titleText = 
		target = _blank
	}
	internalLink {
		class = internalLink
		type = page
		titleText = 
	}
	icnDownload {
		class = icnDownload
		type = file
		titleText = 
		target = _blank
	}
	download {
		class = download
		type = file
		titleText = 
		target = _blank
	}
	icnMore {
		class = icnMore
		type = page
		titleText = 
	}
}


RTE.default {
    skin = EXT:t3skin/rtehtmlarea/htmlarea.css
    contentCSS = Storages/System/Resources/Public/Css/Rte.css
    proc {
        dontConvBRtoParagraph = 1
        allowedClasses (
    		externalLink, internalLink, icnDownload, icnMore, download
        )
        HTMLparser_rte.allowTags < RTE.default.proc.allowTags
        HTMLparser_db.allowTags < RTE.default.proc.allowTags
        entryHTMLparser_db.allowTags < RTE.default.proc.allowTags
    }
    
    buttons.link.properties.class.allowedClasses = externalLink, internalLink, icnDownload, icnMore, download
    buttons.link.properties.class.default = internalLink
    buttons.link.properties.class.required = 1
    buttons.link.popupSelector.disabled = 1
    buttons.link.targetSelector.disabled = 1
    buttons.link.page.properties.class.default = internalLink
    buttons.link.url.properties.class.default = externalLink
    buttons.link.file.properties.class.default = icnDownload
    buttons.link.options.removeItems = folder

    buttons.formatblock.orderItems = h6, p   
    buttons.formatblock.items.h6.label = Überschrift
    buttons.formatblock.items.p.label = Lauftext
    
    buttons {
        table {
            disableEnterParagraphs = 1
            removeFieldsets = alignment, borders, color, description, language, layout, spacing, style
            properties {
                required = numberOfRows, numberOfCols
                numberOfRows.defaultValue = 3
                numberOfCols.defaultValue = 4
                headers.defaultValue = top
                headers.removeItems = left, both
            }
        }
        tableproperties.removeFieldsets = alignment, borders, color, description, language, layout, spacing, style
        toggleborders {
            setOnTableCreation = 1
            setOnRTEOpen = 1
        }
    }

    showButtons (
          bold
        , italic
        , formatblock
        , orderedlist
        , unorderedlist
        , insertcharacter
        , link
        , undo
        , redo
        , removeformat
        , chMode
        , tableproperties
        , rowinsertabove
        , rowinsertunder
        , rowdelete
        , rowsplit
        , columninsertbefore
        , columninsertafter
        , columndelete
        , columnsplit
        , cellinsertbefore
        , cellinsertafter
        , celldelete
        , cellsplit
        , cellmerge
        , toggleborders
        , table
        , copy
        , cut
        , paste
        , insertparagraphbefore
        , insertparagraphafter
    )
    
    hideButtons (
          fontstyle
        , underline
        , textstyle
        , blockstyle
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
        , user
        , showhelp
        , about
        , left
        , center
        , right
        , findreplace
        , line
        , rowproperties
        , cellproperties
    )
    
     # die Reihenfolge der Buttons im RTE
    toolbarOrder (
          bold
        , italic
        , bar
        , orderedlist
        , unorderedlist
        , bar
        , insertcharacter
        , link
        , bar
        , removeformat
        , chMode
        , bar
        , copy
        , cut
        , paste
        , bar
        , undo
        , redo
        , bar
        , formatblock
        , linebreak
        , table
        , toggleborders
        , tableproperties
        , rowinsertabove
        , rowinsertunder
        , rowdelete
        , rowsplit
        , columninsertbefore
        , columninsertafter
        , columndelete
        , columnsplit
        , cellinsertbefore
        , cellinsertafter
        , celldelete
        , cellsplit
        , cellmerge
        , insertparagraphbefore
        , insertparagraphafter
    )
}
