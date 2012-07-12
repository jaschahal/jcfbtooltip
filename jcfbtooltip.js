jQuery.fn.jcfbtooltip = function(settings) {
          settings = jQuery.extend({
            delay:500,
            width:250,
            height:120,
            offset:0,
            position:'bottom' // auto | left | right | top | bottom
          },settings);
          var stooltipid = "jcapp-"+jQuery(this).attr('id');
          console.log(stooltipid)
          jQuery("<div id='"+stooltipid+"' class='jcfbtooltip'><div class='arrow-west'></div></div>").appendTo("body");
          jQuery("#"+stooltipid).css({width:settings.width+'px',height:settings.height+'px'});


          if(jQuery(this).attr('jchtml') != undefined && jQuery(this).attr('jchtml').length > 0) {
              jQuery("#"+stooltipid).append(jQuery(this).attr('jchtml'));
          }
          else if(jQuery(this).attr('jccontent') != undefined) {
             // jQuery("#"+stooltipid).append(jQuery('#'+jQuery(this).attr('jccontent')).html()); 
          }          


          var markup = '';
          var original_position = settings.position;

          var triangleWidth = function(cls) {
            return (parseFloat(jQuery("#"+stooltipid+" div."+cls).css('borderLeftWidth')) || parseFloat(jQuery("#"+stooltipid+" div."+cls).css('borderRightWidth')) || parseFloat(jQuery("#"+stooltipid+" div."+cls).css('borderTopWidth'))  || parseFloat(jQuery("#"+stooltipid+" div."+cls).css('borderBottomWidth')));
          };
          var clearAddClass = function(cls) {
              jQuery("#"+stooltipid+' div:first-child').removeClass('arrow-east arrow-top arrow-west arrow-bottom').addClass(cls);
              var border =  triangleWidth(cls);
              return (2*border); // multiply by 2 because we want full border width
          };
          // Todo: auto reposition on window resize
          var reposition = function(cObj) {
                settings.position = original_position;
                // Todo: Partially completed
                
                var position = cObj.position();
                var hover_element_height = cObj.outerHeight();
                var hover_element_width = cObj.outerWidth();
                var borderWidth = 0; 
                tpos = position.top+'px';
                if(settings.position == 'left') {
                    borderWidth = clearAddClass('arrow-east');   
                    lpos = (position.left - tooltip_width - borderWidth - settings.offset)+'px';    
                    jQuery("#"+stooltipid+' div.arrow-east').css({left:'100%'});          
                }          
                if(settings.position == 'right') {
                    borderWidth = clearAddClass('arrow-west');    
                    lpos = (position.left +  hover_element_width + borderWidth + settings.offset)+'px';  
                    jQuery("#"+stooltipid+' div.arrow-west').css({right:'100%'});
                }          
                if(settings.position == 'top') {
                    borderWidth = clearAddClass('arrow-top');    
                    tpos = (position.top - tooltip_height - settings.offset + hover_element_height)+'px';              
                    lpos = (position.left + hover_element_width/2 - tooltip_width/2)+'px';         
                    jQuery("#"+stooltipid+' div.arrow-top').css({left:((tooltip_width/2)-borderWidth/2)+'px',bottom: ((-1)*borderWidth)+'px'});
                }          
                if(settings.position == 'bottom') {
                    borderWidth = clearAddClass('arrow-bottom');    
                    tpos = (position.top + hover_element_height + 30 + borderWidth)+'px';              
                    lpos = (position.left + hover_element_width/2 - tooltip_width/2)+'px';         
                    // reposition our triangle
                    jQuery("#"+stooltipid+' div.arrow-bottom').css({left:((tooltip_width/2)-borderWidth/2)+'px',top: ((-1)*borderWidth)+'px'});
                }
          };
          
          jQuery(this).css({cursor:'pointer'});  

          
          var tpos = 0;
          var lpos = 0; 
          
          /*auto detection in case tooltip goes outside the window*/  
          
          
          var tooltip_width = jQuery("#"+stooltipid).outerWidth();
          var tooltip_height = jQuery("#"+stooltipid).outerHeight();
              
         
          var timeout = 0;
          jQuery(this).mouseenter(function(){
              reposition(jQuery(this));
              jQuery("#"+stooltipid).css({top:tpos,left:lpos});
              timeout = setTimeout(function() {jQuery("#"+stooltipid).show();}, settings.delay);  

          }).mouseleave(function(){
              timeout = setTimeout(function() {jQuery("#"+stooltipid).hide();}, settings.delay);  
          });
          jQuery("#"+stooltipid).mouseenter(function(){
              clearTimeout(timeout);
              reposition(jQuery(this));
          }).mouseleave(function(){
             timeout = setTimeout(function() {jQuery("#"+stooltipid).hide();}, settings.delay);  
          });
        }