export function ping(params, respond) {
  console.log(">>>>> actions/test.ping");
  respond(null, { status: "OK" });
}