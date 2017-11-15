const entities = [
  {
    id: 1,
    deviceId: 1,
    type: 'physical',
    SerialNumber: 'Serial Number 1',
    ModelName: 'NewPOS 8210'
  },
  {
    id: 2,
    deviceId: 2,
    type: 'physical',
    SerialNumber: 'Serial Number 2',
    ModelName: 'Petroline'
  },
  {
    id: 3,
    deviceId: 3,
    type: 'logical',
    TerminalId: 'Terminal ID 1',
    PhysicalDeviceId: 1,
    MerchantNumberX: 'MerchNum1'
  },
  {
    id: 4,
    deviceId: 4,
    type: 'logical',
    TerminalId: 'Terminal ID 2',
    PhysicalDeviceId: 2,
    MerchantNumberX: 'MerchNum2'
  },
  {
    id: 5,
    deviceId: 5,
    type: 'logical',
    TerminalId: 'Terminal ID 3',
    PhysicalDeviceId: 2,
    MerchantNumberX: 'MerchNum2'
  },
  {
    id: 6,
    deviceId: 6,
    type: 'logical',
    TerminalId: 'Terminal ID 4',
    PhysicalDeviceId: 1,
    MerchantNumberX: 'MerchNum2'
  },
  {
    id: 7,
    deviceId: 7,
    type: 'physical',
    parentId: 2,
    SerialNumber: 'Serial Number 3',
    ModelName: 'Verifone VX520'
  },
  {
    id: 8,
    deviceId: 8,
    type: 'logical',
    TerminalId: 'Terminal ID 5',
    PhysicalDeviceId: 7,
    MerchantNumberX: 'MerchNum2'
  },
  {
    id: 9,
    type: 'merchant',
    numberX: 'MerchNum1',
    name: 'Merchant 1',
    accountNumberX: 'AccNum2',
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
    addressId: 2
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
    addressId: 3
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
  }
]

export default entities
