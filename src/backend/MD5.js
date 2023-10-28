import crypto from "crypto";
// import fs from "fs";
// import path from "path";

function getMd5(input) {
  const hash = crypto.createHash("md5");
  hash.update(input);
  return hash.digest("hex");
}

function max(length1, length2) {
  return length1 > length2 ? length1 : length2;
}

function compare(Array1, Array2) {
  let i = 0,
    j = 0;
  let simIdx = 0;
  while (i < Array1.length && j < Array2.length) {
    if (Array1[i].toLowerCase() === Array2[j].toLowerCase()) {
      simIdx++;
    }
    i++;
    j++;
  }
  console.log(
    `Number of matching characters in these sentences are: ${simIdx} out of total ${max(
      Array1.length,
      Array2.length
    )} words.\n`
  );
}

function splitLine(line) {
  const words = [];
  let i = 0;
  while (i < line.length) {
    let str = "";
    while (i < line.length && line[i] !== " ") {
      str += line[i];
      i++;
    }
    if (str !== "") {
      words.push(str);
    }
    while (i < line.length && line[i] === " ") {
      i++;
    }
  }
  return words;
}

const MD5 = (texts) => {
  // const dir = dirpath;
  // const files = fs.readFileSync(dir);
  const arrayHash = [];
  const hashValue = new Map();
  console.log(texts);

  texts.map((text) => {
    // const filePath = path.join(dir, file);
    // if (fs.statSync(filePath).isFile()) {
    //   const line = fs.readFileSync(filePath, "utf8").trim();

    // }
    // console.log("hi");
    const md5 = getMd5(text);
    hashValue.set(md5, text);
    console.log(`${text} : ${md5}`);
    arrayHash.push(getMd5(text));
  });

  const titleMap = new Map();
  arrayHash.forEach((str) => titleMap.set(str, false));

  for (const str of arrayHash) {
    if (!titleMap.get(str)) {
      titleMap.set(str, true);
    } else {
      console.log(`Duplicate title found: ${hashValue.get(str)}\n`);
    }
  }

  const arrayHashWords = [];

  for (let i = 0; i < arrayHash.length; i++) {
    const words = splitLine(hashValue.get(arrayHash[i]));
    const hashWords = [];
    for (const word of words) {
      console.log(`${word}:`);
      hashWords.push(getMd5(word));
      console.log(`${getMd5(word)}    `);
    }
    arrayHashWords.push(hashWords);
    console.log("\n");
  }

  for (let i = 0; i < arrayHashWords.length; i++) {
    for (let j = i + 1; j < arrayHashWords.length; j++) {
      compare(arrayHashWords[i], arrayHashWords[j]);
    }
  }
};

export default MD5;
