select coalesce(row_to_json(tmp.*), '{}') from (
	select
		r."row" as "logical",
		p."row" as "physical"
	from (
		select * from "JsonDomainView" as r
		where r."row"->>'type' = 'logical' and r."row"->>'terminalId' = 'RU330008'
	) r
	left join "JsonDomainView" as p on p."row"->>'type' = 'physical' and p."row"->>'deviceId' = r."row"->>'physicalDeviceId'
) tmp
