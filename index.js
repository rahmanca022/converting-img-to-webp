import sharp from "sharp";
import fs from "fs";
import path from "path";

const folderName = "source-images/icon";
const outputFolder = "output/icon";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const files = fs.readdirSync(folderName);

const supportedFormats = ["jpg", "jpeg", "png", "svg"];

files.forEach((file) => {
  const fileExtension = file.split(".").pop().toLowerCase();

  if (supportedFormats.includes(fileExtension)) {
    const inputFilePath = path.join(folderName, file);
    const outputFilePath = path.join(
      outputFolder,
      `${path.basename(file, path.extname(file))}.webp`
    );

    let image = sharp(inputFilePath);
    if (fileExtension === "svg") {
      image = image.png();
    }

    image
      .webp({ quality: 100 })
      .toFile(outputFilePath)
      .then((info) => {
        console.log(`Converted ${file} to ${outputFilePath}`);
      })
      .catch((err) => {
        console.error(`Error converting ${file}:`, err);
      });
  } else {
    console.log(`Unsupported format: ${file}`);
  }
});
