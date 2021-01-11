let title = '地域分布';

option = {
    backgroundColor: '#051F54',
    title: {
        text: '{c|'+ title +'}',
        x: 'center',
        y: 'center',
        textStyle: {
            rich:{
                
                c: {
                    fontSize: 28,
                    color: '#ffffff',
                    padding: [5,0]
                }
            }
        }
    },
    series: [
        {
            type: 'gauge',
            radius: '60%',
            clockwise: false,
            startAngle: '0',
            endAngle: 359.999,
            splitNumber: 80,
            detail: {
                offsetCenter: [0, -20],
                formatter: ' '
            },
            pointer: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: [[0.2, '#c23531'],
                    [0.4, '#FF82BF'],
                    [0.6, '#7FEF7D'],
                    [0.8, '#63869e'],
                    [0.9, '#FFE169'],
                    [1, '#91c7ae']],
                    width: 30
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                length: 32,
                lineStyle: {
                    color: '#051F54',
                    width: 6
                }
            },
            axisLabel: {
                show: false
            }
        },
        {
            type: 'pie',
            name: '内层细圆环',
            radius: ['43%', '45%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
 
 
                     // 0% 处的颜色   
                    offset: 0, color: '#0B2D89'  },
                   {
                    
                    // 100% 处的颜色
                   offset: 1, color: '#437ABB' 
                  }], false)

                }
            },
            label: {
                show: false
            },
            data: [100]
        },
        {
            type: 'pie',
            name: '内层环',
            radius: [0, '43%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    color: '#02163F'
                }
            },
            label: {
                show: false
            },
            data: [100]
        }
    ]
};