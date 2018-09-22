const entities = [
  {
    id: 1,
    deviceId: 1,
    type: 'physical',
    serialNumber: 'Serial Number 1',
    modelName: 'NewPOS 8210',
    addressId: 1
  },
  {
    id: 2,
    deviceId: 2,
    type: 'physical',
    serialNumber: 'Serial Number 2',
    modelName: 'Petroline',
    addressId: 2 //,
    // collapsed: true
  },
  {
    id: 3,
    deviceId: 3,
    type: 'logical',
    terminalId: 'Terminal ID 1',
    physicalDeviceId: 1,
    merchantNumberX: 'MerchNum3'
  },
  {
    id: 4,
    deviceId: 4,
    type: 'logical',
    terminalId: 'Terminal ID 2',
    physicalDeviceId: 2,
    merchantNumberX: 'MerchNum2'
  },
  {
    id: 5,
    deviceId: 5,
    type: 'logical',
    terminalId: 'Terminal ID 3',
    physicalDeviceId: 2,
    merchantNumberX: 'MerchNum2'
  },
  {
    id: 6,
    deviceId: 6,
    type: 'logical',
    terminalId: 'Terminal ID 4',
    physicalDeviceId: 1,
    merchantNumberX: 'MerchNum1'
  },
  {
    id: 7,
    deviceId: 7,
    type: 'physical',
    parentId: 2,
    serialNumber: 'Serial Number 3',
    modelName: 'Verifone VX520',
    addressId: 2
  },
  {
    id: 8,
    deviceId: 8,
    type: 'logical',
    terminalId: 'Terminal ID 5',
    physicalDeviceId: 7,
    merchantNumberX: 'MerchNum2'
  },
  {
    id: 9,
    type: 'merchant',
    numberX: 'MerchNum1',
    name: 'Merchant 1',
    accountNumberX: 'AccNum1',
    addressId: 1
  },
  {
    id: 10,
    type: 'merchant',
    numberX: 'MerchNum2',
    name: 'Merchant 2',
    accountNumberX: 'AccNum3',
    addressId: 2
  },
  {
    id: 11,
    type: 'account',
    numberX: 'AccNum1',
    customerNumberX: 'CostNum1',
    name: 'Account 1',
    addressId: 1
  },
  {
    id: 12,
    type: 'account',
    numberX: 'AccNum2',
    customerNumberX: 'CostNum2',
    name: 'Account 2',
    addressId: 1
  },
  {
    id: 13,
    type: 'account',
    numberX: 'AccNum3',
    customerNumberX: 'CostNum1',
    name: 'Account 3',
    addressId: 3
  },
  {
    id: 14,
    type: 'customer',
    numberX: 'CostNum1',
    name: 'Customer 1',
    addressId: 3
  },
  {
    id: 15,
    type: 'customer',
    numberX: 'CostNum2',
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
    numberX: 'MerchNum3',
    name: 'Merchant 3',
    accountNumberX: 'AccNum2',
    addressId: 1
  }
]

export default entities
