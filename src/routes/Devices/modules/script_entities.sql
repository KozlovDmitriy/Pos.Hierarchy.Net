--select array_to_json(array_agg(row."row")) as "json" from (
select j."entity"::jsonb || jsonb_build_object('id', row_number() over()) as "row" from (
-- COUNTRIES
	select row_to_json(country) as "entity" from (
		select
			'country' as "type",
			c."Id" as "countryId",
			c."Name" as "name",
			(
				select count(r."Code")
				from "Region" r
				where c."Id" = r."CountryId"
			) as "regionsCount"
		from "Country" c
	) country
	union all
-- REGIONS
	select row_to_json(region) as "entity" from (
		select
			'region' as "type",
			r."Code" as "regionId",
			r."Name" as "name",
			r."CountryId" as "countryId",
			(
				select count(c."Id")
				from "City" c
				where c."RegionId" = r."Code"
			) as "citiesCount"
		from "Region" r
	) region
	union all
-- CITIES
	select row_to_json(city) as "entity" from (
		select
			'city' as "type",
			c."Id" as "cityId",
			c."Name" as "name",
			c."RegionId" as "regionId",
			(
				select count(a."Id")
				from "Address" a
				where a."CityId" = c."Id"
			) as "addressesCount"
		from "City" c
	) city
	union all
-- ADDRESSES
	select row_to_json(address) as "entity" from (
		select
			'address' as "type",
			a."Id" as "addressId",
			a."Address1" as "address1",
			a."CityId" as "cityId",
			(
				select count(tp."Id")
				from "TradePoint" tp
				where tp."Address_Id" = a."Id"
			) as "tradePointsCount",
			(
				select count(c."NumberX")
				from "Customer" c
				where c."AddressId" = a."Id"
			) as "customersCount"
		from "Address" a
	) address
	union all
-- TRADE POINTS
	select row_to_json(tradePoint) as "entity" from (
		select
			'tradePoint' as "type",
			tp."Id" as "tradePointId",
			tp."Name" as "name",
			tp."Address_Id" as "addressId",
			(
				select coalesce(array_to_json(array_agg(tpm."MerchantId")), '[]')
				from "TradePointMerchants" tpm
				where tpm."TradePointId" = tp."Id"
			) as "merchants",
			(
				select count(tpm."MerchantId")
				from "TradePointMerchants" tpm
				where tpm."TradePointId" = tp."Id"
			) as "merchantsCount"
		from "TradePoint" tp
	) tradePoint
	union all
-- CUSTOMERS
	select row_to_json(customer) as "entity" from (
		select
			'customer' as "type",
			c."NumberX" as "customerId",
			c."Name" as "name",
			c."AddressId" as "addressId",
			(
				select count(m."NumberX")
				from "Merchant" m
				where c."NumberX" = m."CustomerId"
			) as "merchantsCount",
			(
				select count(a."NumberX")
				from "Account" a
				where c."NumberX" = a."Customer_NumberX"
			) as "accountsCount"
		from "Customer" c
	) customer
	union all
-- ACCOUNTS
	select row_to_json(account) as "entity" from (
		select
			'account' as "type",
			a."NumberX" as "accountId",
			a."Name" as "name",
			a."Customer_NumberX" as "customerId",
			(
				select count(m."NumberX")
				from "Merchant" m
				where m."Account_NumberX" = a."NumberX"
			) as "merchantsCount"
		from "Account" a
	) account
	union all
-- MERCHANTS
	select row_to_json(merchant) as "entity" from (
		select
			'merchant' as "type",
			m."NumberX" as "merchantId",
			m."LName" as "name",
			m."Account_NumberX" as "accountId",
			(
				select coalesce(array_to_json(array_agg(tpm."TradePointId")), '[]')
				from "TradePointMerchants" tpm
				where tpm."MerchantId" = m."NumberX"
			) as "tradePoints",
			(
				select count(tpm."TradePointId")
				from "TradePointMerchants" tpm
				where tpm."MerchantId" = m."NumberX"
			) as "tradePointsCount",
			(
				select count(d."Id")
				from "Device" d
				where d."Merchant_NumberX" = m."NumberX"
			) as "logicalDevicesCount"
		from "Merchant" m
	) merchant
	union all
-- PHYSICAL DEVICES
	select row_to_json(pd) as "entity" from (
		select
			'physical' as "type",
			d."Id" as "deviceId",
			d."SerialNumber" as "serialNumber",
			dm."Name" as "modelName",
			tp."Id" as "tradePointId",
			(
				select dc."Parent_Id"
				from "DeviceConnection" dc
				join "Device" cd on cd."Id" = dc."Parent_Id"
				where dc."Child_Id" = d."Id" and cd."Deleted" = False
				limit 1
			) as "parentId",
			(
				select count(dc."Child_Id")
				from "DeviceConnection" dc
				join "Device" cd on cd."Id" = dc."Child_Id"
				where dc."Parent_Id" = d."Id" and cd."Deleted" = False
				limit 1
			) as "childsCount",
			(
				select count(ld."Id")
				from "Device" ld
				where ld."PhysicalDevice_Id" = d."Id"
			) as "logicalDevicesCount"
		from "Device" d
		join "DeviceType" dt on dt."Id" = d."DeviceType_Id"
		join "DeviceBehavior" db on db."Id" = dt."DeviceBehavior_Id"
		join "DeviceModel" dm on dm."Id" = dt."DeviceModel_Id"
		left join "TradePoint" tp on tp."Id" = d."TradePoint_Id"
		where db."IsPhysical" = True and d."Deleted" = False
	) pd
	union all
-- LOGICAL DEVICES
	select row_to_json(ld) as "entity" from (
		select
			'logical' as "type",
			d."Id" as "deviceId",
			d."TerminalId" as "terminalId",
			d."PhysicalDevice_Id" as "physicalDeviceId",
			d."Merchant_NumberX" as "merchantId"
		from "Device" d
		join "DeviceType" dt on dt."Id" = d."DeviceType_Id"
		join "DeviceBehavior" db on db."Id" = dt."DeviceBehavior_Id"
		where db."IsLogical" = True and d."Deleted" = False
	) ld
) j
--) row
