/*
 * Send current page in a mail
 */
function HRsendByMail() {
  window.location.href = "mailto:?to=&body=" + encodeURI(window.location.href) + "&subject=Link shared with you";
}

/*
 * Open accessibility page
 */
function HRdisplayAccessibility() {
  window.open("http://persweb.ep.parl.union.eu/HRLookAndFeel/project/example/accessibility.html");
}

/*
 * Display current environment (dev, preprod or prod)
 * 
 * It is based on url, so tests may have to be updated to add new url patterns
 */
function HRdisplayEnvironment() {
  var environmentKey = '';
  var environmentName = '';

  /*if (document.domain.indexOf("dv.ep") >= 0 ||
      document.domain.indexOf("localhost") >= 0 ||
      window.location.protocol == "file:") {
    environmentKey = 'dv';
    environmentName = 'd<br />e<br />v';
  } else */

  if (document.domain.indexOf("pp.ep") >= 0 ||
      document.domain.indexOf("eicixzq") >= 0) {
    environmentKey = 'pp';
    environmentName = 'p<br />r<br />e<br />p<br />r<br />o<br />d';
  } else if (document.domain.indexOf("eicixzi") >= 0) {
    environmentKey = 'test';
    environmentName = 't<br />e<br />s<br />t';
  } else if(document.domain.indexOf("eicixzp") == -1) {
    environmentKey = 'dv';
    environmentName = 'd<br />e<br />v';
  }

  if (environmentKey) {
    $('<div>')
    .prependTo('body')
    .addClass('environment-display')
    .addClass('environment-' + environmentKey)
    .append(
      $('<div>')
      .addClass('environment-name')
      .html(environmentName)
    );
  }
}
