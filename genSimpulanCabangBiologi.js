const fs = require("fs");
const wiki = require("wikijs").default;

const cabang = fs
  .readFileSync("./text_from_image.txt", "utf8")
  .split("\n")
  .filter((txt) => txt !== "");

const getPage = (page) =>
  wiki({ apiUrl: "https://id.wikipedia.org/w/api.php" }).page(page);
const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

(async () => {
  let data = [];

  for (const cab of cabang) {
    await sleep();
    const simpulan = await getPage(cab).then((p) => p.summary());

    console.log(`Informasi cabang biologi "${cab}" berhasil didapatkan.`);

    data.push({ cab, simpulan });
  }

  console.log("Menyimpulkan kesimpulan");
  const conclution = data
    .map((data) => `Cabang: ${data.cab}\n${data.simpulan}`)
    .join("\n\n\n")
    .replace();
  console.log("Selesai menyimpulkan");

  console.log("Menulis file");
  await fs.promises.writeFile("./simpulan-akhir.txt", conclution);
  console.log("File tertulis");
})();

// Dibuat Oleh: EZRA KHAIRAN PERMANA X BAHASA SMAN 12 BEKASI
// 05/08/2021
