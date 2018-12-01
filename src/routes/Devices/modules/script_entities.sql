-- HIERACHY

CREATE OR REPLACE VIEW public."JsonDomainHierarchyView" AS
   SELECT
    logical."row" AS logical,
    physical."row" AS physical,
    child_physical."row" AS child_physical,
    child_logical."row" AS child_logical,
    merchant."row" AS merchant,
    account."row" AS account,
    customer."row" AS customer,
    tradepoint."row" AS "tradePoint",
    tradepointaddress."row" AS "tradePointAddress",
    tradepointcity."row" AS "tradePointCity",
    tradepointregion."row" AS "tradePointRegion",
    tradepointcountry."row" AS "tradePointCountry",
    customeraddress."row" AS "customerAddress",
    customercity."row" AS "customerCity",
    customerregion."row" AS "customerRegion",
    customercountry."row" AS "customerCountry",
    parent_physical."row" AS parent_physical,
    parent_logical."row" AS parent_logical
   FROM "JsonPhysicalView" physical
   JOIN "JsonLogicalView" logical ON (physical."row" ->> 'deviceId'::text) = (logical."row" ->> 'physicalDeviceId'::text)
   JOIN "JsonMerchantView" merchant ON (merchant."row" ->> 'merchantId'::text) = (logical."row" ->> 'merchantId'::text)
   -- Customer
   JOIN "JsonCustomerView" customer ON (customer."row" ->> 'customerId'::text) = (merchant."row" ->> 'customerId'::text)
   LEFT JOIN "JsonAddressView" customeraddress ON (customeraddress."row" ->> 'addressId'::text) = (customer."row" ->> 'addressId'::text)
   LEFT JOIN "JsonCityView" customercity ON (customercity."row" ->> 'cityId'::text) = (customeraddress."row" ->> 'cityId'::text)
   LEFT JOIN "JsonRegionView" customerregion ON (customerregion."row" ->> 'regionId'::text) = (customercity."row" ->> 'regionId'::text)
   LEFT JOIN "JsonCountryView" customercountry ON (customercountry."row" ->> 'countryId'::text) = (customerregion."row" ->> 'countryId'::text)
   -- Trade point
   LEFT JOIN "JsonTradePointView" tradepoint ON (tradepoint."row" ->> 'tradePointId'::text) = (physical."row" ->> 'tradePointId'::text)
   LEFT JOIN "JsonAddressView" tradepointaddress ON (tradepointaddress."row" ->> 'addressId'::text) = (tradepoint."row" ->> 'addressId'::text)
   LEFT JOIN "JsonCityView" tradepointcity ON (tradepointcity."row" ->> 'cityId'::text) = (tradepointaddress."row" ->> 'cityId'::text)
   LEFT JOIN "JsonRegionView" tradepointregion ON (tradepointregion."row" ->> 'regionId'::text) = (tradepointcity."row" ->> 'regionId'::text)
   LEFT JOIN "JsonCountryView" tradepointcountry ON (tradepointcountry."row" ->> 'countryId'::text) = (tradepointregion."row" ->> 'countryId'::text)
   -- Other
   LEFT JOIN "JsonAccountView" account ON (account."row" ->> 'accountId'::text) = (merchant."row" ->> 'accountId'::text)
   LEFT JOIN "JsonPhysicalView" child_physical ON (child_physical."row" ->> 'parentId'::text) = (physical."row" ->> 'deviceId'::text)
   LEFT JOIN "JsonLogicalView" child_logical ON (child_logical."row" ->> 'physicalDeviceId'::text) = (child_physical."row" ->> 'deviceId'::text)
   LEFT JOIN "JsonPhysicalView" parent_physical ON (parent_physical."row" ->> 'deviceId'::text) = (physical."row" ->> 'parentId'::text)
   LEFT JOIN "JsonLogicalView" parent_logical ON (parent_logical."row" ->> 'physicalDeviceId'::text) = (parent_physical."row" ->> 'deviceId'::text);

-- DOMAIN
CREATE OR REPLACE VIEW public."JsonCountryView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(country.*) AS entity
   FROM ( SELECT 'country' AS type,
	    c."Id" AS "countryId",
	    c."Name" AS name,
	    ( SELECT count(r."Code") AS count
		   FROM "Region" r
		  WHERE c."Id" = r."CountryId") AS "regionsCount"
	   FROM "Country" c) country
) j;

