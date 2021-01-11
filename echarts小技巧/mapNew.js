option = {
    backgroundColor: '#000', //画布背景颜色
    geo: {
        show: true,
        map: 'china',
        zoom: 1.1,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                // areaColor: '#01215c',
                areaColor: {
                    type: 'radial',
                    x: 700,
                    y: 520,
                    r: 300,
                    colorStops: [{
                        offset: 0,
                        color: '#0D72D3' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#08184C' // 100% 处的颜色
                    }],
                    global: true // 缺省为 false
                },
                borderWidth: 5, //设置外层边框
                borderColor: '#46DEFF',
                shadowColor: '#13527D',
                shadowOffsetX: 6,
                shadowOffsetY: 6
            },
            emphasis: {
                show: true,
                areaColor: {
                    type: 'radial',
                    x: 700,
                    y: 520,
                    r: 300,
                    colorStops: [{
                        offset: 0,
                        color: '#0D72D3' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#08184C' // 100% 处的颜色
                    }],
                    global: true // 缺省为 false
                },
            }

        },
        regions: [{
            name: '南海诸岛',
            itemStyle: {
                areaColor: 'rgba(0, 10, 52, 1)',
                borderColor: '#46DEFF',
                normal: {
                    opacity: 0,
                    label: {
                        show: false,
                        color: "#76EAFF",
                    }
                }
            },
        }]
    },
    series: [{
        type: 'map',
        map: 'china',
        geoIndex: 1,
        aspectScale: 0.75, //长宽比
        zoom: 1.1,
        showLegendSymbol: false, // 存在legend时显示
        label: {
            normal: {
                show: true,
                color: '#fff'
            },
            emphasis: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#092462'
                        }, {
                            offset: 1,
                            color: '#1A8FDE'
                        }],
                        global: false
                    }
                },
                borderColor: '#2581C1', // 内省份边界
                borderWidth: 1
            },
            emphasis: {
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: '#5DAAFF'
                    }, {
                        offset: 1,
                        color: '#0D75C0'
                    }]
                },
                borderColor: '#FFF467',
                borderWidth: 2
            }
        },
    }]
}

let options = {
  backgroundColor: '#000', //画布背景颜色
  tooltip: {
    show: false
  },
  geo: {
    map: 'china', // 地图类型
    show: true, // 是否显示地理坐标系组件
    aspectScale: 0.75, //用于scale地图的长宽比
    zoom: 1.1, // 地图缩放比例
    roam: false, // 是否开启鼠标和平移漫游，默认不开启
    itemStyle: {
      normal: {
        areaColor: {
          type: 'radial',
          x: 700,
          y: 520,
          r: 300,
          colorStops: [{
            offset: 0,
            color: '#0D72D3' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#08184C' // 100% 处的颜色
          }],
          global: true // 缺省为 false
        },
        borderWidth: 4, //设置外层边框
        borderColor: '#46DEFF',
        shadowColor: '#13527D',
        shadowOffsetX: 6,
        shadowOffsetY: 6
      },
      emphasis: {
          show: true,
          areaColor: {
              type: 'radial',
              x: 700,
          y: 520,
          r: 300,
          colorStops: [{
            offset: 0,
            color: '#0D72D3' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#08184C' // 100% 处的颜色
          }],
          },
      }
  },
    regions: [{
      name: '南海诸岛',
      itemStyle: {
        areaColor: 'rgba(0, 10, 52, 1)',
        borderColor: '#46DEFF',
        normal: {
          opacity: 0,
          label: {
            show: false,
            color: "#76EAFF",
          }
        }
      },
    }]
  },
  series: [
  {
    type: 'map',
    map: 'china', //使用
    roam: false,
    label: {
      normal: {
        show: true,
        textStyle: { // 未选中时，省份名字颜色
          color: '#ffffff'
        }
      },
      emphasis: {
        textStyle: { // 选中时，省份名字颜色
          color: '#ffffff'
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0,
              color: '#092462'
            }, {
              offset: 1,
              color: '#1A8FDE'
            }],
          global: false
        }
      },
      borderColor: '#2581C1', // 内省份边界
      borderWidth: 1,
      },
      emphasis: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0,
            color: '#5DAAFF'
          },{
            offset: 1,
            color: '#0D75C0'
          }]
        },
        borderColor: '#FFF467',
        borderWidth: 2
      }
    },
    zoom: 1.1,
    data: this.mapData
  },
  {
    name: '',
    type: 'scatter', // 气泡图
    coordinateSystem: 'geo', // 使用地理坐标系
    // symbol: 'pin',
    symbol: 'image://'+ countImg,
    symbolSize: [40,74],
    // symbolKeepAspect: true, // 缩放时保持比例
    symbolOffset: [0,'-50%'], // 偏移量
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 16,
          padding: [-29, 0, 0, 0],
          fontStyle: 'normal',
          fontWeight: 'bolder',
          fontFamil: 'PangMenZhengDao'
        },
        formatter (value){
          return value.data.value[2]
        }
      }
    },
    itemStyle: {
      normal: {
        color: '#D8BC37', //标志颜色
      }
    },
    data: convertData(this.mapData),
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    zlevel: 1
  },
  ]
}