// 我想要的数据格式
data = {
  code: 0,
  data: [
    {
      label: '浙江省地质第一大队',
      value: 1, // 其实就是id
      children: [
        {
          label: '部门97',
          value: 4, // 其实就是id
        },
        {
          label: '浙江省地矿勘察院',
          value: 3,
          children: [] // 如果有下属部门
        }
      ]
    },
    {
      label: '地矿建设',
      value: 2,
      children: [
        {
          label: '部门4',
          value: 8,
        },
        {
          label: '浙江地质大数据应用中心',
          value: 13,
          children: [
            {

            },
            {

            }
          ]
        }
      ]
    }
  ],
  msg: "success",
  success: true
}