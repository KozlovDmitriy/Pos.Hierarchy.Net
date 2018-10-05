const entities = [
  {
    id: 1,
    deviceId: 1,
    type: 'physical',
    serialNumber: 'Serial Number 1',
    modelName: 'NewPOS 8210',
    tradePointId: 'tp2'
  },
  {
    id: 2,
    deviceId: 2,
    type: 'physical',
    serialNumber: 'Serial Number 2',
    modelName: 'Petroline',
    tradePointId: 'tp1'
  },
  {
    id: 3,
    deviceId: 3,
    type: 'logical',
    terminalId: 'Terminal ID 1',
    physicalDeviceId: 1,
    merchantId: 'MerchNum3'
  },
  {
    id: 4,
    deviceId: 4,
    type: 'logical',
    terminalId: 'Terminal ID 2',
    physicalDeviceId: 2,
    merchantId: 'MerchNum2'
  },
  {
    id: 5,
    deviceId: 5,
    type: 'logical',
    terminalId: 'Terminal ID 3',
    physicalDeviceId: 2,
    merchantId: 'MerchNum2'
  },
  {
    id: 6,
    deviceId: 6,
    type: 'logical',
    terminalId: 'Terminal ID 4',
    physicalDeviceId: 1,
    merchantId: 'MerchNum1'
  },
  {
    id: 7,
    deviceId: 7,
    type: 'physical',
    parentId: 2,
    serialNumber: 'Serial Number 3',
    modelName: 'Verifone VX520',
    tradePointId: 'tp1'
  },
  {
    id: 8,
    deviceId: 8,
    type: 'logical',
    terminalId: 'Terminal ID 5',
    physicalDeviceId: 7,
    merchantId: 'MerchNum2'
  },
  {
    id: 9,
    type: 'merchant',
    merchantId: 'MerchNum1',
    customerId: 'CostNum1',
    name: 'Merchant 1',
    accountId: 'AccNum1',
    tradePoints: ['tp1', 'trade point 2']
  },
  {
    id: 10,
    type: 'merchant',
    merchantId: 'MerchNum2',
    customerId: 'CostNum1',
    name: 'Merchant 2',
    accountId: 'AccNum3',
    tradePoints: ['tp1']
  },
  {
    id: 11,
    type: 'account',
    accountId: 'AccNum1',
    customerId: 'CostNum1',
    name: 'Account 1'
  },
  {
    id: 12,
    type: 'account',
    accountId: 'AccNum2',
    customerId: 'CostNum2',
    name: 'Account 2'
  },
  {
    id: 13,
    type: 'account',
    accountId: 'AccNum3',
    customerId: 'CostNum1',
    name: 'Account 3'
  },
  {
    id: 14,
    type: 'customer',
    customerId: 'CostNum1',
    name: 'Customer 1',
    addressId: 3
  },
  {
    id: 15,
    type: 'customer',
    customerId: 'CostNum2',
    name: 'Customer 2',
    addressId: 1/* ,
    collapsed: true */
  },
  {
    id: 16,
    type: 'address',
    address1: 'ул. Ленина, 92',
    addressId: 1,
    cityId: 1
  },
  {
    id: 17,
    type: 'address',
    address1: 'ул. Генерала Гуртьева, 3',
    addressId: 2,
    cityId: 1
  },
  {
    id: 18,
    type: 'city',
    name: 'Волгоград',
    cityId: 1,
    regionId: 1
  },
  {
    id: 19,
    type: 'region',
    name: 'Волгоградская область',
    regionId: 1,
    countryId: 1
  },
  {
    id: 20,
    type: 'country',
    name: 'Россия',
    countryId: 1
  },
  {
    id: 21,
    type: 'address',
    address1: 'ул. Аэропортовская, 2',
    addressId: 3,
    cityId: 2
  },
  {
    id: 22,
    type: 'city',
    name: 'Москва',
    cityId: 2,
    regionId: 2
  },
  {
    id: 23,
    type: 'region',
    name: 'Московская область',
    regionId: 2,
    countryId: 1
  },
  {
    id: 24,
    type: 'merchant',
    merchantId: 'MerchNum3',
    customerId: 'CostNum2',
    name: 'Merchant 3',
    accountId: 'AccNum2',
    tradePoints: ['tp2']
  },
  {
    id: 25,
    type: 'tradePoint',
    tradePointId: 'tp1',
    name: 'trade point 1',
    merchants: ['MerchNum1, MerchNum2'],
    addressId: 1
  },
  {
    id: 26,
    type: 'tradePoint',
    tradePointId: 'tp2',
    name: 'trade point 2',
    merchants: ['MerchNum1', 'MerchNum3'],
    addressId: 2
  }
]

export default entities
