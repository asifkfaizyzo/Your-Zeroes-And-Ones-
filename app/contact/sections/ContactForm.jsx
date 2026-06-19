// app/contact/sections/ContactForm.jsx
"use client";

import { useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        setSubmitStatus({ type: "error", message: "reCAPTCHA not loaded. Please refresh the page and try again." });
        return;
      }
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        const recaptchaToken = await executeRecaptcha("contact_form");
        if (!recaptchaToken) {
          setSubmitStatus({ type: "error", message: "reCAPTCHA verification failed. Please try again." });
          setIsSubmitting(false);
          return;
        }
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, recaptchaToken }),
        });
        const data = await response.json();
        if (response.ok) {
          setSubmitStatus({ type: "success", message: data.message || "Thank you for your message! We will get back to you soon." });
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setSubmitStatus({ type: "error", message: data.error || "Something went wrong. Please try again." });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitStatus({ type: "error", message: "Network error. Please check your connection and try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, formData]
  );

  const formFields = [
    {
      name: "name", label: "Full Name", type: "text", required: true, placeholder: "Type Your Name",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    },
    {
      name: "email", label: "Email Address", type: "email", required: true, placeholder: "Type Your Email",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" /></svg>,
    },
  ];

  return (
    <div className="lg:col-span-3 max-w-lg w-full lg:justify-self-end">
      <div className="rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm shadow-xl shadow-[#5b8def]/5 p-6 sm:p-7 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#5b8def]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5b8def]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative pt-5 pb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Send us a Message</h2>
          <p className="text-white/40 text-sm mb-6">Fill out the form below and we'll respond soon.</p>

          {/* Status Messages */}
          {submitStatus && (
            <div className={`mb-4 p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}>
              <div className="flex items-center gap-2">
                {submitStatus.type === "success" ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
                <span>{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formFields.map((field) => (
                <div key={field.name} className="group">
                  <label className="block text-xs font-semibold text-white/60 mb-1">
                    {field.label} {field.required && <span className="text-[#5b8def]">*</span>}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">{field.icon}</span>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full text-white pl-10 pr-3 py-2.5 border border-[#5b8def]/20 rounded-lg text-sm bg-white/5 focus:bg-white/10 focus:border-[#5b8def]/50 focus:ring-2 focus:ring-[#5b8def]/20 placeholder-white/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="group">
              <label className="block text-xs font-semibold text-white/60 mb-1">
                Phone Number <span className="text-[#5b8def]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257 4.493 1.498V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" /></svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full pl-10 text-white pr-3 py-2.5 border border-[#5b8def]/20 rounded-lg text-sm bg-white/5 focus:bg-white/10 focus:border-[#5b8def]/50 focus:ring-2 focus:ring-[#5b8def]/20 placeholder-white/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Type Your Phone Number"
                />
              </div>
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs font-semibold text-white/60 mb-1">
                Your Message <span className="text-[#5b8def]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </span>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-3 text-white py-2.5 border border-[#5b8def]/20 rounded-lg text-sm bg-white/5 focus:bg-white/10 focus:border-[#5b8def]/50 focus:ring-2 focus:ring-[#5b8def]/20 placeholder-white/20 transition-all resize-none outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell us about your project..."
                />
              </div>
            </div>

            {/* reCAPTCHA notice */}
            <div className="text-xs text-white/30 text-center">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#5b8def] hover:underline">Privacy Policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#5b8def] hover:underline">Terms of Service</a>{" "}
              apply.
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1e3a6e] border border-[#5b8def]/30 text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 hover:shadow-lg hover:shadow-[#5b8def]/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}