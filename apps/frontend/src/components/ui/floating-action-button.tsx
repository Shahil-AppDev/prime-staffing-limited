'use client'

import { MessageCircle, Phone, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: MessageCircle, label: 'Chat', href: '/contact', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, label: 'Call', href: 'tel:+1234567890', color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, label: 'Book', href: '/contact', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 flex flex-col gap-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={action.href}
                  className="group flex items-center gap-3 glass-card px-4 py-3 hover:scale-105 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center shadow-glow`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-200 pr-2">{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-lg hover:shadow-glow transition-all"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.div>
      </motion.button>
    </div>
  )
}
