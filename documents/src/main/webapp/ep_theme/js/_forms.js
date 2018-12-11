/*
 * Manage display of search form
 */
function HRdisplaySearchForm() {
  $('#layout-header .banner__search > button').on('click', function(e) {
    var bannerSearch = $('#layout-header .banner__search');

    // Close search form
    if (bannerSearch.hasClass('is-opened')) {
      bannerSearch
        .removeClass('is-opened')
        .children('form')
          .width(0);
    }
    // Open search form
    else {
      bannerSearch
        .addClass('is-opened')
        .children('form')
          .animate({
            width: 306
          }, 200)
          .find('#layout-search')
            .focus();
    }
  });

  // Add focus to input when using skip links
  $('.skip-link[href="#layout-search"]').on('click', function(){
    $('#layout-search').focus();
  });

  // Open search form on focus
  $('#layout-header .banner__search > form input').on('focus', function(e) {
    var bannerSearch = $('#layout-header .banner__search');
    bannerSearch
      .addClass('is-opened')
      .children('form')
        .animate({
          width: 306
        }, 200);
  });

  // Initialise search form width (hidden by default)
  $('#layout-header .banner__search > form').width(0);
}

/*
 * Display selected files for upload fields
 */
function HRdisplayFileUpload() {
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

    var input = $(this).parents('.input-group').find(':text');
    var log = numFiles > 1 ? numFiles + ' files selected' : label;

    if( input.length ) {
      input.val(log);
    }
  });
}

/*
 * Improve display of select lists
 *
 * Change text color when an option has been selected.
 */
function HRdisplaySelectList() {
  $('select')
    .on('change', function(e) {
      $(this).addClass('is-selected');
    })
    .each(function(e) {
      if ($(this).val()) {
        $(this).addClass('is-selected');
      }
    });
}

/*
 * Display date picker where needed
 */
function HRdisplayDatePicker() {
  if ($.isFunction($.fn.Zebra_DatePicker)) {
    $('.datepicker').Zebra_DatePicker({
      readonly_element: false,
      select_other_months: true,
      open_icon_only: true,
      format: "d/m/Y"
    });
  }
}

/*
 * Display number of words/characters entered
 */
function HRdisplayInputCount() {
  // Add area to display counter
  $('.input-count')
  .after(
    $('<div>')
    .addClass('input-count__result')
  );

  $('.input-count')
  // Activate character counter
  .each(function() {
    var count = HRinputCount( this.value );
    var data = $(this).attr('data-count');
    var max = $(this).attr('maxlength');
    var lang = $('html').attr("lang");
    
    console.log(lang);
    console.log($('html').attr("lang"));

    var html = HRupdateInputCount(count, data, max, lang);



    if ($(this).parent().hasClass('twitter-typeahead')) {
      $(this).parent().parent().children('.input-count__result').html("<small>" + html + "</small>");
    } else {
      $(this).parent().children('.input-count__result').html("<small>" + html + "</small>");
    }
  })
  // Count on character input
  .on("input", function() {
    var count = HRinputCount( this.value );
    var data = $(this).attr('data-count');
    var max = $(this).attr('maxlength');
    var lang = $('html').attr("lang");
    var html = HRupdateInputCount(count, data, max, lang);

    if ($(this).parent().hasClass('twitter-typeahead')) {
      $(this).parent().parent().children('.input-count__result').html("<small>" + html + "</small>");
    } else {
      $(this).parent().children('.input-count__result').html("<small>" + html + "</small>");
    }
  })
  // Update counter on focus
  .on("focus", function() {
    var count = HRinputCount( this.value );
    var data = $(this).attr('data-count');
    var max = $(this).attr('maxlength');
    var lang = $('html').attr("lang");
    var html = HRupdateInputCount(count, data, max, lang);

    if ($(this).parent().hasClass('twitter-typeahead')) {
      $(this).parent().parent().children('.input-count__result').html("<small>" + html + "</small>");
    } else {
      $(this).parent().children('.input-count__result').html("<small>" + html + "</small>");
    }
  });
}

/*
 * Check input and count characters/words/lines
 */
function HRinputCount( val ){
  var wom = val.match(/\S+/g);
  return {
    characters : val.length,
    words      : wom ? wom.length : 0,
    lines      : val.split(/\r*\n/).length
  };
}

/*
 * Update input count (words/characters/lines)
 */
function HRupdateInputCount(count, data, max, lang) {
  var html = '';
  var lang = lang.toUpperCase();

  if (lang == 'FR') {
    if (data) {
      if (data.indexOf("character") >= 0) {
        if (max) {
          html += "Caract&egrave;res restants: " + (max - count.characters) + '/' + max;
        }
        else {
          html += "Caract&egrave;res: " + count.characters;
        }
      }
      if (data.indexOf("word") >= 0) {
        if (html.length > 0) html += ", ";
        html += "Mots: " + count.words;
      }
      if (data.indexOf("line") >= 0) {
        if (html.length > 0) html += ", ";
        html += "Lignes: " + count.lines;
      }
    }
    else {
      if (max) {
        html += "Caract&egrave;res restants: " + (max - count.characters) + '/' + max;
      }
      else {
        html += "Caract&egrave;res: " + count.characters;
      }
    }
  } else {
    if (data) {
      if (data.indexOf("character") >= 0) {
        if (max) {
          html += "Characters left: " + (max - count.characters) + '/' + max;
        }
        else {
          html += "Characters: " + count.characters;
        }
      }
      if (data.indexOf("word") >= 0) {
        if (html.length > 0) html += ", ";
        html += "Words: " + count.words;
      }
      if (data.indexOf("line") >= 0) {
        if (html.length > 0) html += ", ";
        html += "Lines: " + count.lines;
      }
    }
    else {
      if (max) {
        html += "Characters left: " + (max - count.characters) + '/' + max;
      }
      else {
        html += "Characters: " + count.characters;
      }
    }
  }

  return html;
}

/*
 * Manage display of mandatory fields
 */
function HRdisplayMandatoryFields() {
  $('.is-mandatory label').append('<span class="mandatory-star">*</span>');

  $("fieldset.radio_group > * span.mandatory-star").remove();
  $("fieldset.checkbox_group > * span.mandatory-star").remove();
}

/*
 * Manage display of focused element
 */
function HRdisplayFocus() {
  $('a, input, button, select, textarea').focus(function() {
    HRscrollToFocus($(this));
  });
}

/*
 * Manage display of password fields
 *
 * Characters can be displayed or hidden
 */
function HRdisplayPasswordFields() {
  $('.btn-password').on('click', function() {
    var input = $(this).closest('.input-group').find('input');
    var icon = $(this).find('span[class^="hr-icon"]');
    var originalTitle = $(this).data('original-title');
    var alernateTitle = $(this).data('alternative-title');

    // Show characters
    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
      icon.addClass('hr-icon__eye-slash').removeClass('hr-icon__eye');
      $(this).tooltip('hide')
        .attr('data-original-title', alernateTitle)
        .tooltip('fixTitle');
    }
    // Hide characters
    else {
      input.attr('type', 'password');
      icon.addClass('hr-icon__eye').removeClass('hr-icon__eye-slash');
      $(this).tooltip('hide')
        .attr('data-original-title', originalTitle)
        .tooltip('fixTitle');
    }

    // Focus last character of password
    input.focus();
    var tmpVal = input.val();
    input.val('');
    input.val(tmpVal);
  })
}
