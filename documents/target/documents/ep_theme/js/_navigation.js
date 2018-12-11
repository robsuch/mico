/*
 * Highlight main menu item on page load
 */
function HRhighlightMenuItem() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  var brand = $('.main-menu .navbar-brand');

  if (!filename || brand.attr('href') == filename) {
    brand.addClass('active');
  }
  else {
    $('.main-menu a').each(function() {
      if ($(this).attr('href') == filename) {
        $(this).parent('li').addClass('active');
      }
    });
  }
}

/*
 * Manage back to top button
 */
function HRbackToTopBtn() {
  // Add button
  $('<a>')
  .appendTo('body')
  .attr('href', '#layout-header')
  .addClass('btn-back-top')
  .append(
    $('<span>')
    .addClass('sr-only')
    .html('Back to top'),
    $('<span>')
    .addClass('hr-icon__chevron-up')
  );

  // Display button on page load
  if ($(this).scrollTop() > 50) {
    $('.btn-back-top').show();
  }

  // Display button on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.btn-back-top').fadeIn(200);
    }
    else {
      $('.btn-back-top').fadeOut(200);
    }
  });

  // Manage button action
  $('.btn-back-top').on("click", function(e) {
    e.preventDefault();
    $('html,body').animate({scrollTop: 0}, 300);
    $(this).blur();
    return false;
  });
}

/*
 * Manage display of secondary menu
 */
function HRdisplaySecondaryMenu() {
  // Manage toggle button
  $('.secondary-menu-collapse .btn-toggle').on('click', HRtoggleSecondaryMenu);

  if ($.isFunction($.fn.jstree)) {
    $('.secondary-menu-multi').jstree({
      "core": {
        "themes": {
          "dots": false,
          "icons": false
        }
      }
    });
  }
}

/*
 * Collapse or expend secondary menu
 */
function HRtoggleSecondaryMenu() {
  var secondaryMenu = $(this).closest('.secondary-menu-collapse');
  var secondaryMenuItems = secondaryMenu.find('.secondary-menu__item');
  var secondaryMenuIcons = secondaryMenu.find('.secondary-menu__icon');
  var pageWrapper = $('#page-wrapper');
  var iconToggle = secondaryMenu.find('.icon-toggle');

  if (secondaryMenu.hasClass('collapsed')) {
    // Expend secondary menu
    secondaryMenu.animate({ width: 200 }, 200, function() {
      secondaryMenuItems.fadeIn(100);
      $(this).removeClass('collapsed');
    });
    pageWrapper.animate({ marginLeft: 215 }, 200);

    // Update secondary menu display
    iconToggle.removeClass('hr-icon__chevron-right');
    iconToggle.addClass('hr-icon__chevron-left');

  } else {
    // Collapse secondary menu
    secondaryMenu.animate({ width: 50 }, 200, function() {
      $(this).addClass('collapsed');
    });
    pageWrapper.animate({ marginLeft: 65 }, 200);

    // Update secondary menu display
    secondaryMenuItems.hide();
    iconToggle.removeClass('hr-icon__chevron-left');
    iconToggle.addClass('hr-icon__chevron-right');
  }
}

/*
 * Manage bootstrap tabs behaviour
 */
function HRdisplayTabs() {
  // Activate tab on page load
  if (location.hash !== '') {
    activateTab();
  }

  // Activate tab on history back
  if (window.onpopstate != undefined) {
    window.onpopstate = activateTab;
  } else {
    window.onhashchange = activateTab;
  }

  // Check if there is a tab with that hash
  // If so, display that tab
  function activateTab() {
    var hash = location.hash
    var hashPieces = hash.split('?')
    var activeTab = $('a[href="' + hashPieces[0] + '"]');
    if (activeTab.attr('data-toggle') == 'tab') {
      activeTab.tab('show');
      $('html, body').scrollTop(0);
    }
  }

  // Remember the hash in the URL without jumping
  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    if (history.pushState) {
      history.pushState(null, null, e.target.hash);
    } else {
      window.location.hash = e.target.hash; //Polyfill for old browsers
    }
  });
}


/**
* Manage vertical navigation hover
*/
function HRverticalNav(){
  if( $(".js-nav-system").length != 0 ){
    $(".js-nav-system").menuAim({
      activate: function(row){
        var $subnav = $(row).children('ul');

        $(row).attr({
          'data-show-sub': 'true'
        });

        // show submenu
        if ($subnav.length === 1) {
          $subnav.attr({
            'data-visually-hidden': 'false'
          });
        }
      },
      deactivate: function(row){
        var $subnav = $(row).children('ul');

        $(row).attr({
          'data-show-sub': 'false'
        });

        // show submenu
        if ($subnav.length === 1) {
          $subnav.attr({
            'data-visually-hidden': 'true'
          });
        }
      },
      exitMenu: function() { return true },
    });
  }
}