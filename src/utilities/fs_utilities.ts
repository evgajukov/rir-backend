import * as fs from "fs";

export default class FSUtilities {
  static save(dataBase64: string, name: string, path: string = `/images/upload/`) {
    const dataArr = dataBase64.split(",");
    const type = dataArr[0].split(";")[0].split("/")[1];
    const data = new Buffer(dataArr[1], "base64");
    const fileName = `${name}.${type}`;
    const pathFolder = `${__dirname}/../../public${path}`;
    const pathFileName = `${pathFolder}${fileName}`
    try {
      if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder, { recursive: true });
      }
      fs.writeFileSync(pathFileName, data);
    } catch (error) {
      console.error(error);
      return null;
    }
    
    return `${path}${fileName}`;
  }

  static saveWithoutMeta(data: string, fileName: string, path: string = `/images/upload/`) {
    const pathFileName = `${__dirname}/../../public${path}${fileName}`;
    fs.writeFile(pathFileName, data, "base64", error => {
      if (error) console.error(error);
    });

    return `${path}${fileName}`;
  }

  static appendTempFile(data: string, fileName: string, path: string = `/tmp/`) {
    const pathFileName = `${__dirname}/../../public${path}${fileName}`;
    try {
      fs.appendFileSync(pathFileName, data);
    } catch (error) {
      console.error(error);
      return null;
    }

    return `${path}${fileName}`;
  }

  static readFile(fileName: string, path: string = `/tmp/`) {
    const pathFileName = `${__dirname}/../../public${path}${fileName}`;
    return fs.readFileSync(pathFileName, "utf8");
  }

  static rename(fileName1: string, fileName2: string, path: string) {
    try {
      fs.renameSync(path + fileName1, path + fileName2);
    } catch (error) {
      console.error(error);
      return null;
    }
    return fileName2;
  }

  static remove(pathFileName: string) {
    try {
      fs.unlinkSync(FSUtilities.absolutePathFileName(pathFileName));
    } catch (error) {
      console.log(`Не удалось удалить файл: ${error.toString()}`);
    }
  }

  static copy(source: string, destination: string) {
    console.log(`FSUtilities.copy: from ${source} to ${destination}`);
    fs.createReadStream(source).pipe(fs.createWriteStream(destination));
  }

  static absolutePathFileName(pathFileName: string, root: string = "public") {
    return `${__dirname}/../../${root}${pathFileName}`;
  }
}