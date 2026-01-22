import fs from 'fs';
import https from 'https';
import path from 'path';

// Trying a different reliable source: datameet or similar
// This specific URL is often used examples
const targetUrl = "https://raw.githubusercontent.com/markmarkoh/datamaps/master/src/js/data/ind.topo.json";

const dir = "public/maps";
const filePath = path.join(dir, "india.json");

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
