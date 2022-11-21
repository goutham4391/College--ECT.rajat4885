jQuery(document).ready(function ($) {

    console.log('+++Iframe resizer loaded+++');
    
    var src;

    jQuery.fn.exists = function(){
      return jQuery(this).length>0;
    }

    // Iframe resizer class/listener
    $('.iframe-resizer').on('load', function() {
      src = $(this).attr("src");
      $(this)[0].contentWindow.postMessage({"iframe":$(this).attr("id"), "value":"body-outerHeight"}, src);
    });

    if($('.iframe-resizer').exists()){
      window.addEventListener('message', function(evt) {
        if(evt.origin !== "https://www.news.uct.ac.za") return;
        var iframeID = evt.data.iframe;
        var iframeHeight = evt.data.value;
        $("#"+iframeID).css("height", iframeHeight + 10);
      });
      $(window).resize(function(){
        $('.iframe-resizer').each(function(){
          $(this)[0].contentWindow.postMessage({"iframe":$(this).attr("id"), "value":"body-outerHeight"}, src);
        });
      });
    }

});;
jQuery(document).ready(function ($) {
  
  /* 
    Article node remove date meta on front-end display
    if article iframe from UCT News is embedded in Article body
  */
  var ifArticleNode = $('body').hasClass('page-node-type-article');
  if(ifArticleNode) {
    var UCTNewsIframe = $('.node__main').find('iframe[src*="https://www.news.uct.ac.za"]');
    if(UCTNewsIframe.length > 0) {
      $(".node__meta").hide();
      $('.node__main').addClass('UCTNews-iframe');
    }
    
  }

  // Check if masthead region as a image as logo and mark as co-brand enabled
  if($('#uct-landing-banner-block > a > img').length > 0) {
    if( $('#page--landing-banner').length > 0 ) $('#page--landing-banner').addClass('landing-banner--co-brand');
  }


  /* 
    Header menu state functionality
  */
  var headerNavItems = $('#uct-landing-banner-block--section-template-menu .menu').html();

  if(headerNavItems) {
    var headerNavMobile = `
    <li class="menu-item menu-item__header-mobile is-parent" role="none" aria-haspopup="true" aria-label="More" data-is-click="false">
      <a href="#" disabled class=" " title="" target="" role="menuitem">More</a>
      <ul class="menu submenu" data-submenu="" role="menubar" style="">
        `+ headerNavItems + `
      </ul>
    </li>`;

    $(headerNavMobile).appendTo('.block-region--primary-menu > .menu');

    // using matchMedia api to check if primary input device is touch
    var touchCapable= window.matchMedia("(pointer: coarse)").matches;

    if(touchCapable) {

      $('.section-template-menu .menu-item.is-parent > a').on('click', function(e){
        if( $(this).parent().hasClass('open') ) return
        e.preventDefault();
      });

      $('.section-template-menu .menu-item.is-parent').on('click', function(e){
        $(this).toggleClass('open');
        e.stopPropagation();
      });

      $(document).on('click', function(e){
        if (!$(e.target).hasClass('open')) {
          $('.section-template-menu .menu-item.is-parent').removeClass("open");
        }
      });

    } else {

      $('.section-template-menu .menu-item.is-parent').hover(
        function(){
          $('.section-template-menu .menu-item.is-parent').removeClass('open');
          $(this).addClass('open');
        },
        function(){
          $('.section-template-menu .menu-item.is-parent').removeClass('open');
        }
      );

    }
  }

  /* 
    JS solution for is-active and breadcrumbs relating to child nav items with the 
    same page as their parent 
  */
  var currentURL = window.location.origin + window.location.pathname;
  var sideNav = $('.region-sidebar-first');
  if(sideNav) {
    $('.region-sidebar-first a.is-active + .menu a[href="'+ currentURL +'"]:not(.is-active)').addClass('is-active');

    // Check if Sidebar navigation has an active menu-item
    var isSideNavActive = sideNav.find('a.is-active').length > 0;
    isSideNavActive ? sideNav.addClass('sidebar--active') : sideNav.addClass('sidebar--inactive');

    if ( sideNav.find('a[href="'+ window.location.origin + window.location.pathname +'"].is-active').length > 1) {
      var sideNavActiveItems = sideNav.find('a.is-active');
      sideNavActiveItems.each(function(i, elem){
      
        if ( sideNavActiveItems.length - 1 == i ) return false;

        var breadcrumb = '<li><a href="' + $(elem).attr('href') + '" target="' + $(elem).attr('target') + '">'+ elem.innerText +'</></li>';
        $('.breadcrumb > ol').append(breadcrumb);
        
      });
    }
    
  }  

});;
/*
	Author		: Michael Janea
	Version		: 1.0
	Author URL	: www.michaeljanea.me
*/

