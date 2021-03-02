def getSubsidy(k, b, m, c):
  rx = [-k, k*(m-c)-b, b*(m-c)]
  rpx = [-2*k, k*(m-c)-b]
  result = -rpx[1]/rpx[0]
  print(result)
  return -rpx[1]/rpx[0]

getSubsidy(0.05, 0.2, 16, 8)