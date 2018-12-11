/*
 * Add custom keyboard shortcuts
 *
 * Shortcuts are disabled when editing text (in form fields for instance)
 */
function HRkeyboardShortcuts() {
  var disableShortcuts = false;

  $(document).on("focus", "input", function () { disableShortcuts = true; });
  $(document).on("focus", "textarea", function () { disableShortcuts = true; });
  $(document).on("focus", "select", function () { disableShortcuts = true; });

  $(document).on("blur", "input", function () { disableShortcuts = false; });
  $(document).on("blur", "textarea", function () { disableShortcuts = false; });
  $(document).on("blur", "select", function () { disableShortcuts = false; });

  $(document).on('keypress', function(e) {
    if (!disableShortcuts) {
      // Change font size: Shift + F
      if (e.which === 70 && e.shiftKey) {
        HRchangeFontSize(e);
      }

      // Change layout size: Shift + L
      if (e.which === 76 && e.shiftKey) {
        HRchangeLayoutSize(e);
      }

      // Send by mail: Shift + M
      if (e.which === 77 && e.shiftKey) {
        HRsendByMail();
      }

      // High contrast: Shift + H
      if (e.which === 72 && e.shiftKey) {
        var theme = 'high-contrast';
        HRapplyTheme(theme);
        HRhighlightThemeItem(theme);
        HRsetHrConfig('theme', theme);
      }

      // Focus main menu: M
      if (e.which === 109) {
        $('.main-menu').first().focus();
      }
    }
  });
}

/*
 * Add screen reader information for colored elements
 */
function HRinfoColoredItems() {
  // Inputs
  $('.form-group.has-success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.form-group.has-warning').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Warning')); });
  $('.form-group.has-danger').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Danger')); });

  // Buttons
  $('.btn-primary').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Primary')); });
  $('.btn-info').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Info')); });
  $('.btn-success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.btn-warning').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Warning')); });
  $('.btn-danger').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Danger')); });

  // Labels
  $('.label-primary').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Primary')); });
  $('.label-info').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Info')); });
  $('.label-success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.label-warning').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Warning')); });
  $('.label-danger').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Danger')); });

  // Panels
  $('.panel-primary').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Primary')); });
  $('.panel-info').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Info')); });
  $('.panel-success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.panel-warning').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Warning')); });
  $('.panel-danger').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Danger')); });

  // Alerts
  $('.alert-info').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Info')); });
  $('.alert-success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.alert-warning').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Warning')); });
  $('.alert-danger').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Danger')); });

  // Workflows
  $('.nav-workflow li.disabled').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Disabled')); });
  $('.nav-workflow li.success').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Success')); });
  $('.nav-workflow li.active').each(function() { $(this).prepend($('<span>').addClass('sr-only').html('Active')); });
}

/*
 * Manage display of tools bar (in header)
 */
function HRdisplayToolsBar() {
  var bannerTools = $('#layout-header .banner__tools');
  var bannerItems = bannerTools.find('.banner__item');
  var bannerIcons = bannerItems.children('button').children('span[class*=hr-icon__]')
  var bannerInMenu = false;

  // Small screen: tools are located in main menu
  if ($(window).width() < 992) {
    bannerTools.prependTo($('#layout-header .main-menu > .container'));
    bannerIcons.addClass('hr-icon-20');
    bannerIcons.removeClass('hr-icon-28');
    bannerInMenu = true;
  }
  // Large screen: tools are located in banner
  else {
    bannerTools.appendTo($('#layout-header .banner > .container'));
    bannerIcons.addClass('hr-icon-28');
    bannerIcons.removeClass('hr-icon-20');
    bannerInMenu = false;
  }

  $(window).resize(function() {
    if ($(window).width() < 992) {
      if (!bannerInMenu) {
        bannerTools.prependTo($('#layout-header .main-menu > .container'));
        bannerIcons.addClass('hr-icon-20');
        bannerIcons.removeClass('hr-icon-28');
        bannerInMenu = true;
      }
    }
    else {
      if (bannerInMenu) {
        bannerTools.appendTo($('#layout-header .banner > .container'));
        bannerIcons.addClass('hr-icon-28');
        bannerIcons.removeClass('hr-icon-20');
        bannerInMenu = false;
      }
    }
  });
}

/*
 * Scroll screen to focuses element
 *
 * When a link is behind the fixed footer, scroll screen to make it visible
 */
function HRscrollToFocus(element) {
  var footerHeight = 100;
  var headerHeight = 80;

  if (element.closest('#layout-footer')) return;

  if (element.offset().top - ($(window).scrollTop()) > ($(window).height() - footerHeight)) {
    $('html, body').animate({
      scrollTop: element.offset().top - ($(window).height() - footerHeight)
    }, 300);
  }
}
