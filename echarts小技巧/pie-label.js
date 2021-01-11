option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: ['50%', '70%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: true,
        formatter: '{c}',
        position: 'inside',
        // position:'outside',
        // distanceToLabelLine: -100,
        backgroundColor: '#eee',
        borderColor: 'rgb(199,86,83)',
        borderWidth: 2,
        borderRadius: 200,
        padding: [0, 50, 0, 50],
        color: '#000',
        fontSize: 14,
        shadowBlur: 3,
        lineHeight: 120,
        rich: {
          term: {
            fontSize: 18,
            color: 'rgb(199,86,83)',
          },
        }
      }
    },
    labelLine: {
      show: false
    },
    data: [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 234,
        name: '联盟广告'
      },
      {
        value: 135,
        name: '视频广告'
      },
      {
        value: 154,
        name: '搜索引擎'
      }
    ]
  }]
};