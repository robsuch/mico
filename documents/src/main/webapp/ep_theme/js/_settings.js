/*
 * Get current configuration from cookie.
 */
function HRgetHrConfig() {
  var appName = $('meta[name=application-name]') ? '.' + $('meta[name=application-name]').attr("content") : '';
  var cookieHrConfig = HRgetCookie('hr-config' + appName);
  var config = new Object;

  if (cookieHrConfig) {
    config = jQuery.parseJSON( cookieHrConfig );
  }

  return config;
}

/*
 * Set new configuration in cookie
 */
function HRsetHrConfig(param, value) {
  // Get current config
  var appName = $('meta[name=application-name]') ? '.' + $('meta[name=application-name]').attr("content") : '';
  var cookieHrConfig = HRgetCookie('hr-config' + appName);
  var config = new Object;
  if (cookieHrConfig) {
    config = jQuery.parseJSON( cookieHrConfig );
  }

  // Update config
  config[param] = value;

  // Get config size
  var configSize = 0;
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      configSize++;
    }
  }

  // Format config to JSON
  var configJson = '{';
  var i = 1;
  $.each(config, function(k, v) {
    configJson += '"' + k + '":"' + v + '"';
    if (i < configSize)
      configJson += ',';
    i++;
  });
  configJson += '}'

  // Save config in the cookie
  HRsetCookie('hr-config' + appName, configJson, 365, '/');
}


/*
 * Change theme css to alternative one
 */
function HRchangeTheme(e) {
  var theme = $(this).attr('rel');
  HRapplyTheme(theme);

  // Higlight item
  HRhighlightThemeItem(theme);

  // Save theme in a cookie
  HRsetHrConfig('theme', theme);

  e.preventDefault();
}


/*
 * Apply new theme.
 */
function HRapplyTheme(theme) {
  var linkText = $("link.hr-theme");

  // Add class to body
  $('body').removeClassPrefix('hr-theme-').addClass('hr-theme-' + theme);

  if (theme && theme != 'default') {
    // Get main css path
    var mainPath = '';
    $('link[rel=stylesheet]').each(function() {
      if ($(this).attr('href').indexOf("hr-apps.min.css") >= 0) {
        mainPath = ($(this).attr('href').replace('default/hr-apps.min.css','themes/hr-theme-'));
      }
    });

    // Load corresponding css
    linkText.attr('href', mainPath + theme + '.css');
  }
  else {
    linkText.attr('href', '');
  }
}


/*
 * Change background pattern to alternative one
 */
function HRchangePattern(e) {
  var pattern = $(this).attr('rel');
  HRapplyPattern(pattern);

  // Higlight item
  HRhighlightPatternItem(pattern);

  // Save theme in a cookie
  HRsetHrConfig('pattern', pattern);

  e.preventDefault();
}


/*
 * Apply new pattern.
 */
function HRapplyPattern(pattern) {
  // Add class to body
  $('body').removeClassPrefix('hr-pattern-').addClass('hr-pattern-' + pattern);
}


/*
 * Change font css to alternative one
 */
function HRchangeFontSize(e) {
  var hrConfig = HRgetHrConfig();
  var currentSize = 'md';

  if (hrConfig) {
    if (hrConfig.fontSize) currentSize = hrConfig.fontSize;
  }

  var fontSize = ($(e.target).attr('rel') ? $(e.target).attr('rel') : HRcycleFontSize(currentSize));
  HRapplyFontSize(fontSize);

  // Higlight item
  HRhighlightFontItem(fontSize);

  // Save font size in a cookie
  HRsetHrConfig('fontSize', fontSize);

  e.preventDefault();
}


/*
 * Cycle through available font sizes
 */
function HRcycleFontSize(currentSize) {
  switch (currentSize) {
    case 'md':
    default:
      var fontSize = "lg";
    break;

    case 'lg':
      var fontSize = "xl";
    break;

    case 'xl':
      var fontSize = "md";
    break;
  }

  return fontSize;
}


/*
 * Apply new font size.
 */
function HRapplyFontSize(fontSize) {

  var linkText = $("link.hr-font-size");

  if (fontSize) {
    if (fontSize != "md") {
      // Get main css path
      var mainPath = '';
      $('link[rel=stylesheet]').each(function() {
        if ($(this).attr('href').indexOf("hr-apps.min.css") >= 0) {
          mainPath = ($(this).attr('href').replace('default/hr-apps.min.css','font-size/hr-font-size-'));
        }
      });

      linkText.attr('href', mainPath + fontSize + '.css');
    }
    else {
      linkText.attr('href', '');
    }
  }
}


/*
 * Change layout size (boxed or wide)
 */
