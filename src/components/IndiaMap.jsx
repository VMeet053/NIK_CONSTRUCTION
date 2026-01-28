import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useContent } from '../context/ContentContext'

// Comprehensive map of Indian cities and states to coordinates
const COORDINATES_MAP = {
  'delhi': [77.2090, 28.6139],
  'new delhi': [77.2090, 28.6139],
  'mumbai': [72.8777, 19.0760],
  'maharashtra': [75.7139, 19.7515],
  'ahmedabad': [72.5714, 23.0225],
  'gujarat': [71.1924, 22.2587],
  'hyderabad': [78.4867, 17.3850],
  'telangana': [79.0193, 18.1124],
  'chennai': [80.2707, 13.0827],
  'tamil nadu': [78.6569, 11.1271],
  'kolkata': [88.3639, 22.5726],
  'west bengal': [87.8550, 22.9868],
  'bangalore': [77.5946, 12.9716],
  'bengaluru': [77.5946, 12.9716],
  'karnataka': [75.7139, 15.3173],
  'pune': [73.8567, 18.5204],
  'surat': [72.8311, 21.1702],
  'jaipur': [75.7873, 26.9124],
  'rajasthan': [74.2179, 27.0238],
  'lucknow': [80.9462, 26.8467],
  'uttar pradesh': [80.9462, 26.8467],
  'kanpur': [80.3319, 26.4499],
  'nagpur': [79.0882, 21.1458],
  'indore': [75.8577, 22.7196],
  'madhya pradesh': [78.6569, 22.9734],
  'patna': [85.1376, 25.5941],
  'bihar': [85.3131, 25.0961],
  'bhopal': [77.4126, 23.2599],
  'ludhiana': [75.8573, 30.9010],
  'punjab': [75.3412, 31.1471],
  'agra': [78.0081, 27.1767],
  'nashik': [73.7898, 19.9975],
  'vadodara': [73.1812, 22.3072],
  'rajkot': [70.8022, 22.3039],
  'visakhapatnam': [83.2185, 17.6868],
  'andhra pradesh': [79.7400, 15.9129],
  'kerala': [76.2711, 10.8505],
  'kochi': [76.2711, 9.9312],
  'goa': [74.1240, 15.2993],
  'odisha': [85.0985, 20.9517],
  'bhubaneswar': [85.8245, 20.2961],
  'assam': [92.9376, 26.2006],
  'guwahati': [91.7362, 26.1445],
  'uttarakhand': [79.0193, 30.0668],
  'dehradun': [78.0322, 30.3165],
  'himachal pradesh': [77.1734, 31.1048],
  'shimla': [77.1734, 31.1048],
  'chandigarh': [76.7794, 30.7333],
  'haryana': [76.0856, 29.0588],
  'gurgaon': [77.0266, 28.4595],
  'noida': [77.3910, 28.5355]
};

const geoUrl = "/maps/india.json"

export default function IndiaMap() {
  const [hovered, setHovered] = useState(null)
  const { projects } = useContent()

  const mapLocations = useMemo(() => {
    if (!projects || projects.length === 0) return []

    const grouped = {}
    // Sort keys by length descending to ensure specific cities match before states
    // e.g. "New Delhi" matches before "Delhi"
    const sortedKeys = Object.keys(COORDINATES_MAP).sort((a, b) => b.length - a.length)

    projects.forEach(p => {
        if (!p.location) return

        const lowerLoc = p.location.toLowerCase()
        let matchedKey = null
        let coords = null

        // Find the most specific match
        for (const key of sortedKeys) {
            if (lowerLoc.includes(key)) {
                matchedKey = key
                coords = COORDINATES_MAP[key]
                break
            }
        }

        if (matchedKey && coords) {
            // Use proper casing for display (capitalize first letter of each word)
            const displayName = matchedKey.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            
            if (!grouped[displayName]) {
                grouped[displayName] = {
                    id: displayName,
                    name: displayName,
                    coordinates: coords,
                    projects: 0
                }
            }
            grouped[displayName].projects += 1
        }
    })

    return Object.values(grouped)
  }, [projects])

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-4 md:p-10 overflow-visible"
      >
        <div 
          className="flex justify-center items-center h-[500px] md:h-[700px] lg:h-[800px]"
          style={{ transform: "perspective(1000px) rotateX(15deg)" }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1000,
              center: [78, 22]
            }}
            className="w-full h-full drop-shadow-2xl filter"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#E0E7FF",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        filter: "drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.3))",
                      },
                      hover: {
                        fill: "#93C5FD",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                        filter: "drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.4))",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#60A5FA",
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                        filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5))",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {mapLocations.map((loc) => (
              <Marker
                key={loc.id}
                coordinates={loc.coordinates}
                onMouseEnter={() => setHovered(loc)}
                onMouseLeave={() => setHovered(null)}
                data-tooltip-id="map-tooltip"
                data-tooltip-content={`${loc.name}: ${loc.projects} Projects`}
              >
                <g className="cursor-pointer group">
                  {/* Pulse Effect */}
                  <motion.circle
                    r={8}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth={1}
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  {/* Inner Dot */}
                  <circle r={4} fill="#2563EB" stroke="#fff" strokeWidth={1.5} />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Tooltip */}
        <Tooltip
          id="map-tooltip"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            zIndex: 50
          }}
        />
      </motion.div>
    </div>
  )
}
