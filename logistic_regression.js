/*
 * LOGISTIC REGRESSION
 */

// for draw linear function
function xy(ws, x) {
  return {x: x, y: -x*(ws[1]/ws[2]) - ws[0]/ws[2]}; 
}
// sigmoid func
function sig(f) { 
  return 1.0/(1.0+Math.exp(-f)); 
}
// loss func
function loss(t, f) {
  return Math.max(0.0, -t*Math.log(sig(f))-(1-t)*Math.log(1-sig(f)));
}
// linear function
function linear(w, x) {
  var ret = 0;
  for (var i=0;i<x.length;i++) {
    ret += w[i]*x[i];
  }
  return ret;
}

// global value
var ds  = new Array();
var a_in  = document.getElementById('a_in');
var iter_in  = document.getElementById('iter_in');

// dataset in ds
function init(){
  console.log("init");
  ds[0] = {data: [1,4,6], tag: 0};
  ds[1] = {data: [1,1,4], tag: 0};
  ds[2] = {data: [1,3,2], tag: 1};
  ds[3] = {data: [1,7,3], tag: 1};
};
function regression(){
  console.log("regression");
  var ws   = new Array(1,2,3);
  var iter = parseInt(iter_in.value);
  var a    = parseFloat(a_in.value);
  init();
  for(var i=0; i<iter; i++) {
    var n = Math.floor(Math.random() * ds.length);
    var ti = ds[n].tag;
    var xi = ds[n].data;
    if (ws.length != xi.length) alert("ERROR");
    var fi = linear(ws, xi);
    var li = loss(ti, fi);
    if (li > 0) {
      for(var j=0; j<3; j++) {
        ws[j] = ws[j] - a*((1-ti)*sig(fi)-ti*(1-sig(fi))) * xi[j];
      }
    } 
  }
   //  chart 
   var resultChart = new Chart("resultChart", {
   type: 'line',
   data: {
     datasets: [
       { // NORMAL MAIL
         label: "normal",
         data: ds.map(function(d){
             if(d.tag == 0) {
               return {x:d.data[1], y:d.data[2]};
             }
         }),
         pointRadius: 5,
         borderColor: '#5555ff',
         showLine: false
       },
       { // SPAM MAIL
         label: "spam",
         data: ds.map(function(d){
             if(d.tag == 1) {
               return {x:d.data[1], y:d.data[2]};
             }
         }),
         pointRadius: 5,
         borderColor: '#ff5555',
         showLine: false
       },
       { // SPLIT LINE DATA
         label: "line",
         fill: true,
         data: [xy(ws, -10), xy(ws, 10)],
         pointRadius: 5,
         borderColor: '#55ff55',
         showLine: true 
       }
     ]
   },
   options: {
     responsive: true,
     title: {
       display: true,
       text: 'Logistic Regression'
     },
     scales: {
       xAxes: [{ 
         type: 'linear',
         position: 'bottom',
         ticks: {
           min: 0,
           max: 8,
           scaleLineWidth: 1,
           stepSize: 1,
           fontColor: '#000'
         } 
       }],
       yAxes: [{ 
         ticks: {
           min: 0,
           max: 10,
           scaleLineWidth: 1,
           stepSize: 1,
           fontColor: '#000'
         } 
       }]
     } 
   }
  });
   document.getElementById('weight_out').innerHTML = ws;
};
regression();