CREATE OR REPLACE VIEW public."JsonRegionView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(region.*) AS entity
   FROM ( SELECT 'region' AS type,
	    r."Code" AS "regionId",
	    r."Name" AS name,
	    r."CountryId" AS "countryId",
	    ( SELECT count(c."Id") AS count
		   FROM "City" c
		  WHERE c."RegionId" = r."Code") AS "citiesCount"
	   FROM "Region" r) region
) j;

 CREATE OR REPLACE VIEW public."JsonCityView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(city.*) AS entity
   FROM ( SELECT 'city' AS type,
	    c."Id" AS "cityId",
	    c."Name" AS name,
	    c."RegionId" AS "regionId",
	    ( SELECT count(a."Id") AS count
		   FROM "Address" a
		  WHERE a."CityId" = c."Id") AS "addressesCount"
	   FROM "City" c) city
) j;

 CREATE OR REPLACE VIEW public."JsonAddressView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(address.*) AS entity
   FROM ( SELECT 'address' AS type,
	    a."Id" AS "addressId",
	    a."Address1" AS address1,
	    a."CityId" AS "cityId",
	    ( SELECT count(tp."Id") AS count
		   FROM "TradePoint" tp
		  WHERE tp."Address_Id" = a."Id") AS "tradePointsCount",
	    ( SELECT count(c."NumberX") AS count
		   FROM "Customer" c
		  WHERE c."AddressId" = a."Id") AS "customersCount"
	   FROM "Address" a) address
) j;

 CREATE OR REPLACE VIEW public."JsonTradePointView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(tradepoint.*) AS entity
   FROM ( SELECT 'tradePoint' AS type,
	    tp."Id" AS "tradePointId",
	    tp."Name" AS name,
	    tp."Address_Id" AS "addressId",
	    ( SELECT COALESCE(array_to_json(array_agg(tpm."MerchantId")), '[]'::json) AS "coalesce"
		   FROM "TradePointMerchants" tpm
		  WHERE tpm."TradePointId" = tp."Id") AS merchants,
	    ( SELECT count(tpm."MerchantId") AS count
		   FROM "TradePointMerchants" tpm
		  WHERE tpm."TradePointId" = tp."Id") AS "merchantsCount",
	    ( SELECT count(d."Id") AS count
		   FROM "Device" d
		  WHERE d."TradePoint_Id" = tp."Id" AND d."Deleted" = false) AS "devicesCount"
	   FROM "TradePoint" tp) tradepoint
) j;

 CREATE OR REPLACE VIEW public."JsonCustomerView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(customer.*) AS entity
   FROM ( SELECT 'customer' AS type,
	    c."NumberX" AS "customerId",
	    c."Name" AS name,
	    c."AddressId" AS "addressId",
	    ( SELECT count(m."NumberX") AS count
		   FROM "Merchant" m
		  WHERE c."NumberX" = m."CustomerId") AS "merchantsCount",
	    ( SELECT count(a."NumberX") AS count
		   FROM "Account" a
		  WHERE c."NumberX" = a."Customer_NumberX") AS "accountsCount"
	   FROM "Customer" c) customer
) j;

 CREATE OR REPLACE VIEW public."JsonAccountView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(account.*) AS entity
   FROM ( SELECT 'account' AS type,
	    a."NumberX" AS "accountId",
	    a."Name" AS name,
	    a."Customer_NumberX" AS "customerId",
	    ( SELECT count(m."NumberX") AS count
		   FROM "Merchant" m
		  WHERE m."Account_NumberX" = a."NumberX") AS "merchantsCount"
	   FROM "Account" a) account
) j;

CREATE OR REPLACE VIEW public."JsonMerchantView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(merchant.*) AS entity
   FROM ( SELECT 'merchant' AS type,
	    m."NumberX" AS "merchantId",
	    m."LName" AS name,
	    m."Account_NumberX" AS "accountId",
	    m."CustomerId" AS "customerId",
	    ( SELECT COALESCE(array_to_json(array_agg(tpm."TradePointId")), '[]'::json) AS "coalesce"
		   FROM "TradePointMerchants" tpm
		  WHERE tpm."MerchantId" = m."NumberX") AS "tradePoints",
	    ( SELECT count(tpm."TradePointId") AS count
		   FROM "TradePointMerchants" tpm
		  WHERE tpm."MerchantId" = m."NumberX") AS "tradePointsCount",
	    ( SELECT count(d."Id") AS count
		   FROM "Device" d
		  WHERE d."Merchant_NumberX" = m."NumberX" AND d."Deleted" = false) AS "logicalDevicesCount"
	   FROM "Merchant" m) merchant
) j;

