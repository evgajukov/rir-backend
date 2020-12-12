import Push from "../lib/push";

(async () => {
  const result = await Push.send("К нам присоединился новый сосед с кв. №358, этаж 11, подъезд 3", "/flat/358", "eyKuePoDhhWweCjFF6zct7:APA91bELfEzVZk-rvfgTTkE7saILTr6cBQL2bktvW-KtnrB9pehA3Q_SfIMcLrdtCqizMpdWXvmQ-Xyx7zobPWjVcnvIpOVhDKBHp_XOq1MWtdvrKcmISvDbHlfVTJid_hZrgO1WJJXF");
  console.log(result.data);
})();