import fs from 'fs';
import https from 'https';

const urls = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/512px-Blender_logo_no_text.svg.png", name: "blender.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Unreal_Engine_Logo.svg/512px-Unreal_Engine_Logo.svg.png", name: "unreal.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png", name: "premiere.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/512px-Adobe_After_Effects_CC_icon.svg.png", name: "aftereffects.png" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/512px-Figma-logo.svg.png", name: "figma.png" }
];

urls.forEach(item => {
  https.get(item.url, { headers: { "User-Agent": "Mozilla/5.0 NodeJs script" } }, (res) => {
    const file = fs.createWriteStream(`public/images/${item.name}`);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${item.name}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${item.name}: ${err.message}`);
  });
});
