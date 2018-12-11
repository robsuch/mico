/*
 * Manage placeholder replacement
 *
 * Used in setting menu (on left)
 */
function HRphReplace() {
  $('.HRplaceholder').each(function() {
    var rel = $(this).attr('rel');
    var html = '';

    switch (rel) {
      case 'tools-print': html = HRphTools('print'); break;
      case 'tools-share': html = HRphTools('share'); break;
      case 'tools-save': html = HRphTools('save'); break;
      case 'tools-accessibility': html = HRphTools('accessibility'); break;
      case 'font-switcher': html = HRphFontSwitcher(); break;
      case 'layout-switcher': html = HRphLayoutSwitcher(); break;
      case 'theme-switcher': html = HRphThemeSwitcher(); break;
      case 'pattern-switcher': html = HRphPatternSwitcher(); break;
      case 'autofocus-switcher' : html = HRphAutofocusSwitcher(); break;
    }

    if (html) {
      $(this).replaceWith(html);
    }
  });
}

/*
 * Manage placeholder for pattern switcher
 */
function HRphPatternSwitcher() {
  return $('<div>')
  .addClass('btn-group btn-group-xs')
  .attr('role', 'group')
  .append(_HRphPatternSwitcher('default', 'Default', 'top'))
  .append(_HRphPatternSwitcher('pattern1', 'Light cement', 'top'))
  .append(_HRphPatternSwitcher('pattern2', 'Pixel', 'top'))
  .append(_HRphPatternSwitcher('pattern3', 'Grid', 'top'))
  .append(_HRphPatternSwitcher('pattern4', 'Light zebra', 'top'))
  .append(_HRphPatternSwitcher('pattern5', 'Crafted grey', 'bottom'))
  .append(_HRphPatternSwitcher('pattern6', 'Fabric grey', 'bottom'))
  .append(_HRphPatternSwitcher('pattern7', 'Grunge', 'bottom'))
  .append(_HRphPatternSwitcher('pattern8', 'Polygon', 'bottom'))
  .append(_HRphPatternSwitcher('pattern9', 'Black zebra', 'bottom'))

  function _HRphPatternSwitcher(color, name, placement) {
    return $('<button>')
    .addClass('btn btn-link pattern-switcher__' + color)
    .attr({
      'rel': color,
      'data-toggle': 'tooltip',
      'data-container': 'body',
      'data-placement': placement,
      'title': name,
      'type': 'button'
    })
    .on('click', HRchangePattern)
    .append(
      $('<span>')
      .addClass('sr-only')
      .html(name)
    )
    .append(
      $('<span>')
      .addClass('pattern-switcher__color hr-pattern-' + color)
    );
  }
}

/*
 * Manage placeholder for theme switcher
 */
function HRphThemeSwitcher() {
  return $('<div>')
  .addClass('btn-group btn-group-xs')
  .attr('role', 'group')
  .append(_HRphThemeSwitcher('default', 'Serenity', 'top'))
  .append(_HRphThemeSwitcher('lime', 'Zen', 'top'))
  .append(_HRphThemeSwitcher('pink', 'Sweet', 'top'))
  .append(_HRphThemeSwitcher('teal', 'Tropical', 'top'))
  .append(_HRphThemeSwitcher('grey', 'Rainy day', 'top'))
  .append(_HRphThemeSwitcher('orange', 'Optimist', 'bottom'))
  .append(_HRphThemeSwitcher('purple', 'Peace', 'bottom'))
  .append(_HRphThemeSwitcher('cyan', 'Fresh', 'bottom'))
  .append(_HRphThemeSwitcher('brown', 'Comfort', 'bottom'))
  .append(_HRphThemeSwitcher('high-contrast', 'High contrast', 'bottom').append($('<span>').addClass('hr-icon__light-up theme-switcher__icon')));

  function _HRphThemeSwitcher(color, name, placement) {
    return $('<button>')
    .addClass('btn btn-link theme-switcher__' + color)
    .attr({
      'rel': color,
      'data-toggle': 'tooltip',
      'data-container': 'body',
      'data-placement': placement,
      'title': name,
      'type': 'button'
    })
    .on('click', HRchangeTheme)
    .append(
      $('<span>')
      .addClass('sr-only')
      .html(name)
    )
    .append(
      $('<span>')
      .addClass('theme-switcher__color')
    );
  }
}

/*
 * Manage placeholder for layout
 */
function HRphLayoutSwitcher() {
  return $('<div>')
  .addClass('btn-group btn-group-sm btn-group-justified')
  .attr('role', 'group')
  .append(_HRphLayoutSwitcher('md', 'Boxed'))
  .append(_HRphLayoutSwitcher('lg', 'Wide'));

  function _HRphLayoutSwitcher(size, title) {
    return $('<div>')
    .addClass('btn-group btn-group-sm')
    .append(
      $('<button>')
      .addClass('btn btn-transparent')
      .attr({
        'type': 'button',
        'rel': size
      })
      .on('click', HRchangeLayoutSize)
      .html(title)
    )
  }
}

/*
 * Manage placeholder for zoom
 */
function HRphFontSwitcher() {
  return $('<div>')
  .addClass('btn-group btn-group-sm btn-group-justified')
  .attr('role', 'group')
  .append(_HRphFontSwitcher('md', '100%'))
  .append(_HRphFontSwitcher('lg', '120%'))
  .append(_HRphFontSwitcher('xl', '140%'));

  function _HRphFontSwitcher(size, content) {
    return $('<div>')
    .addClass('btn-group btn-group-sm')
    .append(
      $('<button>')
      .addClass('btn btn-transparent')
      .attr({
        'type': 'button',
        'rel': size
      })
      .on('click', HRchangeFontSize)
      .html(content)
    )
  }
}

/*
 * Manage placeholders for tools
 */
function HRphTools(tool) {
  var html = '';

  if (tool) {
    switch (tool) {
      case 'print':
        html = _HRphTools('print', 'Print', 'print');
      break;

      case 'share':
        html = _HRphTools('send', 'Send link by email', 'share-square-o').on('click', HRsendByMail);
      break;

      case 'save':
        html = _HRphTools('save', 'Save', 'floppy-o');
      break;

      case 'accessibility':
        html = _HRphTools('accessibility', 'Keyboard shortcuts', 'keyboard').on('click', HRdisplayAccessibility);
      break;
    }
  }

  return html;

  function _HRphTools(name, content, icon) {
    return $('<div>')
    .addClass('btn-group')
    .append(
      $('<button>')
      .addClass('btn btn-link btn-' + name)
      .attr({
        'type': 'button',
        'data-toggle': 'tooltip',
        'data-container': 'body',
        'data-placement': 'top',
        'title': content
      })
      .append(
        $('<span>')
        .addClass('sr-only')
        .html(content)
      )
      .append(
        $('<span>')
        .addClass('hr-icon__' + icon + ' hr-icon-24')
      )
    )
  }
}

/*
 * Manage placeholder for autofocus
 */
function HRphAutofocusSwitcher() {
  return $('<div>')
  .addClass('btn-group btn-group-sm btn-group-justified')
  .attr('role', 'group')
  .append(_HRphAutofocusSwitcher('enabled', 'Enabled'))
  .append(_HRphAutofocusSwitcher('disabled', 'Disabled'));

  function _HRphAutofocusSwitcher(value, content) {
    return $('<div>')
    .addClass('btn-group btn-group-sm')
    .append(
      $('<button>')
      .addClass('btn btn-transparent')
      .attr({
        'type': 'button',
        'rel': value
      })
      .on('click', HRchangeAutofocus)
      .html(content)
    )
  }
}
