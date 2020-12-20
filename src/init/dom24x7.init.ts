import { Flat, IMChannel, IMChannelPerson, IMMessage, Resident } from "../models";

const createChannel = async (title: string, house: boolean, section: number = null, floor: number = null) => {
  let channel: IMChannel;
  if (house) {
    channel = await IMChannel.findOne({ where: { house } });
  } else {
    channel = await IMChannel.findOne({ where: { section, floor: floor } });
  }
  if (channel == null) {
    // новая еще не созданная группа
    console.log(`>>> создаем группу "${title}"`);
    channel = await IMChannel.create({ title, house, section, floor });
    // сразу для него ненерируем системное сообщение
    await IMMessage.create({ channelId: channel.id, body: { text: `Создана группа "${title}"` } });
  }

  // теперь подключаем всех необходимых пользователей
  console.log(`    >>> добавляем пользователей в группу`);
  let residents: Resident[] = [];
  if (house) {
    residents = await Resident.findAll({ include: [{ model: Flat }] });
  } else {
    let flats: Flat[] = []
    if (floor != null) {
      // группа по этажу
      flats = await Flat.findAll({ where: { section, floor } });
    } else {
      // группа по секции
      flats = await Flat.findAll({ where: { section } });
    }
    residents = await Resident.findAll({ where: { flatId: flats.map(flat => flat.id) }, include: [{ model: Flat }] });
  }
  for (let resident of residents) {
    const channelPerson = await IMChannelPerson.findOne({ where: { channelId: channel.id, personId: resident.personId } });
    if (channelPerson == null) {
      console.log(`        добавляем пользователя ${resident.personId}`);
      await IMChannelPerson.create({ channelId: channel.id, personId: resident.personId });
      const flat = resident.flat;
      const flatTxt = `кв. ${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}`;
      await IMMessage.create({ channelId: channel.id, body: { text: `Сосед(ка) из ${flatTxt} вступил(а) в группу` } });
    }
  }

  console.log(`    завершили генерацию группы "${title}"`);
};

(async () => {
  try {
    console.log("Запуск процесса загрузки стандартных групп чатов");

    // чат для всего дома
    await createChannel("Общедомовой", true);
    
    // для формирования чатов секция и этажей сформируюем удобную структуру квартир в доме
    const flatsDB = await Flat.findAll();
    let flats: any = {};
    for (let flat of flatsDB) {
      if (flats[flat.section] == null) flats[flat.section] = {};
      if (flats[flat.section][flat.floor] == null) flats[flat.section][flat.floor] = [];
      flats[flat.section][flat.floor].push(flat);
    }

    for (let section in flats) {
      // чат секции
      await createChannel(`Секция №${section}`, false, parseInt(section));
      for (let floor in flats[section]) {
        if (flats[section][floor].length > 1) {
          // чат этажа в секции
          await createChannel(`Этаж ${floor} в секции ${section}`, false, parseInt(section), parseInt(floor));
        }
      }
    }
    
    console.log("Завершение процесса");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();