import axios from "axios";

(async () => {
  const result = await axios.post(
    "https://fcm.googleapis.com/fcm/send",
    {
      notification: {
        title: "Dom24x7",
        body: "Тестовая нотификация",
        icon: "/static/plus.png",
        click_action: "https://yarea40.dom24x7.ru",
      },
      to: "eyKuePoDhhWweCjFF6zct7:APA91bELfEzVZk-rvfgTTkE7saILTr6cBQL2bktvW-KtnrB9pehA3Q_SfIMcLrdtCqizMpdWXvmQ-Xyx7zobPWjVcnvIpOVhDKBHp_XOq1MWtdvrKcmISvDbHlfVTJid_hZrgO1WJJXF"
    },
    {
      headers: {
        Authorization: `key=AAAAkuwL2rQ:APA91bEk6grefA6S4XsyRcx__soFI1KEzwTtJ3kvWRjzs6MDCGSzCZkFiX-4CD4FYyjbYnvzK27llVjXzdo1tHvEdjSH5KNJ-54A73IrIHHM4YscvdlYqMRG2wb05X6CIIz733wgW4o9`,
        "Content-Type": "application/json"
      }
    }
  );
  console.log(result.data);
})();