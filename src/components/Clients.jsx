import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

const ClientCard = ({ client }) => (
  <div className="flex h-24 w-60 flex-row items-center gap-4 rounded-xl border border-white/40 bg-white/60 backdrop-blur-md px-4 py-2 shadow-sm transition-all hover:scale-105 hover:bg-white/80 hover:shadow-lg hover:border-white/60">
    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white/80 text-2xl shadow-sm border border-white/50">
      {client.logo}
    </div>
    <div className="flex flex-col text-left">
      <span className="text-sm font-bold text-black">{client.name}</span>
      <span className="text-xs text-charcoal/70">{client.category}</span>
    </div>
  </div>
)

const MarqueeRow = ({ items, direction = 'left', speed = 20 }) => {
  return (
    <div className="flex w-full overflow-hidden py-2">
      <motion.div
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex min-w-max gap-6 px-3"
      >
        {[...items, ...items, ...items].map((client, idx) => (
          <ClientCard key={`${client.name}-${idx}`} client={client} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Clients() {
  const { clients } = useContent()
  const row1 = clients.slice(0, 4)
  const row2 = clients.slice(4)

  return (
    <section className="bg-transparent py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue">
            Our Partners
          </div>
          <h2 className="font-heading mb-4 text-4xl font-bold text-black md:text-5xl">
            Trusted by Leading Organizations
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-charcoal">
            We work with government bodies, NGOs, and private institutions across
            India and beyond.
          </p>
        </motion.div>

        {/* Marquee Rows */}
        <div className="flex flex-col gap-6">
          <MarqueeRow items={row1} direction="left" speed={25} />
          <MarqueeRow items={row2} direction="right" speed={25} />
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          {[
            { number: '50+', label: 'Clients' },
            { number: '15+', label: 'Years' },
            { number: '120+', label: 'Projects' },
            { number: '22', label: 'Cities' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1 }}
            >
              <div className="font-heading mb-2 text-3xl font-bold text-black">
                {stat.number}
              </div>
              <div className="text-sm text-charcoal">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
