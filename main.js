//将code写到pre和style标签里
function writeCode(prefix,code,fn){
	let domCode=document.querySelector('#code')
	let n=0
	let timer=setInterval(()=>{
		n+=1
		domCode.innerHTML=Prism.highlight(prefix+code.substring(0,n), Prism.languages.css)
		domCode.scrollTop=domCode.scrollHeight
		styleTag.innerHTML=prefix+code.substring(0,n)
		if(n>=code.length){
			window.clearInterval(timer)
			fn&&fn.call()
			//回调
		}		
	},10)	
}

var result=`/*
Hi
你终于打开这份简历啦
请给我1分钟时间哦
 */

/* 先来一点基本的样式 */

*{transition:all 1s}
body{
	background:rgba(222,222,222,222);
	font-size:16px
}
#code{
	border:1px solid black;
	padding:16px;
}

/* 我需要一点代码高亮 */
.token.selector{color:#690}
.token.property{color:#905}
.token.function{color:#DD4A68}

/* 加点小特效 */

#code{animation:breath 0.5s infinite alternate}

/* 接下来，我介绍一下自己吧 */
/* 先造一张白纸 */
#code{
	width:48%;
}
/* 请看右边 */
`
var result2=`
#paper{
	border:20px solid #CCB899;
	background:#eee;
}
#paper>.content{
	width:100%;
	height:100%
}
`

var md=`
 ### 自我介绍
 我是Yuki

 ---

 ### 作品链接
 第一个作品
 第二个作品

 ---

 ### 联系方式
 手机：
 邮箱：

`

writeCode('',result,()=>{
	createPaper(
		()=>{ 
			writeCode(result,result2,()=>{
				writeMarkdown(md,()=>{markToHTML(md)})
			})
		}
	)
})

function createPaper(fn){
	let paper=document.createElement('div')
	paper.id='paper'
	document.body.appendChild(paper)
	var content=document.createElement('pre')
	content.className='content'
	paper.appendChild(content)
	fn&&fn.call()
}

function writeMarkdown(md,fn){
	let domPaper=document.querySelector('#paper>.content')
	let n=0
	let timer=setInterval(()=>{
		n +=1	
		domPaper.innerHTML=md.substring(0,n)
		if(n>=md.length){
			window.clearInterval(timer)
			fn&&fn.call()
		}
	},20)

}

function markToHTML(md){
	document.querySelector('.content').innerHTML=marked(md);
}