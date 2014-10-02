menu.main < menu.template
menu.main {

    special = list
    special.value = 38, 39, 40, 41, 42
	entryLevel = 0

	1 {
	    wrap = |
        expAll = 1
        NO {
            wrapItemAndSub = |
            ATagParams.stdWrap.cObject = TEXT
            ATagParams.stdWrap.cObject {
                field = icon_class
                insertData = 1
                wrap = class="|"
            }
            ATagParams.stdWrap.cObject.if {
                isTrue.field = icon_class
                
            }
        }
        
        ACT < .NO
        ACT {
            ATagParams.stdWrap.cObject {
                wrap = |
                noTrimWrap = |class="| on"|
            }
        }
        
        CUR < .ACT
    }
    
}