/*
 * Manage dropdown behaviour
 */
function HRdisplayDropdown() {
  // Delay opening of dropdown
  $('.dropdown-container').hover(function () {
    if (!$(this).is('.open')) {
      $(this).children('.dropdown-menu').stop(true).delay(180).slideDown(100, function(){
        $(this).addClass('show').removeAttr('style');
      });
      HRpositionDropdown($(this));
    }
  }, function () {
    if (!$(this).is('.open')) {
      $(this).children('.dropdown-menu').stop(true).delay(180).slideUp(100, function(){
        $(this).removeClass('show').removeAttr('style');
      });
    } else {
      $(this).children('.dropdown-menu').removeClass('show').removeAttr('style');
    }
  });

  // Manage display of second level
  HRmultiDropdown();
}

/*
 * Manage multi-level dropdown
 */
function HRmultiDropdown() {
  $('.dropdown-menu').each(function() {
    if ($(this).closest('.dropdown').hasClass('mega-menu')) {
      return;
    }

    var subMenu = $(this).find('ul');

    // Check if there is a level 2 dropdown
    if (subMenu && !HRisEmpty(subMenu)) {
      var initWidth = $(this).outerWidth();

      // Identify dropdown levels
      $(this).addClass('dropdown-menu__level1').show();
      subMenu.addClass('dropdown-menu__level2');

      // Create structure for sub menu
      subMenu.wrap(
        $('<div>')
        .addClass('dropdown-menu__id')
      );

      // Create structure for menu
      var parentBox = $('<ul>')
      .addClass('dropdown-menu')
      .addClass('dropdown-menu__level0')
      .appendTo($(this).closest('.dropdown-container'))
      .append(
        $('<li>')
        .append($(this)),
        $('<li>')
        .css('position', 'absolute')
        .css('left', initWidth)
        .append(
          $('<div>')
          .addClass('dropdown-submenu')
        )
      )

      // Move sub items in correct place
      parentBox.find('.dropdown-menu__id')
      .hide()
      .each(function(i) {
        $(this).attr('data-sub-item', i+1);

        // Add a link for tablets and phones
        if (HRisMobile()) {
          $('<a>',{
            text: $(this).prev().text(),
            href: $(this).prev().attr('href')
          })
          .prependTo($(this).children('.dropdown-menu__level2'))
          .wrap($('<li>'));
        }
      })
      .closest('li')
      .each(function(i) {
        $(this).attr('data-sub-item', i+1);
      })
      .end()
      .appendTo(parentBox.find('.dropdown-submenu'));

      parentBox.find('.dropdown-submenu').hide();
    }
  });

  // Add hover event
  $(".dropdown-menu__level1 li").on('mouseover focus', function (e) {
    var parentBox = $(this).closest('.dropdown-menu__level0');
    var initWidth = $(parentBox).children('li').first().width();

    if (!!$(this).attr('data-sub-item')) {
      // Hide all sub-items
      parentBox.find('.dropdown-menu__id').hide();

      // Get sub item width and enable it
      var subBox = parentBox.find('.dropdown-submenu');
      var subItem = parentBox.find('.dropdown-menu__id[data-sub-item=' + $(this).attr('data-sub-item') + ']').show();

      // Higlight selected item
      parentBox.find('.dropdown-menu__level1 li').removeClass('is-open');
      parentBox.find('.dropdown-menu__level1 li[data-sub-item=' + $(this).attr('data-sub-item') + ']').addClass('is-open');

      if (!$(subBox).is(":visible")) {
        subBox.show();

        var subItemWidth = subItem.width();

        // Animate box width
        parentBox.width(initWidth)
        .animate({
          width: subItemWidth + initWidth
        }, 100, function() {
          $(this).css('overflow', 'visible')
        });

        // Animate box height if needed
        if (parentBox.height() < subBox.height()) {
          parentBox.animate({
            height: subBox.height() + 12
          }, 100);
        }
        else {
          parentBox.height('auto');
        }
      }

      else {
        var subItemWidth = subItem.width();

        // Update box width
        parentBox.width(subItemWidth + initWidth);

        // Update box height if needed
        if (parentBox.height() < subBox.height()) {
          parentBox.height(subBox.height());
        }
        else {
          parentBox.height('auto');
        }
      }
    }

    else {
      // Hide all sub-items
      parentBox
      .animate({
        width: initWidth
      }, 100, function() {
        $(this).css('overflow', 'hidden')
      })
      .find('.dropdown-menu__level1 li').removeClass('is-open')
      .end()
      .find('.dropdown-submenu').hide()
      .end()
      .find('.dropdown-menu__id').hide();
    }
  });

  // Add click event
  $(".dropdown-menu__level1 li").on('click', function (e) {
    if (HRisMobile())
      e.preventDefault();

    $(this).mouseenter();
  });
}

/*
 * Manage position of dropdown menu
 *
 * If a dropdown menu is too close to the right, then it opens on the left.
 */
function HRpositionDropdown(container) {
  // Init variables.
  var totalWidth = $(window).width();
  var toggleOffsetLeft = container.offset().left;
  var dropdownMenu = container.children('.dropdown-menu');
  var dropdownSubmenu = container.find('.dropdown-submenu');

  // Calculate free space on right.
  var freeSpace = totalWidth - toggleOffsetLeft;

  // Get dropdown menu total width (including submenu)
  var dropdownMenuWidth = dropdownMenu.outerWidth();
  if (dropdownSubmenu.length != 0) {
    dropdownMenuWidth += dropdownMenuWidth;
  }

  // Add or remove classes to position dropdown.
  if (dropdownMenuWidth > freeSpace) {
    dropdownMenu.addClass('dropdown-menu-right');
  }
  else {
    dropdownMenu.removeClass('dropdown-menu-right');
  }
}
