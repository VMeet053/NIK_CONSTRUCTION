import fs from 'fs';
import https from 'https';
import path from 'path';

// Using Datameet Census 2011 GeoJSON (Official Boundaries)
const targetUrl = "https://raw.githubusercontent.com/datameet/maps/master/States/Spatial/Census_2011/2011_State.json";

const dir = "public/maps";
const filePath = path.join(dir, "india_full_geo.json");

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
            console.log("Type:", json.type); // Should be FeatureCollection
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
