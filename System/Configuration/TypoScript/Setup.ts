# Read in the templates for changes in tt_content, lib.stdHeader etc.
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/System/CssStyledContent/Setup.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/System/Lib.ContentElementRendering.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/System/Lib.ParseFunc.ts">


# Read in the templates for the extensions.
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Extension/IncludeArticle.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Extension/IncludeBankfinder.ts">

# Read in the templates for the menu parts, like the default menu setup, language menu, header- and footermenu's.
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Menu/Menu.Template.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Menu/Menu.SecondLevel.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Menu/Menu.Main.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Menu/Menu.Info.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Menu/Menu.About.ts">


# Read in the Lib (Blocks) templates containing TypoScript to generate the building blocks for your website, except menu's.
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Block/Block.Content.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Block/Block.Teaser.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Block/Block.Content.BackgroundImage.ts">


# Read in the templates for the page, like page setup, config and header data.
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Page/Page.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Page/Page.Config.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Page/Page.Meta.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Page/Page.IncludeCss.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:Storages/System/Configuration/TypoScript/Page/Page.IncludeJs.ts">


