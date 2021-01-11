_this.map1.on('georoam',function(params){
          console.log('滑动效果', params)
          let option = _this.map1.getOption()
          if(params.zoom!=null&&params.zoom!=undefined){
            option.geo[0].zoom=option.geo[1].zoom
            option.geo[0].center=option.geo[1].center
          }else{
            option.geo[0].center=option.geo[1].center
          }
          _this.map1.setOption(option)
        })