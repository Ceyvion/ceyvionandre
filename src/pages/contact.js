import { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center max-w-xl mx-auto">
        <h1 className="mb-12">CONTACT</h1>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {/* Name Input */}
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="NAME"
              required
              className="
                w-full bg-transparent border-b border-text
                focus:border-accent focus:outline-none
                px-2 py-1 transition-colors duration-200
              "
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              required
              className="
                w-full bg-transparent border-b border-text
                focus:border-accent focus:outline-none
                px-2 py-1 transition-colors duration-200
              "
            />
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="MESSAGE"
              required
              rows={5}
              className="
                w-full bg-transparent border-b border-text
                focus:border-accent focus:outline-none
                px-2 py-1 transition-colors duration-200
                resize-none
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full bg-text text-primary py-3
              hover:bg-accent transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? 'SENDING...' : 'SEND'}
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-16 space-y-4 text-center">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-small hover:text-accent transition-colors duration-200"
          >
            INSTAGRAM
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-small hover:text-accent transition-colors duration-200"
          >
            LINKEDIN
          </a>
          <a 
            href="mailto:contact@example.com"
            className="block text-small hover:text-accent transition-colors duration-200"
          >
            EMAIL
          </a>
        </div>
      </div>
    </Layout>
  )
}
