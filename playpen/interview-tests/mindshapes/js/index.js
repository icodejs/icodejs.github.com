$(function() {

    // cache query selectors
    var
    $fileListTable        = $('table.fileList'),
    $tabs                 = $('#tabs li a')
    $tabContentContainers = $('.tabContent');

    // Load json encoded data from the response.json file and assign it to a variable.
    // As of jQuery 1.5 getJSON returns a jqXHR object which has lot of goodies
    // under the hood! console.log(jqXHR);

    // must be run on a local webserver or else this error occurs:
    // XMLHttpRequest cannot load file:///Users/xxx/xxx/mindshapes/js/response.json. Origin null is not allowed by Access-Control-Allow-Origin.
    var jqXHR = $.getJSON('js/response.json', function(results) {
        // declare all variables at the top of function as javascript has
        // function scope, not block scope.

        var
        i    = 0,
        len  = results.data.length || 0, // cached so that it doesn't have to be looked up on every iteration
        html = '',
        row,
        klass;

        if (len) {
            for (; row = results.data[i], i < len; i += 1) {
                // use the type to set the css class (klass).
                // the css will handle what image is displayed for each class

                klass = row.type.replace(' ', '').toLowerCase();

                // for each object in the data array create a table row and
                // concatenate this onto the html string variable.

                html += '<tr>' +
                            '<td class="first">&nbsp;</td>' +
                            '<td class="icon ' + klass + '"></td>' +
                            '<td><a href="#">' + row.filename + '</a></td>' +
                            '<td>' + row.description + '</td>' +
                            '<td>' + row.size  + '</td>' +
                            '<td><a class="emailLink" href="mailto:#"><img src="img/mailIcon.png" /></a></td>' +
                            '<td class="last">&nbsp;</td>' +
                        '</tr>';
            }
            // the table element is hidden in the HTML by default, so once the
            // html string is ready, show the table, find the 'tbody' element and
            // append the html.

            $fileListTable.show().find('tbody').append(html);
        }
    }); // end getJSON

    $tabs.on('click', function(e) {
        // prevent default click event
        e.preventDefault();

        // cache query selectors
        var
        $this   = $(this)
        $parent = $this.parent();

        // active and focus classes was added to the li markup for more flexiblity with
        // styling. These classes are used to programatically decide when to
        // show tabs and their content.

        // if this tab is already active, then exit early
        if ($parent.hasClass('active')) {
            return;
        }

        // remove all classes regardless
        $tabs.parent().removeClass();

        // set the class parent li of the clicked anchor tag to active
        $parent.addClass('active focus');

        // hide all tab content divs and based on the value in the href of the
        // anchor tag filter the container divs and show the appropriate one.
        $tabContentContainers.hide().filter($this.attr('href')).show();
    }); // end click

    $('body').keydown(function(e) {
        //e.preventDefault();

        var
        code       = (e.keyCode ? e.keyCode : e.which),
        len        = $tabs.length,
        $activeTab = $tabs.parent().filter('.active'),
        $focusedTab = $tabs.parent().filter('.focus'),
        focusIndex  = $focusedTab.index(),
        activeIndex  = $activeTab.index(),
        newIndex   = -1,
        shiftKey   = e.shiftKey;

        if (code === 37 || code === 39) {
            if (code === 37) { // left key

                // if the activeIndex is the lowest value then do nothing, else
                // decrement by oneactiveIndex
                newIndex = activeIndex === 0 ? activeIndex : activeIndex - 1

            } else if (code === 39) { // right key

                // if the activeIndex is the highest value then do nothing, else
                // increment by one.
                newIndex = activeIndex === len -1 ? activeIndex : activeIndex + 1
            }

            // trigger the click event of the next tab, if the index has changed.
            // Use 'newIndex' to work out which tab to trigger. Then trigger
            // the click event as if the user clicked it.
            newIndex !== activeIndex && $tabs.eq(newIndex).trigger('click');
        }

        // when the tab key is clicked move along the tabs and update the focus
        // class accordingly
        if (code === 9) {
            if (shiftKey) { // left tab
                newIndex = focusIndex === 0 ? focusIndex : focusIndex - 1
            } else {  // right tab
                newIndex = focusIndex === len -1 ? focusIndex : focusIndex + 1
            }

            newIndex !== focusIndex && $tabs.parent()
                                            .removeClass('focus')
                                            .eq(newIndex)
                                            .addClass('focus');
        }

        // when the enter key is pressed check what tab is in focus and if it
        // isn't the active tab trigger the click event as if the user clicked it.
        if (code === 13) { // Enter key
            if (activeIndex !== focusIndex) {
                $tabs.eq(focusIndex).trigger('click');
            }
        }
    }); // end keydown
});



