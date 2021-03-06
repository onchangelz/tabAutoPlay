/*
选项卡自动切换与滑动事件结合：
1、加载加载页面时，调用定时器事件；
2、鼠标滑过时清除定时器，并执行滑动切换；
3、鼠标离开时调用定时器；
4、代码优化，即将某一功能封装在一个函数里，并在使用的时候调用即可。
 */
function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}
window.onload=tab;
function tab()
{
	//当前高亮显示的索引
	var index=0;
	var timer=null;
    //获取所有的页签和要切换的内容
    var lis=$('notice-tit').getElementsByTagName('li');
    var divs=$('notice-con').getElementsByTagName('div');
    //遍历每一个页签，且给他们绑定事件
    for(var i=0;i<lis.length;i++)
    {
    	lis[i].id=i;
    	lis[i].onmouseover=function()
    	{
    		clearInterval(timer);
    		changeOption(this.id);
    	};
    	lis[i].onmouseout=function()
    	{
			timer=setInterval(autoPlay,2000);
    	};
    }
    //把准备等待的定时器清掉，然后再添加定时器
    if(timer)
    {
    	clearInterval(timer);
    	timer=null;
    }
	//添加定时器，改变当前高亮的索引
	timer=setInterval(autoPlay,2000);
	function autoPlay(){
		index++;
		if(index>=lis.length)
		{
			index=0;
		}
		changeOption(index);//index=1;
	}

	function changeOption(curIndex)
	{
		for(var j=0;j<lis.length;j++)
		{
			lis[j].className='';
			divs[j].style.display='none';
		}
		//高亮显示当前页签
		lis[curIndex].className='select';
		divs[curIndex].style.display='block';
		index=curIndex;
	}
}
