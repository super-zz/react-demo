require('./css/main.css');
var React= require('react');
var ReactDom = require('react-dom');
var TitleBox = require('./components/titleBox.js');

ReactDom.render( <TitleBox title1="Alloy Timer" title2="之番茄工作法" time="25:00"/>, document.getElementById('content'));
