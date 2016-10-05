angular.module("app/templates/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/templates/progressbar.html",
    "<div>\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"row margin-0\">{{label}}</div>\n" +
    "        <div class=\"progress height-35 line-height-35\">\n" +
    "            <div class=\"progress-bar line-height-35 {{barClass}}\" role=\"progressbar\" aria-valuenow=\"{{progress}}\" aria-valuemin=\"0\" style=\"width:{{progress}}%\">\n" +
    "                <span class=\"sr-only\">{{progress}}% Complete</span>\n" +
    "                <span class=\"progress-text\">{{progress}}%</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
