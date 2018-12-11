
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<html>
<head>
<script src="${pageContext.servletContext.contextPath}/ep_theme/js/jquery.min.js"></script>
<script src="${pageContext.servletContext.contextPath}/ep_theme/js/bootstrap.min.js"></script>

	<script src="${pageContext.servletContext.contextPath}/ep_theme/js/hr-apps.min.js"></script>
	<link rel="stylesheet" href="${pageContext.servletContext.contextPath}/ep_theme/css/default/hr-apps.min.css">	

	<link rel="stylesheet" href="${pageContext.servletContext.contextPath}/ep_theme/css/default/hr-apps.min.css">
	<link rel="stylesheet" href="${pageContext.servletContext.contextPath}/css/jquery/jquery.ui.core.css">
</head>
<body>


<script>
var showspinersm = function (){
    target = "divspiner";
    $('#divspiner').modal({
      show: true,
      backdrop: true
    });

  };
  function hidespinersm(){
	  target = "divspiner";
	  $('#divspiner-sm').modal('hide');
	 };
$(document).ready(function(){
	console.log("test load");
	$("#contentList").load('loadlist');
});
showspinersm();
</script>
sdfsdfsd
<div id="contentList">

<div class="modal fade spinerwait" id="divspiner-sm" tabindex="-1" 	role="dialog" aria-labelledby="popupConfirmLabel">
					<div class="spinner spinner-sm">
						<div>Loading...</div>
					</div>
				</div>
<div class="modal fade spinerwait" id="divspiner" tabindex="-1" role="dialog" aria-labelledby="popupConfirmLabel">
	<div class="spinner spinner-lg">
		<div>Loading...</div>
	</div>
</div>
</div>
<spring:message code="label.questionnaire" />
</body>

</html>