/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4plugins_timeline.SpiralChart);
chart.levelCount = 2;
chart.inversed = true;
//chart.startAngle = -90;
chart.endAngle = 270;
// chart.yAxisInnerRadius = 0;
chart.yAxisRadius = am4core.percent(100);
chart.padding(100,0,0,0);
chart.exporting.menu = new am4core.ExportMenu();



chart.data = [
  { category: "" },
  { category: "1875 - $ 21,186", value: 21186 },
  { category: "1880 - $ 498,532", value: 498532 },
  { category: "1885 - $ 736,170", value: 736170 },
  { category: "1890 - $ 1,173,624", value: 1173624 },
  { category: "1895 - $ 1,322,694", value: 1322694 },
  { category: "1899 - $ 1,434,975", value: 1434975 }];

chart.fontSize = 11;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.minGridDistance = 6;
categoryAxis.cursorTooltipEnabled = false;


var categoryAxisLabelTemplate = categoryAxis.renderer.labels.template;
//categoryAxisLabelTemplate.paddingLeft = 20;
categoryAxisLabelTemplate.horizontalCenter = "left";
categoryAxisLabelTemplate.adapter.add("rotation", function (rotation, target) {
  var position = valueAxis.valueToPosition(valueAxis.min);
  return valueAxis.renderer.positionToAngle(position) + 90;
})

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minGridDistance = 70;

valueAxis.renderer.line.strokeDasharray = "";
valueAxis.renderer.line.strokeOpacity = 0;
valueAxis.renderer.grid.template.disabled = true;
valueAxis.zIndex = 100;
valueAxis.cursorTooltipEnabled = false;
valueAxis.min = 0;
valueAxis.renderer.labels.template.disabled = true;

var labelTemplate = valueAxis.renderer.labels.template;
labelTemplate.verticalCenter = "middle";
labelTemplate.fillOpacity = 1;

var series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
series.dataFields.valueX = "value";
series.dataFields.categoryY = "category";

var columnTemplate = series.columns.template;
series.tooltipText = "{categoryY}: {valueX} $";
columnTemplate.adapter.add("fill", function (fill, target) {
    var colors = [
        'rgba(216, 32, 62, 0.8)', // Rot 1899
        'rgba(233, 176, 166, 0.8)', // Rosa 1875
        'rgba(169, 169, 218, 0.8)', // Hellblau 1880
        'rgba(199, 167, 143, 0.8)', // Braun 1885
        'rgba(231, 162, 32, 0.8)', // Gelb 1890
        'rgba(212, 203, 183, 0.8)'  // Grau 1895
      ];
      return colors[target.dataItem.index % colors.length];
    });
columnTemplate.strokeOpacity = 0;
columnTemplate.fillOpacity = 0.8;

var hoverState = columnTemplate.states.create("hover")
hoverState.properties.fillOpacity = 1; 


chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.align = "center"
chart.scrollbarX.width = am4core.percent(70);
chart.scrollbarX.position = "bottom";
chart.scrollbarX.margin(50, 0, 0, 0);
chart.scrollbarX.parent = chart.bottomAxesContainer;
chart.isMeasured = false; 

var cursor = new am4plugins_timeline.CurveCursor();
chart.cursor = cursor;
cursor.xAxis = valueAxis;
cursor.yAxis = categoryAxis;
cursor.lineY.disabled = false;
cursor.lineX.strokeDasharray = "1,4";
cursor.lineX.strokeOpacity = 1; 

var label = chart.plotContainer.createChild(am4core.Label);
label.fontSize = 15;
label.x = am4core.percent(80);
label.y = am4core.percent(80);
label.horizontalCenter = "right"; 
