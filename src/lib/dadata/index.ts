import axios, { AxiosRequestConfig } from "axios";

export type tDadataInfo = {
  source: string, // Исходный адрес одной строкой
  result: string, // Стандартизованный адрес одной строкой
  postal_code: string, // Индекс
  country: string, // Страна
  country_iso_code: string, // ISO-код страны
  federal_district: string, // Федеральный округ
  region_fias_id: string, // ФИАС-код региона
  region_kladr_id: string, // КЛАДР-код региона
  region_iso_code: string, // ISO-код региона
  region_with_type: string, // Регион с типом
  region_type: string, // Тип региона (сокращенный)
  region_type_full: string, // Тип региона
  region: string, // Регион
  area_fias_id: string, // ФИАС-код района
  area_kladr_id: string, // КЛАДР-код района
  area_with_type: string, // Район в регионе с типом
  area_type: string, // Тип района в регионе (сокращенный)
  area_type_full: string, // Тип района в регионе
  area: string, // Район в регионе
  city_fias_id: string, // ФИАС-код города
  city_kladr_id: string, // КЛАДР-код города
  city_with_type: string, // Город с типом
  city_type: string, // Тип города (сокращенный)
  city_type_full: string, // Тип города
  city: string, // Город
  city_area: string, // Административный округ (только для Москвы)
  city_district_fias_id: string, // ФИАС-код района города (заполняется, только если район есть в ФИАС)
  city_district_kladr_id: string, // КЛАДР-код района города (не заполняется)
  city_district_with_type: string, // Район города с типом
  city_district_type: string, // Тип района города (сокращенный)
  city_district_type_full: string, // Тип района города
  city_district: string, // Район города
  settlement_fias_id: string, // ФИАС-код населенного пункта
  settlement_kladr_id: string, // КЛАДР-код населенного пункта
  settlement_with_type: string, // Населенный пункт с типом
  settlement_type: string, // Тип населенного пункта (сокращенный)
  settlement_type_full: string, // Тип населенного пункта
  settlement: string, // Населенный пункт
  street_fias_id: string, // ФИАС-код улицы
  street_kladr_id: string, // КЛАДР-код улицы
  street_with_type: string, // Улица с типом
  street_type: string, // Тип улицы (сокращенный)
  street_type_full: string, // Тип улицы
  street: string, // Улица
  house_fias_id: string, // ФИАС-код дома
  house_kladr_id: string, // КЛАДР-код дома
  house_type: string, // Тип дома (сокращенный)
  house_type_full: string, // Тип дома
  house: string, // Дом
  block_type: string, // Тип корпуса/строения (сокращенный)
  block_type_full: string, // Тип корпуса/строения
  block: string, // Корпус/строение
  entrance: string, // Подъезд
  floor: string, // Этаж
  flat_fias_id: undefined, // Не заполняется
  flat_type: string, // Тип квартиры (сокращенный)
  flat_type_full: string, // Тип квартиры
  flat: string, // Квартира
  flat_area: string, // Площадь квартиры
  square_meter_price: string, // Рыночная стоимость м²
  flat_price: string, // Рыночная стоимость квартиры
  postal_box: string, // Абонентский ящик
  fias_id: string, // ФИАС-код адреса (идентификатор ФИАС)
  fias_code: string, // Иерархический код адреса в ФИАС (СС+РРР+ГГГ+ППП+СССС+УУУУ+ДДДД)
  fias_level: string, // Уровень детализации, до которого адрес найден в ФИАС
  fias_actuality_state: string, // Признак актуальности адреса в ФИАС
  kladr_id: string, // КЛАДР-код адреса
  capital_marker: string, // Признак центра района или региона
  okato: string, // Код ОКАТО
  oktmo: string, // Код ОКТМО
  tax_office: string, // Код ИФНС для физических лиц
  tax_office_legal: string, // Код ИФНС для организаций
  timezone: string, // Часовой пояс города для России, часовой пояс страны — для иностранных адресов
  geo_lat: string, // Координаты: широта
  geo_lon: string, // Координаты: долгота
  beltway_hit: string, // Внутри кольцевой?
  beltway_distance: string, // Расстояние от кольцевой в км
  qc_geo: number, // Код точности координат
  qc_complete: number, // Код пригодности к рассылке
  qc_house: number, // Признак наличия дома в ФИАС
  qc: number, // Код проверки адреса
  unparsed_parts: string, // Нераспознанная часть адреса
  metro: string // Список ближайших станций метро (до трёх штук)
};

export default class Dadata {

  private static API_URL = "https://cleaner.dadata.ru/api/v1/clean";
  private static API_KEY = "bea5b313ae276907f1d76cc1c2ac93a9902e11af";
  private static API_SECRET = "5a720bfcd74c746cd1c4cd2dff08a62b5c1d40f0";
  private static METHOD_ADDRESS = "/address";

  static async address(value: string): Promise<tDadataInfo[]> {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + Dadata.API_KEY,
        "X-Secret": Dadata.API_SECRET
      }
    };
    const result = await axios.post(
      Dadata.API_URL + Dadata.METHOD_ADDRESS,
      JSON.stringify([value]),
      config
    );
    return result.data;
  }
}