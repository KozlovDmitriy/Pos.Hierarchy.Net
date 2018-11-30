const getLogicalByPhysical =
  (n, m) => n.deviceId === m.physicalDeviceId

const getPhysicalByLogical =
  (n, m) => m.deviceId === n.physicalDeviceId

const getMerchantByLogical =
  (n, m) => n.merchantId === m.merchantId

const getLogicalByMerchant =
  getMerchantByLogical

const getAccountByMecrhant =
  (n, m) => n.accountId === m.accountId

const getMerchantByAccount =
  getAccountByMecrhant

const getCustomerByAccount =
  (n, m) => n.customerId === m.customerId

const getAccountByCustomer =
  getCustomerByAccount

const getAddressByEntity =
  (n, m) => n.addressId === m.addressId

const getEntityByAddress =
  getAddressByEntity

const getCityByAddress =
  (n, m) => n.cityId === m.cityId

const getAddressByCity =
  getCityByAddress

const getRegionByCity =
  (n, m) => n.regionId === m.regionId

const getCityByRegion =
  getRegionByCity

const getCountryByRegion =
  (n, m) => n.countryId === m.countryId

const getRegionByCountry =
  getCountryByRegion

const getPhysicalByPhysical =
  (n, m) => n.parentId === m.deviceId

const getPhysicalByPhysicalDown =
  (n, m) => n.deviceId === m.parentId

const getTradePointByPhysicalDevice =
  (n, m) => n.tradePointId === m.tradePointId

const getPhysicalDeviceByTradePoint =
  getTradePointByPhysicalDevice

const isMerchantWithCustomerConnected =
  (m, c) => m.customerId === c.customerId

const isCustomerWithMerchantConnected =
  (c, m) => isMerchantWithCustomerConnected(m, c)

const isMerchantWithTradePointConnected = (m, tp) =>
  m.tradePoints.indexOf(tp.tradePointId) !== -1 ||
  tp.merchants.indexOf(m.merchantId) !== -1

const isTradePointWithMerchantConnected = (tp, m) =>
  isMerchantWithTradePointConnected(m, tp)

const filterBySubstring = (v, f) =>
  v.toLowerCase().includes(f.toLowerCase())

const filterByEqual = (v, f) => v === f

