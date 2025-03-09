"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'

type ContactStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [name, setName] = useState(formData.contact.name || '')
  const [email, setEmail] = useState(formData.contact.email || '')
  const [phone, setPhone] = useState(formData.contact.phone || '')
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Validierung bei Änderungen an den Eingabefeldern
  useEffect(() => {
    validateForm()
  }, [name, email, phone])

  // Formular-Validierung
  const validateForm = () => {
    const newErrors = {
      name: name.trim() === '' ? 'Bitte geben Sie Ihren Namen ein' : '',
      email: !validateEmail(email) ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : '',
      phone: phone.trim() !== '' && !validatePhone(phone) ? 'Bitte geben Sie eine gültige Telefonnummer ein' : ''
    }

    setErrors(newErrors)
    setIsValid(newErrors.name === '' && newErrors.email === '')
  }

  // E-Mail-Validierung
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Telefonnummer-Validierung
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\-\(\)]{6,20}$/
    return phoneRegex.test(phone)
  }

  // Formular absenden
  const handleSubmit = () => {
    if (!isValid) return

    updateFormData({
      contact: {
        name,
        email,
        phone
      }
    })
    
    goToNextStep()
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Ihre Kontaktdaten
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihre Kontaktdaten ein, damit wir Sie bezüglich Ihrer PV-Anlage kontaktieren können.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Name */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#009FD8]/50'
            }`}
          />
          {errors.name && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {errors.name}
            </motion.p>
          )}
        </div>
        
        {/* E-Mail */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-Mail *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre-email@beispiel.de"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#009FD8]/50'
            }`}
          />
          {errors.email && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {errors.email}
            </motion.p>
          )}
        </div>
        
        {/* Telefon */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(Optional) Für schnellere Kontaktaufnahme"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-[#009FD8]/50'
            }`}
          />
          {errors.phone && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {errors.phone}
            </motion.p>
          )}
        </div>
        
        {/* Datenschutz-Hinweis */}
        <div className="text-xs text-gray-500 mt-6">
          <p>
            Wir nutzen Ihre Daten nur zur Bearbeitung Ihrer Anfrage und geben sie nicht an Dritte weiter. 
            Weitere Informationen finden Sie in unserer <a href="/privacy" className="text-[#009FD8] hover:underline">Datenschutzerklärung</a>.
          </p>
        </div>
        
        <motion.button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${
            isValid
              ? 'bg-[#009FD8] text-white hover:bg-[#007CAB] transform hover:scale-[1.03] hover:shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isValid ? { scale: 1.03 } : {}}
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
