option = {
    backgroundColor: '#111',
    title: [{
        text: '60%',
        x: 'center',
        top: '45%',
        textStyle: {
            fontSize: '50',
            color: '#ffffff',
            fontFamily: 'PangMenZhengDao-3',
            foontWeight: '600',
        },
    }],
    polar: {
        radius: ['44%', '50%'],
        center: ['50%', '50%'],
    },
    angleAxis: {
        max: 100,
        show: false,
    },
    radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,

        },
        axisTick: {
            show: false
        },
    },
    series: [{
        name: '',
        type: 'bar',
        roundCap: true,
        barWidth: 60,
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(66, 66, 66, .3)',
        },
        data: [40],
        coordinateSystem: 'polar',

        itemStyle: {
            normal: {
                color: '#6536FC',
            }
        }

    }]
};