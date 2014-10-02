# Add the following uncommented line, to the root sys_template Constants to include this file
# <INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Constants.ts">


<INCLUDE_TYPOSCRIPT: source="FILE: Storages/System/Configuration/TypoScript/System/CssStyledContent/Constants.ts">
<INCLUDE_TYPOSCRIPT: source="FILE: Storages/System/Configuration/TypoScript/Extension/JqueryColorbox/Constants.ts">
<INCLUDE_TYPOSCRIPT: source="FILE: Storages/System/Configuration/TypoScript/Extension/WtSpamshield/Constants.ts">
<INCLUDE_TYPOSCRIPT: source="FILE: Storages/System/Configuration/TypoScript/Extension/PowerMail/Main/Constants.ts">

config {
    absRefPrefix = 
}

filepaths {

  # cat=filepaths; type=string; label=CSS: Location of the Cascading Style Sheets relative to site
  css = Storages/System/Resources/Public/Css/
  
  # cat=filepaths; type=string; label=JS: Location of the Java Scripts relative to site
  js = /Storages/System/Resources/Public/Js/

  # cat=filepaths; type=string; label=Images: Location of the images relative to site
  images = Storages/System/Resources/Public/Img/

  # cat=filepaths; type=string; label=Scripts: Location of the Javascript files relative to site
  scripts = Storages/System/Resources/Public/Scripts/
  
  # cat=filepaths; type=string; label=HTML Templates: Location of the HTML templates
  templates = Storages/System/Resources/Private/Templates/
  
  # cat=filepaths; type=string; label=Partials: Location of the partials templates
  partials = Storages/System/Resources/Private/Partials/
  
  # cat=filepaths; type=string; label=Layouts: Location of the layout templates
  layouts = Storages/System/Resources/Private/Layouts/

  # cat=filepaths; type=string; label=HTML Templates for extensions: Location of the (X)HTML templates for extensions
  extensionTemplates = Storages/System/Resources/Private/Templates/Extentions/
  
  # cat=filepaths; type=string; label=HTML Templates for extensions: Location of the (X)HTML partials for extensions
  extensionPartials = Storages/System/Resources/Private/Partials/Extentions/

    # cat=filepaths; type=string; label=HTML Templates for extensions: Location of the (X)HTML layouts for extensions
  extensionLayouts = Storages/System/Resources/Private/Layouts/Extentions/

}

bankfinder {
    googleApiKey = AIzaSyDJw2-ULxufWFx44hF3-FJuzlH9shnRlmw
    #AIzaSyDJw2-ULxufWFx44hF3-FJuzlH9shnRlmw -> Regionalbanken
    #AIzaSyDVLvR_-mWEtjCIEQxzfLzkyn6tsFbpi2w -> TEST
}

menu {
  # cat=navigation menus; type=string; label= Top-menu pages: Comma separated list of page id's to be included in top-right menu.
  meta.pages = 87
}

plugin.tx_indexedsearch {
  # cat=plugin.indexed_search; type=int+; label= Search Page ID: UID of the page which contains the indexed search plugin.
  searchpageID = 17
}



plugin.meta {
  # cat=plugin.meta; type=string; label= Description: Write a short abstract for your website.
  description =

  # cat=plugin.meta; type=string; label= Keywords: Enter a comma separated list of keywords.
  keywords =

  # cat=plugin.meta; type=string; label= Robots: Use for instance these codes: Index all pages: "all".  Index no pages: "none". Only this page: "index,nofollow".  Only subpages: "noindex,follow"
  robots = all

  # cat=plugin.meta; type=string; label= Reply-to email
  email =

  # cat=plugin.meta; type=string; label= Author: Enter name of author.
  author = 

  # The meta tags below are not used on this website, if you want to use these, you can configure that in TypoScript template page.meta

  # cat=plugin.meta; type=boolean; label=Always include global.
  includeGlobal = 0

  # cat=plugin.meta; type=options[,Arabic=ar,Chinese=zh,Danish=dk,Dutch=nl,English=en,Finnish=fi,French=fr,German=de,Greek=el,Hebrew=he,Icelandic=is,Italian=it,Japanese=ja,Norwegian=no,Polish=pl,Portuguese=pt,Russian=ru,Spanish=es,Swedish=sv,Turkish=tr,Multi language=mul]; label= Language: Select language of the content.
  language = de

  # cat=plugin.meta; type=string; label= Distribution
  distribution = GLOBAL

  # cat=plugin.meta; type=options[,General,Mature,14 years,Restricted]; label= Rating
  rating = General
}

styles.content {
  # This defines the maximum width of images inserted in content records of type Images or Text-with-images.
  # There are seperate settings for images floated next to text (..InText)
  imgtext {
    maxW = 651
    maxWInText = 651
    borderThick = 1
    linkWrap.newWindow = 1
  }
  uploads {
    jumpurl_secure = 1
    jumpurl_secure_mimeTypes = pdf=application/pdf, doc=application/msword
    jumpurl = 1
  }
}

content {
  defaultHeaderType = 2
}

contentpage {
  # cat=contentpage; type=int+; label= Footer source PID: Parent ID of the footer record used on content pages.
  footerPID = 150
  
  # cat=contentpage; type=int+; label= Default teaser source PID: Parent ID of the teaser record used on content pages.
  teaserPID = 144
  
  # cat=contentpage; type=int+; label= Default teaser user box source PID: Page ID of the teaser userbox.
  teaserUserBoxPID = 168

  # cat=contentpage; type=int+; label= ID of the home page: ID of the home (root) page of the site.
  homeID = 1

  # cat=contentpage; type=int+; label= loginboxPID: ID of the folder containing the login box record (to be shown on multiple pages)
  loginboxPID = 21

  # cat=contentpage; type=int+; label= loginboxUID: UID of the login box record (to be shown on multiple pages)
  loginboxUID = 31

  # cat=contentpage; type=int+; label= loginpageID: UID of the customer login page.
  loginpageID = 28

  # cat=contentpage; type=int+; label= examplelanguagesID: UID of the page which has the language menu enabled
  examplelanguagesID = 25

  # cat=contentpage; type=string; label= language1: name of the default language of this site
  language1 = DE

  # cat=contentpage; type=string; label= language2: name of the second language of this site
  language2 = FR
  
  # cat=contentpage; type=string; label= language2: name of the second language of this site
  language3 = IT
}

# Set the language of meta tag with DC.language to Danish, when in Danish
[globalVar = GP:L = 1]
plugin.meta.language = fr
plugin.tx_news.language = fr
[end]

[globalVar = GP:L = 2]
plugin.meta.language = it
plugin.tx_news.language = it
[end]


<INCLUDE_TYPOSCRIPT: source="FILE: typo3conf/settings/introduction.ts">