#config.baseURL = https://www.regionalbanken.ch/
config.baseURL = http://rba.aqualab.ch/
#config.baseURL = http://regionalbanken737832.sinso.ch/

[globalString = ENV:HTTPS=on]
  #config.baseURL = https://regionalbanken737832.sinso.ch/
[global]

config {
		
	// Administrator settings
	admPanel = 0
	debug = 0

	doctype = html5
	htmlTag_setParams = none
	
	// Include Boilerplate handling for IE browsers	
	htmlTag_stdWrap {
		setContentToCurrent = 1
		cObject = COA
		cObject {
			10 = LOAD_REGISTER
			10 {
				newLine.char = 10
			}
			20 = TEXT
			20.value = <!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"><![endif]-->
			20.wrap = |{register:newLine}
			20.insertData = 1
			30 < .20
			30.value = <!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8"><![endif]-->
			40 < .20
			40.value = <!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9"><![endif]-->
			50 < .20
			50.value = <!--[if IE 9]>         <html class="no-js lt-ie10"><![endif]-->
			60 < .20
			60.value = <!--[if gt IE 9]><!--><html class="no-js"><!--<![endif]-->

			90 = RESTORE_REGISTER
		}
	}
	
	// Character sets
	renderCharset = utf-8
	metaCharset = utf-8

	// Cache settings
	cache_period = 43200
	sendCacheHeaders = 1
	no_cache = 1

	// URL Settings
	tx_realurl_enable = 0
	simulateStaticDocuments = 0

	// Language Settings
	uniqueLinkVars = 1
	linkVars = L
	sys_language_uid = 0
	sys_language_overlay = 1
	sys_language_mode = content_fallback
	#sys_language_mode = strict
	language = de
	locale_all = de_DE
	htmlTag_langKey = de

	// Link settings
	absRefPrefix = {$config.absRefPrefix}
	prefixLocalAnchors = all

	// Remove targets from links
	intTarget =
	extTarget =

	// Indexed Search
	index_enable = 1
	index_externals = 0

	// Code cleaning
	disablePrefixComment = 1

	// Move default CSS and JS to external file
	removeDefaultJS = external
	inlineStyle2TempFile = 1

	// Protect mail addresses from spamming
	spamProtectEmailAddresses = -3
	spamProtectEmailAddresses_atSubst = @<span style="display:none;">remove-this.</span>

	// Comment in the <head> tag
	headerComment = Programmed by Aquaverde GmbH
	
	//form title tag
	pageTitleSeparator = -
}


// Condition to set language according to L POST/GET variable
[globalVar = GP:L = 3]
config {
	htmlTag_langKey = fr
	sys_language_uid = 3
	language = fr
	locale_all = fr_FR
}
[global]

[globalVar = GP:L = 4]
config {
	htmlTag_langKey = en
	sys_language_uid = 4
	language = en
	locale_all = en_EN
}
[global]

[globalVar = GP:L = 5]
config {
	htmlTag_langKey = it
	sys_language_uid = 5
	language = it
	locale_all = it_IT
}
[global]