import Push from "../lib/push";

(async () => {
  const result = await Push.send({
    body: "К нам присоединился новый сосед с кв. №358, этаж 11, подъезд 3",
    uri: "/flat/358",
    all: true
  });
  if (result != null) console.log(result.data);
})();