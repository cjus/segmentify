/*!
 * jQuery Segmentify plugin -- version 0.60
 * Creates a segment button control
 * @author  Carlos Justiniano (carlos.justiniano@gmail.com)
 * @contributions:
 *          Improved use of jQuery selector - Tim Doherty
 *          Ability to specify onSelect for individual items - Tim Doherty
 * Licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
   $.fn.segmentify = function (options) {
      var defaults = {
         width:'400px', /* default segment control width */
         height:'auto', /* default segment control height */
         shadestart:'#8C8C8C', /* start gradient color */
         shadeend:'#737373', /* end gradient color */
         fontsize:'14px', /* default font size */
         fontweight:'bold', /* default font weight, normal and bolder are other options */
         color:'white', /* default css color, can be color name or hex triplets */
         sepwidth:'1px', /* segment control separator width. this is a bar which separates segment items */
         sepcolor:'#5B5B5B', /* segment control separator color */
         sepstyle:'solid', /* segment control style. Other css border styles can be used */
         selecteditemindex:0, /* default selected segment */
         onSelect:null          /* default callback function when segment is selected */
      };
      var options = $.extend(defaults, options);

      // allow segmentify to update in place
      $(this).empty();

      return this.each(function (i) {
         var that = this;
         that.items = [];
         var $this = $(this); // wrap current element in jQuery instance

         /* set properties of div which will be segmentified */
         $this.css('width', options.width).css('height', options.height);

         /* for every item (button) we're adding perform the following */
         $.each(options.items, function (j, item) {
            $this.append('<div></div>');

            /* retrieve last item inserted above and store for later use */
            var $newEl = $(':last-child', $this);

            $newEl.data("item", item);

            var itemID = '' + $this.attr('id') + '-item' + j + '';
            $($newEl).attr('id', itemID);

            that.items.push($newEl);
            $($newEl).append(item.text)
               .css('float', 'left');

            $($newEl).css('font-size', options.fontsize)
               .css('font-weight', options.fontweight)
               .css('color', options.color)
               .css('padding', '10px')
               .css('cursor', 'pointer')
               .css('border-right-width', options.sepwidth)
               .css('border-right-color', options.sepcolor)
               .css('border-right-style', options.sepstyle)
               .css('background', options.shadestart);

            $($newEl).css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadestart + '), to(' + options.shadeend + '))');
            $($newEl).css('background', '-moz-linear-gradient(top, ' + options.shadestart + ', ' + options.shadeend + ')');
            $($newEl).css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadestart + "', endColorstr='" + options.shadeend + "')");

            $($newEl).hover(
               function () {
                  if ($(this).hasClass('segmentify-selected') === false) {
                     $(this).css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadeend + '), to(' + options.shadestart + '))')
                        .css('background', '-moz-linear-gradient(top, ' + options.shadeend + ', ' + options.shadestart + ')')
                        .css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadeend + "', endColorstr='" + options.shadestart + "')");
                  }
               },
               function () {
                  if ($(this).hasClass('segmentify-selected') === false) {
                     $(this).css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadestart + '), to(' + options.shadeend + '))')
                        .css('background', '-moz-linear-gradient(top, ' + options.shadestart + ', ' + options.shadeend + ')')
                        .css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadestart + "', endColorstr='" + options.shadeend + "')");
                  }
               }
            );

            $($newEl).click(function () {
               $('div[id^="' + $this.attr('id') + '-item"]').removeClass('segmentify-selected')
                  .css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadestart + '), to(' + options.shadeend + '))')
                  .css('background', '-moz-linear-gradient(top, ' + options.shadestart + ', ' + options.shadeend + ')')
                  .css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadestart + "', endColorstr='" + options.shadeend + "')");

               $(this).addClass('segmentify-selected')
                  .css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadeend + '), to(' + options.shadestart + '))')
                  .css('background', '-moz-linear-gradient(top, ' + options.shadeend + ', ' + options.shadestart + ')')
                  .css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadeend + "', endColorstr='" + options.shadestart + "')");

               if ($newEl.data("item").onSelect) {
                  $newEl.data("item").onSelect();
                  return;
               }

               //otherwise use the default callback
               var txt = $(this).text();
               $.each(that.items, function (j) {
                  if ($(that.items[j]).text() === txt) {
                     if (options.onSelect != undefined) {
                        options.onSelect(j);
                     }
                  }
               });
            });
         });

         $(this.items[0]).css('-moz-border-radius', '5px 0px 0px 5px')
            .css('-webkit-border-radius', '5px 0px 0px 5px')
            .css('border-radius', '5px 0px 0px 5px');

         $(this.items[this.items.length - 1]).css('-moz-border-radius', '0px 5px 5px 0px')
            .css('-webkit-border-radius', '0px 5px 5px 0px')
            .css('border-radius', '0px 5px 5px 0px')
            .css('border-right', '0px');

         var selectedIndex = options.selecteditemindex || 0;
         $(this.items[selectedIndex]).addClass('segmentify-selected')
            .css('background', '-webkit-gradient(linear, left top, left bottom, from(' + options.shadeend + '), to(' + options.shadestart + '))')
            .css('background', '-moz-linear-gradient(top, ' + options.shadeend + ', ' + options.shadestart + ')')
            .css('filter', "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + options.shadeend + "', endColorstr='" + options.shadestart + "')");

      });
   };
})(jQuery);

