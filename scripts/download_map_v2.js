import fs from 'fs';
import https from 'https';
import path from 'path';

// Using a different source for India TopoJSON
// This one is known to work with D3/React-Simple-Maps
const url = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";
// Fallback if the above 404s again, we try another one
// const url = "https://raw.githubusercontent.com/datameet/maps/master/States/Spatial/Census_2011/2011_Dist.json"; 
// Note: deldersveld/topojson structure usually works well.

// Let's try a states one if possible, but reliable sources are tricky. 
// Trying the topojson repo from a specific commit hash to avoid branch moves? 
// Or just try a different reliable source.
// https://github.com/deldersveld/topojson/blob/master/countries/india/india-states.json

const targetUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const dir = "public/maps";
const filePath = path.join(dir, "india.json");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading map from ${targetUrl}...`);

https.get(targetUrl, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: Status Code ${res.statusCode}`);
        res.resume(); // Consume response data to free up memory
        return;
    }

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        fs.writeFileSync(filePath, data);
        console.log("Map downloaded successfully to", filePath);
        // Verify Content
        try {
            const json = JSON.parse(data);
            console.log("JSON parsed successfully.");
            if (json.objects) {
                console.log("Objects keys:", Object.keys(json.objects));
            } else {
                console.log("Warning: No 'objects' key found in TopoJSON.");
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
