const fs = require("fs");

let file = fs.readFileSync("text.txt", "utf-8");
console.log(file + '\n');

let fileTable = [];
let i = 0;
let index = 0;
while (index > -1){
  index = file.indexOf('\n');
  if (index <= -1) break
  fileTable[i] = file.substring(0, index);
  file = file.substring(index + 1);
  i++;
}

for (i = 0; i < fileTable.length; i++) console.log(fileTable[i]);

console.log(fileTable.length)
