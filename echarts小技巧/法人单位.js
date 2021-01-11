option = {
  tooltip: {
    trigger: 'axis',
    // formatter: '{a} <br/>{b}: {c} ',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['合同总额（万元）', '项目数量（个）']
  },
  color: ['#69FCFF', '#145FFF'],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'value',
    show: false,
  }],
  yAxis: [{
    type: 'category',
    axisLine: {
      show: false,
      onZero: false,

    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    data: ['浙江省第一地质大队', '周二', '周三', '周四', '周五', '周六', '周日']
  }],
  series: [

    {
      name: '合同总额（万元）',
      type: 'bar',
      stack: '总量',
      barWidth: 10, // 条形图宽度
      barMaxWidth: 10,
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 14
            }
          },
          barBorderRadius: [10, 0, 0, 10],
        }
      },
      label: {
        show: false
      },
      data: [-320, -302, -341, -374, -390, -450, -420]
    },
    {
      name: '项目数量（个）',
      type: 'bar',
      stack: '总量',
      barWidth: 10, // 条形图宽度
      barMaxWidth: 10,
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 14
            }
          },
          barBorderRadius: [0, 10, 10, 0],
        }
      },
      label: {
        show: false,
        position: 'left'
      },
      data: [120, 132, 101, 134, 190, 230, 210]
    }
  ]
};