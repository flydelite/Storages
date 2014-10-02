
/*

    regionalbanken.ch - script.js
    aquaverde gmbh, 2014 [ts]

*/

(function($) {
    "use strict";
            
    var RBA = RBA || {},
    
    $win = $(window),
    $doc = $(document),
    $body = $(document.body),

    Modernizr = window.Modernizr,
    touch = Modernizr.touch && navigator.userAgent.match(/(iPhone|iPod|iPad)|BlackBerry|Android/);
            
    RBA = {
        _: function() {	
            this.randomBkgHome._();
            this.subNav._();
            this.resultBox._();
            this.boxModes._();
            this.infoWindow._();
            this.inputTypes._();
            this.googleMap._();
        },
        
        randomBkgHome: {
            _: function() {
                var $div = $(".bkgHome");
                
                if ($("#home").length) {
                    var int = Math.floor(Math.random() * 6) + 1;
                    if ($(".lt-ie9").length) $div.css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/Storages/System/Resources/Public/Img/Fullscreen/Fullscreen_" + int + ".jpg',sizingMethod='scale'))");
                    else $div.css('background-image', 'url(/Storages/System/Resources/Public/Img/Fullscreen/Fullscreen_' + int + '.jpg)');
                }
            }
        },
    
        subNav: {
            options: {
                speed: 250,
                timeout: 500,
                sensitivity: 7,
                interval: 100,
                easing: 'easeInOutQuad'
            },
            _: function() {
                var options = this.options,
                    self = this;
                
                this.$1st = $(".sub > ul");
                this.$2nd = $("ul", this.$1st);
                
                if (!touch) {
                    $("li", this.$1st).hoverIntent({
                        over: function() {
                            self._open(this);
                        },
                        out: function() {
                            self._close(this);
                        },
                        sensitivity: options.sensitivity,
                        interval: options.interval,
                        timeout: options.timeout
                    });
                }
                else {
                    $("> li > a", this.$1st).on('touchstart click', function() {
                        var $this = $(this);
                        
                        if ($this.siblings("ul").length && !$this.hasClass('open')) {
                            self._open($this.parent());
                        
                            var $open = $this.parent().siblings().find(".open");
                            if ($open.length) self._close($open.parent());
                        }
                        else window.location = this.href;
                        return false;
                    });
                    
                    /*
                    $("> li > a", this.$1st).doubletap(function(event) {
                        window.location = event.target.href;
                    }, function(event) {
                        var $this = $(event[0].target);
                        
                        if (!$this.hasClass('open')) self._open($this.parent());
                        else self._close($this.parent());
                        
                        var $open = $this.parent().siblings().find(".open");
                        if ($open.length) self._close($open.parent());
                    }, 300);
                    */
                }
                
                if (this.$1st.length) {
                    $doc.on('click', function(e) {
                        var $openMenu = $(".open", this.$1st);
                        if (!$openMenu.is(e.target) && $openMenu.has(e.target).length === 0) self._close($openMenu.parent());
                    });
                }
                
                $win.load(function() {
                    self._init();
                });
            },
            _init: function() {
                this.$2nd.each(function() {
                    var $this = $(this);
                    $this.css({'visibility':'hidden','display':'block'}).data('height', $this.height()).css({'height':'0','opacity':'0'});
                    $this.prev("a").append('<span class="arrow" />');
                });                
            },
            _open: function(sub) {
                var options = this.options,
                    $2nd = $("ul", sub).css({'visibility':'visible'});
                
                if ($2nd.length) {
                    $("a", sub).stop(true,true).addClass('open').children(".arrow").animate({'top':'64px','opacity':'1',leaveTransforms: true}, options.speed, options.easing);
                    $2nd.stop(true,true).animate({'height': $2nd.data('height'),'opacity':'1'}, options.speed, options.easing);
                }
            },
            _close: function(sub) {
                var options = this.options,
                    $2nd = $("ul", sub);
                
                if ($2nd.length) {
                    $(".arrow", sub).stop(true,true).animate({'top':'58px','opacity':'0',leaveTransforms: true}, options.speed, options.easing);
                    $2nd.stop(true,true).animate({'height':'0','opacity':'0'}, options.speed, options.easing, function() {
                        $2nd.css({'visibility':'hidden'});
                        $("a", sub).removeClass('open');
                    });
                }
            }
        },
        
        resultBox: {
            options: {
                speed: 250,
                easing: 'easeInOutQuad'
            },
            _: function() {
                var self = this;
                
                this.firstload = true;
                this.$results = $(".results");
                this.resultsH = 0;
                
                $(".showHide", this.$results).on('click', function() {
                    if (self.$results.hasClass('hide')) self._show();
                    else self._hide();
                    return false;
                });
                
                $win.on('load resize', function() {
                    self._height();
                });
                
                $("table").stupidtable().on('aftertablesort', function(event, data) {
                    $("th", this).removeClass('up down').eq(data.column).addClass(function() {
                        return data.direction === 'asc' ? 'up' : 'down';
                    });
                });
            },
            _height: function() {
                this.resultsH = this.$results.outerHeight() -24;
                
                if (this.firstload) this.$results.css({'display':'block'}).addClass('hide');
                this.firstload = false;
                
                if (this.$results.hasClass('hide')) this.$results.css({'display':'block','bottom':-this.resultsH});
                else this.$results.css({'display':'block','bottom':'0'});
            },
            _show: function() {
                var options = this.options,
                    self = this,
                    value = Modernizr.csstransitions ? -this.resultsH : 0;
                                
                this.$results.stop(true,true).animate({'bottom': value}, options.speed, options.easing, function() {
                    self.$results.addClass('show').removeClass('hide');
                });
            },
            _hide: function() {
                var options = this.options,
                    self = this;
                                
                this.$results.stop(true,true).animate({'bottom': -this.resultsH}, options.speed, options.easing, function() {
                    self.$results.addClass('hide').removeClass('show');
                });
            }
        },
        
        boxModes: {
            _: function() {
                var self = this;
                
                $win.on('load resize', function() {
                    self._equalBox();
                    self._footerBox();
                });
                
                $win.on('load', function() {
                    self._stickyBox();
                });
            },
            _equalBox: function() {
                $(".equal").each(function() {
                    $(".overview", this).each(function() {
                        var $links = $(".links", this);
                        
                        $(this).css({'padding-bottom': $links.outerHeight()});
                        $links.css({'position':'absolute'});
                    });
                    
                    var currentTallest = 0,
                        currentRowStart = 0,
                        currentDiv = 0,
                        rowDivs = new Array(),
                        $this,
                        topPosition = 0;

                    $(this).children().each(function() {
                        var $this = $(this),
                            $links = $(".links", $this);
                                                
                        $($this).height('auto')
                        topPosition = $this.position().top;

                        if (currentRowStart != topPosition) {
                            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                                rowDivs[currentDiv].height(currentTallest);
                            }
                            rowDivs.length = 0;
                            currentRowStart = topPosition;
                            currentTallest = $this.height();
                            rowDivs.push($this);
                        } else {
                            rowDivs.push($this);
                            currentTallest = (currentTallest < $this.height()) ? ($this.height()) : (currentTallest);
                        }

                        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                            rowDivs[currentDiv].height(currentTallest);
                        }
                    });
                });
            },
            _stickyBox: function() {
                var $aside = $("aside");
                
                if ($aside.length) {
                    var sticky,
                        stickyPosTop = $aside.offset().top - ($("header").outerHeight() +25),
                        sticky = function() {
                            if ($win.scrollTop() > stickyPosTop) {
                                sticky = true;
                                $aside.addClass('fixed');
                            }
                            else {
                                sticky = false;
                                $aside.removeClass('fixed').css({'margin-left':'0'});
                            }
                        };
                    
                    $aside.parent().css({'min-height': $aside.outerHeight()});
                    
                    if (!touch) {
                        $doc.on('scroll', function() {
                            if (sticky) {
                                var scrollL = $doc.scrollLeft(),
                                    scrollW = $doc.width() - $win.width();

                                if (scrollL < 0) $aside.css({'margin-left': 0});
                                else if (scrollL > scrollW) $aside.css({'margin-left': -scrollW});
                                else $aside.css({'margin-left': - scrollL});
                            }
                        });

                        $win.on('scroll', sticky);
                        sticky();
                    }
                }
            },
            _footerBox: function() {
                var footerH = $("footer").outerHeight();
                
                $body.css({'margin-bottom': footerH});
                $("#map").css({'bottom': footerH});
            }
        },
                
        infoWindow: {
            options: {
                speedIn: 0,
                speedOut: 0,
                easing: 'easeInOutQuad'
            },
            _: function() {
                var self = this;
                
                this.$infoWindow = $(".infoWindow");
                this.$pageNav = $(".pageNav", this.$infoWindow);
                this.$tabNav = $("nav a", this.$infoWindow);
                this.firstLoad = true;
                
                this.$pageNav.on('click', function() {
                    self._changePage(this.hash);
                    return false;
                });

                this.$tabNav.on('click', function() {
                    self._changeTab(this.hash);
                    return false;
                });
            },
            _changePage: function(id) {
                if (this.firstLoad) $("#contact", this.$infoWindow).css({'display':'none','position':'relative','left':'0','visibility':'visible'});
                this.firstLoad = false;
                
                var options = this.options,
                    $active = $(id, this.$infoWindow),
                    $inactive = $active.siblings(".page");
                                
                $inactive.filter(":visible").animate({'opacity':'0'}, options.speedOut, options.easing, function() {
                    $inactive.css({'display':'none'})
                    $active.css({'opacity':'0','display':'block'}).animate({'opacity':'1'}, options.speedIn, options.easing);
                });
            },
            _changeTab: function(id) {
                var options = this.options,
                    $active = $(id, this.$infoWindow),
                    $inactive = $active.siblings("[id^='tab']");
                                
                $inactive.animate({'opacity':'0'}, options.speedOut, options.easing, function() {
                    $inactive.css({'display':'none'})
                    $active.css({'opacity':'0','display':'table'}).animate({'opacity':'1'}, options.speedIn, options.easing);
                });
                
                this.$tabNav.removeClass('on').filter('[href*='+ id +']').addClass('on');
            }
        },
        
        inputTypes: {
            _: function() {
                this._search();
                this._filter._();
                this._radioCheckbox();
                this._selectbox._();
                this._validation();
            },
            _search: function() {
                $("input[type=search]").each(function() {
                    var $input = $(this),
                        $reset = $input.next(".reset");
                    
                    $input.on('keyup', function() {
                        if ($input.val() != '') $reset.css({'display':'block'});
                        else $reset.css({'display':'none'});
                    }); 
                    
                    $reset.on('click', function() {
                        $input.val('');
                        $reset.css({'display':'none'});
                        return false;
                    });
                });
            },
            _filter: {
                options: {
                    accHeight: 260,
                    speed: 250,
                    easing: 'easeInOutQuad'
                },
                _: function() {
                    var self = this,
                        options = this.options;
                    
                    this.$searchFilter = $(".searchFilter");
                    this.$filter = $(".filter");
                    this.$trigger = $(".icnFilter", this.$searchFilter);
                    this.$filters = $(".filterValues", this.$searchFilter);
                    this.$values = $(".values", this.$searchFilter);
                    this._init();
                    
                    this.$trigger.on('click', function() {
                        if ($(this).hasClass('close')) self._open();
                        else self._close();
                    });
                    
                    var $form = this.$searchFilter.parents("form");
                    $doc.on('click', function(e) {
                        if (self.$trigger.hasClass('open') && !$form.is(e.target) && $form.has(e.target).length === 0) self._close();
                    });
                    
                    this.$filters.on('click', function() {
                        if ($(this).hasClass('close')) self._openAcc(this);
                        else self._closeAcc(this);
                    });
                },
                _init: function() {
                    var self = this,
                        options = this.options;
                    
                    this.$filter.data('height', this.$filter.outerHeight()).css({'top': - this.$filter.outerHeight(),'opacity':'0'});
                    this.filterH = this.$filter.outerHeight();
                    
                    var filterAmount = this.$filters.length;
                    this.$filters.each(function(i) {
                        $(this).css({'z-index': filterAmount - i});
                    });                    
                },
                _open: function() {
                    var self = this,
                        options = this.options;
                                        
                    this.$filter.stop(true,true).animate({'top': '0','opacity':'1'}, options.speed, options.easing, function() {
                        $(this).css({'top':'0'});
                    });
                    this.$searchFilter.stop(true,true).animate({'height': (35 + this.filterH)}, options.speed, options.easing, function() {
                        $(this).css({'height':'auto'});
                    });
                    this.$trigger.stop(true,true).removeClass('close').addClass('open');
                },
                _close: function() {
                    var self = this,
                        options = this.options;
                    
                    this.filterH = this.$filter.outerHeight();
                    
                    this.$filter.stop(true,true).animate({'top': - this.filterH,'opacity':'0'}, options.speed, options.easing);
                    this.$searchFilter.stop(true,true).css('height', (35 + this.filterH)).animate({'height':'35px'}, options.speed, options.easing);
                    this.$trigger.stop(true,true).removeClass('open').addClass('close');
                },
                _openAcc: function(acc) {
                    var self = this,
                        options = this.options,
                        $acc = $(acc).next();
                    
                    $acc.stop(true,true).animate({'height': options.accHeight}, options.speed, options.easing, function() {
                        $(acc).removeClass('close').addClass('open');
                        //$acc.css('overflow-y','scroll');
                    });
                    
                    $(acc).stop(true,true).removeClass('icnCaretDown').addClass('icnCaretUp');
                    
                    this._closeAcc($(acc).parents("li").siblings().find(".filterValues"));
                },
                _closeAcc: function(acc) {
                    var self = this,
                        options = this.options,
                        $acc = $(acc).next();
                    
                    $acc.stop(true,true).animate({'height':'0'}, options.speed, options.easing, function() {
                        $(acc).removeClass('open icnCaretUp').addClass('close icnCaretDown');
                        //$acc.css('overflow-y','hidden');
                    });
                }
            },
            _radioCheckbox: function() {
                var $radioCheckbox = $("input", ".checkbox, .radio"),
                    $label = $radioCheckbox.next("label:not(label>a)"),
                    testChecked = function(input) {
                        if ($(input).is(':checked')) $(input).parents('.field').addClass('checked');
                        else $(input).parents('.field').removeClass('checked');
                    };

                $radioCheckbox.css({'visibility':'hidden','position':'absolute','left':'-9999px'}).each(function() {
                    $(this).on('change', function() {
                        testChecked(this);
                    });

                    testChecked(this);
                });
                
                // prevent to check a checkbox when clicking on a link in label
                $("label[for] > a").on('click', function(e) {
                    e.stopPropagation();
                    window.open($(this).attr('href'));
                    return false;
                });
            },
            _selectbox: {
                options: {
                    speed: 250,
                    maxHeight: 250,
                    easing: 'easeInOutQuad'
                },
                _: function() {
                    var self = this;
                    this._init();
                    
                    $(".styledSelect").on('click', function(e) {
                        e.stopPropagation();
                        if (!$(this).hasClass('active')) self._open(this);
                        else self._close(this);
                    });

                    $("li", ".options").on('click', function(e) {
                        e.stopPropagation();
                        self._set(this);
                    });

                    $doc.on('click', function() {
                        self._close();
                    });
                },
                _init: function() {     
                    var options = this.options;
                    
                    $("select").each(function() {                        
                        var $this = $(this),
                            $styledSelect = $('<div class="styledSelect"></div>');
                        
                        $this.addClass('hideSelect').wrap('<div class="selectBox"></div>').after($styledSelect);
                        $styledSelect.text($this.children("option:eq(0)").text());

                        var $list = $('<ul class="options" />').insertAfter($styledSelect);
                        for (var i = 0; i < $("option:not(.label)", $this).length; i++) {
                            $('<li data-value="'+ $this.children('option:not(.label)').eq(i).val() +'">'+ $this.children("option:not(.label):eq("+ i +")").text() +'</li>').appendTo($list);
                        }
                        
                        var listH = $list.outerHeight(),
                            height = listH > options.maxHeight ? options.maxHeight : listH;
                        
                        $list.data('height', height).css({'opacity':'0','height':'0','display':'block'});
                    });
                    
                    var i = 1;
                    $(".field").each(function(i) { 
                        var i = i +1;
                        
                        $(this).find("input, textarea, .selectBox, .button").attr('tabindex', i);
                    });
                },
                _open: function(styledSelect) {
                    var options = this.options,
                        $selectBox = $(styledSelect).parents(".selectBox");
                    
                    $(".styledSelect", $selectBox).stop(true,true).addClass('active').next().animate({'height': $(".options", $selectBox).data('height'),'opacity':'1'}, options.speed, options.easing);
                },
                _close: function(styledSelect) {
                    var options = this.options,
                        $selectBox = $(styledSelect).parents(".selectBox"),
                        $styledSelect = styledSelect != undefined ? $(".styledSelect", $selectBox) : $(".styledSelect");
                    
                    $styledSelect.stop(true,true).removeClass('active').next().animate({'height':'0','opacity':'0'}, options.speed, options.easing);
                },
                _set: function(item) {
                    var $item = $(item),
                        $selectBox = $item.parents(".selectBox");
                    
                    $item.addClass('on').siblings().removeClass('on');
                    
                    $(".styledSelect", $selectBox).text($item.text());
                    $(".hideSelect", $selectBox).val($item.data('value'));
                    $selectBox.parents(".field").removeClass('error');
                    
                    this._close($(".styledSelect", $selectBox));
                }
            },
            _validation: function() {
                var $contactForm = $("#contactForm");
                
                $(".button", $contactForm).on('click', function() {
                    $contactForm.submit();
                });
                
                $contactForm.validate({
                    highlight: function(element, errorClass, validClass) {
                        $(element).addClass(errorClass).removeClass(validClass);
                        $(element).parents(".field").addClass(errorClass);
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        $(element).removeClass(errorClass).addClass(validClass);
                        $(element).parents(".field").removeClass(errorClass);
                    }
                });
            }
        },
        
        googleMap: {            
            _: function() {
                var self = this,
                    mapOptions = {
                        center: new google.maps.LatLng(46.798491, 8.231783),
                        zoom: 8,
                        minZoom: 8,
                        maxZoom:20,
                        mapTypeId: 'roadmap',
                        streetViewControl: false,
                        mapTypeControl: false,
                        panControl: false,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        },
                        styles: [{
                            "featureType": "administrative",
                                "stylers": [{
                                "saturation": -100
                            }, {
                                "lightness": 30
                            }]
                        }, {
                            "featureType": "road",
                                "stylers": [{
                                "visibility": "on"
                            }, {
                                "saturation": -100
                            }, {
                                "lightness": 50
                            }]
                        }, {
                            "featureType": "poi",
                                "stylers": [{
                                "saturation": -100
                            }]
                        }, {
                            "featureType": "landscape",
                                "stylers": [{
                                "saturation": -100
                            }, {
                                "visibility": "on"
                            }, {
                                "lightness": 55
                            }]
                        }, {
                            "featureType": "water",
                                "stylers": [{
                                "saturation": -31
                            }]
                        }, {
                            "featureType": "poi",
                                "stylers": [{
                                "visibility": "off"
                            }]
                        }]
                    };

                //init variables
                if ($("#map-canvas").length) {
                    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                }
                this.geocoder = new google.maps.Geocoder();
                this.location = null;
                this.locationName = '';
                this.box = null;
                this.markers = [];
                this.bankFilterUID = '';
                this.circle = null;
                this.markerCluster = null;

                //init functions
                this.addMarkersToMap();
                this.addAutocomplete();
                this.bindUIActions();
                this.mapHeight();


                //Limit to Pan to Bounds of Switzerland with some margin
                this.strictBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(45.213003555993964, 3.2574462890625), //sw
                    new google.maps.LatLng(48.49112712828191, 13.1561279296875) //ne
                );

               if ($("#map-canvas").length) {
                    this.lastValidCenter = self.map.getCenter();
                
                
                    google.maps.event.addListener(self.map, 'center_changed', function() {
                        if (self.strictBounds.contains(self.map.getCenter())) {
                            // still within valid bounds, so save the last valid position
                            self.lastValidCenter = self.map.getCenter();
                            return; 
                        }
                        // not valid anymore => return to last valid position
                        self.map.panTo(self.lastValidCenter);
                    });
                
                }
                
                //Homepage request
                this.address = $("#location").text(); //address to decode in location

                if (this.address) {
                    self.autocomplete.val(self.address); //placeholder
                    self.search();
                }
                
                
                
                
                /*
                //Right click get coordinate
                google.maps.event.addListener(self.map, "rightclick", function(event) {
                    var lat = event.latLng.lat();
                    var lng = event.latLng.lng();
                    // populate yor box/field with lat, lng
                    alert("Lat=" + lat + "; Lng=" + lng);
                });
                */
            },
            mapHeight: function() {
                var init = function() {
                        var winH = window.innerHeight ? window.innerHeight : $win.height();
                        $('.finder').height((winH - $('header').outerHeight()) + 68);
                    }
                
                init();
                $win.resize(init);             
            },
            bindUIActions: function() {

                var self = this;

                this.submit = $('.submit');
                this.autocomplete = $('#autocomplete');
                this.inputs = $('input[type=checkbox]');

                //autocomplete search location trigger
                self.submit.click(function() {

                    self.address = self.autocomplete.val();
                    self.search(); 

                    return false;
                });

                //Clear welcome text from autocomplete if clicked
                self.autocomplete.click(function() {
                    $(this).val('');
                });

                //Close icon action
                $('.icnClose').click(function(){
                    //clear the map => remove existing clusters and markers
                    self.markerCluster.clearMarkers();
                    self.markers = [];
                    //init map and markers/clusters
                    self.location = null;
                    self.addMarkersToMap();
                    self.map.setCenter(new google.maps.LatLng(46.798491, 8.231783));
                    self.map.setZoom(8);
                });

                //Search on press enter/return key
                if (self.autocomplete) {
                    self.autocomplete.keypress(function(e) {
                        if (e.which === 13) {
                            e.preventDefault();

                            if ($("#map-canvas").length) {
                                if (self.autocomplete.val()) {
                                    //console.log( 'submit now : '+ self.autocomplete.val() );
                                    self.address = self.autocomplete.val();
                                    self.search();
                                }
                            } else {
                                self.autocomplete.parents("form").submit();
                            }
                        }
                    });
                }
                
                /* V2.0
                var FormFlag = 0; 
                if(self.autocomplete) {
                    self.autocomplete.keypress( function (e) {
                        if ( e.which === 13 ) {
                            if(!FormFlag) {
                                e.preventDefault();
                                if ( self.autocomplete.val() ) {
                                    console.log( 'first item selected : ' + self.autocomplete.val() );
                                    FormFlag = 1;
                                }
                            } 
                            else {
                                e.preventDefault();
                                console.log( 'submit now : '+ self.autocomplete.val() );
                                self.address = self.autocomplete.val();
                                self.search();
                                FormFlag = 0;
                            }
                        }
                        else {
                            FormFlag = 0;
                        }
                    });
                }
                */
                /* V1.0
                self.autocomplete.focusin(function () {
                    $(document).keypress(function (e) {
                        if (e.which === 13) {
                            e.preventDefault();
                            var firstResult = $(".pac-container .pac-item:first").text();
                            console.log(firstResult);
                            if(firstResult) {
                                self.autocomplete.val(firstResult);
                                self.address = self.autocomplete.val();
                                self.address = $(".pac-container .pac-item:first").text();
                                self.search();
                            }
                        }
                    })
                });
                */
                
                //Filters
                $('ul.searchFilter ul.values').on('click', 'a', function(e) {
                    //clear the map => remove existing clusters and markers
                    self.markerCluster.clearMarkers();
                    self.markers = [];
                    //set UID bank to show
                    self.bankFilterUID = $(this).attr('data-uid');
                    self.addMarkersToMap();
                 });
            },
            //Search, geocode an address to a location (latlng Object)
            search: function() {
                var self = this;

                if (self.box != null) self.box.close();

                if (self.address) {
                    self.getAddressPosition(self.address, self.geocoder, function(results) {
                        self.locationName = self.address;
                        self.location = results[0].geometry.location;
                        
                        
                        if ($("#map-canvas").length) {
                            self.setMapRadius(self.location, self.getNearestMarkersWithDistance(self.location));
                        }
                    });
                } else {
                    self.markerCluster.clearMarkers();
                    self.markers = [];
                    self.addMarkersToMap();
                }
            },
            //Set the map center, @param position - a latlng Obj
            setMapCenter: function(position) {
                
                if(!position) console.log('SetMapCenter() - No position');    
                this.map.setCenter(position);
            },
            //Get the position of an adresse, @param address - the address ("biel"), @param geocoder - an geocoder Object, @param callback - a callback function
            getAddressPosition: function(address, geocoder, callback) {
                var self = this;

                this.address = address;
                this.geocoder = geocoder;

                self.geocoder.geocode({
                    'address': this.address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        callback(results);
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status );
                    }
                });
            },
            //Add markers from a JSON source to the map, add a tooltip infobox and an infobbox to each marker, push created markers in an array markers
            addMarkersToMap: function() {
                var self = this;

                if (self.bankFilterUID > 0) {
                    this.dataJSON = "/index.php?type=50&id=101&tx_bankfinder_ajax[controller]=Branch&tx_bankfinder_ajax[action]=ajaxBranches&tx_bankfinder_ajax[bankUid]=" + self.bankFilterUID + "";
                } else {
                    this.dataJSON = "/typo3conf/ext/bankfinder/Resources/Public/BranchList.txt";
                }

                $.getJSON( self.dataJSON )
                    .done(function( json ) {  

                        //reset filter
                        self.bankFilterUID = ''; 
                       
                        //add markers
                        for (var i = 0; i < json.length; i++) {
                            var obj = json[i];
                            var myLatlng = new google.maps.LatLng(obj.latitude, obj.longitude);
                            
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: self.map,
                                uid: obj.uid,
                                title: obj.bank,
                                city: obj.city,
                                icon: "/Storages/System/Resources/Public/Img/marker.png"
                            });
                    
                            self.addInfoboxTooltip(marker);
                            self.addMarkerEventListener(marker);
                            self.markers.push(marker);
                        }
                        //if location setted from homepage
                        if(self.location) {
                            self.setMapRadius(self.location, self.getNearestMarkersWithDistance(self.location));
                        }            
                        //add the clusters
                        self.addMarkerCluster();
                    
                    })
                    .fail(function( jqxhr, textStatus, error ) {
                        var err = textStatus + ", " + error;
                        console.log( "XHR Request Failed: " + err );
                    });
            },
            // Add a tooltip to a marker and a listener, @param marker - google map marker object           
            addInfoboxTooltip: function(marker) {

                if(!marker) console.log('addInfoboxTooltip() - No marker');
                
                var self = this;

                this.html = '<div class="infoWindow small"><div class="column small12"><h6>' + marker.title + '</h6></div</div>'

                var box = new InfoBox({
                    content: self.html,
                    boxClass: "infoboxTooltip",
                    disableAutoPan: true,
                    maxWidth: 500,
                    pixelOffset: new google.maps.Size(-250, -50),
                    zIndex: 998,
                    alignBottom: true,
                    boxStyle: {
                        width: "500px"
                    },
                    closeBoxMargin: "0px 0px 0px 0px",
                    closeBoxURL: "/Storages/System/Resources/Public/Img/1x1.png",//cant be hidden
                    infoBoxClearance: new google.maps.Size(1, 1)
                });
                //UI actions
                google.maps.event.addListener(marker, 'mouseover', function() {
                    box.open(this.map, marker);
                    google.maps.event.addListener(marker, 'mouseout', function() {
                        box.close();
                    });
                });

            },
            //add an eventlistener (click) to a marker
            addMarkerEventListener: function(marker) {
                var self = this;
                
                google.maps.event.addListener(marker, 'click', function() {
                    self.addInfobox(marker);
                });
            },
            //Create an objectDisplay an Infobox and load content related with a marker, @param marker - google map marker object  
            addInfobox: function(marker) {
                
                var self = this;
                
                this.html = '';
                this.pathToContent = '';
                this.closeBtn = $('div.infoWindow a.close');
                
                //close other infobox if open                    
                if (self.box) self.box.close();

                //switch to active marker
                self.setMarkerIconImg(marker);
                    
                self.pathToContent = '/index.php?type=60&id=82&tx_bankfinder_ajax[controller]=Branch&tx_bankfinder_ajax[action]=ajaxInfoWindow&tx_bankfinder_ajax[uid]='+ marker.uid +'&tx_bankfinder_ajax[type]=branch';
                    
                $.get(self.pathToContent, function(response) {
                    if (response) {
                        self.html = response;
                        createInfobox();
                    } 
                    else console.log("Load Content error");
                });

                var createInfobox = function() {

                    self.box = new InfoBox({
                        content: self.html,
                        boxClass: "infobox",
                        disableAutoPan: false,
                        maxWidth: 700,
                        pixelOffset: new google.maps.Size(-350, -54),
                        alignBottom: true,
                        zIndex: 999,
                        boxStyle: {
                            width: "700px", 
                        },
                        closeBoxMargin: "0px 0px 0px 0px",
                        closeBoxURL: "/Storages/System/Resources/Public/Img/1x1.png",//cant be hidden
                        infoBoxClearance: new google.maps.Size(1, 100)
                    });

                    self.box.open(self.map, marker);
                    self.map.panTo(marker.getPosition());

                    //event fired when the InfoBox's close box is clicked.
                    google.maps.event.addListener(self.box, 'closeclick', function(){
                        marker.setIcon();
                        //if(self.location) self.map.panTo(self.location);
                        if(self.location) self.setMapBounds(self.location, self.markers);

                    });
                    
                    //event fired when map clicked
                    google.maps.event.addListener(self.map, 'click', function() {
                       self.box.close();
                       marker.setIcon("/Storages/System/Resources/Public/Img/marker.png");
                    });
        
                    //UI action on infobox object once the DOM is ready !! AJAX
                    google.maps.event.addListener(self.box, 'domready', function() {
  
                        RBA.infoWindow._();
                        RBA.inputTypes._radioCheckbox();
                        RBA.inputTypes._selectbox._();
                                                                                                
                        //send form
                        $('.infoWindow form a.button').on('click', function() {
                            var $form = $("#contact"),
                                $contactForm = $("#contactForm");

                            $contactForm.validate({
                                highlight: function(element, errorClass, validClass) {
                                    $(element).addClass(errorClass).removeClass(validClass);
                                    $(element).parents(".field").addClass(errorClass);
                                },
                                unhighlight: function(element, errorClass, validClass) {
                                    $(element).removeClass(errorClass).addClass(validClass);
                                    $(element).parents(".field").removeClass(errorClass);
                                }
                            });
                            
                            if ($contactForm.valid()) {
                                var postingForm = $.post('/index.php?type=50&id=101&tx_bankfinder_ajax[controller]=Branch&tx_bankfinder_ajax[action]=ajaxSendMail', $contactForm.serialize());

                                postingForm.done(function(msg) {
                                    if (msg === 1) {
                                        $contactForm.hide();
                                        $('.msg.success').show();
                                    }
                                    else if (msg === 2) {
                                        $contactForm.hide();
                                        $('.msg.error').show();
                                    }
                                }).fail(function(msg) {
                                    console.log( "error AJAX Request");
                                });
                            }

                            return false;
                        }); 

                        $('.infobox a.close').click(function(){
                            self.box.close();
                            marker.setIcon("/Storages/System/Resources/Public/Img/marker.png");
                            return false;
                        });
                    });

                }
            },
            //Create an Autocomplete Obj and Bind it with an HTML Input Field 
            addAutocomplete: function() {


                var self = this;
                this.autocomplete = $('#autocomplete');
                    
                    
                // BASTEL LOESUNG begin !!!!!

                var bad_zips = {1000:'Lausanne', 1200:'Genève', 1400:'Yverdon', 2500:'Biel/Bienne', 3000:'Bern', 4000:'Basel', 6000:'Luzern', 6900:'Lugano'};
                
                this.autocomplete.on('keyup', function(){
                    var input_value = this.value;
                    $.each(bad_zips, function(index, value){
                        if (input_value == index) {
                            self.autocomplete.val(value);
                        }
                    });
                });

                // BASTEL LOESUNG end !!!!!
                
                

                //autocomplete -> plugin geocomplete
                self.autocomplete.geocomplete({
                    types: ['geocode'],
                    componentRestrictions: {
                        country: 'ch'
                    }
                });
                
                // There's a conflict with FastClick and PAC
                // Add class "needsclick" to both the pac-item and all its children to make touch work
                $doc.on({'DOMNodeInserted': function() {
                    $('.pac-item, .pac-item span', this).addClass('needsclick');
                }}, '.pac-container');
                
                /* V.1.0
                self.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: 'ch'
                    }
                });
               */ 
            },
            //Get nearby Markers of a given location in a list from nearest to farest without distance
            getNearestMarkers: function(location) {

                var self = this,
                    markersToSort = [],
                    markersSorted = [],
                    i = 0;

                $($(this.markers)).each(function() {
                    //find the distance between two positions
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(location, this.getPosition());
                    markersToSort[i] = {
                        marker: this,
                        distance: distance
                    };
                    i++;
                })
                //sort marker by distance
                markersToSort.sort(function(a, b) {
                    return a.distance - b.distance
                });
                //Only return the markers, we dont care any more about distance
                $(markersToSort).each(function() {
                    markersSorted.push(this.marker)
                })
                return markersSorted;
            },
            //Get a array list of nearby markers with the distance in meters to a given location
            getNearestMarkersWithDistance: function(location) {

                var self = this,
                    markersToSort = [],
                    markersSortedWithDistance = [],
                    i = 0;

                $($(this.markers)).each(function() {
                    //determine the distance between two positions
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(location, this.getPosition());
                    markersToSort[i] = {
                        marker: this,
                        distance: distance
                    };
                    i++;
                })
                //sort marker by distance
                markersToSort.sort(function(a, b) {
                    return a.distance - b.distance
                });

                markersSortedWithDistance = markersToSort;

                return markersSortedWithDistance;
            },
            //Set the Map bounds according the location and visible markers / NOT USED IN SCOPE
            setMapBounds: function(location, markers) {
                
                var self = this;

                this.totalMarker = 2; //total markers to show on the map

                //var markersToShow = markers.slice(0, this.totalMarker); //don't check if visible
                //check if the marker is visible
                var i = 0,
                    markersToShow = [];
                $(markers).each(function() {
                    if (i >= self.totalMarker) return false;

                    if (this.visible === true) {
                        markersToShow.push(this);
                        i++;
                    }

                })

                //location = origin place
                var mapBounds = new google.maps.LatLngBounds(location);

                //extend the area to X nearest markers
                $(markersToShow).each(function() {
                    mapBounds.extend(this.getPosition());
                })

                if (markersToShow.length < 1) {
                    alert('No markers to show');
                    return false;
                }

                //  Fit these bounds to the map
                this.map.fitBounds(mapBounds);

            },
            //Set radius 
            setMapRadius: function(location, markersWithDistance) {

                var self = this;

                this.radius = [10000,15000,20000,25000,40000,75000,100000,150000,200000]; //radius to check in meters
                this.markersInRadius = [];
                var hackDistance;
                
                for (var i = 0; self.markersInRadius.length === 0; i++) {
                    
                    console.log("Radius = "+self.radius[i]+"m");
                    
                    $(markersWithDistance).each(function() {
                        
                        if( this.distance <= self.radius[i] ) {
                            self.markersInRadius.push(this.marker);
                            hackDistance = this.distance;
                        }
                        
                     });
                    
                    if(self.markersInRadius.length === 0 ) //console.log("No makers founded r="+self.radius[i]+"m")
                    
                    //break the infinite loop
                    if(i >= self.radius.length) {
                        //console.log("No markers in radius");
                        break;
                    }
                   
                }
                
                //draw the radius = add a circle 
                //this.addCircle(location, this.radius[i-1])
                
                //location = origin place
                var mapBounds = new google.maps.LatLngBounds(location);
                
                //extend the area to X nearest markers
                $(self.markersInRadius).each(function() {
                    mapBounds.extend(this.getPosition());
                })
                
                //update result list
                this.setMarkersListInRadius(self.markersInRadius);
                
                //Fit these bounds to the map
                this.map.fitBounds(mapBounds);

                //hack distance, because location to close         
                if( parseFloat(hackDistance) < 1000 ) this.map.setZoom(15);

            },
            //add cluster marker to the map/marker
            addMarkerCluster: function() {

                var self = this;
                
                this.options = {
                    styles: [{
                        height: 64,
                        width: 64,
                        url: "/Storages/System/Resources/Public/Img/cluster.png",
                        textColor: "white",
                        fontFamily: "'Cuprum',sans-serif",
                        textSize: 18,
                        fontWeight: "normal",
                        fontStyle: "normal"                      
                    }],
                    gridSize: 100,
                    maxZoom: 11,
                    clusterClass: "cluster"
                }

                this.markerCluster = new MarkerClusterer(this.map, this.markers, this.options);
                //this.markerCluster.setClusterClass("test");

            },
            //Show markers from categorie ID from an ID array
            showMarkersOfCategorie: function(ids) {

                console.log(marker.categorie);
            },
            //Set the icon of a marker, @param marker
            setMarkerIconImg: function(marker) {
                
                var self = this;

                this.pathToIcon = "/Storages/System/Resources/Public/Img/marker-active.png";
                this.markers = this.markers;
                
                //clear all icons
                $(self.markers).each(function() {
                    this.setIcon("/Storages/System/Resources/Public/Img/marker.png");
                })

                marker.setIcon(self.pathToIcon);
            },
            //Add a circle around a marker, @param location in latlng, @param radius in meters
            addCircle: function(location, radius) {
      
                this.options = {
                  strokeWeight: 0,
                  fillColor: '#990000',
                  fillOpacity: 0.05,
                  map: this.map,
                  center: location,
                  radius: radius
                };
                
                //remove circle if existing
                if (this.circle) this.circle.setMap(null);
                this.circle = new google.maps.Circle(this.options);
             
            },
            //set the result list with data in radius, @param an Marker array
            setMarkersListInRadius: function(markers) {

                var self = this;
                
                this.$resultsH3 = $('.results h3'); 
                this.$resultsTable = $('.results tbody');
                this.html = '';
                
                self.$resultsH3.text('Regionalbanken bei ' + this.locationName);
                $('.results tbody tr').remove();
                
                $(markers).each(function(){
                    console.log("Found = " + this.city + " - " + this.title);  
                    self.html += '<tr><td>' + this.city + '</td><td>' + this.title + '</td><td><a id="uid-' + this.uid + '" class="icnMore" href="index.php?id=38#" data-uid="'+ this.uid +'" >Kontakt/Details</a></td></tr>';
                    
                })
                
                //add rows to result table
                self.$resultsTable.append(self.html);
                //adjust resultBox height
                RBA.resultBox._height();
                
                //Bind UI action
                $('div.results').on('click', 'a.icnMore', function(e) {

                    if($('.results').hasClass('show')) RBA.resultBox._hide();
                    
                    var uid = $(this).attr("data-uid");
                    //Find marker with this uid
                    $(markers).each(function() {
                        //console.log(uid + " / " + this.uid);
                        if(this.uid === parseInt(uid) ) {
                            self.addInfobox(this);
                            self.map.setZoom(15);
                            return false;
                        }
                    })
                    return false;

                });

            }
        }
    };
    
    /*
    $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay) {
		var action,
            delay = delay == null ? 500 : delay;
    
        return this.each(function() {
            $(this).on('touchstart', function(event) {

                var now = new Date().getTime(),
                    lastTouch = $(this).data('lastTouch') || now + 1,
                    delta = now - lastTouch;

                clearTimeout(action);

                if (delta < 500 && delta > 0) {
                    if (onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function') onDoubleTapCallback(event);
                }
                else {
                    $(this).data('lastTouch', now);
                    action = setTimeout(function(evt){
                        if (onTapCallback != null && typeof onTapCallback == 'function') onTapCallback(evt);
                        clearTimeout(action);
                    }, delay, [event]);
                }

                $(this).data('lastTouch', now);
                
                return false;
            });
        });
    };
    */
        
    FastClick.attach(document.body);
            
    RBA._();
    
})(jQuery);