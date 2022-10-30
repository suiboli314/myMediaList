//开启页面动态加载
AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });
//获取字符串参数
 function getQueryString(name) {
	 let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	 let r = window.location.search.substr(1).match(reg);
	 console.log(r)
	 if (r != null) {
		 return r[2];
	 }
	 return null;
 }