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
