function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "", value = "";

    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    /**
     * substring(?开始的位置，字符串结束的位置)
     * split(""):使用改方法将字符串分隔成字符数组
     */
    console.log("paramString", paraString);
    for(var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

let a = parseQueryString("https://baidu.com?t=1&c=tui loi&e=&f");
console.log(a);