export default class ConnectionRules {
  constructor () {
    this.connections = {
      physical: [
        { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: false, up: true },
        { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: false, up: false },
        { type: 'tradePoint', expr: getTradePointByPhysicalDevice, isRec: true, isCycle: true, up: true },
        { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: true },
        { type: 'physical', expr: getPhysicalByPhysicalDown, isRec: true, isCycle: true, up: false },
        { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: false, notForCollapse: true }
      ],
      logical: [
        { type: 'merchant', expr: getMerchantByLogical, isRec: true, isCycle: true, up: true, notForCollapse: true },
        { type: 'physical', expr: getPhysicalByLogical, isRec: true, isCycle: true, up: false }
      ],
      merchant: [
        { type: 'customer', expr: isMerchantWithCustomerConnected, isRec: true, isCycle: true, up: true },
        { type: 'account', expr: getAccountByMecrhant, isRec: true, isCycle: true, up: true },
        { type: 'logical', expr: getLogicalByMerchant, isRec: true, isCycle: true, up: false },
        { type: 'tradePoint', expr: isMerchantWithTradePointConnected, isRec: true, isCycle: true, up: false }
      ],
      account: [
        { type: 'customer', expr: getCustomerByAccount, isRec: true, isCycle: true, up: true },
        { type: 'merchant', expr: getMerchantByAccount, isRec: true, isCycle: true, up: false }
      ],
      customer: [
        { type: 'address', expr: getAddressByEntity, isRec: false, isCycle: true, up: true },
        { type: 'account', expr: getAccountByCustomer, isRec: true, isCycle: true, up: false },
        { type: 'merchant', expr: isCustomerWithMerchantConnected, isRec: true, isCycle: true, up: false }
      ],
      address: [
        { type: 'city', expr: getCityByAddress, isRec: true, isCycle: true, up: true },
        { type: 'customer', expr: getEntityByAddress, isRec: true, isCycle: true, up: false },
        { type: 'tradePoint', expr: getEntityByAddress, isRec: true, isCycle: true, up: false }
      ],
      tradePoint: [
        { type: 'physical', expr: getPhysicalDeviceByTradePoint, isRec: true, isCycle: true, up: false },
        { type: 'address', expr: getAddressByEntity, isRec: true, isCycle: true, up: true },
        { type: 'merchant', expr: isTradePointWithMerchantConnected, isRec: false, isCycle: true, up: true }
      ],
      city: [
        { type: 'region', expr: getRegionByCity, isRec: true, isCycle: true, up: true },
        { type: 'address', expr: getAddressByCity, isRec: true, isCycle: true, up: false }
      ],
      region: [
        { type: 'country', expr: getCountryByRegion, isRec: true, isCycle: true, up: true },
        { type: 'city', expr: getCityByRegion, isRec: true, isCycle: true, up: false }
      ],
      country: [
        { type: 'region', expr: getRegionByCountry, isRec: true, isCycle: true, up: false }
      ]
    }
    this.filterRules = {
      logical: [
        {
          filter: 'terminalId',
          type: 'logical',
          field: 'terminalId',
          try: filterBySubstring,
          showSiblings: false
        },
        {
          filter: 'logicalDeviceTypeId',
          type: 'logical',
          field: 'deviceTypeId',
          try: filterByEqual,
          showSiblings: false
        }
      ],
      merchant: [
        {
          filter: 'merchant',
          type: 'merchant',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      account: [
        {
          filter: 'account',
          type: 'account',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      customer: [
        {
          filter: 'customer',
          type: 'customer',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      address: [
        {
          filter: 'address',
          type: 'address',
          field: 'address1',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      city: [
        {
          filter: 'city',
          type: 'city',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      region: [
        {
          filter: 'region',
          type: 'region',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ],
      country: [
        {
          filter: 'countryId',
          type: 'country',
          field: 'countryId',
          try: filterByEqual,
          showSiblings: false
        },
        {
          filter: 'country',
          type: 'country',
          field: 'name',
          try: filterBySubstring,
          showSiblings: false
        }
      ]
    }
  }

  connectionsInitialize = (withPpdConnections) => {
    this.connections.physical = [
      { type: 'tradePoint', expr: getTradePointByPhysicalDevice, isRec: true, isCycle: true, up: true },
      { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: true },
      { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: false }
    ]
    if (withPpdConnections) {
      this.connections['physical'].push(
        { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: true }
      )
      this.connections['physical'].push(
        { type: 'physical', expr: getPhysicalByPhysicalDown, isRec: true, isCycle: true, up: false }
      )
      this.connections['physical'].push(
        { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: false, notForCollapse: true }
      )
    }
  }

  fiterRulesInitialize = (withSiblings) => {
    this.filterRules['physical'] = [
      {
        filter: 'physicalDeviceTypeId',
        type: 'physical',
        field: 'deviceTypeId',
        try: filterByEqual,
        showSiblings: withSiblings
      },
      {
        filter: 'serialNumber',
        type: 'physical',
        field: 'serialNumber',
        try: filterBySubstring,
        showSiblings: withSiblings
      }
    ]
  }

  getAllTypes = () => Object.keys(this.connections)

  /**
   * Получает массив типов соединений,
   * для узлов которые могут быть связаны на одном уровне
   * и имеют переданный тип
   * @param nodeType тип узла
   * @return массив типов соединений
   */
  getSiblingConnectionTypes = (nodeType) =>
    this.connections[nodeType].filter(i => i.type === nodeType)

  /**
   * Возвращает все возможные соединения по типу узла и направлению (соединения вверх или вниз)
   * @param type тип узла для соединения
   * @param isUp true - искать вверх, false - искать вниз
   * @return массив типов соединений
   */
  filterConnectionRulesByDirectionAndType = (type, isUp) =>
    this.connections[type].filter(i => i.up === isUp)

  /**
   * Возвращает все возможные соединения вверх по типу узла
   * @param type тип узла для соединения
   * @return массив типов соединений
   */
  getAllUpConnectionRulesByType = (type) =>
    this.filterConnectionRulesByDirectionAndType(type, true)

  /**
   * Возвращает все возможные соединения вниз по типу узла
   * @param type тип узла для соединения
   * @return массив типов соединений
   */
  getAllDownConnectionRulesByType = (type) =>
    this.filterConnectionRulesByDirectionAndType(type, false)

  /**
   * Возвращает все возможные соединения вниз по типу узла
   * @param type тип узла для соединения
   * @return массив типов соединений
   */
  getAllConnectionRulesForCollapse = (type) =>
    this
      .getAllDownConnectionRulesByType(type)
      .filter(i => !i.notForCollapse)

  findFilterRulesByFilter = (filterName) =>
    Object.keys(this.filterRules)
      .filter(r => this.filterRules[r].find(a => a.filter === filterName) !== void 0)

  findFilterRuleByTypeAndFilter = (type, filter) =>
    this.filterRules[type].find(cr => cr.filter === filter)
}
