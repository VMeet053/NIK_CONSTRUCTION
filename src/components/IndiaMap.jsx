import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

/**
 * Locations with Lat/Lon coordinates
 */
const locations = [
  { id: 1, name: 'Delhi', coordinates: [77.2090, 28.6139], projects: 7 },
  { id: 2, name: 'Mumbai', coordinates: [72.8777, 19.0760], projects: 28 },
  { id: 3, name: 'Ahmedabad', coordinates: [72.5714, 23.0225], projects: 16 },
  { id: 4, name: 'Hyderabad', coordinates: [78.4867, 17.3850], projects: 14 },
  { id: 5, name: 'Chennai', coordinates: [80.2707, 13.0827], projects: 32 },
  { id: 6, name: 'Kolkata', coordinates: [88.3639, 22.5726], projects: 19 },
]

const geoUrl = "/maps/india.json"

export default function IndiaMap() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-br from-blue-50/60 via-white to-blue-50/40 p-4 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="flex justify-center items-center h-[400px] md:h-[600px] lg:h-[700px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 1000,
              center: [80, 22]
            }}
            className="w-full h-full"
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
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#93C5FD",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#60A5FA",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {locations.map((loc) => (
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

        {/* Custom Legend/Info Overlay */}
        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md rounded-xl p-4 border border-blue-100 shadow-lg hidden md:block">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            <span className="text-sm font-semibold text-gray-800">Active Project Hubs</span>
          </div>
          <p className="text-xs text-gray-600 max-w-[200px]">
            Hover over markers to see project counts in each major city.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
