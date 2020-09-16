// 通过Key获取url中的参数值
var getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    console.log("r: ", r);
    if(r !=null) return unescape(r[2]);
    return null;
}

let url = getQueryString("https://w3school.cn/json?root=1234&user=mabin&phone=13359843983");
console.log("url: ", url);