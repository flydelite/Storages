lib.backgroundImage = FILES
lib.backgroundImage {
	references {
        table = pages
        data = levelmedia:-1, slide
    }
    maxItems = 1
    renderObj = IMG_RESOURCE
    renderObj {
        file {
            import.data = file:current:publicUrl
            width = 1600c
            height = 420
        }
        stdWrap.wrap = style="background-image:url(|)"
    } 
    stdWrap.wrap = <figure class="hero" |></figure>
}
