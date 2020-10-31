"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FSUtilities {
    static save(dataBase64, name, path = `/images/upload/`) {
        const dataArr = dataBase64.split(",");
        const type = dataArr[0].split(";")[0].split("/")[1];
        const data = new Buffer(dataArr[1], "base64");
        const fileName = `${name}.${type}`;
        const pathFolder = `${__dirname}/../../public${path}`;
        const pathFileName = `${pathFolder}${fileName}`;
        try {
            if (!fs.existsSync(pathFolder)) {
                fs.mkdirSync(pathFolder, { recursive: true });
            }
            fs.writeFileSync(pathFileName, data);
        }
        catch (error) {
            console.error(error);
            return null;
        }
        return `${path}${fileName}`;
    }
    static saveWithoutMeta(data, fileName, path = `/images/upload/`) {
        const pathFileName = `${__dirname}/../../public${path}${fileName}`;
        fs.writeFile(pathFileName, data, "base64", error => {
            if (error)
                console.error(error);
        });
        return `${path}${fileName}`;
    }
    static appendTempFile(data, fileName, path = `/tmp/`) {
        const pathFileName = `${__dirname}/../../public${path}${fileName}`;
        try {
            fs.appendFileSync(pathFileName, data);
        }
        catch (error) {
            console.error(error);
            return null;
        }
        return `${path}${fileName}`;
    }
    static readFile(fileName, path = `/tmp/`) {
        const pathFileName = `${__dirname}/../../public${path}${fileName}`;
        return fs.readFileSync(pathFileName, "utf8");
    }
    static rename(fileName1, fileName2, path) {
        try {
            fs.renameSync(path + fileName1, path + fileName2);
        }
        catch (error) {
            console.error(error);
            return null;
        }
        return fileName2;
    }
    static remove(pathFileName) {
        try {
            fs.unlinkSync(FSUtilities.absolutePathFileName(pathFileName));
        }
        catch (error) {
            console.log(`Не удалось удалить файл: ${error.toString()}`);
        }
    }
    static copy(source, destination) {
        console.log(`FSUtilities.copy: from ${source} to ${destination}`);
        fs.createReadStream(source).pipe(fs.createWriteStream(destination));
    }
    static absolutePathFileName(pathFileName, root = "public") {
        return `${__dirname}/../../${root}${pathFileName}`;
    }
}
exports.default = FSUtilities;
