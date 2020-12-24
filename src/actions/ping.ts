export function ping({ version, build }, respond) {
  console.log(`>>>>> actions/test.ping: ver. ${version} build ${build}`);
  respond(null, { status: "OK" });
}