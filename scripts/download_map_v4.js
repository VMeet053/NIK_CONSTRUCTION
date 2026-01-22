import fs from 'fs';
import https from 'https';
import path from 'path';

// Attempting to download a map that typically includes the full J&K (POK + Aksai Chin) as per Indian norms.
// Source: mayank-chandiramani/react-india-map (often has reliable local maps)
const targetUrl = "https://raw.githubusercontent.com/mayank-chandiramani/react-india-map/master/src/topojson/india.json";

const dir = "public/maps";
const filePath = path.join(dir, "india_full.json");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading map from ${targetUrl}...`);

https.get(targetUrl, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: Status Code ${res.statusCode}`);
        res.resume();
        return;
    }

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        fs.writeFileSync(filePath, data);
        console.log("Map downloaded successfully to", filePath);
        try {
            const json = JSON.parse(data);
            console.log("JSON parsed successfully.");
            console.log("Type:", json.type);
            if (json.objects) {
                console.log("Objects keys:", Object.keys(json.objects));
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