function HRchangeLayoutSize(e) {
  if ($(".layoutSize").is('.locked')) return;

  var hrConfig = HRgetHrConfig();
  var currentSize = 'md';

  if (hrConfig) {
    if (hrConfig.layoutSize) currentSize = hrConfig.layoutSize;
  }

  var layoutSize = ($(e.target).attr('rel') ? $(e.target).attr('rel') : HRcycleLayoutSize(currentSize));
  HRapplyLayoutSize(layoutSize);

  // Higlight item
  HRhighlightLayoutItem(layoutSize);

  // Save font size in a cookie
  HRsetHrConfig('layoutSize', layoutSize);

  e.preventDefault();
}


/*
 * Change autofocus
 */
function HRchangeAutofocus(e) {
  var hrConfig = HRgetHrConfig();
  var autofocusValue = $(e.target).attr('rel');

  // Higlight item
  HRhighlightAutofocus(autofocusValue);

  // Apply autofocus
  //HRapplyAutofocus(autofocusValue);

  // Save font size in a cookie
  HRsetHrConfig('autofocus', autofocusValue);

  e.preventDefault();
}


/*
 * Cycle through available layout sizes
 */
function HRcycleLayoutSize(currentSize) {
  switch (currentSize) {
    case 'md':
    default:
      var layoutSize = "lg";
    break;

    case 'lg':
      var layoutSize = "md";
    break;
  }

  return layoutSize;
}


/*
 * Apply new layout size.
 */
function HRapplyLayoutSize(layoutSize) {
  var layoutMain = $(".layoutSize");

  if (!layoutMain.is('.locked')) {
    if (layoutSize == "lg") {
      layoutMain.addClass("container-fluid");
      layoutMain.removeClass("container");
    }
    else {
      layoutMain.addClass("container");
      layoutMain.removeClass("container-fluid");
    }
  }
}


/*
* Apply autofocus
*/
function HRapplyAutofocus(status){
  if(status == 'enabled'){
    $('input[data-autofocus="true"]').focus();
  }
}


/*
 * Reset style to default
 */
function HRresetStyle() {
  HRapplyTheme('default');
  HRsetHrConfig('theme', 'default');
  HRhighlightThemeItem('default');

  HRapplyPattern('default');
  HRsetHrConfig('pattern', 'default');
  HRhighlightPatternItem('default');

  HRapplyFontSize('md');
  HRsetHrConfig('fontSize', 'md');
  HRhighlightFontItem('md');

  HRhighlightAutofocus('enabled');
}


/*
 * Highlight theme item on page load and on click
 */
function HRhighlightThemeItem(theme) {
  $('.theme-switcher button').each(function() {
    if ($(this).attr('rel') == theme) {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });
}


/*
 * Highlight pattern item on page load and on click
 */
function HRhighlightPatternItem(pattern) {
  $('.pattern-switcher button').each(function() {
    if ($(this).attr('rel') == pattern) {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });
}


/*
 * Highlight layout item on page load and on click
 */
function HRhighlightLayoutItem(layout) {
  $('.layout-switcher button').each(function() {
    if ($(this).attr('rel') == layout) {
      $(this).addClass('btn-primary');
      $(this).removeClass('btn-transparent');
    }
    else {
      $(this).addClass('btn-transparent');
      $(this).removeClass('btn-primary');
    }
  });
}


/*
 * Highlight font size item on page load and on click
 */
function HRhighlightFontItem(layout) {
  $('.font-switcher button').each(function() {
    if ($(this).attr('rel') == layout) {
      $(this).addClass('btn-primary');
      $(this).removeClass('btn-transparent');
    }
    else {
      $(this).addClass('btn-transparent');
      $(this).removeClass('btn-primary');
    }
  });
}


/*
* Highlight autofocus choice on page load and on click
*/
function HRhighlightAutofocus(val) {
  $('.autofocus-switcher button').each(function() {
    if ($(this).attr('rel') == val) {
      $(this).addClass('btn-primary');
      $(this).removeClass('btn-transparent');
    } else {
      $(this).addClass('btn-transparent');
      $(this).removeClass('btn-primary');
    }
  });
}


/*
 * Manage display of settings menu.
 */
function HRdisplaySettingsMenu() {
  $('.settings-menu-btn').on('click', function(e) {
    var $this = $(this),
        target = $('#' + $this.attr('aria-controls'));

    if( target.attr('hidden') ){
      target.removeAttr('hidden');
      $this.attr('aria-expanded', true);

      setTimeout(function(){
          target.addClass('open');
      }, 10);
    } else {
      target.removeClass('open');

      setTimeout(function(){
          target.attr('hidden', true);
          $this.attr('aria-expanded', false);
      }, 250);
    }
  });

  if ($('.layoutSize').hasClass('locked')) {
    $('.layout-switcher button').addClass('disabled');
  }
}
