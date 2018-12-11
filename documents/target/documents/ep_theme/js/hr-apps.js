/*
 * Merge all javascript files.
 *
 * /!\ it is based on koala (http://koala-app.com/). If it isn't availale, another solution has to be found. /!\
 */
// @koala-prepend "_helpers.js"
// @koala-prepend "_placeholders.js"
// @koala-prepend "_settings.js"
// @koala-prepend "_navigation.js"
// @koala-prepend "_components.js"
// @koala-prepend "_dropdown.js"
// @koala-prepend "_modal.js"
// @koala-prepend "_forms.js"
// @koala-prepend "_tools.js"
// @koala-prepend "_accessibility.js"

/*
 * Initialise theme at page load.
 * This is done even if it is not fully loaded, to prevent blink effect.
 */
function HRinitCSS() {
  var hrConfig = HRgetHrConfig();

  // Add dynamic css
  $('<link>')
  .appendTo('head')
  .attr({type : 'text/css', rel : 'stylesheet'})
  .addClass('hr-font-size')
  .attr('href', '');

  $('<link>')
  .appendTo('head')
  .attr({type : 'text/css', rel : 'stylesheet'})
  .addClass('hr-theme')
  .attr('href', '');

  // Apply initial config
  if (hrConfig) {
    if (hrConfig.theme) HRapplyTheme(hrConfig.theme);
    if (hrConfig.pattern) HRapplyPattern(hrConfig.pattern);
    if (hrConfig.fontSize) HRapplyFontSize(hrConfig.fontSize);
  }
}

// Code executed immediately
HRinitCSS();

// Code executed once page is fully loaded
$( document ).ready(function() {

  // Manage placeholder variables
  HRphReplace();

  // Get config
  var hrConfig = HRgetHrConfig();

  if (hrConfig) {
    // Apply initial config (after page load)
    if (hrConfig.theme) { HRhighlightThemeItem(hrConfig.theme); $('body').removeClassPrefix('hr-theme-').addClass('hr-theme-' + hrConfig.theme); }
    if (hrConfig.pattern) { HRhighlightPatternItem(hrConfig.pattern); $('body').removeClassPrefix('hr-pattern-').addClass('hr-pattern-' + hrConfig.pattern); }
    if (hrConfig.layoutSize) { HRhighlightLayoutItem(hrConfig.layoutSize); }
    if (hrConfig.fontSize) { HRhighlightFontItem(hrConfig.fontSize); }

    if (hrConfig.autofocus) { 
      HRhighlightAutofocus(hrConfig.autofocus);
      HRapplyAutofocus(hrConfig.autofocus);
    }

    // Change layout size.
    // This has to be done after page load.
    if (hrConfig.layoutSize) {
      HRapplyLayoutSize(hrConfig.layoutSize);
    }
  }
  else {
    HRhighlightThemeItem('default');
    HRhighlightpatternItem('default');
    HRhighlightLayoutItem('md');
    HRhighlightFontItem('md');
    HRhighlightAutofocus('enabled');
  }

  // Default options for select2.
  if ($.isFunction($.fn.select2)) {
    $.fn.select2.defaults.set("theme", "bootstrap");
  }
  
  // Manage reset style button events
  $('.btn-reset-style').on('click', HRresetStyle);

  // Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Higlight menu items
  HRhighlightMenuItem();

  // Back on top button
  HRbackToTopBtn();

  // Bootstrap hack
  HRhackBootstrap();

  // Manage search form display
  HRdisplaySearchForm();

  // Manage dropdown display.
  HRdisplayDropdown();

  // Enable datepicker
  HRdisplayDatePicker();

  // Manage environment display
  HRdisplayEnvironment();

  // Manage files upload display
  HRdisplayFileUpload();

  // Manage select list display
  HRdisplaySelectList();

  // Manage keyboard shortcuts
  HRkeyboardShortcuts();

  // Manage word / character count
  HRdisplayInputCount();

  // Manage display of mandatory fields
  HRdisplayMandatoryFields();

  // Manage display of password fields
  HRdisplayPasswordFields();

  // Add additional information for colored elements
  HRinfoColoredItems();

  // Manage display of secondary menu
  HRdisplaySecondaryMenu();

  // Manage display of settings menu
  HRdisplaySettingsMenu();

  // Manage display of tools bar
  HRdisplayToolsBar();

  // Manage display of focused element
  HRdisplayFocus();

  // Manage display of timelines
  HRdisplayTimeline();

  // Manage bootstrap tabs behaviour
  HRdisplayTabs();

  // Manage vertical navigation submenu
  HRverticalNav();
});


/*
/"  "\     /"  "\
(  (\  )___(  /)  )
\               /
/               \
/    () ___ ()    \
|      (   )      |
\      \_/      /
  \...__!__.../
        "
*/
