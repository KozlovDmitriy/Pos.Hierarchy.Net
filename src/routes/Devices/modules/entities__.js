const entities = [
  {
    "id": 1,
    "name": "Марокко",
    "type": "country",
    "countryId": 30,
    "regionsCount": 0
  },
  {
    "id": 2,
    "name": "Кения",
    "type": "country",
    "countryId": 31,
    "regionsCount": 2
  },
  {
    "id": 3,
    "name": "Эфиопия",
    "type": "country",
    "countryId": 32,
    "regionsCount": 1
  },
  {
    "id": 4,
    "name": "Литва",
    "type": "country",
    "countryId": 33,
    "regionsCount": 1
  },
  {
    "id": 5,
    "name": "Уганда",
    "type": "country",
    "countryId": 34,
    "regionsCount": 1
  },
  {
    "id": 6,
    "name": "Россия",
    "type": "country",
    "countryId": 29,
    "regionsCount": 11
  },
  {
    "id": 7,
    "name": "ВАКАНДА",
    "type": "country",
    "countryId": 82,
    "regionsCount": 1
  },
  {
    "id": 8,
    "name": "fsgfbvxcv",
    "type": "country",
    "countryId": 35,
    "regionsCount": 1
  },
  {
    "id": 9,
    "name": "РФ",
    "type": "country",
    "countryId": 36,
    "regionsCount": 2
  },
  {
    "id": 10,
    "name": "[licard country]",
    "type": "country",
    "countryId": 27,
    "regionsCount": 1
  },
  {
    "id": 11,
    "name": "ЗАКАРСКАЯ ОБЛАСТЬ",
    "type": "region",
    "regionId": "007",
    "countryId": 82,
    "citiesCount": 1
  },
  {
    "id": 12,
    "name": "и авпиап ап",
    "type": "region",
    "regionId": "и авпиап ап",
    "countryId": 35,
    "citiesCount": 1
  },
  {
    "id": 13,
    "name": "Припустынье",
    "type": "region",
    "regionId": "Припустынье",
    "countryId": 31,
    "citiesCount": 0
  },
  {
    "id": 14,
    "name": "Приозерье",
    "type": "region",
    "regionId": "Приозерье",
    "countryId": 31,
    "citiesCount": 1
  },
  {
    "id": 15,
    "name": "Бинго-бонго",
    "type": "region",
    "regionId": "Бинго-бонго",
    "countryId": 32,
    "citiesCount": 1
  },
  {
    "id": 16,
    "name": "Пронародный",
    "type": "region",
    "regionId": "Пронародный",
    "countryId": 33,
    "citiesCount": 1
  },
  {
    "id": 17,
    "name": "Солнечный",
    "type": "region",
    "regionId": "Солнечный",
    "countryId": 34,
    "citiesCount": 1
  },
  {
    "id": 18,
    "name": "Волгоградская обл.",
    "type": "region",
    "regionId": "Волгоградская обл.",
    "countryId": 29,
    "citiesCount": 0
  },
  {
    "id": 19,
    "name": "Алтайский край",
    "type": "region",
    "regionId": "Алтайский край",
    "countryId": 29,
    "citiesCount": 2
  },
  {
    "id": 20,
    "name": "Region #34",
    "type": "region",
    "regionId": "34",
    "countryId": 29,
    "citiesCount": 0
  },
  {
    "id": 21,
    "name": "Волгоградская область",
    "type": "region",
    "regionId": "Волгоградская область",
    "countryId": 29,
    "citiesCount": 2
  },
  {
    "id": 22,
    "name": "Кировская область",
    "type": "region",
    "regionId": "Кировская область",
    "countryId": 29,
    "citiesCount": 3
  },
  {
    "id": 23,
    "name": "Ленинградская область",
    "type": "region",
    "regionId": "Ленинградская область",
    "countryId": 29,
    "citiesCount": 2
  },
  {
    "id": 24,
    "name": "Липецкая область",
    "type": "region",
    "regionId": "Липецкая область",
    "countryId": 29,
    "citiesCount": 2
  },
  {
    "id": 25,
    "name": "Московская",
    "type": "region",
    "regionId": "Московская",
    "countryId": 29,
    "citiesCount": 0
  },
  {
    "id": 26,
    "name": "Московская область",
    "type": "region",
    "regionId": "Московская область",
    "countryId": 29,
    "citiesCount": 4
  },
  {
    "id": 27,
    "name": "Московская область1",
    "type": "region",
    "regionId": "Московская область1",
    "countryId": 29,
    "citiesCount": 1
  },
  {
    "id": 28,
    "name": "ВОЛООБЛАСТь",
    "type": "region",
    "regionId": "ВОЛООБЛАСТь",
    "countryId": 36,
    "citiesCount": 1
  },
  {
    "id": 29,
    "name": "ВОЛГОГРАОБЛ",
    "type": "region",
    "regionId": "ВОЛГОГРАОБЛ",
    "countryId": 36,
    "citiesCount": 0
  },
  {
    "id": 30,
    "name": "Ростовская область",
    "type": "region",
    "regionId": "Ростовская область",
    "countryId": 27,
    "citiesCount": 2
  },
  {
    "id": 31,
    "name": "Region #77",
    "type": "region",
    "regionId": "77",
    "countryId": 29,
    "citiesCount": 0
  },
  {
    "id": 32,
    "name": "г. Барнаул",
    "type": "city",
    "cityId": 127,
    "regionId": "Алтайский край",
    "addressesCount": 3
  },
  {
    "id": 33,
    "name": "Санкт-Петербург",
    "type": "city",
    "cityId": 129,
    "regionId": "Ленинградская область",
    "addressesCount": 3
  },
  {
    "id": 34,
    "name": "п. Верхошижемье",
    "type": "city",
    "cityId": 128,
    "regionId": "Кировская область",
    "addressesCount": 1
  },
  {
    "id": 35,
    "name": "Чулково",
    "type": "city",
    "cityId": 136,
    "regionId": "Московская область",
    "addressesCount": 0
  },
  {
    "id": 36,
    "name": "г.Суровикино",
    "type": "city",
    "cityId": 135,
    "regionId": "Волгоградская область",
    "addressesCount": 2
  },
  {
    "id": 37,
    "name": "Непонятьшо",
    "type": "city",
    "cityId": 131,
    "regionId": "Ленинградская область",
    "addressesCount": 1
  },
  {
    "id": 38,
    "name": "Счастье",
    "type": "city",
    "cityId": 132,
    "regionId": "Кировская область",
    "addressesCount": 1
  },
  {
    "id": 39,
    "name": "Несчастье",
    "type": "city",
    "cityId": 133,
    "regionId": "Алтайский край",
    "addressesCount": 1
  },
  {
    "id": 40,
    "name": " вап мваамва",
    "type": "city",
    "cityId": 147,
    "regionId": "и авпиап ап",
    "addressesCount": 0
  },
  {
    "id": 41,
    "name": "Волгоград",
    "type": "city",
    "cityId": 130,
    "regionId": "Волгоградская область",
    "addressesCount": 27
  },
  {
    "id": 42,
    "name": "Волгоградос",
    "type": "city",
    "cityId": 148,
    "regionId": "ВОЛООБЛАСТь",
    "addressesCount": 0
  },
  {
    "id": 43,
    "name": "Донецк ",
    "type": "city",
    "cityId": 149,
    "regionId": "Ростовская область",
    "addressesCount": 1
  },
  {
    "id": 44,
    "name": "Приозерье",
    "type": "city",
    "cityId": 137,
    "regionId": "Приозерье",
    "addressesCount": 0
  },
  {
    "id": 45,
    "name": "Там-там",
    "type": "city",
    "cityId": 138,
    "regionId": "Бинго-бонго",
    "addressesCount": 1
  },
  {
    "id": 46,
    "name": "Крякен",
    "type": "city",
    "cityId": 139,
    "regionId": "Пронародный",
    "addressesCount": 1
  },
  {
    "id": 47,
    "name": "Жестон",
    "type": "city",
    "cityId": 140,
    "regionId": "Солнечный",
    "addressesCount": 0
  },
  {
    "id": 48,
    "name": "Донецк",
    "type": "city",
    "cityId": 150,
    "regionId": "Ростовская область",
    "addressesCount": 0
  },
  {
    "id": 49,
    "name": "Липецк ",
    "type": "city",
    "cityId": 134,
    "regionId": "Липецкая область",
    "addressesCount": 1
  },
  {
    "id": 50,
    "name": "ГОТЭМ",
    "type": "city",
    "cityId": 215,
    "regionId": "007",
    "addressesCount": 1
  },
  {
    "id": 51,
    "name": "unknown",
    "type": "city",
    "cityId": 143,
    "regionId": "Московская область",
    "addressesCount": 0
  },
  {
    "id": 52,
    "name": "НаселенныйПункт2",
    "type": "city",
    "cityId": 145,
    "regionId": "Московская область1",
    "addressesCount": 1
  },
  {
    "id": 53,
    "name": "Москва",
    "type": "city",
    "cityId": 141,
    "regionId": "Московская область",
    "addressesCount": 3
  },
  {
    "id": 54,
    "name": "НаселенныйПункт1",
    "type": "city",
    "cityId": 144,
    "regionId": "Московская область",
    "addressesCount": 1
  },
  {
    "id": 55,
    "name": "Липецк",
    "type": "city",
    "cityId": 142,
    "regionId": "Липецкая область",
    "addressesCount": 1
  },
  {
    "id": 56,
    "name": "Городок",
    "type": "city",
    "cityId": 146,
    "regionId": "Кировская область",
    "addressesCount": 1
  },
  {
    "id": 57,
    "type": "address",
    "cityId": 130,
    "address1": "ул.Абрикосовая 82 офис 6847 68 этаж",
    "addressId": 292,
    "customersCount": 1,
    "tradePointsCount": 0
  },
  {
    "id": 58,
    "type": "address",
    "cityId": 129,
    "address1": "unknown",
    "addressId": 278,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 59,
    "type": "address",
    "cityId": 127,
    "address1": "unknown",
    "addressId": 280,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 60,
    "type": "address",
    "cityId": 127,
    "address1": "ул. Гоголя, 1040",
    "addressId": 286,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 61,
    "type": "address",
    "cityId": 129,
    "address1": "Свердловская0 9",
    "addressId": 287,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 62,
    "type": "address",
    "cityId": 130,
    "address1": "Волгоград Научная Долина квартал 1 строение 5",
    "addressId": 288,
    "customersCount": 1,
    "tradePointsCount": 0
  },
  {
    "id": 63,
    "type": "address",
    "cityId": 127,
    "address1": "ул. Гоголя, 104",
    "addressId": 279,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 64,
    "type": "address",
    "cityId": 129,
    "address1": "Свердловская 9",
    "addressId": 281,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 65,
    "type": "address",
    "cityId": 130,
    "address1": "Абрикосовая 82",
    "addressId": 289,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 66,
    "type": "address",
    "cityId": 130,
    "address1": "Москва 4/5 ул. Гиляровского",
    "addressId": 282,
    "customersCount": 1,
    "tradePointsCount": 0
  },
  {
    "id": 67,
    "type": "address",
    "cityId": 130,
    "address1": "пр. Ленина 92 аккаунт1",
    "addressId": 283,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 68,
    "type": "address",
    "cityId": 130,
    "address1": "пр.Ленина дом 92 5-01",
    "addressId": 284,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 69,
    "type": "address",
    "cityId": 130,
    "address1": "г.Волгоград ул.Яблочная д.15",
    "addressId": 293,
    "customersCount": 1,
    "tradePointsCount": 0
  },
  {
    "id": 70,
    "type": "address",
    "cityId": 130,
    "address1": "ул.Яблочная д.15",
    "addressId": 294,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 71,
    "type": "address",
    "cityId": 130,
    "address1": "Апельсиновая 82",
    "addressId": 295,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 72,
    "type": "address",
    "cityId": 130,
    "address1": "г.Волгоград Мармеладова д.13/1",
    "addressId": 296,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 73,
    "type": "address",
    "cityId": 130,
    "address1": "Мармеладова 13",
    "addressId": 297,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 74,
    "type": "address",
    "cityId": 130,
    "address1": "ул.Мармеладова д.13",
    "addressId": 299,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 75,
    "type": "address",
    "cityId": 135,
    "address1": "ул.Железнодорожная 34а",
    "addressId": 304,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 76,
    "type": "address",
    "cityId": 132,
    "address1": "ул.Правая 1",
    "addressId": 300,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 77,
    "type": "address",
    "cityId": 133,
    "address1": "ул.Левая 2",
    "addressId": 301,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 78,
    "type": "address",
    "cityId": 131,
    "address1": "ул.Прямая 3",
    "addressId": 302,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 79,
    "type": "address",
    "cityId": 142,
    "address1": "ул. Адмирала Макарова 23",
    "addressId": 322,
    "customersCount": 0,
    "tradePointsCount": 4
  },
  {
    "id": 80,
    "type": "address",
    "cityId": 130,
    "address1": "пр. Ленина 92new",
    "addressId": 305,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 81,
    "type": "address",
    "cityId": 134,
    "address1": "ул. Адмирала Макарова 23",
    "addressId": 303,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 82,
    "type": "address",
    "cityId": 141,
    "address1": "ул. Ленина 23",
    "addressId": 321,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 83,
    "type": "address",
    "cityId": 141,
    "address1": "ул. Ленинская слобода дом 19",
    "addressId": 323,
    "customersCount": 1,
    "tradePointsCount": 1
  },
  {
    "id": 84,
    "type": "address",
    "cityId": 144,
    "address1": "улица дом",
    "addressId": 325,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 85,
    "type": "address",
    "cityId": 146,
    "address1": "рвыаурвыиртыовщфывьвфы выампывам",
    "addressId": 329,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 86,
    "type": "address",
    "cityId": 130,
    "address1": "ул.Скоморохова д.15",
    "addressId": 298,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 87,
    "type": "address",
    "cityId": 130,
    "address1": "ул.Цветочная д.13",
    "addressId": 311,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 88,
    "type": "address",
    "cityId": 130,
    "address1": "г.Волгоград Цветочная д.13/1",
    "addressId": 312,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 89,
    "type": "address",
    "cityId": 130,
    "address1": "Цветочная 13",
    "addressId": 313,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 90,
    "type": "address",
    "cityId": 135,
    "address1": "Новый адрес 1",
    "addressId": 314,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 91,
    "type": "address",
    "cityId": 138,
    "address1": "ул.Кривая дом 1 ",
    "addressId": 315,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 92,
    "type": "address",
    "cityId": 139,
    "address1": "ул.Кукулькина 1",
    "addressId": 316,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 93,
    "type": "address",
    "cityId": 130,
    "address1": "ул. Пантелеева  23",
    "addressId": 328,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 94,
    "type": "address",
    "cityId": 130,
    "address1": "пр. Ленина 92",
    "addressId": 331,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 95,
    "type": "address",
    "cityId": 130,
    "address1": "Волгоград, Генерала Гуртьева, 3",
    "addressId": 332,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 96,
    "type": "address",
    "cityId": 130,
    "address1": "пр.Ленина дом 92",
    "addressId": 285,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 97,
    "type": "address",
    "cityId": 130,
    "address1": "пр. Ленина 92new2",
    "addressId": 306,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 98,
    "type": "address",
    "cityId": 130,
    "address1": "Ул. Гиляровского 4/5",
    "addressId": 308,
    "customersCount": 1,
    "tradePointsCount": 0
  },
  {
    "id": 99,
    "type": "address",
    "cityId": 130,
    "address1": "пр.Ленина дом 100",
    "addressId": 309,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 100,
    "type": "address",
    "cityId": 130,
    "address1": "пр.Ленина дом 92term2",
    "addressId": 307,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 101,
    "type": "address",
    "cityId": 130,
    "address1": "Волгоград, пр. Ленина, 92",
    "addressId": 318,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 102,
    "type": "address",
    "cityId": 128,
    "address1": "Волгоград, пр. Ленина, 92, 1",
    "addressId": 319,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 103,
    "type": "address",
    "cityId": 149,
    "address1": "ул. Гиви 231",
    "addressId": 335,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 104,
    "type": "address",
    "cityId": 145,
    "address1": "улица2 дом2",
    "addressId": 326,
    "customersCount": 0,
    "tradePointsCount": 0
  },
  {
    "id": 105,
    "type": "address",
    "cityId": 141,
    "address1": "ул. Ленинская слобода 19",
    "addressId": 320,
    "customersCount": 0,
    "tradePointsCount": 1
  },
  {
    "id": 106,
    "type": "address",
    "cityId": 130,
    "address1": "Ленина\nПроспект Маркса\nПроулок Петренко 1",
    "addressId": 327,
    "customersCount": 1,
    "tradePointsCount": 2
  },
  {
    "id": 107,
    "type": "address",
    "cityId": 215,
    "address1": "ул. Уолл-стрит д. 1",
    "addressId": 433,
    "customersCount": 1,
    "tradePointsCount": 1
  },
  {
    "id": 108,
    "name": "АЗС № 30-ГорАлтНП",
    "type": "tradePoint",
    "addressId": 286,
    "merchants": [],
    "tradePointId": "RU0100311",
    "merchantsCount": 0
  },
  {
    "id": 109,
    "name": "ААЗС №144 Свердловская 2",
    "type": "tradePoint",
    "addressId": 287,
    "merchants": [],
    "tradePointId": "RU4101931",
    "merchantsCount": 0
  },
  {
    "id": 110,
    "name": "ООО ТЕКНО Юг",
    "type": "tradePoint",
    "addressId": 284,
    "merchants": [],
    "tradePointId": "3000",
    "merchantsCount": 0
  },
  {
    "id": 111,
    "name": "ПАО Востриков Компани",
    "type": "tradePoint",
    "addressId": 294,
    "merchants": [],
    "tradePointId": "100764348000050",
    "merchantsCount": 0
  },
  {
    "id": 112,
    "name": "АЗС №1 Добряков",
    "type": "tradePoint",
    "addressId": 300,
    "merchants": [],
    "tradePointId": "DA0000001",
    "merchantsCount": 0
  },
  {
    "id": 113,
    "name": "АЗС №2 Добряков",
    "type": "tradePoint",
    "addressId": 301,
    "merchants": [],
    "tradePointId": "DA0000002",
    "merchantsCount": 0
  },
  {
    "id": 114,
    "name": "АЗС №3 Добряков",
    "type": "tradePoint",
    "addressId": 302,
    "merchants": [],
    "tradePointId": "DA0000003",
    "merchantsCount": 0
  },
  {
    "id": 115,
    "name": "АЗС №001",
    "type": "tradePoint",
    "addressId": 303,
    "merchants": [],
    "tradePointId": "RU100001",
    "merchantsCount": 0
  },
  {
    "id": 116,
    "name": "АЗС №306",
    "type": "tradePoint",
    "addressId": 322,
    "merchants": [],
    "tradePointId": "RU420108",
    "merchantsCount": 0
  },
  {
    "id": 117,
    "name": "АЗС №001",
    "type": "tradePoint",
    "addressId": 320,
    "merchants": [],
    "tradePointId": "RU111111",
    "merchantsCount": 0
  },
  {
    "id": 118,
    "name": "АЗС №VD18",
    "type": "tradePoint",
    "addressId": 327,
    "merchants": [],
    "tradePointId": "VD7770018",
    "merchantsCount": 0
  },
  {
    "id": 119,
    "name": "2010",
    "type": "tradePoint",
    "addressId": 323,
    "merchants": [],
    "tradePointId": "2010",
    "merchantsCount": 0
  },
  {
    "id": 120,
    "name": "АЗС №309",
    "type": "tradePoint",
    "addressId": 322,
    "merchants": [],
    "tradePointId": "RU420109",
    "merchantsCount": 0
  },
  {
    "id": 121,
    "name": "АЗС №314",
    "type": "tradePoint",
    "addressId": 322,
    "merchants": [],
    "tradePointId": "RU420112",
    "merchantsCount": 0
  },
  {
    "id": 122,
    "name": "АЗС №318",
    "type": "tradePoint",
    "addressId": 322,
    "merchants": [],
    "tradePointId": "RU420118",
    "merchantsCount": 0
  },
  {
    "id": 123,
    "name": "Проверка ссылок",
    "type": "tradePoint",
    "addressId": 280,
    "merchants": [
      "1013",
      "9908474902"
    ],
    "tradePointId": "1",
    "merchantsCount": 2
  },
  {
    "id": 124,
    "name": "АЗС №312",
    "type": "tradePoint",
    "addressId": 328,
    "merchants": [],
    "tradePointId": "RU420111",
    "merchantsCount": 0
  },
  {
    "id": 125,
    "name": "100764348000023",
    "type": "tradePoint",
    "addressId": 298,
    "merchants": [
      "1010",
      "Test_Merchant_Number2"
    ],
    "tradePointId": "100764348000023",
    "merchantsCount": 2
  },
  {
    "id": 126,
    "name": "Test_Trade_Point_Name1",
    "type": "tradePoint",
    "addressId": 327,
    "merchants": [
      "1010"
    ],
    "tradePointId": "Test_Trade_Point1",
    "merchantsCount": 1
  },
  {
    "id": 127,
    "name": "Test_Trade_Point_Name11",
    "type": "tradePoint",
    "addressId": 319,
    "merchants": [
      "Test_Merchant_Number2",
      "Test_Merchant_Number1"
    ],
    "tradePointId": "Test_Trade_Point_ID11",
    "merchantsCount": 2
  },
  {
    "id": 128,
    "name": "АЗС №3061",
    "type": "tradePoint",
    "addressId": 335,
    "merchants": [
      "100764348000050"
    ],
    "tradePointId": "RU4201082",
    "merchantsCount": 1
  },
  {
    "id": 129,
    "name": "1013",
    "type": "tradePoint",
    "addressId": 307,
    "merchants": [
      "1013",
      "MERCHANT0000001"
    ],
    "tradePointId": "1013",
    "merchantsCount": 2
  },
  {
    "id": 130,
    "name": "TEST TRADE POINT",
    "type": "tradePoint",
    "addressId": 433,
    "merchants": [
      "TEST_MERCHANT"
    ],
    "tradePointId": "DA0000004",
    "merchantsCount": 1
  },
  {
    "id": 131,
    "name": "TeхГло",
    "type": "customer",
    "addressId": 288,
    "customerId": "5000",
    "accountsCount": 2,
    "merchantsCount": 0
  },
  {
    "id": 132,
    "name": "ТЕКНО",
    "type": "customer",
    "addressId": 282,
    "customerId": "4000",
    "accountsCount": 0,
    "merchantsCount": 1
  },
  {
    "id": 133,
    "name": "Алексей Востриков",
    "type": "customer",
    "addressId": 293,
    "customerId": "50001",
    "accountsCount": 3,
    "merchantsCount": 3
  },
  {
    "id": 134,
    "name": "TEST_CUSTOMER_NAME",
    "type": "customer",
    "addressId": 433,
    "customerId": "TEST_CUSTOMER_NUMBERX",
    "accountsCount": 0,
    "merchantsCount": 1
  },
  {
    "id": 135,
    "name": "Старые технологии",
    "type": "customer",
    "addressId": null,
    "customerId": "ST12UUYR",
    "accountsCount": 1,
    "merchantsCount": 1
  },
  {
    "id": 136,
    "name": "ТЕКНО Москва",
    "type": "customer",
    "addressId": 308,
    "customerId": "2010",
    "accountsCount": 0,
    "merchantsCount": 0
  },
  {
    "id": 137,
    "name": "ТЕКНО Югх",
    "type": "customer",
    "addressId": null,
    "customerId": "20109",
    "accountsCount": 1,
    "merchantsCount": 2
  },
  {
    "id": 138,
    "name": "ИнформПоддержка",
    "type": "customer",
    "addressId": 323,
    "customerId": "1010",
    "accountsCount": 1,
    "merchantsCount": 1
  },
  {
    "id": 139,
    "name": "Test 13/03/18",
    "type": "customer",
    "addressId": 292,
    "customerId": "156",
    "accountsCount": 1,
    "merchantsCount": 0
  },
  {
    "id": 140,
    "name": "Test_Customer1",
    "type": "customer",
    "addressId": 327,
    "customerId": "Test_Customer_Number1",
    "accountsCount": 1,
    "merchantsCount": 2
  },
  {
    "id": 141,
    "name": null,
    "type": "customer",
    "addressId": null,
    "customerId": "unknown",
    "accountsCount": 1,
    "merchantsCount": 6
  },
  {
    "id": 142,
    "name": "ТЕКНО Глобал Премиальный",
    "type": "account",
    "accountId": "5000000001",
    "customerId": "5000",
    "merchantsCount": 0
  },
  {
    "id": 143,
    "name": "ПАО Востриков Компани Премиальный",
    "type": "account",
    "accountId": "3000000001",
    "customerId": "50001",
    "merchantsCount": 2
  },
  {
    "id": 144,
    "name": "Долларовый",
    "type": "account",
    "accountId": "78997664",
    "customerId": "50001",
    "merchantsCount": 0
  },
  {
    "id": 145,
    "name": "Тубус",
    "type": "account",
    "accountId": "0009311",
    "customerId": "50001",
    "merchantsCount": 0
  },
  {
    "id": 146,
    "name": "Старотехнологический",
    "type": "account",
    "accountId": "SD0009384",
    "customerId": "ST12UUYR",
    "merchantsCount": 1
  },
  {
    "id": 147,
    "name": "Текно счетх",
    "type": "account",
    "accountId": "1000000001",
    "customerId": "20109",
    "merchantsCount": 2
  },
  {
    "id": 148,
    "name": "Test123",
    "type": "account",
    "accountId": "156",
    "customerId": "156",
    "merchantsCount": 0
  },
  {
    "id": 149,
    "name": "test",
    "type": "account",
    "accountId": "test 16/03",
    "customerId": "1010",
    "merchantsCount": 0
  },
  {
    "id": 150,
    "name": "Информ счет",
    "type": "account",
    "accountId": "2000000001",
    "customerId": "5000",
    "merchantsCount": 0
  },
  {
    "id": 151,
    "name": "Test_Account1",
    "type": "account",
    "accountId": "Test_Account_Number1",
    "customerId": "Test_Customer_Number1",
    "merchantsCount": 1
  },
  {
    "id": 152,
    "name": null,
    "type": "account",
    "accountId": "unknown",
    "customerId": "unknown",
    "merchantsCount": 6
  },
  {
    "id": 153,
    "name": "TEST MERCHANT LNAME",
    "type": "merchant",
    "accountId": null,
    "merchantId": "TEST_MERCHANT",
    "tradePoints": [
      "DA0000004"
    ],
    "tradePointsCount": 1,
    "logicalDevicesCount": 160
  },
  {
    "id": 154,
    "name": null,
    "type": "merchant",
    "accountId": "3000000001",
    "merchantId": "12345",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 5
  },
  {
    "id": 155,
    "name": "ООО Информ-Поддержка",
    "type": "merchant",
    "accountId": null,
    "merchantId": "2010",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 2
  },
  {
    "id": 156,
    "name": "Test_LName2",
    "type": "merchant",
    "accountId": null,
    "merchantId": "Test_Merchant_Number2",
    "tradePoints": [
      "Test_Trade_Point_ID11",
      "100764348000023"
    ],
    "tradePointsCount": 2,
    "logicalDevicesCount": 3
  },
  {
    "id": 157,
    "name": "Test_LName1",
    "type": "merchant",
    "accountId": "Test_Account_Number1",
    "merchantId": "Test_Merchant_Number1",
    "tradePoints": [
      "Test_Trade_Point_ID11"
    ],
    "tradePointsCount": 1,
    "logicalDevicesCount": 6
  },
  {
    "id": 158,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "100764348000050",
    "tradePoints": [
      "RU4201082"
    ],
    "tradePointsCount": 1,
    "logicalDevicesCount": 64
  },
  {
    "id": 159,
    "name": "Test",
    "type": "merchant",
    "accountId": null,
    "merchantId": "Test",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 0
  },
  {
    "id": 160,
    "name": "Test_LName_3",
    "type": "merchant",
    "accountId": null,
    "merchantId": "MERCHANT0000001",
    "tradePoints": [
      "1013"
    ],
    "tradePointsCount": 1,
    "logicalDevicesCount": 3
  },
  {
    "id": 161,
    "name": "ООО ТЕКНО Юг",
    "type": "merchant",
    "accountId": "3000000001",
    "merchantId": "3000",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 61
  },
  {
    "id": 162,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "089827028000020",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 6
  },
  {
    "id": 163,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "062426551000048",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 3
  },
  {
    "id": 164,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "065940521000043",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 3
  },
  {
    "id": 165,
    "name": "Сепараторная",
    "type": "merchant",
    "accountId": "SD0009384",
    "merchantId": "9908474902",
    "tradePoints": [
      "1"
    ],
    "tradePointsCount": 1,
    "logicalDevicesCount": 13368
  },
  {
    "id": 166,
    "name": "ООО ТЕКНО ЮГ",
    "type": "merchant",
    "accountId": "1000000001",
    "merchantId": "1010",
    "tradePoints": [
      "100764348000023",
      "Test_Trade_Point1"
    ],
    "tradePointsCount": 2,
    "logicalDevicesCount": 106
  },
  {
    "id": 167,
    "name": "ООО ТЕКНОх",
    "type": "merchant",
    "accountId": "1000000001",
    "merchantId": "1013",
    "tradePoints": [
      "1",
      "1013"
    ],
    "tradePointsCount": 2,
    "logicalDevicesCount": 14
  },
  {
    "id": 168,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "111111111111111",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 9
  },
  {
    "id": 169,
    "name": null,
    "type": "merchant",
    "accountId": "unknown",
    "merchantId": "VD104348000050",
    "tradePoints": [],
    "tradePointsCount": 0,
    "logicalDevicesCount": 3
  },
  {
    "id": 170,
    "type": "physical",
    "deviceId": 3402,
    "parentId": null,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "CA1221F3760000",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 171,
    "type": "physical",
    "deviceId": 2994,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "VOL3003ser",
    "tradePointId": "3000",
    "logicalDevicesCount": 1
  },
  {
    "id": 172,
    "type": "physical",
    "deviceId": 30170,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "01_12_2017_2",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 173,
    "type": "physical",
    "deviceId": 30274,
    "parentId": null,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "RU330008",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 174,
    "type": "physical",
    "deviceId": 30275,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 0,
    "serialNumber": "MO330003",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 175,
    "type": "physical",
    "deviceId": 30262,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "SSSN000013",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 176,
    "type": "physical",
    "deviceId": 30351,
    "parentId": 30353,
    "modelName": "Cryptera UPT 7000",
    "childsCount": 0,
    "serialNumber": "test 19/02/2018",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 177,
    "type": "physical",
    "deviceId": 30353,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "test asu 19/02/2018",
    "tradePointId": "DA0000003",
    "logicalDevicesCount": 1
  },
  {
    "id": 178,
    "type": "physical",
    "deviceId": 3187,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0012",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 179,
    "type": "physical",
    "deviceId": 3165,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 180,
    "type": "physical",
    "deviceId": 30279,
    "parentId": null,
    "modelName": "VeriFone VX510",
    "childsCount": 0,
    "serialNumber": "12wer55",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 181,
    "type": "physical",
    "deviceId": 30251,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "QQQQ12",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 182,
    "type": "physical",
    "deviceId": 30173,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "01_12_2017",
    "tradePointId": "3000",
    "logicalDevicesCount": 1
  },
  {
    "id": 183,
    "type": "physical",
    "deviceId": 30264,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "AD00044",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 184,
    "type": "physical",
    "deviceId": 30272,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 1,
    "serialNumber": "MO330002",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 185,
    "type": "physical",
    "deviceId": 30355,
    "parentId": 30357,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "400059",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 186,
    "type": "physical",
    "deviceId": 30357,
    "parentId": 30359,
    "modelName": "Cryptera UPT 7000",
    "childsCount": 1,
    "serialNumber": "400059",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 187,
    "type": "physical",
    "deviceId": 30247,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "SSSN000013",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 188,
    "type": "physical",
    "deviceId": 30278,
    "parentId": null,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "eer556",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 189,
    "type": "physical",
    "deviceId": 30133,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "newpos test 22/09/2017",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 190,
    "type": "physical",
    "deviceId": 30138,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": "VD0327690",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 191,
    "type": "physical",
    "deviceId": 30175,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU0000022",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 192,
    "type": "physical",
    "deviceId": 30177,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "OPA-POPA",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 0
  },
  {
    "id": 193,
    "type": "physical",
    "deviceId": 30266,
    "parentId": 30272,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "RU330001",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 194,
    "type": "physical",
    "deviceId": 3171,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "10000001",
    "tradePointId": "RU100001",
    "logicalDevicesCount": 2
  },
  {
    "id": 195,
    "type": "physical",
    "deviceId": 30267,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 0,
    "serialNumber": "MO330001",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 196,
    "type": "physical",
    "deviceId": 30359,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "403123",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 197,
    "type": "physical",
    "deviceId": 3173,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "10000002",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 198,
    "type": "physical",
    "deviceId": 3192,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0017",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 199,
    "type": "physical",
    "deviceId": 30137,
    "parentId": 30173,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "G00325478485",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 200,
    "type": "physical",
    "deviceId": 30285,
    "parentId": 30286,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "eer556",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 201,
    "type": "physical",
    "deviceId": 30286,
    "parentId": 30287,
    "modelName": "VeriFone VX510",
    "childsCount": 1,
    "serialNumber": "12wer55",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 202,
    "type": "physical",
    "deviceId": 30287,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 1,
    "serialNumber": "112233455",
    "tradePointId": "RU420111",
    "logicalDevicesCount": 1
  },
  {
    "id": 203,
    "type": "physical",
    "deviceId": 30180,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "MMM2017",
    "tradePointId": "100764348000050",
    "logicalDevicesCount": 0
  },
  {
    "id": 204,
    "type": "physical",
    "deviceId": 30260,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "DFF00002",
    "tradePointId": "100764348000050",
    "logicalDevicesCount": 1
  },
  {
    "id": 205,
    "type": "physical",
    "deviceId": 30294,
    "parentId": null,
    "modelName": "Ingenico ICT 220",
    "childsCount": 0,
    "serialNumber": "ISELF001",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 206,
    "type": "physical",
    "deviceId": 30302,
    "parentId": null,
    "modelName": "Ingenico ICT 220",
    "childsCount": 0,
    "serialNumber": "IS000001",
    "tradePointId": "RU420118",
    "logicalDevicesCount": 1
  },
  {
    "id": 207,
    "type": "physical",
    "deviceId": 30298,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 0,
    "serialNumber": "RDR00052",
    "tradePointId": "RU420112",
    "logicalDevicesCount": 1
  },
  {
    "id": 208,
    "type": "physical",
    "deviceId": 3404,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "F00214507921",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 209,
    "type": "physical",
    "deviceId": 30296,
    "parentId": null,
    "modelName": "VIVOpay kiosk II",
    "childsCount": 0,
    "serialNumber": "RDR00056",
    "tradePointId": "RU420112",
    "logicalDevicesCount": 1
  },
  {
    "id": 210,
    "type": "physical",
    "deviceId": 30297,
    "parentId": 30316,
    "modelName": "VeriFone VX510",
    "childsCount": 0,
    "serialNumber": "RDR00055",
    "tradePointId": "RU420112",
    "logicalDevicesCount": 1
  },
  {
    "id": 211,
    "type": "physical",
    "deviceId": 30361,
    "parentId": null,
    "modelName": "VeriFone VX520 CTLS",
    "childsCount": 0,
    "serialNumber": "vx520 autonom",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 212,
    "type": "physical",
    "deviceId": 3239,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0064",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 213,
    "type": "physical",
    "deviceId": 30306,
    "parentId": null,
    "modelName": "Ingenico ISelf",
    "childsCount": 0,
    "serialNumber": "ISE00004",
    "tradePointId": "RU420118",
    "logicalDevicesCount": 1
  },
  {
    "id": 214,
    "type": "physical",
    "deviceId": 30307,
    "parentId": 30308,
    "modelName": "Ingenico ISelf",
    "childsCount": 0,
    "serialNumber": "ISE00053",
    "tradePointId": "RU420118",
    "logicalDevicesCount": 1
  },
  {
    "id": 215,
    "type": "physical",
    "deviceId": 30308,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 1,
    "serialNumber": "NU100001",
    "tradePointId": "RU420118",
    "logicalDevicesCount": 1
  },
  {
    "id": 216,
    "type": "physical",
    "deviceId": 30371,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "403122",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 217,
    "type": "physical",
    "deviceId": 30304,
    "parentId": null,
    "modelName": "Ingenico ISelf",
    "childsCount": 0,
    "serialNumber": "ISELF002",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 218,
    "type": "physical",
    "deviceId": 30375,
    "parentId": 30377,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "454545",
    "tradePointId": "Test_Trade_Point_ID11",
    "logicalDevicesCount": 1
  },
  {
    "id": 219,
    "type": "physical",
    "deviceId": 30377,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "545454",
    "tradePointId": "Test_Trade_Point_ID11",
    "logicalDevicesCount": 1
  },
  {
    "id": 220,
    "type": "physical",
    "deviceId": 3408,
    "parentId": null,
    "modelName": "Vivopay Kiosk",
    "childsCount": 0,
    "serialNumber": "11111111111111111",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 221,
    "type": "physical",
    "deviceId": 30313,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 222,
    "type": "physical",
    "deviceId": 30379,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "123123",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 223,
    "type": "physical",
    "deviceId": 30188,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "82684053",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 224,
    "type": "physical",
    "deviceId": 30314,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "test garland",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 225,
    "type": "physical",
    "deviceId": 3188,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0013",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 226,
    "type": "physical",
    "deviceId": 3189,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0014",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 227,
    "type": "physical",
    "deviceId": 3190,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0015",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 228,
    "type": "physical",
    "deviceId": 3191,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0016",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 229,
    "type": "physical",
    "deviceId": 3193,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0018",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 230,
    "type": "physical",
    "deviceId": 3194,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0019",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 231,
    "type": "physical",
    "deviceId": 3195,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0020",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 232,
    "type": "physical",
    "deviceId": 3196,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0021",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 233,
    "type": "physical",
    "deviceId": 3197,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0022",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 234,
    "type": "physical",
    "deviceId": 3198,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0023",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 235,
    "type": "physical",
    "deviceId": 3199,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0024",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 236,
    "type": "physical",
    "deviceId": 3200,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0025",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 237,
    "type": "physical",
    "deviceId": 3201,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0026",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 238,
    "type": "physical",
    "deviceId": 3202,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0027",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 239,
    "type": "physical",
    "deviceId": 3203,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0028",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 240,
    "type": "physical",
    "deviceId": 3204,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0029",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 241,
    "type": "physical",
    "deviceId": 3205,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0030",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 242,
    "type": "physical",
    "deviceId": 3206,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0031",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 243,
    "type": "physical",
    "deviceId": 3207,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0032",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 244,
    "type": "physical",
    "deviceId": 3208,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0033",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 245,
    "type": "physical",
    "deviceId": 3209,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0034",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 246,
    "type": "physical",
    "deviceId": 3210,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0035",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 247,
    "type": "physical",
    "deviceId": 3211,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0036",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 248,
    "type": "physical",
    "deviceId": 3212,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0037",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 249,
    "type": "physical",
    "deviceId": 3213,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0038",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 250,
    "type": "physical",
    "deviceId": 3214,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0039",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 251,
    "type": "physical",
    "deviceId": 3215,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0040",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 252,
    "type": "physical",
    "deviceId": 3216,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0041",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 253,
    "type": "physical",
    "deviceId": 3217,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0042",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 254,
    "type": "physical",
    "deviceId": 3218,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0043",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 255,
    "type": "physical",
    "deviceId": 3220,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0045",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 256,
    "type": "physical",
    "deviceId": 30187,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "82299868",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 257,
    "type": "physical",
    "deviceId": 30167,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU00005",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 2
  },
  {
    "id": 258,
    "type": "physical",
    "deviceId": 30191,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "81111111",
    "tradePointId": "2010",
    "logicalDevicesCount": 1
  },
  {
    "id": 259,
    "type": "physical",
    "deviceId": 30316,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "garland2",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 260,
    "type": "physical",
    "deviceId": 30318,
    "parentId": null,
    "modelName": "VeriFone VX510",
    "childsCount": 0,
    "serialNumber": "negarland1",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 261,
    "type": "physical",
    "deviceId": 3221,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0046",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 262,
    "type": "physical",
    "deviceId": 3222,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0047",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 263,
    "type": "physical",
    "deviceId": 3223,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0048",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 264,
    "type": "physical",
    "deviceId": 3224,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0049",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 265,
    "type": "physical",
    "deviceId": 3225,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0050",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 266,
    "type": "physical",
    "deviceId": 3226,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0051",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 267,
    "type": "physical",
    "deviceId": 3227,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0052",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 268,
    "type": "physical",
    "deviceId": 3228,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0053",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 269,
    "type": "physical",
    "deviceId": 3229,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0054",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 270,
    "type": "physical",
    "deviceId": 3230,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0055",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 271,
    "type": "physical",
    "deviceId": 3231,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0056",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 272,
    "type": "physical",
    "deviceId": 3232,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0057",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 273,
    "type": "physical",
    "deviceId": 3233,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0058",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 274,
    "type": "physical",
    "deviceId": 3234,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0059",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 275,
    "type": "physical",
    "deviceId": 3235,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0060",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 276,
    "type": "physical",
    "deviceId": 3236,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0061",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 277,
    "type": "physical",
    "deviceId": 3237,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0062",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 278,
    "type": "physical",
    "deviceId": 3238,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0063",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 279,
    "type": "physical",
    "deviceId": 3240,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0065",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 280,
    "type": "physical",
    "deviceId": 3241,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0066",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 281,
    "type": "physical",
    "deviceId": 3245,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0070",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 282,
    "type": "physical",
    "deviceId": 3246,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0071",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 283,
    "type": "physical",
    "deviceId": 3247,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0072",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 284,
    "type": "physical",
    "deviceId": 3248,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0073",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 285,
    "type": "physical",
    "deviceId": 3249,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0074",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 286,
    "type": "physical",
    "deviceId": 3250,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0075",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 287,
    "type": "physical",
    "deviceId": 3251,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0076",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 288,
    "type": "physical",
    "deviceId": 3252,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0077",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 289,
    "type": "physical",
    "deviceId": 3253,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0078",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 290,
    "type": "physical",
    "deviceId": 3254,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0079",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 291,
    "type": "physical",
    "deviceId": 3255,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0080",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 292,
    "type": "physical",
    "deviceId": 3256,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0081",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 293,
    "type": "physical",
    "deviceId": 3257,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0082",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 294,
    "type": "physical",
    "deviceId": 3258,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0083",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 295,
    "type": "physical",
    "deviceId": 3259,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0084",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 296,
    "type": "physical",
    "deviceId": 3260,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0085",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 297,
    "type": "physical",
    "deviceId": 3261,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0086",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 298,
    "type": "physical",
    "deviceId": 3262,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0087",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 299,
    "type": "physical",
    "deviceId": 3263,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0088",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 300,
    "type": "physical",
    "deviceId": 3264,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0089",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 301,
    "type": "physical",
    "deviceId": 3265,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0090",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 302,
    "type": "physical",
    "deviceId": 3266,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0091",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 303,
    "type": "physical",
    "deviceId": 3267,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0092",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 304,
    "type": "physical",
    "deviceId": 3271,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0096",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 305,
    "type": "physical",
    "deviceId": 3272,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0097",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 306,
    "type": "physical",
    "deviceId": 3273,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0098",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 307,
    "type": "physical",
    "deviceId": 30320,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "111213",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 308,
    "type": "physical",
    "deviceId": 30322,
    "parentId": 30324,
    "modelName": "VeriFone VX520 CTLS",
    "childsCount": 0,
    "serialNumber": "987456",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 309,
    "type": "physical",
    "deviceId": 3274,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0099",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 310,
    "type": "physical",
    "deviceId": 3275,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0100",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 311,
    "type": "physical",
    "deviceId": 3276,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0101",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 312,
    "type": "physical",
    "deviceId": 3277,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0102",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 313,
    "type": "physical",
    "deviceId": 3278,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0103",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 314,
    "type": "physical",
    "deviceId": 3279,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0104",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 315,
    "type": "physical",
    "deviceId": 3280,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0105",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 316,
    "type": "physical",
    "deviceId": 3281,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0106",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 317,
    "type": "physical",
    "deviceId": 3282,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0107",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 318,
    "type": "physical",
    "deviceId": 3283,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0108",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 319,
    "type": "physical",
    "deviceId": 3284,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0109",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 320,
    "type": "physical",
    "deviceId": 3431,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "test",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 321,
    "type": "physical",
    "deviceId": 30193,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "TT000002",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 322,
    "type": "physical",
    "deviceId": 30324,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "235689",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 323,
    "type": "physical",
    "deviceId": 30381,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU000051",
    "tradePointId": "RU4201082",
    "logicalDevicesCount": 2
  },
  {
    "id": 324,
    "type": "physical",
    "deviceId": 30407,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU0020",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 325,
    "type": "physical",
    "deviceId": 30327,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 326,
    "type": "physical",
    "deviceId": 30197,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "AD00004",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 327,
    "type": "physical",
    "deviceId": 30328,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "556575",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 2
  },
  {
    "id": 328,
    "type": "physical",
    "deviceId": 30201,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "AV01",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 329,
    "type": "physical",
    "deviceId": 30205,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "AD00055",
    "tradePointId": "RU420109",
    "logicalDevicesCount": 1
  },
  {
    "id": 330,
    "type": "physical",
    "deviceId": 30207,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU450200",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 331,
    "type": "physical",
    "deviceId": 30339,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "403121",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 332,
    "type": "physical",
    "deviceId": 31118,
    "parentId": null,
    "modelName": "VeriFone VX510",
    "childsCount": 0,
    "serialNumber": "TEST00090",
    "tradePointId": "DA0000004",
    "logicalDevicesCount": 1
  },
  {
    "id": 333,
    "type": "physical",
    "deviceId": 31132,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": "TEST00090",
    "tradePointId": "DA0000004",
    "logicalDevicesCount": 1
  },
  {
    "id": 334,
    "type": "physical",
    "deviceId": 31134,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "TEST00090",
    "tradePointId": "DA0000004",
    "logicalDevicesCount": 1
  },
  {
    "id": 335,
    "type": "physical",
    "deviceId": 31122,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "TEST00090",
    "tradePointId": "DA0000004",
    "logicalDevicesCount": 1
  },
  {
    "id": 336,
    "type": "physical",
    "deviceId": 31139,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "TEST00090",
    "tradePointId": "DA0000004",
    "logicalDevicesCount": 1
  },
  {
    "id": 337,
    "type": "physical",
    "deviceId": 30385,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "UNKNOWN",
    "tradePointId": "1013",
    "logicalDevicesCount": 1
  },
  {
    "id": 338,
    "type": "physical",
    "deviceId": 30341,
    "parentId": 30339,
    "modelName": "Cryptera UPT 7000",
    "childsCount": 1,
    "serialNumber": "403121",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 339,
    "type": "physical",
    "deviceId": 30343,
    "parentId": 30341,
    "modelName": "Vivopay Kiosk",
    "childsCount": 0,
    "serialNumber": "403121",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 340,
    "type": "physical",
    "deviceId": 30347,
    "parentId": 30349,
    "modelName": "Cryptera UPT 7000",
    "childsCount": 1,
    "serialNumber": "403122",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 341,
    "type": "physical",
    "deviceId": 30349,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "403122",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 342,
    "type": "physical",
    "deviceId": 30209,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser12011",
    "tradePointId": "RU4201082",
    "logicalDevicesCount": 1
  },
  {
    "id": 343,
    "type": "physical",
    "deviceId": 30345,
    "parentId": 30347,
    "modelName": "Vivopay Kiosk",
    "childsCount": 0,
    "serialNumber": "403122",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 344,
    "type": "physical",
    "deviceId": 30213,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "RU450202",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 345,
    "type": "physical",
    "deviceId": 30215,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "RU450203",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 346,
    "type": "physical",
    "deviceId": 30217,
    "parentId": 30218,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "G00327946639",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 347,
    "type": "physical",
    "deviceId": 30218,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 1,
    "serialNumber": "MO0327690",
    "tradePointId": "RU111111",
    "logicalDevicesCount": 1
  },
  {
    "id": 348,
    "type": "physical",
    "deviceId": 30221,
    "parentId": 30314,
    "modelName": "VeriFone VX510",
    "childsCount": 1,
    "serialNumber": "07/12/2017",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 349,
    "type": "physical",
    "deviceId": 30223,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "0000111232",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 350,
    "type": "physical",
    "deviceId": 30227,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": "RR02",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 351,
    "type": "physical",
    "deviceId": 30229,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": "RR03",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 352,
    "type": "physical",
    "deviceId": 30225,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "RR01",
    "tradePointId": "DA0000003",
    "logicalDevicesCount": 1
  },
  {
    "id": 353,
    "type": "physical",
    "deviceId": 30237,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": "RU450282",
    "tradePointId": "VD7770018",
    "logicalDevicesCount": 1
  },
  {
    "id": 354,
    "type": "physical",
    "deviceId": 30238,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": "MO000001",
    "tradePointId": "VD7770018",
    "logicalDevicesCount": 1
  },
  {
    "id": 355,
    "type": "physical",
    "deviceId": 30241,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "70659089",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 356,
    "type": "physical",
    "deviceId": 30243,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "82408607",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 357,
    "type": "physical",
    "deviceId": 30067,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "NEWPOS00001",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 358,
    "type": "physical",
    "deviceId": 3032,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "11111",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 359,
    "type": "physical",
    "deviceId": 3172,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "MO0000001",
    "tradePointId": "RU100001",
    "logicalDevicesCount": 1
  },
  {
    "id": 360,
    "type": "physical",
    "deviceId": 3174,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "MO0000002",
    "tradePointId": "RU100001",
    "logicalDevicesCount": 1
  },
  {
    "id": 361,
    "type": "physical",
    "deviceId": 3053,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "TEST0001",
    "tradePointId": "100764348000050",
    "logicalDevicesCount": 1
  },
  {
    "id": 362,
    "type": "physical",
    "deviceId": 3063,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "MM034RO12",
    "tradePointId": "3000",
    "logicalDevicesCount": 1
  },
  {
    "id": 363,
    "type": "physical",
    "deviceId": 3242,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0067",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 364,
    "type": "physical",
    "deviceId": 3243,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0068",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 365,
    "type": "physical",
    "deviceId": 3133,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "MO0345880",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 366,
    "type": "physical",
    "deviceId": 3122,
    "parentId": 3123,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "80089075",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 367,
    "type": "physical",
    "deviceId": 3123,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 1,
    "serialNumber": "8210RU14AD01001004435842",
    "tradePointId": "DA0000002",
    "logicalDevicesCount": 1
  },
  {
    "id": 368,
    "type": "physical",
    "deviceId": 3160,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 1,
    "serialNumber": "MO0345881",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 369,
    "type": "physical",
    "deviceId": 3120,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "RD340001",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 370,
    "type": "physical",
    "deviceId": 3124,
    "parentId": 3426,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "10008769",
    "tradePointId": "DA0000003",
    "logicalDevicesCount": 1
  },
  {
    "id": 371,
    "type": "physical",
    "deviceId": 3426,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 1,
    "serialNumber": "11MM112",
    "tradePointId": "DA0000001",
    "logicalDevicesCount": 1
  },
  {
    "id": 372,
    "type": "physical",
    "deviceId": 3166,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "MO0345888",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 373,
    "type": "physical",
    "deviceId": 3146,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser12011",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 374,
    "type": "physical",
    "deviceId": 3244,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0069",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 375,
    "type": "physical",
    "deviceId": 3157,
    "parentId": null,
    "modelName": "Nurit8210",
    "childsCount": 0,
    "serialNumber": "VD0000004",
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 376,
    "type": "physical",
    "deviceId": 3154,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 377,
    "type": "physical",
    "deviceId": 3155,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 378,
    "type": "physical",
    "deviceId": 3153,
    "parentId": null,
    "modelName": "Petroline PC ASU",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 379,
    "type": "physical",
    "deviceId": 3152,
    "parentId": null,
    "modelName": "VeriFone VX820 CTLS",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 380,
    "type": "physical",
    "deviceId": 3142,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser12010",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 381,
    "type": "physical",
    "deviceId": 3162,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "70812077",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 382,
    "type": "physical",
    "deviceId": 3268,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0093",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 383,
    "type": "physical",
    "deviceId": 3269,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0094",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 384,
    "type": "physical",
    "deviceId": 3270,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0095",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 385,
    "type": "physical",
    "deviceId": 3393,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser12016",
    "tradePointId": "1013",
    "logicalDevicesCount": 1
  },
  {
    "id": 386,
    "type": "physical",
    "deviceId": 3386,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": null,
    "tradePointId": null,
    "logicalDevicesCount": 0
  },
  {
    "id": 387,
    "type": "physical",
    "deviceId": 3132,
    "parentId": 3160,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "70505660",
    "tradePointId": "RU420108",
    "logicalDevicesCount": 1
  },
  {
    "id": 388,
    "type": "physical",
    "deviceId": 3219,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "ser0044",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 389,
    "type": "physical",
    "deviceId": 3383,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "82408607",
    "tradePointId": null,
    "logicalDevicesCount": 1
  },
  {
    "id": 390,
    "type": "physical",
    "deviceId": 3179,
    "parentId": null,
    "modelName": "NEWPOS8210",
    "childsCount": 0,
    "serialNumber": "82000471",
    "tradePointId": "3000",
    "logicalDevicesCount": 1
  },
  {
    "id": 391,
    "type": "physical",
    "deviceId": 3433,
    "parentId": null,
    "modelName": "Ingenico IPP 320",
    "childsCount": 0,
    "serialNumber": "70659089",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 392,
    "type": "physical",
    "deviceId": 3398,
    "parentId": null,
    "modelName": "Petroline PC OPT",
    "childsCount": 0,
    "serialNumber": "001154691058",
    "tradePointId": "3000",
    "logicalDevicesCount": 1
  },
  {
    "id": 393,
    "type": "physical",
    "deviceId": 3400,
    "parentId": 30221,
    "modelName": "Vivopay Kiosk",
    "childsCount": 0,
    "serialNumber": "CA1032B6880000",
    "tradePointId": "RU0100311",
    "logicalDevicesCount": 1
  },
  {
    "id": 394,
    "type": "logical",
    "deviceId": 30171,
    "merchantId": "1013",
    "terminalId": "01/12/2017",
    "physicalDeviceId": 30170
  },
  {
    "id": 395,
    "type": "logical",
    "deviceId": 30263,
    "merchantId": "3000",
    "terminalId": "RT000035",
    "physicalDeviceId": 30262
  },
  {
    "id": 396,
    "type": "logical",
    "deviceId": 30276,
    "merchantId": "100764348000050",
    "terminalId": "RU330008",
    "physicalDeviceId": 30274
  },
  {
    "id": 397,
    "type": "logical",
    "deviceId": 30277,
    "merchantId": "100764348000050",
    "terminalId": "MO330003",
    "physicalDeviceId": 30275
  },
  {
    "id": 398,
    "type": "logical",
    "deviceId": 30352,
    "merchantId": "12345",
    "terminalId": "test 19/02/2018",
    "physicalDeviceId": 30351
  },
  {
    "id": 399,
    "type": "logical",
    "deviceId": 30354,
    "merchantId": "12345",
    "terminalId": "test asu 19/02/2018",
    "physicalDeviceId": 30353
  },
  {
    "id": 400,
    "type": "logical",
    "deviceId": 3161,
    "merchantId": "089827028000020",
    "terminalId": "MO0345881",
    "physicalDeviceId": 3160
  },
  {
    "id": 401,
    "type": "logical",
    "deviceId": 3144,
    "merchantId": "1010",
    "terminalId": "TERM0010",
    "physicalDeviceId": 3142
  },
  {
    "id": 402,
    "type": "logical",
    "deviceId": 30273,
    "merchantId": "100764348000050",
    "terminalId": "MO330002",
    "physicalDeviceId": 30272
  },
  {
    "id": 403,
    "type": "logical",
    "deviceId": 30248,
    "merchantId": "1013",
    "terminalId": "WW0002",
    "physicalDeviceId": 30247
  },
  {
    "id": 404,
    "type": "logical",
    "deviceId": 30252,
    "merchantId": "3000",
    "terminalId": "WWW1233",
    "physicalDeviceId": 30251
  },
  {
    "id": 405,
    "type": "logical",
    "deviceId": 3167,
    "merchantId": "100764348000050",
    "terminalId": "RU450264",
    "physicalDeviceId": 3162
  },
  {
    "id": 406,
    "type": "logical",
    "deviceId": 30265,
    "merchantId": "100764348000050",
    "terminalId": "AD00044",
    "physicalDeviceId": 30264
  },
  {
    "id": 407,
    "type": "logical",
    "deviceId": 30356,
    "merchantId": "3000",
    "terminalId": "VivopayII_Test1",
    "physicalDeviceId": 30355
  },
  {
    "id": 408,
    "type": "logical",
    "deviceId": 30358,
    "merchantId": "3000",
    "terminalId": "Cryptera_Test1",
    "physicalDeviceId": 30357
  },
  {
    "id": 409,
    "type": "logical",
    "deviceId": 30281,
    "merchantId": "100764348000050",
    "terminalId": "RU330009",
    "physicalDeviceId": 30278
  },
  {
    "id": 410,
    "type": "logical",
    "deviceId": 30282,
    "merchantId": "100764348000050",
    "terminalId": "RU330005",
    "physicalDeviceId": 30279
  },
  {
    "id": 411,
    "type": "logical",
    "deviceId": 30284,
    "merchantId": "100764348000050",
    "terminalId": "AD00055",
    "physicalDeviceId": 30205
  },
  {
    "id": 412,
    "type": "logical",
    "deviceId": 30134,
    "merchantId": "3000",
    "terminalId": "newpos test logical 22/09/2017",
    "physicalDeviceId": 30133
  },
  {
    "id": 413,
    "type": "logical",
    "deviceId": 30139,
    "merchantId": "100764348000050",
    "terminalId": "RU111100",
    "physicalDeviceId": 30137
  },
  {
    "id": 414,
    "type": "logical",
    "deviceId": 30140,
    "merchantId": "100764348000050",
    "terminalId": "VD0327690",
    "physicalDeviceId": 30138
  },
  {
    "id": 415,
    "type": "logical",
    "deviceId": 30176,
    "merchantId": "9908474902",
    "terminalId": "RU0000022",
    "physicalDeviceId": 30175
  },
  {
    "id": 416,
    "type": "logical",
    "deviceId": 30269,
    "merchantId": "100764348000050",
    "terminalId": "MO330001",
    "physicalDeviceId": 30267
  },
  {
    "id": 417,
    "type": "logical",
    "deviceId": 30268,
    "merchantId": "100764348000050",
    "terminalId": "RU330001",
    "physicalDeviceId": 30266
  },
  {
    "id": 418,
    "type": "logical",
    "deviceId": 30256,
    "merchantId": "100764348000050",
    "terminalId": "RU000002 ",
    "physicalDeviceId": 3171
  },
  {
    "id": 419,
    "type": "logical",
    "deviceId": 30288,
    "merchantId": "VD104348000050",
    "terminalId": "RU330009",
    "physicalDeviceId": 30285
  },
  {
    "id": 420,
    "type": "logical",
    "deviceId": 30289,
    "merchantId": "VD104348000050",
    "terminalId": "RU330005",
    "physicalDeviceId": 30286
  },
  {
    "id": 421,
    "type": "logical",
    "deviceId": 30290,
    "merchantId": "VD104348000050",
    "terminalId": "MO330005",
    "physicalDeviceId": 30287
  },
  {
    "id": 422,
    "type": "logical",
    "deviceId": 30257,
    "merchantId": "1013",
    "terminalId": "MMM00098",
    "physicalDeviceId": 30173
  },
  {
    "id": 423,
    "type": "logical",
    "deviceId": 30360,
    "merchantId": "3000",
    "terminalId": "Asu_Cryptera_KioskII",
    "physicalDeviceId": 30359
  },
  {
    "id": 424,
    "type": "logical",
    "deviceId": 30270,
    "merchantId": "100764348000050",
    "terminalId": "TRRR0001",
    "physicalDeviceId": 3171
  },
  {
    "id": 425,
    "type": "logical",
    "deviceId": 30261,
    "merchantId": "3000",
    "terminalId": "PT000001",
    "physicalDeviceId": 30260
  },
  {
    "id": 426,
    "type": "logical",
    "deviceId": 30295,
    "merchantId": "3000",
    "terminalId": "ISELFT001",
    "physicalDeviceId": 30294
  },
  {
    "id": 427,
    "type": "logical",
    "deviceId": 30299,
    "merchantId": "100764348000050",
    "terminalId": "RDR00056",
    "physicalDeviceId": 30296
  },
  {
    "id": 428,
    "type": "logical",
    "deviceId": 30300,
    "merchantId": "100764348000050",
    "terminalId": "RDR00055",
    "physicalDeviceId": 30297
  },
  {
    "id": 429,
    "type": "logical",
    "deviceId": 30301,
    "merchantId": "100764348000050",
    "terminalId": "RDR00052",
    "physicalDeviceId": 30298
  },
  {
    "id": 430,
    "type": "logical",
    "deviceId": 30303,
    "merchantId": "100764348000050",
    "terminalId": "IS000001",
    "physicalDeviceId": 30302
  },
  {
    "id": 431,
    "type": "logical",
    "deviceId": 30362,
    "merchantId": "9908474902",
    "terminalId": "autonom tid1",
    "physicalDeviceId": 30361
  },
  {
    "id": 432,
    "type": "logical",
    "deviceId": 30370,
    "merchantId": "Test_Merchant_Number1",
    "terminalId": "450281111",
    "physicalDeviceId": 30223
  },
  {
    "id": 433,
    "type": "logical",
    "deviceId": 3336,
    "merchantId": "1010",
    "terminalId": "TERM0063",
    "physicalDeviceId": 3238
  },
  {
    "id": 434,
    "type": "logical",
    "deviceId": 3337,
    "merchantId": "1010",
    "terminalId": "TERM0064",
    "physicalDeviceId": 3239
  },
  {
    "id": 435,
    "type": "logical",
    "deviceId": 3338,
    "merchantId": "1010",
    "terminalId": "TERM0065",
    "physicalDeviceId": 3240
  },
  {
    "id": 436,
    "type": "logical",
    "deviceId": 3339,
    "merchantId": "1010",
    "terminalId": "TERM0066",
    "physicalDeviceId": 3241
  },
  {
    "id": 437,
    "type": "logical",
    "deviceId": 3340,
    "merchantId": "1010",
    "terminalId": "TERM0067",
    "physicalDeviceId": 3242
  },
  {
    "id": 438,
    "type": "logical",
    "deviceId": 3341,
    "merchantId": "1010",
    "terminalId": "TERM0068",
    "physicalDeviceId": 3243
  },
  {
    "id": 439,
    "type": "logical",
    "deviceId": 3342,
    "merchantId": "1010",
    "terminalId": "TERM0069",
    "physicalDeviceId": 3244
  },
  {
    "id": 440,
    "type": "logical",
    "deviceId": 3343,
    "merchantId": "1010",
    "terminalId": "TERM0070",
    "physicalDeviceId": 3245
  },
  {
    "id": 441,
    "type": "logical",
    "deviceId": 3344,
    "merchantId": "1010",
    "terminalId": "TERM0071",
    "physicalDeviceId": 3246
  },
  {
    "id": 442,
    "type": "logical",
    "deviceId": 3345,
    "merchantId": "1010",
    "terminalId": "TERM0072",
    "physicalDeviceId": 3247
  },
  {
    "id": 443,
    "type": "logical",
    "deviceId": 30305,
    "merchantId": "9908474902",
    "terminalId": "ISELFT002",
    "physicalDeviceId": 30304
  },
  {
    "id": 444,
    "type": "logical",
    "deviceId": 30309,
    "merchantId": "100764348000050",
    "terminalId": "ISE00004",
    "physicalDeviceId": 30306
  },
  {
    "id": 445,
    "type": "logical",
    "deviceId": 30310,
    "merchantId": "100764348000050",
    "terminalId": "ISE00053",
    "physicalDeviceId": 30307
  },
  {
    "id": 446,
    "type": "logical",
    "deviceId": 30311,
    "merchantId": "100764348000050",
    "terminalId": "NU100001",
    "physicalDeviceId": 30308
  },
  {
    "id": 447,
    "type": "logical",
    "deviceId": 30374,
    "merchantId": "Test_Merchant_Number1",
    "terminalId": "403122",
    "physicalDeviceId": 30371
  },
  {
    "id": 448,
    "type": "logical",
    "deviceId": 30376,
    "merchantId": "Test_Merchant_Number1",
    "terminalId": "454545",
    "physicalDeviceId": 30375
  },
  {
    "id": 449,
    "type": "logical",
    "deviceId": 30378,
    "merchantId": "Test_Merchant_Number1",
    "terminalId": "545454",
    "physicalDeviceId": 30377
  },
  {
    "id": 450,
    "type": "logical",
    "deviceId": 3409,
    "merchantId": "3000",
    "terminalId": "MO111111",
    "physicalDeviceId": 3408
  },
  {
    "id": 451,
    "type": "logical",
    "deviceId": 3384,
    "merchantId": "1010",
    "terminalId": "VOL3001",
    "physicalDeviceId": 3383
  },
  {
    "id": 452,
    "type": "logical",
    "deviceId": 30380,
    "merchantId": "Test_Merchant_Number1",
    "terminalId": "123123",
    "physicalDeviceId": 30379
  },
  {
    "id": 453,
    "type": "logical",
    "deviceId": 30190,
    "merchantId": "100764348000050",
    "terminalId": "RU450283",
    "physicalDeviceId": 30188
  },
  {
    "id": 454,
    "type": "logical",
    "deviceId": 30315,
    "merchantId": "3000",
    "terminalId": "garland logical 1",
    "physicalDeviceId": 30314
  },
  {
    "id": 455,
    "type": "logical",
    "deviceId": 30168,
    "merchantId": "100764348000050",
    "terminalId": "RU00004",
    "physicalDeviceId": 30167
  },
  {
    "id": 456,
    "type": "logical",
    "deviceId": 30169,
    "merchantId": "100764348000050",
    "terminalId": "RU00005",
    "physicalDeviceId": 30167
  },
  {
    "id": 457,
    "type": "logical",
    "deviceId": 30192,
    "merchantId": "2010",
    "terminalId": "RU000003",
    "physicalDeviceId": 30191
  },
  {
    "id": 458,
    "type": "logical",
    "deviceId": 30317,
    "merchantId": "3000",
    "terminalId": "445566",
    "physicalDeviceId": 30316
  },
  {
    "id": 459,
    "type": "logical",
    "deviceId": 30319,
    "merchantId": "3000",
    "terminalId": "556677",
    "physicalDeviceId": 30318
  },
  {
    "id": 460,
    "type": "logical",
    "deviceId": 30321,
    "merchantId": "3000",
    "terminalId": "VF820",
    "physicalDeviceId": 30320
  },
  {
    "id": 461,
    "type": "logical",
    "deviceId": 30323,
    "merchantId": "3000",
    "terminalId": "VF520CT",
    "physicalDeviceId": 30322
  },
  {
    "id": 462,
    "type": "logical",
    "deviceId": 30325,
    "merchantId": "3000",
    "terminalId": "ASU_VF520ct",
    "physicalDeviceId": 30324
  },
  {
    "id": 463,
    "type": "logical",
    "deviceId": 30382,
    "merchantId": "100764348000050",
    "terminalId": "RU000041",
    "physicalDeviceId": 30381
  },
  {
    "id": 464,
    "type": "logical",
    "deviceId": 30383,
    "merchantId": "100764348000050",
    "terminalId": "RU000051",
    "physicalDeviceId": 30381
  },
  {
    "id": 465,
    "type": "logical",
    "deviceId": 30384,
    "merchantId": "MERCHANT0000001",
    "terminalId": "RU450281",
    "physicalDeviceId": 30187
  },
  {
    "id": 466,
    "type": "logical",
    "deviceId": 30408,
    "merchantId": "MERCHANT0000001",
    "terminalId": "RU0020",
    "physicalDeviceId": 30407
  },
  {
    "id": 467,
    "type": "logical",
    "deviceId": 30386,
    "merchantId": "MERCHANT0000001",
    "terminalId": "RU0019",
    "physicalDeviceId": 30385
  },
  {
    "id": 468,
    "type": "logical",
    "deviceId": 30196,
    "merchantId": "3000",
    "terminalId": "TT00004",
    "physicalDeviceId": 30193
  },
  {
    "id": 469,
    "type": "logical",
    "deviceId": 30199,
    "merchantId": "100764348000050",
    "terminalId": "AD00004",
    "physicalDeviceId": 30197
  },
  {
    "id": 470,
    "type": "logical",
    "deviceId": 30329,
    "merchantId": "3000",
    "terminalId": "VivoPay123",
    "physicalDeviceId": 30328
  },
  {
    "id": 471,
    "type": "logical",
    "deviceId": 30330,
    "merchantId": "3000",
    "terminalId": "VivoPay124",
    "physicalDeviceId": 30328
  },
  {
    "id": 472,
    "type": "logical",
    "deviceId": 30204,
    "merchantId": "9908474902",
    "terminalId": "AV03",
    "physicalDeviceId": 30201
  },
  {
    "id": 473,
    "type": "logical",
    "deviceId": 30208,
    "merchantId": "100764348000050",
    "terminalId": "RU450200",
    "physicalDeviceId": 30207
  },
  {
    "id": 474,
    "type": "logical",
    "deviceId": 30340,
    "merchantId": "3000",
    "terminalId": "450281",
    "physicalDeviceId": 30339
  },
  {
    "id": 475,
    "type": "logical",
    "deviceId": 31119,
    "merchantId": "TEST_MERCHANT",
    "terminalId": "TEST00090_VX510",
    "physicalDeviceId": 31118
  },
  {
    "id": 476,
    "type": "logical",
    "deviceId": 31133,
    "merchantId": "TEST_MERCHANT",
    "terminalId": "TEST00090_PC_ASU",
    "physicalDeviceId": 31132
  },
  {
    "id": 477,
    "type": "logical",
    "deviceId": 31135,
    "merchantId": "TEST_MERCHANT",
    "terminalId": "TEST00090_NURIT",
    "physicalDeviceId": 31134
  },
  {
    "id": 478,
    "type": "logical",
    "deviceId": 31138,
    "merchantId": "TEST_MERCHANT",
    "terminalId": "TEST00090_IPP_EDITED",
    "physicalDeviceId": 31122
  },
  {
    "id": 479,
    "type": "logical",
    "deviceId": 31140,
    "merchantId": "TEST_MERCHANT",
    "terminalId": "TEST00090",
    "physicalDeviceId": 31139
  },
  {
    "id": 480,
    "type": "logical",
    "deviceId": 30342,
    "merchantId": "3000",
    "terminalId": "450282",
    "physicalDeviceId": 30341
  },
  {
    "id": 481,
    "type": "logical",
    "deviceId": 30344,
    "merchantId": "3000",
    "terminalId": "450283",
    "physicalDeviceId": 30343
  },
  {
    "id": 482,
    "type": "logical",
    "deviceId": 30348,
    "merchantId": "3000",
    "terminalId": "450292",
    "physicalDeviceId": 30347
  },
  {
    "id": 483,
    "type": "logical",
    "deviceId": 30350,
    "merchantId": "3000",
    "terminalId": "450291",
    "physicalDeviceId": 30349
  },
  {
    "id": 484,
    "type": "logical",
    "deviceId": 30210,
    "merchantId": "100764348000050",
    "terminalId": "RU450201",
    "physicalDeviceId": 30209
  },
  {
    "id": 485,
    "type": "logical",
    "deviceId": 30346,
    "merchantId": "3000",
    "terminalId": "450293",
    "physicalDeviceId": 30345
  },
  {
    "id": 486,
    "type": "logical",
    "deviceId": 30214,
    "merchantId": "100764348000050",
    "terminalId": "RU450202",
    "physicalDeviceId": 30213
  },
  {
    "id": 487,
    "type": "logical",
    "deviceId": 30216,
    "merchantId": "100764348000050",
    "terminalId": "RU450203",
    "physicalDeviceId": 30215
  },
  {
    "id": 488,
    "type": "logical",
    "deviceId": 30219,
    "merchantId": "100764348000050",
    "terminalId": "RU111112",
    "physicalDeviceId": 30217
  },
  {
    "id": 489,
    "type": "logical",
    "deviceId": 30220,
    "merchantId": "100764348000050",
    "terminalId": "MO0327690",
    "physicalDeviceId": 30218
  },
  {
    "id": 490,
    "type": "logical",
    "deviceId": 30222,
    "merchantId": "2010",
    "terminalId": "07/12/2017",
    "physicalDeviceId": 30221
  },
  {
    "id": 491,
    "type": "logical",
    "deviceId": 30226,
    "merchantId": "3000",
    "terminalId": "RR01",
    "physicalDeviceId": 30225
  },
  {
    "id": 492,
    "type": "logical",
    "deviceId": 30228,
    "merchantId": "9908474902",
    "terminalId": "RR02",
    "physicalDeviceId": 30227
  },
  {
    "id": 493,
    "type": "logical",
    "deviceId": 30230,
    "merchantId": "3000",
    "terminalId": "RR03",
    "physicalDeviceId": 30229
  },
  {
    "id": 494,
    "type": "logical",
    "deviceId": 30239,
    "merchantId": "111111111111111",
    "terminalId": "RU450282",
    "physicalDeviceId": 30237
  },
  {
    "id": 495,
    "type": "logical",
    "deviceId": 30240,
    "merchantId": "111111111111111",
    "terminalId": "MO000001",
    "physicalDeviceId": 30238
  },
  {
    "id": 496,
    "type": "logical",
    "deviceId": 30242,
    "merchantId": "100764348000050",
    "terminalId": "RU450204",
    "physicalDeviceId": 30241
  },
  {
    "id": 497,
    "type": "logical",
    "deviceId": 30244,
    "merchantId": "100764348000050",
    "terminalId": "RU450205",
    "physicalDeviceId": 30243
  },
  {
    "id": 498,
    "type": "logical",
    "deviceId": 3033,
    "merchantId": "3000",
    "terminalId": "12345",
    "physicalDeviceId": 3032
  },
  {
    "id": 499,
    "type": "logical",
    "deviceId": 3176,
    "merchantId": "100764348000050",
    "terminalId": "MO0000001",
    "physicalDeviceId": 3172
  },
  {
    "id": 500,
    "type": "logical",
    "deviceId": 3178,
    "merchantId": "100764348000050",
    "terminalId": "MO0000002",
    "physicalDeviceId": 3174
  },
  {
    "id": 501,
    "type": "logical",
    "deviceId": 3042,
    "merchantId": "3000",
    "terminalId": "VOL3003",
    "physicalDeviceId": 2994
  },
  {
    "id": 502,
    "type": "logical",
    "deviceId": 3134,
    "merchantId": "089827028000020",
    "terminalId": "RU450260",
    "physicalDeviceId": 3132
  },
  {
    "id": 503,
    "type": "logical",
    "deviceId": 3054,
    "merchantId": "100764348000050",
    "terminalId": "TEST20001",
    "physicalDeviceId": 3053
  },
  {
    "id": 504,
    "type": "logical",
    "deviceId": 3064,
    "merchantId": "3000",
    "terminalId": "SSW230018",
    "physicalDeviceId": 3063
  },
  {
    "id": 505,
    "type": "logical",
    "deviceId": 3317,
    "merchantId": "1010",
    "terminalId": "TERM0044",
    "physicalDeviceId": 3219
  },
  {
    "id": 506,
    "type": "logical",
    "deviceId": 3177,
    "merchantId": "100764348000050",
    "terminalId": "RU000002",
    "physicalDeviceId": 3173
  },
  {
    "id": 507,
    "type": "logical",
    "deviceId": 3135,
    "merchantId": "089827028000020",
    "terminalId": "MO0345880",
    "physicalDeviceId": 3133
  },
  {
    "id": 508,
    "type": "logical",
    "deviceId": 3126,
    "merchantId": "111111111111111",
    "terminalId": "RD340002",
    "physicalDeviceId": 3122
  },
  {
    "id": 509,
    "type": "logical",
    "deviceId": 3127,
    "merchantId": "111111111111111",
    "terminalId": "VD0000002",
    "physicalDeviceId": 3123
  },
  {
    "id": 510,
    "type": "logical",
    "deviceId": 3427,
    "merchantId": "1010",
    "terminalId": "1",
    "physicalDeviceId": 3426
  },
  {
    "id": 511,
    "type": "logical",
    "deviceId": 3434,
    "merchantId": "9908474902",
    "terminalId": "TEST01",
    "physicalDeviceId": 3433
  },
  {
    "id": 512,
    "type": "logical",
    "deviceId": 3168,
    "merchantId": "100764348000050",
    "terminalId": "MO0345888",
    "physicalDeviceId": 3166
  },
  {
    "id": 513,
    "type": "logical",
    "deviceId": 3147,
    "merchantId": "1010",
    "terminalId": "TERM0011",
    "physicalDeviceId": 3146
  },
  {
    "id": 514,
    "type": "logical",
    "deviceId": 3130,
    "merchantId": "065940521000043",
    "terminalId": "RD340001",
    "physicalDeviceId": 3120
  },
  {
    "id": 515,
    "type": "logical",
    "deviceId": 3128,
    "merchantId": "062426551000048",
    "terminalId": "RD340003",
    "physicalDeviceId": 3124
  },
  {
    "id": 516,
    "type": "logical",
    "deviceId": 3180,
    "merchantId": "1010",
    "terminalId": "MSK3001",
    "physicalDeviceId": 3179
  },
  {
    "id": 517,
    "type": "logical",
    "deviceId": 3403,
    "merchantId": "3000",
    "terminalId": "RU57000602",
    "physicalDeviceId": 3402
  },
  {
    "id": 518,
    "type": "logical",
    "deviceId": 3318,
    "merchantId": "1010",
    "terminalId": "TERM0045",
    "physicalDeviceId": 3220
  },
  {
    "id": 519,
    "type": "logical",
    "deviceId": 3319,
    "merchantId": "1010",
    "terminalId": "TERM0046",
    "physicalDeviceId": 3221
  },
  {
    "id": 520,
    "type": "logical",
    "deviceId": 3320,
    "merchantId": "1010",
    "terminalId": "TERM0047",
    "physicalDeviceId": 3222
  },
  {
    "id": 521,
    "type": "logical",
    "deviceId": 3321,
    "merchantId": "1010",
    "terminalId": "TERM0048",
    "physicalDeviceId": 3223
  },
  {
    "id": 522,
    "type": "logical",
    "deviceId": 3401,
    "merchantId": "3000",
    "terminalId": "RU57000601",
    "physicalDeviceId": 3400
  },
  {
    "id": 523,
    "type": "logical",
    "deviceId": 3286,
    "merchantId": "1010",
    "terminalId": "TERM0013",
    "physicalDeviceId": 3188
  },
  {
    "id": 524,
    "type": "logical",
    "deviceId": 3287,
    "merchantId": "1010",
    "terminalId": "TERM0014",
    "physicalDeviceId": 3189
  },
  {
    "id": 525,
    "type": "logical",
    "deviceId": 3288,
    "merchantId": "1010",
    "terminalId": "TERM0015",
    "physicalDeviceId": 3190
  },
  {
    "id": 526,
    "type": "logical",
    "deviceId": 3289,
    "merchantId": "1010",
    "terminalId": "TERM0016",
    "physicalDeviceId": 3191
  },
  {
    "id": 527,
    "type": "logical",
    "deviceId": 3292,
    "merchantId": "1010",
    "terminalId": "TERM0019",
    "physicalDeviceId": 3194
  },
  {
    "id": 528,
    "type": "logical",
    "deviceId": 3290,
    "merchantId": "1010",
    "terminalId": "TERM0017",
    "physicalDeviceId": 3192
  },
  {
    "id": 529,
    "type": "logical",
    "deviceId": 3291,
    "merchantId": "1010",
    "terminalId": "TERM0018",
    "physicalDeviceId": 3193
  },
  {
    "id": 530,
    "type": "logical",
    "deviceId": 3405,
    "merchantId": "3000",
    "terminalId": "RU57000600",
    "physicalDeviceId": 3404
  },
  {
    "id": 531,
    "type": "logical",
    "deviceId": 3432,
    "merchantId": "1010",
    "terminalId": "test",
    "physicalDeviceId": 3431
  },
  {
    "id": 532,
    "type": "logical",
    "deviceId": 3293,
    "merchantId": "1010",
    "terminalId": "TERM0020",
    "physicalDeviceId": 3195
  },
  {
    "id": 533,
    "type": "logical",
    "deviceId": 3294,
    "merchantId": "1010",
    "terminalId": "TERM0021",
    "physicalDeviceId": 3196
  },
  {
    "id": 534,
    "type": "logical",
    "deviceId": 3295,
    "merchantId": "1010",
    "terminalId": "TERM0022",
    "physicalDeviceId": 3197
  },
  {
    "id": 535,
    "type": "logical",
    "deviceId": 3296,
    "merchantId": "1010",
    "terminalId": "TERM0023",
    "physicalDeviceId": 3198
  },
  {
    "id": 536,
    "type": "logical",
    "deviceId": 3297,
    "merchantId": "1010",
    "terminalId": "TERM0024",
    "physicalDeviceId": 3199
  },
  {
    "id": 537,
    "type": "logical",
    "deviceId": 3298,
    "merchantId": "1010",
    "terminalId": "TERM0025",
    "physicalDeviceId": 3200
  },
  {
    "id": 538,
    "type": "logical",
    "deviceId": 3299,
    "merchantId": "1010",
    "terminalId": "TERM0026",
    "physicalDeviceId": 3201
  },
  {
    "id": 539,
    "type": "logical",
    "deviceId": 3300,
    "merchantId": "1010",
    "terminalId": "TERM0027",
    "physicalDeviceId": 3202
  },
  {
    "id": 540,
    "type": "logical",
    "deviceId": 3301,
    "merchantId": "1010",
    "terminalId": "TERM0028",
    "physicalDeviceId": 3203
  },
  {
    "id": 541,
    "type": "logical",
    "deviceId": 3302,
    "merchantId": "1010",
    "terminalId": "TERM0029",
    "physicalDeviceId": 3204
  },
  {
    "id": 542,
    "type": "logical",
    "deviceId": 3303,
    "merchantId": "1010",
    "terminalId": "TERM0030",
    "physicalDeviceId": 3205
  },
  {
    "id": 543,
    "type": "logical",
    "deviceId": 3304,
    "merchantId": "1010",
    "terminalId": "TERM0031",
    "physicalDeviceId": 3206
  },
  {
    "id": 544,
    "type": "logical",
    "deviceId": 3305,
    "merchantId": "1010",
    "terminalId": "TERM0032",
    "physicalDeviceId": 3207
  },
  {
    "id": 545,
    "type": "logical",
    "deviceId": 3306,
    "merchantId": "1010",
    "terminalId": "TERM0033",
    "physicalDeviceId": 3208
  },
  {
    "id": 546,
    "type": "logical",
    "deviceId": 3307,
    "merchantId": "1010",
    "terminalId": "TERM0034",
    "physicalDeviceId": 3209
  },
  {
    "id": 547,
    "type": "logical",
    "deviceId": 3308,
    "merchantId": "1010",
    "terminalId": "TERM0035",
    "physicalDeviceId": 3210
  },
  {
    "id": 548,
    "type": "logical",
    "deviceId": 3309,
    "merchantId": "1010",
    "terminalId": "TERM0036",
    "physicalDeviceId": 3211
  },
  {
    "id": 549,
    "type": "logical",
    "deviceId": 3310,
    "merchantId": "1010",
    "terminalId": "TERM0037",
    "physicalDeviceId": 3212
  },
  {
    "id": 550,
    "type": "logical",
    "deviceId": 3311,
    "merchantId": "1010",
    "terminalId": "TERM0038",
    "physicalDeviceId": 3213
  },
  {
    "id": 551,
    "type": "logical",
    "deviceId": 3312,
    "merchantId": "1010",
    "terminalId": "TERM0039",
    "physicalDeviceId": 3214
  },
  {
    "id": 552,
    "type": "logical",
    "deviceId": 3313,
    "merchantId": "1010",
    "terminalId": "TERM0040",
    "physicalDeviceId": 3215
  },
  {
    "id": 553,
    "type": "logical",
    "deviceId": 3314,
    "merchantId": "1010",
    "terminalId": "TERM0041",
    "physicalDeviceId": 3216
  },
  {
    "id": 554,
    "type": "logical",
    "deviceId": 3315,
    "merchantId": "1010",
    "terminalId": "TERM0042",
    "physicalDeviceId": 3217
  },
  {
    "id": 555,
    "type": "logical",
    "deviceId": 3316,
    "merchantId": "1010",
    "terminalId": "TERM0043",
    "physicalDeviceId": 3218
  },
  {
    "id": 556,
    "type": "logical",
    "deviceId": 3285,
    "merchantId": "1010",
    "terminalId": "TERM0012",
    "physicalDeviceId": 3187
  },
  {
    "id": 557,
    "type": "logical",
    "deviceId": 3322,
    "merchantId": "1010",
    "terminalId": "TERM0049",
    "physicalDeviceId": 3224
  },
  {
    "id": 558,
    "type": "logical",
    "deviceId": 3323,
    "merchantId": "1010",
    "terminalId": "TERM0050",
    "physicalDeviceId": 3225
  },
  {
    "id": 559,
    "type": "logical",
    "deviceId": 3324,
    "merchantId": "1010",
    "terminalId": "TERM0051",
    "physicalDeviceId": 3226
  },
  {
    "id": 560,
    "type": "logical",
    "deviceId": 3325,
    "merchantId": "1010",
    "terminalId": "TERM0052",
    "physicalDeviceId": 3227
  },
  {
    "id": 561,
    "type": "logical",
    "deviceId": 3326,
    "merchantId": "1010",
    "terminalId": "TERM0053",
    "physicalDeviceId": 3228
  },
  {
    "id": 562,
    "type": "logical",
    "deviceId": 3327,
    "merchantId": "1010",
    "terminalId": "TERM0054",
    "physicalDeviceId": 3229
  },
  {
    "id": 563,
    "type": "logical",
    "deviceId": 3328,
    "merchantId": "1010",
    "terminalId": "TERM0055",
    "physicalDeviceId": 3230
  },
  {
    "id": 564,
    "type": "logical",
    "deviceId": 3329,
    "merchantId": "1010",
    "terminalId": "TERM0056",
    "physicalDeviceId": 3231
  },
  {
    "id": 565,
    "type": "logical",
    "deviceId": 3330,
    "merchantId": "1010",
    "terminalId": "TERM0057",
    "physicalDeviceId": 3232
  },
  {
    "id": 566,
    "type": "logical",
    "deviceId": 3331,
    "merchantId": "1010",
    "terminalId": "TERM0058",
    "physicalDeviceId": 3233
  },
  {
    "id": 567,
    "type": "logical",
    "deviceId": 3332,
    "merchantId": "1010",
    "terminalId": "TERM0059",
    "physicalDeviceId": 3234
  },
  {
    "id": 568,
    "type": "logical",
    "deviceId": 3333,
    "merchantId": "1010",
    "terminalId": "TERM0060",
    "physicalDeviceId": 3235
  },
  {
    "id": 569,
    "type": "logical",
    "deviceId": 3334,
    "merchantId": "1010",
    "terminalId": "TERM0061",
    "physicalDeviceId": 3236
  },
  {
    "id": 570,
    "type": "logical",
    "deviceId": 3335,
    "merchantId": "1010",
    "terminalId": "TERM0062",
    "physicalDeviceId": 3237
  },
  {
    "id": 571,
    "type": "logical",
    "deviceId": 3346,
    "merchantId": "1010",
    "terminalId": "TERM0073",
    "physicalDeviceId": 3248
  },
  {
    "id": 572,
    "type": "logical",
    "deviceId": 3347,
    "merchantId": "1010",
    "terminalId": "TERM0074",
    "physicalDeviceId": 3249
  },
  {
    "id": 573,
    "type": "logical",
    "deviceId": 3348,
    "merchantId": "1010",
    "terminalId": "TERM0075",
    "physicalDeviceId": 3250
  },
  {
    "id": 574,
    "type": "logical",
    "deviceId": 3349,
    "merchantId": "1010",
    "terminalId": "TERM0076",
    "physicalDeviceId": 3251
  },
  {
    "id": 575,
    "type": "logical",
    "deviceId": 3350,
    "merchantId": "1010",
    "terminalId": "TERM0077",
    "physicalDeviceId": 3252
  },
  {
    "id": 576,
    "type": "logical",
    "deviceId": 3351,
    "merchantId": "1010",
    "terminalId": "TERM0078",
    "physicalDeviceId": 3253
  },
  {
    "id": 577,
    "type": "logical",
    "deviceId": 3352,
    "merchantId": "1010",
    "terminalId": "TERM0079",
    "physicalDeviceId": 3254
  },
  {
    "id": 578,
    "type": "logical",
    "deviceId": 3353,
    "merchantId": "1010",
    "terminalId": "TERM0080",
    "physicalDeviceId": 3255
  },
  {
    "id": 579,
    "type": "logical",
    "deviceId": 3354,
    "merchantId": "1010",
    "terminalId": "TERM0081",
    "physicalDeviceId": 3256
  },
  {
    "id": 580,
    "type": "logical",
    "deviceId": 3355,
    "merchantId": "1010",
    "terminalId": "TERM0082",
    "physicalDeviceId": 3257
  },
  {
    "id": 581,
    "type": "logical",
    "deviceId": 3356,
    "merchantId": "1010",
    "terminalId": "TERM0083",
    "physicalDeviceId": 3258
  },
  {
    "id": 582,
    "type": "logical",
    "deviceId": 3357,
    "merchantId": "1010",
    "terminalId": "TERM0084",
    "physicalDeviceId": 3259
  },
  {
    "id": 583,
    "type": "logical",
    "deviceId": 3358,
    "merchantId": "1010",
    "terminalId": "TERM0085",
    "physicalDeviceId": 3260
  },
  {
    "id": 584,
    "type": "logical",
    "deviceId": 3359,
    "merchantId": "1010",
    "terminalId": "TERM0086",
    "physicalDeviceId": 3261
  },
  {
    "id": 585,
    "type": "logical",
    "deviceId": 3360,
    "merchantId": "1010",
    "terminalId": "TERM0087",
    "physicalDeviceId": 3262
  },
  {
    "id": 586,
    "type": "logical",
    "deviceId": 3361,
    "merchantId": "1010",
    "terminalId": "TERM0088",
    "physicalDeviceId": 3263
  },
  {
    "id": 587,
    "type": "logical",
    "deviceId": 3362,
    "merchantId": "1010",
    "terminalId": "TERM0089",
    "physicalDeviceId": 3264
  },
  {
    "id": 588,
    "type": "logical",
    "deviceId": 3363,
    "merchantId": "1010",
    "terminalId": "TERM0090",
    "physicalDeviceId": 3265
  },
  {
    "id": 589,
    "type": "logical",
    "deviceId": 3364,
    "merchantId": "1010",
    "terminalId": "TERM0091",
    "physicalDeviceId": 3266
  },
  {
    "id": 590,
    "type": "logical",
    "deviceId": 3365,
    "merchantId": "1010",
    "terminalId": "TERM0092",
    "physicalDeviceId": 3267
  },
  {
    "id": 591,
    "type": "logical",
    "deviceId": 3366,
    "merchantId": "1010",
    "terminalId": "TERM0093",
    "physicalDeviceId": 3268
  },
  {
    "id": 592,
    "type": "logical",
    "deviceId": 3367,
    "merchantId": "1010",
    "terminalId": "TERM0094",
    "physicalDeviceId": 3269
  },
  {
    "id": 593,
    "type": "logical",
    "deviceId": 3368,
    "merchantId": "1010",
    "terminalId": "TERM0095",
    "physicalDeviceId": 3270
  },
  {
    "id": 594,
    "type": "logical",
    "deviceId": 3369,
    "merchantId": "1010",
    "terminalId": "TERM0096",
    "physicalDeviceId": 3271
  },
  {
    "id": 595,
    "type": "logical",
    "deviceId": 3370,
    "merchantId": "1010",
    "terminalId": "TERM0097",
    "physicalDeviceId": 3272
  },
  {
    "id": 596,
    "type": "logical",
    "deviceId": 3371,
    "merchantId": "1010",
    "terminalId": "TERM0098",
    "physicalDeviceId": 3273
  },
  {
    "id": 597,
    "type": "logical",
    "deviceId": 3372,
    "merchantId": "1010",
    "terminalId": "TERM0099",
    "physicalDeviceId": 3274
  },
  {
    "id": 598,
    "type": "logical",
    "deviceId": 3373,
    "merchantId": "1010",
    "terminalId": "TERM0100",
    "physicalDeviceId": 3275
  },
  {
    "id": 599,
    "type": "logical",
    "deviceId": 3374,
    "merchantId": "1010",
    "terminalId": "TERM0101",
    "physicalDeviceId": 3276
  },
  {
    "id": 600,
    "type": "logical",
    "deviceId": 3375,
    "merchantId": "1010",
    "terminalId": "TERM0102",
    "physicalDeviceId": 3277
  },
  {
    "id": 601,
    "type": "logical",
    "deviceId": 3376,
    "merchantId": "1010",
    "terminalId": "TERM0103",
    "physicalDeviceId": 3278
  },
  {
    "id": 602,
    "type": "logical",
    "deviceId": 3377,
    "merchantId": "1010",
    "terminalId": "TERM0104",
    "physicalDeviceId": 3279
  },
  {
    "id": 603,
    "type": "logical",
    "deviceId": 3378,
    "merchantId": "1010",
    "terminalId": "TERM0105",
    "physicalDeviceId": 3280
  },
  {
    "id": 604,
    "type": "logical",
    "deviceId": 3379,
    "merchantId": "1010",
    "terminalId": "TERM0106",
    "physicalDeviceId": 3281
  },
  {
    "id": 605,
    "type": "logical",
    "deviceId": 3380,
    "merchantId": "1010",
    "terminalId": "TERM0107",
    "physicalDeviceId": 3282
  },
  {
    "id": 606,
    "type": "logical",
    "deviceId": 3381,
    "merchantId": "1010",
    "terminalId": "TERM0108",
    "physicalDeviceId": 3283
  },
  {
    "id": 607,
    "type": "logical",
    "deviceId": 3382,
    "merchantId": "1010",
    "terminalId": "TERM0109",
    "physicalDeviceId": 3284
  },
  {
    "id": 608,
    "type": "logical",
    "deviceId": 3394,
    "merchantId": "1013",
    "terminalId": "TERM0014",
    "physicalDeviceId": 3393
  },
  {
    "id": 609,
    "type": "logical",
    "deviceId": 30068,
    "merchantId": "9908474902",
    "terminalId": "NEWPOSAuto1",
    "physicalDeviceId": 30067
  },
  {
    "id": 610,
    "type": "logical",
    "deviceId": 3399,
    "merchantId": "3000",
    "terminalId": "RU570006",
    "physicalDeviceId": 3398
  }
]

export default entities
