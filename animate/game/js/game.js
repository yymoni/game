	/*人物*/
	function person(canvas,cobj,runImg,jumpImg,hinderImg){
		this.canvas=canvas;
		this.cobj=cobj;
		this.runImg=runImg;
		this.jumpImg=jumpImg;
		this.x=0;
		this.y=0;
		this.width=118;
		this.height=168;
		this.status="runImg";  /*人物状态*/
		this.state=0; /*哪张图片*/
	}
	person.prototype={
		/*通过2d对象绘制--传参*/
		draw:function(){
			this.cobj.save();
			this.cobj.translate(this.x,this.y);
			this.cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
			/*哪个集合的哪一张*/
			this.cobj.restore();
		},
		animate:function(num,speed){
			if(this.status=="runImg"){ /*通过判断状态来确定动画*/
				this.state=num%6;
			}else{
				this.state=0;
			}
			this.x+=speed;
			if(this.x>this.canvas.width/3){
				this.x=this.canvas.width/3;
			}			
		},
		jump:function(){
			/*适配移动端：用touch事件--引入touch.js*/
			var that=this;
			var flag=true;
			touch.on(this.canvas,"touchstart",function(){
				var inita=0;
				var speeda=10;
				var currenty=that.y;
				var r=100;
				that.status="jumpImg"; /*一点击，则为跳跃状态*/
				that.state=0;
				
				/*加开关 
				 * 在多次点击的情况下，能保持正常下落
				 * */
				if(!flag){
					return;
				}
				flag=false;
				
				/*跳跃：三角函数 
				 * 从0°到180° 
				 * 通过角度判断，计算y轴的偏移量
				 * */
				var t=setInterval(function(){					
					inita+=speeda;
					if(inita>=180){						
						that.status="runImg"; /*大于180°时，是跑步的状态*/
						clearInterval(t);
						that.y=currenty;
						flag=true;
					}else{
						that.y=currenty-Math.sin(inita*Math.PI/180)*r; /*88*/
					}
				},50)
			})
		}
	}
	
	
	/*障碍物*/
	function hinder(canvas,cobj,hinderImg){
		this.canvas=canvas;
		this.cobj=cobj;
		this.hinderImg=hinderImg;
		//console.log(this.hinderImg);
		this.x=0;
		this.y=0;
		this.width=56;
		this.height=40;
		this.state=0;
	}
	hinder.prototype={
		draw:function(){
			this.cobj.save();
			this.cobj.translate(this.x,this.y);
			this.cobj.drawImage(this.hinderImg[this.state],0,0,564,400,0,0,this.width,this.height);
			this.cobj.restore();
		},
		animate:function(speed){
			this.x-=speed;
		}
	}
	
	//粒子动画

	function lizi(canvas,cobj,x,y){
	    this.x=x;
	    this.y=y;
	    this.canvas=canvas;
	    this.cobj=cobj;
	    this.r=2+2*Math.random();
	    this.speedx=8*Math.random()-4;
	    this.speedy=8*Math.random()-4;
	    this.color="red";
	    this.speedl=0.3;
	}
	lizi.prototype={
	    draw:function(){
	        this.cobj.save();
	        this.cobj.translate(this.x,this.y);
	        this.cobj.fillStyle=this.color;
	        this.cobj.beginPath();
	        this.cobj.arc(0,0,this.r,0,2*Math.PI);
	        this.cobj.fill();
	        this.cobj.restore();
	    },
	    animate:function(){
	        this.x+=this.speedx;
	        this.y+=this.speedy;
	        this.r-=this.speedl;
	    }
	}
	
	/*出血*/
	function xue(canvas,cobj,x,y){
	    var arr=[];
	    for(var i=0;i<20;i++){
	        arr.push(new lizi(canvas,cobj,x,y));
	    }
	
	    var t=setInterval(function(){
	        for(var i=0;i<arr.length;i++){
	            arr[i].draw();
	            arr[i].animate();
	            if(arr[i].r<0){
	                arr.splice(i,1);
	            }
	        }
	        if(arr.length<1){
	            clearInterval(t);
	        }	
	    },50)
	}
	
	/*游戏*/
	function game(canvas,cobj,runImg,jumpImg,hinderImg){
		this.canvas=canvas;
		this.cobj=cobj;
		this.hinderImg=hinderImg;
		this.speed=8;
		this.person=new person(canvas,cobj,runImg,jumpImg);
		this.hiderArr=[];
		this.score=0;
	    this.currentscore=0;
	    this.life=3;
	    this.step=2;
	}
	game.prototype={
		play:function(){
			var that=this;
			var backpos=0;
			var personNum=0;
			var times=0;
			var randtime=Math.floor(3+6*Math.random())*1000;
			
			that.person.jump();
			
			setInterval(function(){
				times+=50;
				that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
				
				if(times%randtime==0){
					randtime=Math.floor(3+6*Math.random())*1000;				
					var hinderObj=new hinder(that.canvas,that.cobj,that.hinderImg); 
					hinderObj.state=Math.floor(Math.random()*that.hinderImg.length);
					hinderObj.y=that.canvas.height/1.5-hinderObj.height;
					hinderObj.x=that.canvas.width;
					that.hiderArr.push(hinderObj);
					//console.log(that.hiderArr.length);
					
					if(that.hiderArr.length>5){
						that.hiderArr.shift();
					}
				}
				
				for(var i=0;i<that.hiderArr.length;i++){
					that.hiderArr[i].draw();
					that.hiderArr[i].animate(that.speed);
				
				if(hitPix(that.canvas,that.cobj,that.person,that.hiderArr[i])){
					xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                       if(!that.hiderArr[i].hits){

                           that.life--;
                           if(that.life<0){
                               alert("game over!");
                               location.reload();
                           }
                           that.hiderArr[i].hits="hits";
                       }
                   }
				
				if(that.hiderArr[i].x+that.hiderArr[i].width<that.person.x&&!that.hiderArr[i].hits){
                   if(!that.hiderArr[i].score) {
                       document.title=++that.score;
//                     document.title=++that.currentscore;
                       if(that.currentscore%that.step==0){
                           that.step=that.currentscore*2;
                           that.currentscore=0;
                           that.speed+=10;

                       }
                       that.hiderArr[i].score="true"
                   }
				}
			}	
				
				personNum++;			
				that.person.draw();
				that.person.animate(personNum,that.speed);
				backpos-=that.speed; /*不断减小*/
				that.canvas.style.backgroundPositionX = backpos + "px";
			},50)
		}
	}
