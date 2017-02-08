const React = require('react');
const TitleBox = React.createClass({
	getInitialState:function(){
		return {
			time:this.props.time,
			progress:0,
			isstart:true,
			iscanstop:false,
			record:[]
		}
	},
	startTime : function(){
		var that = this;
		that.record('start');
		if (that.state.time === '00:00') {
			that.setState({
				progress : '100%',
				time:this.props.time
			})
		}
		that.setState({
			isstart : false, //开始状态
		 	iscanstop : true  //可停状态
		});
		that.timer = setInterval(function(){
			 that.setState({
			 	time: that.timeDown(that.state.time),
			 	progress: that.progressWidth()*100+'%'
			 });
		},1000);
	},
	timeDown:function(currentTime){
		var that = this;
		var chour = parseInt(currentTime.split(':')[0],10);
		var csecond = parseInt(currentTime.split(':')[1],10);
		if (chour !== 0 || csecond !==0 ) {
			if (csecond === 0) {
				csecond = 59;
				chour -=1;
			}else{
				csecond-=1;
			}
		}else{
			clearInterval(that.timer);
			that.setState({
				isstart:true,
			 	iscanstop: true
			});
			alert('时间到咯，你完成任务了么？');
		}
		return	(function(){
			if (chour < 10) {
				chour = 0 + chour.toString(); 
			}
			if (csecond < 10) {
				csecond = 0 + csecond.toString(); 
			}
			return (chour + ':' + csecond); 
		})();
	},
	progressWidth:function(){
		var that = this;
		var num1 = parseInt(that.state.time.split(':')[0],10)*60 + parseInt(that.state.time.split(':')[1],10);
		var num2 = parseInt(that.props.time.split(':')[0],10)*60 + parseInt(that.props.time.split(':')[1],10);
		return (num1-1)/num2;
	},
	stopTime : function(){
		this.record('relax');
		clearInterval(this.timer);
		this.setState({
			iscanstop: false,
			isstart: true
		});
	},
	taskName : function(event){
		this.setState({
			taskName: '你将要完成的任务是：'+event.target.value
		});

	},
	restart:function(){
		this.record('stop');
		clearInterval(this.timer);
		this.setState({
			progress : '100%',
			time:this.props.time,
			isstart: true
		})
	},
	record:function(status){
		var that = this;
		function listItem(status,time){
			(that.state.record).push('【'+ status +'】时间 '+ time);
			return that.state.record;
		};
		return (function(){
			var s = new Date().getHours() + ':' + new Date().getMinutes();
			switch(status)
			{
				case 'start':
					that.setState({
					    record:listItem('开始',s)
					})
				  	break;
				case 'relax':
					that.setState({
					    record:listItem('休息',s)
					});
					break;
				case 'stop':
					that.setState({
					    record:listItem('停止',s)
					});
					break;
			}
		})();
	},
	render:function(){
		return(
			<div id="control">
				<h2 id="title">{this.props.title1}</h2>
				<h5 id="subTitle">{this.props.title2}</h5>

				<div id="remainTime" className="remainTime">{this.state.time}</div>
				<div id="progressBarBox" className="progress progress-striped">
					<div id="progressBar" style={{width:this.state.progress}} className="bar"></div>
				</div>

				<div id="currentTask">{this.state.taskName}</div>

				<textarea id="taskName" placeholder="请输入任务..." rows="2" onChange={this.taskName}></textarea>
				<button onClick={this.state.isstart ? this.startTime:''} id="startWorkButton" className="btn btn-primary">开始工作</button>
				<button style={{cursor:this.state.iscanstop?'pointer':'not-allowed'}} onClick={this.state.iscanstop?this.stopTime:''}  id="startRestButton" className="btn btn-warning">开始休息</button>
				<button id="stopButton" className="btn btn-danger disabled" onClick={this.restart}>停止</button>
				<div id="taskListBoard" style={{'display': 'block'}}>
					<ul id="taskList">
						<li className=" alert alert-error">{this.state.record}</li>
					</ul>
				</div>
			</div>
		)
	}
})
module.exports = TitleBox;
