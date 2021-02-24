// .center {
//             position: absolute;
//             left: 50%;
//             top: 50%;
//             transform: translate(-50%, -50%) !important;
//         }
 
 (function () {
        var bodyWidth = document.body.offsetWidth;
        var bodyHeight = document.body.offsetHeight;
        var min = Math.min(bodyWidth, bodyHeight);
        console.log(bodyWidth, bodyHeight);
        var getRem = function () {
            document.documentElement.style.fontSize = (min * (bodyWidth > bodyHeight ? 1024 / 768 : 1) / 1024) * 100 + 'px';
        }
        setPosition();
        getRem();
        window.onresize = function () {
            getRem();
        };
 
        function setPosition() {
            //这里调整页面的大小
            var contentNodeArrLike = document.getElementsByClassName('page');
            for (var i = 0; i < contentNodeArrLike.length; i++) {
                contentNodeArrLike[i].style.width = min * (bodyWidth > bodyHeight ? 1024 / 768 : 1) + 'px';
                contentNodeArrLike[i].style.height = min * (bodyWidth > bodyHeight ? 1 : 768 / 1024) + 'px';
                contentNodeArrLike[i].classList.add('center');
            }
 
        }
    })()