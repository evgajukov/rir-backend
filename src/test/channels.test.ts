import { Instruction } from "../models";

(async () => {
  try {
    const item = await Instruction.findByPk(1);
    console.log(item.body);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();