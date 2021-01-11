option = {
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
      orient: 'vertical',
      left: 10,
      data: ['直接访问', '邮件营销', ]
  },
  series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
          show: true,
          position: 'outside',
          margin: '25%',
          alignTo: 'edge',
          // distanceToLabelLine: -100,
          formatter: function(params) {
              let res = "";
              let a = params.value;
              res = a + "\n" + params.percent + "%";
              return '{a|' + a + '台' + '}';
          },
          rich: {
              a: {
                  color: '#494949',
                  fontSize: 12,
                  fontWeight: 'normal',
                  height: 40,
                  width: 40,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 40,
                  shadowBlur: 10,
                  shadowColor: '#404040',
                  textBorderColor: 'transparent'
              },
          }
      },
      labelLine: {
          show: false
      },
      data: [{
              value: 559,
              name: '直接访问'
          },
          {
              value: 310,
              name: '邮件营销'
          },
      ]
  }]
};