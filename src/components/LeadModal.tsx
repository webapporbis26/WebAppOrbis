import { useState, useEffect } from "react"
import { X, Send } from "lucide-react"

interface LeadModalProps {
  open: boolean
  service: string
  onClose: () => void
}

const WHATSAPP_NUMBER = "917736003018"

export function LeadModal({ open, service, onClose }: LeadModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [platform, setPlatform] = useState("Both")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const isAppService = service === "Mobile App Development"

  useEffect(() => {
    if (open) {
      setName("")
      setPhone("")
      setPlatform("Both")
      setMessage("")
      setError("")
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please enter your name.")
      return
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.")
      return
    }
    setError("")

    const lines = [
      `*New Service Enquiry*`,
      ``,
      `*Service:* ${service}`,
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
    ]
    if (isAppService) {
      lines.push(`*Platform:* ${platform}`)
    }
    if (message.trim()) {
      lines.push(`*Requirements:* ${message.trim()}`)
    }
    lines.push(`*Source:* Homepage - Digital Solutions`)

    const text = encodeURIComponent(lines.join("\n"))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${service}`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 pr-10">
          Get a Free Quote
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Service: <span className="font-semibold text-blue-600">{service}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lead-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Name *
            </label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="lead-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number *
            </label>
            <input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {isAppService && (
            <div>
              <label htmlFor="lead-platform" className="block text-sm font-semibold text-slate-700 mb-1.5">
                App Platform
              </label>
              <select
                id="lead-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Both">Both (iOS + Android)</option>
                <option value="iOS">iOS only</option>
                <option value="Android">Android only</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="lead-message" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Requirements <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="lead-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us briefly about your project..."
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            <Send className="h-4 w-4" />
            Send via WhatsApp
          </button>
          <p className="text-xs text-slate-400 text-center">
            We&apos;ll get back to you shortly.
          </p>
        </form>
      </div>
    </div>
  )
}
