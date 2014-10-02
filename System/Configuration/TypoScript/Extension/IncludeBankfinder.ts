lib.include_bankfinder = USER
lib.include_bankfinder {
    userFunc = TYPO3\CMS\Extbase\Core\Bootstrap->run
    extensionName = Bankfinder
    pluginName = Map
    vendorName = AQUA
    #controller = Branch
    #action = map
    
    settings =< plugin.tx_bankfinder.settings
    persistence =< plugin.tx_bankfinder.persistence
    view =< plugin.tx_bankfinder.view
    
    persistence.storagePid = 57
}

[globalVar = TSFE:type=50] || [globalVar = TSFE:type=60]

    lib.include_bankfinder.pluginName = Ajax

[GLOBAL]

[globalVar = TSFE:id=81]

    lib.include_bankfinder.persistence.storagePid = 85

[GLOBAL]

[globalVar = TSFE:id=82] && [globalVar = GP:tx_bankfinder_ajax|type=atm]

    lib.include_bankfinder.persistence.storagePid = 85

[GLOBAL]

[globalVar = TSFE:id=38]

    lib.include_bankfinder.persistence.storagePid = 86

[GLOBAL]


# contact form
[globalVar = TSFE:id=127]

lib.include_bankcontact = USER
lib.include_bankcontact {
    userFunc = TYPO3\CMS\Extbase\Core\Bootstrap->run
    extensionName = Bankfinder
    pluginName = Contact
    vendorName = AQUA
    
    settings =< plugin.tx_bankfinder.settings
    persistence =< plugin.tx_bankfinder.persistence
    view =< plugin.tx_bankfinder.view
    
    persistence.storagePid = 86
}

lib.content.30 < lib.include_bankcontact

[GLOBAL]