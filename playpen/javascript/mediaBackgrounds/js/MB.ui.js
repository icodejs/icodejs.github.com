
var MB = MB || {};

MB.ui = (function ($){
  'use strict';

  var $pe = {};

  var resize_window = (function () {
    return function () {
      var
      $this = $(this);
      MB.common.vars.win_width  = $this.width();
      MB.common.vars.win_height = $this.height();

      $pe.bg_container.css({'height': MB.common.vars.win_height});
      $pe.body.css({'height': MB.common.vars.win_height});
    };
  }());

  var set_favorites_container_height = (function () {
    return function (container, single_thumb_height, is_new) {
      var
      $lis = container.find('li'),
      len = $lis.length + 1,
      margin;

      if ($lis.length) {
        margin = $lis.css_attr_val('margin-bottom');
        return ($lis.first().outerHeight(true) * len) + (len * margin);
      } else if (is_new) {
        return container.outerHeight(true) + single_thumb_height + 12; // hack
      } else {
        return 0;
      }
    };
  }());

  var set_bg = (function () {
    return function (data, elem) {
      if (data && data.url) {
          preloadImage(data.url, 0, function (err, img_dims) {
            // create a new bg_container section which will replace the old on
            var old_bg_containers = $('.bg_container');

            if (err) {
              MB.errors.add(err);
              return MB.app.getWallpaper(elem);
            }

            $pe.bg_container = $('<section />')
              .addClass('bg_container')
              .height(MB.common.vars.win_height)
              .css({
                'background-color'    : 'transparent',
                'background-image'    : 'url("' + data.url + '")',
                'background-position' : 'top',
                'background-repeat'   : 'repeat',
                'height'              : MB.common.vars.win_height
              })
              .data('img_dims', img_dims)
              .prependTo($pe.body);

            // for when working on the plugin when you should be doing work :)
            if (MB.options.covert) $pe.bg_container.addClass('covert');

            old_bg_containers.fadeOut(1000, function () {
              $(this).remove();
            });
        });

        $pe.keypress_detector.focus();
      }
    };
  }());

  var update_ui = (function () {
    return function (elem) {
      if (elem) {
        MB.app.getWallpaper(elem);
      }
    };
  }());

  var updateStatus = (function () {
    return function (data) {
      if (data.description && data.description.length)
        data.elem
            .find('section.status')
            .fadeOut()
          .end()
            .html('')
            .append($('<section>' + data.description + '</section>').fadeIn(1000))
            .fadeIn();
    };
  }());

  function reset() {
    MB.ui.$pe.bg_container.remove();
    MB.ui.$pe.status.html('');
    MB.ui.removeLoader(null);
    MB.errors.clear();
  }

  function hardReset() {
    MB.ui.reset();
    MB.data.cache.clear();
    // remove current background image
    // remove loader swirley
    // remove all favorites
    // clear all textboxs and dropdown selections and checkboxes
    // clear cache
    // remove all errors
    // update the status with a meaningful warning
  }

  function addLoader() {
    $('<section />')
      .hide()
      .addClass('loader')
      .append($('<img />').attr('src', MB.options.loading_image))
      .appendTo(MB.ui.$pe.body)
      .fadeIn();
  }

  function removeLoader(elem) {
    var $loader = elem || $('.loader');
    $loader.fadeOut(1000, function () {
      $(this).remove();
    });
  }

  function toggleLoader() {
    if (MB.common.vars.ss_mode || MB.common.vars.is_loading) return;

    var $loader = MB.ui.$pe.body.find('.loader');
    if ($loader.length) {
      removeLoader($loader);
    } else {
      addLoader();
    }
  }

  function getTag(input, t, attrs) {
    return '<' + t + (attrs ? ' ' + attrs : '') + '>' + input + '</' + t + '>';
  }

  function getAttr(name, value) {
    return name + '="' + value + '"';
  }

  function viewFavorites(event, elem, target_elem) { // many want to move this to MB.data
    var
    state      = elem.data('state'),
    $icon      = elem.find('i'),
    height     = target_elem.find('ul').outerHeight(true) + 10,
    btn_config = {
      element   : elem,
      state     : state === 'open' ? 'closed' : 'open',
      do_toggle : true
    },
    container_config = {
      element  : target_elem,
      state    : btn_config.state,
      overflow : state === 'open' ? 'hidden' : 'auto',
      height   : state === 'open' ? 10 : height > MB.common.vars.max_container_height ? MB.common.vars.max_container_height : height,
      speed    : 750
    };

    view_favorites_show(container_config, function () {
      view_favorites_button(btn_config);
    });
  }

  function view_favorites_show(obj, cb) {
    var easing = obj.state === 'open' ?  'easeOutQuad' : 'easeInQuad';

    obj.element.stop(true, true);
    obj.element.animate({
      height: obj.height
    }, obj.speed, easing, function() {
      $(this).css({overflow: obj.overflow});
      cb();
    });
  }

  function view_favorites_button(obj) {
    obj.element.data({state: obj.state});
    if (obj.do_toggle) {
      obj.element.find('i').toggleClass('icon_state_close', 'icon_state_open');
    }
  }

  function init(pageElements, cb) {
    MB.ui.$pe = pageElements;
    $pe = MB.ui.$pe;

    MB.common.vars.win_width  = $pe.window.width();
    MB.common.vars.win_height = $pe.window.height();

    //$('*').on('contextmenu', function () { return false; }); // disable right click

    // load wallpaper sites from server
    setTimeout(function () {
      MB.data.getWallpaperSites(function (err, data) {
        if (err) {
          MB.errors.add(err);
          return MB.events.trigger('updateStatus', [{
            functionName : 'preloadImage',
            error        : err,
            errors       : MB.errors.toString(),
            description  : 'init error',
            elem   : $pe.status
          }]);
        } else {
          var html = '';
          html += MB.ui.getTag('[ websites ]', 'option', MB.ui.getAttr('value', ''));
          $.each(data, function(i, obj) {
            html += MB.ui.getTag(obj.category, 'option', MB.ui.getAttr('value', obj.url));
          });
          $pe.ws_dropdown.html(html).show(500);
        }
      });

    }, 2000);

    $pe.window
      .on({
        resize       : MB.ui.resize_window,
        beforeunload : function (e) {
          if ($pe.favorites_container.find('#favorites li').length) {
            return 'You will loose your favorite images.';
          }
        }
      });

    // Bind and listen to bodyonclick events. Set focus to
    // $pe.keypress_detector. This will allow me to listen
    // to keyboard events.
    $pe.body
      .height(MB.common.vars.win_height)
      .on('click', function (e) {
        if (e.target.id !== 'controls' && e.target.parentElement.id !== 'controls') {
          $pe.keypress_detector.focus();
        }
      });

    // Bind and listen to all button click events and handle them accordingly.
    $pe.controls_container
      .on('click', '.button', function (e) {
        e.preventDefault();
        $pe.keypress_detector.focus();

        switch ($(this).attr('id').toLowerCase()) {
          case 'fav'   : MB.interaction.add_favorite($pe.bg_container); break;
          case 'save'  : MB.interaction.save($pe.bg_container); break;
          case 'tweet' : MB.interaction.tweet($pe.bg_container); break;
          case 'email' : MB.interaction.email($pe.bg_container); break;
          case 'help'  : MB.interaction.help($pe.bg_container); break;
        }
      });

    // Add background image container section.
    $pe.bg_container
      .addClass('bg_container')
      .height(MB.common.vars.win_height)
      .hide()
      .prependTo($pe.body);

    // Hack (fix asap). Create and input element and bind a keypress event
    // handler. Perform certain actions base on which key is pressed.
    $pe.keypress_detector
      .attr({
        id   : 'txtInput',
        type : 'text'
      })
      .focus()
      .addClass('keypress_detector')
      .on('keypress', function (e) {
         MB.events.keypress(e)($pe.bg_container);
      })
      .appendTo($pe.body);

    // Bind and listen to the change event of the #wallpapers_sites
    // drp and update the search textbox.
    $pe.controls_container
      .on('change', '#wallpapers_sites', function () {
        var url = $(this).val();
        if (url.toLowerCase() !== 'none') {
          $pe.terms.val(url);
        }
        $pe.keypress_detector.focus();
      });

    // Bind and listen to the change event of the slideshow checkbox
    // and initialise the image slide show based on the current cache
    // or search terms.
    $pe.controls_container
      .on('change', '#slideshow', function () {
        var $inputs = $pe.controls_container.find('input, select, button').not('#slideshow, #fav');

        MB.common.vars.ss_mode = $(this).attr('checked') ? true : false;

        if (MB.common.vars.ss_mode) {
          MB.common.vars.timers.request.interval_id = setInterval(function () {
            if ($.xhrPool.length === 0 && !MB.common.vars.loading) {
              MB.ui.update_ui($pe.bg_container);
            }
          }, MB.options.interval);

          $inputs.attr({
            disabled: 'disabled'
          }).addClass('disabled');

          return MB.events.trigger('updateStatus', [{
            functionName: 'init',
            description: 'Slideshow mode. A new image will load in approximately ' + (MB.options.interval / 1000) + ' seconds.',
            elem: $pe.status
          }]);
        } else {
          clearInterval(MB.common.vars.timers.request.interval_id);

          $inputs.removeAttr('disabled').removeClass('disabled');

          return MB.events.trigger('updateStatus', [{
            functionName : 'init',
            description  : 'Slideshow cancelled. Press the spacebar to load new images.',
            elem         : $pe.status
          }]);
        }
      });

    // Bind and listen to click event of favorite_controls.
    $pe.favorite_show_hide
      .on('click', function (e) {
        e.preventDefault();
        viewFavorites(e, $(this), $('#favorites'));
      }).data({state: 'closed'});

    // setup events
    MB.events.init([
      {
        elem: $pe.eventElement,
        name: 'updateStatus',
        func: MB.ui.updateStatus
      },
      {
        elem: $pe.eventElement,
        name: 'getWallpaper',
        func: MB.app.getWallpaper
      },
      {
        elem: $pe.eventElement,
        name: 'image_loading',
        func: MB.utils.loading.begin
      }
    ]);

    cb($pe);
  }

  function preloadImage(src_url, delay, cb) {
    MB.common.vars.is_loading = true;
    // remove this for now but in future we might hide it
    MB.ui.$pe.body.find('img.preloaded').remove();

    // Load image, hide it, add to the pages.
    $(new Image())
      .hide()
      .load(function () {
        var
        img   = this,
        img_w = img.width,
        img_h = img.height,
        w     = MB.common.vars.win_width,
        h     = MB.common.vars.win_height;

        MB.events.trigger('updateStatus', [{
          functionName : 'preloadImage',
          description  : 'preloading image with dimensions: ' + img_w + ' x ' + img_h,
          elem         : MB.ui.$pe.status
        }]);

        if (MB.ui.$pe.img_size.val().indexOf('x') >= 0) {
          w = MB.ui.$pe.img_size.val().split('x')[0];
          h = MB.ui.$pe.img_size.val().split('x')[1];
        } else {
          img_w *= 1.5;
          img_h *= 1.5;
        }

        // Filter out images that are too small for the current
        // window size or that are smaller than the minimum
        // size specified by the user.
        if (img_w < w || img_h < h) {
          return cb({
            func_name : 'preloadImage',
            desc      : 'image returned is too small'
          });
        }

        setTimeout(function () {
          var obj = {width: img.width, height: img.height, url: src_url};

          if (!MB.common.vars.ss_mode) {
            MB.ui.$pe.body.find('.loader').fadeOut(1000, function () {
              $(this).remove();
              MB.common.vars.is_loading = false;
              cb(null, obj);
            });
          } else {
            MB.common.vars.is_loading = false;
            cb(null, obj);
          }
          MB.utils.reset();
        }, delay);

      })
      .addClass('preloaded')
      .attr('src', src_url)
      .prependTo('body')
      .error(function (e) {
        return cb({
          func_name   : 'preloadImage',
          description : '404 (Not Found)',
          error       : e
        });
      }); // end JQ new Image
  }

  // public API
  return {
    init                           : init,
    resize_window                  : resize_window,
    set_favorites_container_height : set_favorites_container_height,
    set_bg                         : set_bg,
    update_ui                      : update_ui,
    updateStatus                   : updateStatus,
    getTag                         : getTag,
    getAttr                        : getAttr,
    viewFavorites                  : viewFavorites,
    view_favorites_show            : view_favorites_show,
    view_favorites_button          : view_favorites_button,
    $pe                            : $pe,
    hardReset                      : hardReset,
    reset                          : reset
  };

}(jQuery));