CREATE OR REPLACE VIEW public."JsonPhysicalView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(pd.*) AS entity
   FROM ( SELECT 'physical' AS type,
	    d."Id" AS "deviceId",
	    d."SerialNumber" AS "serialNumber",
	    dm."Name" AS "modelName",
	    tp."Id" AS "tradePointId",
	    ( SELECT dc."Parent_Id"
		   FROM "DeviceConnection" dc
		     JOIN "Device" cd ON cd."Id" = dc."Parent_Id"
		  WHERE dc."Child_Id" = d."Id" AND cd."Deleted" = false
		 LIMIT 1) AS "parentId",
	    ( SELECT count(dc."Child_Id") AS count
		   FROM "DeviceConnection" dc
		     JOIN "Device" cd ON cd."Id" = dc."Child_Id"
		  WHERE dc."Parent_Id" = d."Id" AND cd."Deleted" = false
		 LIMIT 1) AS "childsCount",
	    ( SELECT count(ld."Id") AS count
		   FROM "Device" ld
		  WHERE ld."PhysicalDevice_Id" = d."Id") AS "logicalDevicesCount",
	    1 AS "devicesCount"
	   FROM "Device" d
	     JOIN "DeviceType" dt ON dt."Id" = d."DeviceType_Id"
	     JOIN "DeviceBehavior" db ON db."Id" = dt."DeviceBehavior_Id"
	     JOIN "DeviceModel" dm ON dm."Id" = dt."DeviceModel_Id"
	     LEFT JOIN "TradePoint" tp ON tp."Id" = d."TradePoint_Id"
	  WHERE db."IsPhysical" = true AND d."Deleted" = false) pd
) j;

CREATE OR REPLACE VIEW public."JsonLogicalView" AS
 SELECT j.entity::jsonb || jsonb_build_object('id', md5(j.entity::text)) AS "row"
 FROM (
   SELECT row_to_json(ld.*) AS entity
   FROM ( SELECT 'logical' AS type,
	    d."Id" AS "deviceId",
	    d."TerminalId" AS "terminalId",
	    d."PhysicalDevice_Id" AS "physicalDeviceId",
	    d."Merchant_NumberX" AS "merchantId",
	    1 AS "devicesCount"
	   FROM "Device" d
	     JOIN "DeviceType" dt ON dt."Id" = d."DeviceType_Id"
	     JOIN "DeviceBehavior" db ON db."Id" = dt."DeviceBehavior_Id"
	  WHERE db."IsLogical" = true AND d."Deleted" = false) ld
) j;

--DELETE VIEW IF EXISTS public."JsonDomainView";
CREATE OR REPLACE VIEW public."JsonDomainView" AS
 SELECT * FROM public."JsonCountryView"
 UNION ALL
 SELECT * FROM public."JsonRegionView"
 UNION ALL
 SELECT * FROM public."JsonCityView"
 UNION ALL
 SELECT * FROM public."JsonAddressView"
 UNION ALL
 SELECT * FROM public."JsonTradePointView"
 UNION ALL
 SELECT * FROM public."JsonCustomerView"
 UNION ALL
 SELECT * FROM public."JsonAccountView"
 UNION ALL
 SELECT * FROM public."JsonMerchantView"
 UNION ALL
 SELECT * FROM public."JsonPhysicalView"
 UNION ALL
 SELECT * FROM public."JsonLogicalView";

--before

CREATE OR REPLACE VIEW public."JsonDomainView" AS
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
			) as "merchantsCount",
			(
				select count(d."Id")
				from "Device" d
				where d."TradePoint_Id" = tp."Id" and d."Deleted" = False
			) as "devicesCount"
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
			m."CustomerId" as "customerId",
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
				where d."Merchant_NumberX" = m."NumberX" and d."Deleted" = False
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
			) as "logicalDevicesCount",
			1 as "devicesCount"
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
			d."Merchant_NumberX" as "merchantId",
			1 as "devicesCount"
		from "Device" d
		join "DeviceType" dt on dt."Id" = d."DeviceType_Id"
		join "DeviceBehavior" db on db."Id" = dt."DeviceBehavior_Id"
		where db."IsLogical" = True and d."Deleted" = False
	) ld
) j
--) row
