/*
 * Manage display of timelines
 */
function HRdisplayTimeline() {
  $('.timeline').each(function(index) {
    // Get active step.
    var active = $(this).find('.timeline__item.active');

    // Get next step to be done (previous one in DOM)
    var stepNext = active.prev('.timeline__item').addClass('next');
    if (HRisEmpty(stepNext)) return false;

    // Get all steps after next one (all previous ones in DOM).
    var stepsNext = stepNext.prevAll('.timeline__item').reverse();
    if (HRisEmpty(stepsNext)) return false;

    // Wrap steps in collapsible block.
    stepsNext.wrapAll(
      $('<div>')
      .addClass('collapse timeline__collapse')
      .attr('id', 'timeline-' + index + '-full')
    );

    // Add collapse button.
    $('<div>')
    .addClass('row')
    .append(
      $('<div>')
      .addClass('col-sm-4 col-sm-offset-4')
      .append(
        $('<button>')
        .addClass('btn btn-default btn-xs btn-block add-margin-bottom')
        .attr('data-toggle', 'collapse')
        .attr('data-target', '#timeline-' + index + '-full')
        .attr('aria-expanded', 'false')
        .attr('aria-controls', 'timeline-' + index + '-full')
        .attr('id', 'timeline-btn-' + index)
        .html('Show all steps')
      )
    )
    .prependTo($(this));

    // Event listener for collapsible block.
    $('#timeline-' + index + '-full').on('show.bs.collapse', function () {
      $('#timeline-btn-' + index).html('Hide next steps');
      stepNext.addClass('expanded');
    })
    $('#timeline-' + index + '-full').on('hide.bs.collapse', function () {
      $('#timeline-btn-' + index).html('Show all steps');
      stepNext.removeClass('expanded');
    })
  });
}



/*
* Sticky calendar header on scheduler view
*/
function HRstickCalendarHeader(){
  $('.fc-timeline').each(function(){
    var timelineCalendar = $(this),
        positionFromTop = timelineCalendar.offset().top,
        timelineCalendarHeight = timelineCalendar.height(),
        timelineCalendarBottom = Math.round(positionFromTop + timelineCalendarHeight),
        timelineHeader = timelineCalendar.find('.fc-head .fc-time-area .fc-scroller-clip'),
        timelineHeaderHeight = timelineHeader.height(),
        timelineTimeArea = timelineCalendar.find('.fc-body .fc-time-area'),
        timelineTimeAreaWidth =  timelineTimeArea.width(),
        timelineTimeAreaLeft = timelineTimeArea.offset().left,
        mainNavHeight = $('#layout-header .main-menu').outerHeight(),
        timelineHeaderLeft = timelineHeader.offset().left,
        scrollLeftValue = isNaN(Math.abs(parseInt(timelineHeader.find('> table').css('left')))) ? 0 : Math.abs(parseInt(timelineHeader.find('> table').css('left'))),
        leftOffset = 0;

    $(window).scroll(function(){
      // If scroll is between the begin and the end of the table
      if( $(window).scrollTop() > (positionFromTop - mainNavHeight) && $(window).scrollTop() < (timelineCalendarBottom - timelineHeaderHeight - mainNavHeight) ){

        // Add class on the timeline header and set position
        timelineHeader.css({
          'top': mainNavHeight,
          'width': timelineTimeAreaWidth,
          'left': timelineHeaderLeft
        }).addClass("is-sticky");

        if( scrollLeftValue > 10 ){
          timelineHeader.parents('.fc-scroller').scrollLeft(scrollLeftValue);
          timelineHeader.find('> table').css('left', scrollLeftValue * -1);
        }

      } else {
        timelineHeader.removeClass("is-sticky").removeAttr('style');

        if( scrollLeftValue > 10 ){
          timelineHeader.parents('.fc-scroller').scrollLeft( scrollLeftValue );

          scrollLeftValue = timelineHeader.parents('.fc-scroller').scrollLeft();
        }
      }
    });

    // On scroll in the table, scroll the days number
    timelineCalendar.find('.fc-body .fc-time-area .fc-scroller').on('scroll', function(e){      
      leftOffset = timelineTimeAreaLeft - $(this).find('.fc-scroller-canvas').offset().left;

      if( leftOffset > 10 ){
        timelineHeader.find('> table').css('left',  leftOffset * -1 + 'px');
      } else {
        timelineHeader.find('> table').css('left',  0 + 'px');
      }

      scrollLeftValue = leftOffset;
    });

  });
}