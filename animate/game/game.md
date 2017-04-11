###Welcome to use MarkDown
图片加载：
data:image
远程图片：放入地址


###图片预加载
imgload
imgObj
urlArr
prototype

geturl
循环
push
实例化
调用

load:url 回调
实例化
src
检测加载完成：回调

loadAll:
geturl
循环
闭包
回调



###操作canvas:
####适配移动端
touch
touchon
that.audio[1].puashed
touchstart
/*节省cpu的运算量*/
所有变化的东西放到setInterval里
问题：一个时间段里要运行所有的东西

####跳跃：三角函数
所以跳跃时重新开启setInterval
inita
speeda
currenty
setInterval
角度不断变化
inita>=180
清掉t
y=cy
else


####障碍物
图片--布局，传参
存储--空数组-game
hinderimg
获取障碍物
绘制
564 40 112 80
实例化调用
改变状态
放入数组
隔一段时间创建一个
循环--绘制
随机绘制。随机 向下取整 
出现的位置--y轴偏移量--x轴
动态：animate x-=speed 传参--调用
随机时间3-5 随机 向下取整


####检测碰撞
hitpix()传参

####判断跳跃
if hitpix()
life--
可以启动音效
调用出血函数
判断：如果生命<0，game over
location.reload()
加标志.flag="hit"
if
hinderArr[i].x+hinderArr[i].width<person.x&&开关关！

document.title=++score--做初始0 场景中
++currentscore
如果currentscore%step==0
step=currentscore*2
currentscore=0
speed+=20
hinderArr[i].score="true"

#####生命值
初始--场景中

#####碰撞效果
粒子动画
x
y
r 随机2+2*
speedx -3 3 
speedy 同上
speedl 半径生命值 撒完了
color
canvas
cobj


prototype
draw
beginPath
arc 0 0 this.r 2*Math.PI
fill

animate
x+=speedx
y=
r-=

出血函数
传参 canvas cobj x y
[]
循环
push 创建new
散开 setInterval
循环
绘制
动画
判断
<0
arr.splice(i,1)
arr.length<1
清t
碰撞的时候出血

####游戏进阶
场景中 step--转至判断跳跃
场景中当前分数 currentstep


####音效
布局 audio
获取 

添加
场景中 audio=audio
play: 播放
paushed：暂停