(function($){
	
	//define plugin
    $.fn.mjAccordion = function(options){
		
		//extends
		var mjSettings = $.extend({
			duration: 300,
			toggle	: false
		}, options);
		
		//function
		return this.each(function(){
			
			//on item click
			$(this).find('.mj_accordion_item').on('click', function(){
				
				//if toggle is true
				if(mjSettings.toggle){
					
					//hidden
					if(!$(this).hasClass('active')){
						
						$(this).addClass('active').siblings('.mj_accordion_content').stop(true, true).slideDown(mjSettings.duration, function(){
							
							//add active class and remove inline css generated by jquery
							$(this).addClass('active').removeAttr('style');
							
						});
					
					//shown
					}else{
						
						$(this).siblings('.mj_accordion_content').stop(true, true).slideUp(mjSettings.duration, function(){
							
							//remove active class and remove inline css generated by jquery
							$(this).removeClass('active').removeAttr('style').siblings('.mj_accordion_item').removeClass('active');
							
						});
						
					}
					
				//toggle if false
				}else{
					
					//show content
					$(this).addClass('active').siblings('.mj_accordion_content').stop(true, true).slideDown(mjSettings.duration, function(){
						
						//add active class and remove inline css generated by jquery
						$(this).addClass('active').removeAttr('style');
						
					});
				
					//hide all others
					$(this).parent().siblings().find('.mj_accordion_content').stop(true, true).slideUp(mjSettings.duration, function(){
						
						//remove active class and remove inline css generated by jquery
						$(this).removeClass('active').removeAttr('style').siblings('.mj_accordion_item').removeClass('active');
						
					});
					
				}
				
			});
			
		});
		
    };

    try {
      $('.mj_accordion').mjAccordion({toggle:true});
     } catch(err) {
      console.log(err);
     }    
	
})(jQuery);;
// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                activate: function(){}
            }
            //Variables
            var options = $.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';

            //Events
            $(this).bind('tabactivate', function(e, currentTab) {
                if(typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list');
                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion');
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var innertext = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')').html();
                    $respTabs.find('.resp-accordion:eq(' + itemCount + ')').append(innertext);
                    $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');

                    //First active tab, keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode 
                    if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {                  
                        $respTabs.find('.resp-tab-item').first().addClass('resp-tab-active');
                        $respTabs.find('.resp-accordion').first().addClass('resp-tab-active');
                        $respTabs.find('.resp-tab-content').first().addClass('resp-tab-content-active').attr('style', 'display:block');
                    }

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                    var $currentTab = $(this);
                    $currentTab.click(function () {

                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active').slideUp('', function () { $(this).addClass('resp-accordion-closed'); });
                            $currentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                        } else {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);
                    });
                    //Window resize function                   
                    $(window).resize(function () {
                        $respTabs.find('.resp-accordion-closed').removeAttr('style');
                    });
                });
            });
        }
    });
})(jQuery);

;
(function ($) {

  /**
   * Behavior to initialize Field Group - Easy Responsive Tabs elements.
   *
   * @type {{attach: Drupal.behaviors.FieldGroupEasyResponsiveTabsToAccordion.attach}}
   */
  Drupal.behaviors.FieldGroupEasyResponsiveTabsToAccordion = {
    attach: function (context, settings) {
      $(context)
        .find('.field-group-easy-responsive-tabs')
        .once('field-group-easy-responsive-tabs')
        .each(function () {
          var $this = $(this);

          $(this).easyResponsiveTabs({
            type: $this.data('type') || null,
            width: $this.data('width') || null,
            fit: $this.data('fit') || null,
            closed: $this.data('closed') || null,
            tabidentify: $this.data('tabidentify') || null,
            activetab_bg: $this.data('activetab_bg') || null,
            inactive_bg: $this.data('inactive_bg') || null,
            active_border_color: $this.data('active_border_color') || null,
            active_content_border_color: $this.data('active_content_border_color') || null,
            activate: function () {
            }
          });
        })
    }
  };

})(jQuery);
;
/**
 * @file
 * Javascript behaviors for MathJax.
 */

/* global window, drupalSettings */

(function (window, settings) {

  'use strict';
  window.MathJax = settings.mathjax.config;

}(window, drupalSettings));
;
