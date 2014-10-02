lib.include_article = USER
lib.include_article {
    userFunc = TYPO3\CMS\Extbase\Core\Bootstrap->run
    extensionName = Article
    pluginName = Articlelist
    vendorName = AQUA
    controller = Article
    action = list
    
    settings =< plugin.tx_article.settings
    persistence =< plugin.tx_article.persistence
    view =< plugin.tx_article.view
}