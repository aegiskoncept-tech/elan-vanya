'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { brandConfig } from '@/data/config';
import { resorts } from '@/data/resorts';
import { enquiryService } from '@/services/enquiry';
import { DraftTag } from '@/components/ui/DraftTag';
import { Button } from '@/components/ui/Button';
import { MapPin, Mail, Phone, Instagram, Copy, Check, AlertCircle, Loader2, Send } from 'lucide-react';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselectedResort = searchParams.get('resort') || 'jawai';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resort: preselectedResort,
    checkIn: '',
    checkOut: '',
    guests: 2,
    enquiryType: 'Resort booking',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copiedInsta, setCopiedInsta] = useState(false);

  useEffect(() => {
    if (preselectedResort) {
      setFormData((prev) => ({ ...prev, resort: preselectedResort }));
    }
  }, [preselectedResort]);

  const copyInstagram = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(brandConfig.instagram);
      setCopiedInsta(true);
      setTimeout(() => setCopiedInsta(false), 2000);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Full name is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email.';
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Telephone number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Phone number must be between 10 and 15 digits.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a short message or request.';
    }

    if (!formData.consent) {
      errs.consent = 'Consent is required to submit.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const result = await enquiryService.submitEnquiry(formData);
      setSuccessMessage(result.message);
      setSubmitting(false);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-3 mb-12">
        <span className="label-caps text-[var(--accent)]">Get in Touch</span>
        <h1 className="font-serif">
          Reservations &amp; <span className="italic">Enquiries</span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          For tailored stays, private events, safari arrangements, or corporate retreats across our sanctuaries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image, Info, Instagram */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--line)] shadow-md">
            <Image
              src="/images/jawai/verandah-day.jpg"
              alt="Verandah in daylight over lawn at Élan Vanya Jawai"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <span className="label-caps text-[0.66rem] text-[var(--heading)]">Desk Contacts</span>
              <DraftTag label="Sample details" />
            </div>

            <ul className="space-y-4 text-xs text-[var(--muted)]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--heading)] block">Corporate &amp; Sales Office</span>
                  <span>{brandConfig.addressPlaceholder}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--heading)] block">Direct Email</span>
                  <span className="italic">{brandConfig.emailPlaceholder}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--heading)] block">Telephone / Intercom</span>
                  <span className="italic">{brandConfig.phonePlaceholder}</span>
                </div>
              </li>
            </ul>

            {/* Real Instagram Handle & Copy Button */}
            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-[var(--fg)] hover:text-[var(--accent)]"
              >
                <Instagram className="w-4 h-4 text-[var(--highlight)]" />
                <span>{brandConfig.instagram}</span>
              </a>
              <button
                type="button"
                onClick={copyInstagram}
                className="flex items-center gap-1 px-2.5 py-1 rounded border border-[var(--line)] text-[0.7rem] font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {copiedInsta ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInsta ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Enquiry Form with Netlify Attributes */}
        <div className="lg:col-span-7 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
          {successMessage ? (
            /* Prototype Success Notice */
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[var(--heading)]">
                Enquiry Processed
              </h3>
              <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSuccessMessage(null)}
                  className="text-xs uppercase font-bold text-[var(--accent)] hover:underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              name="contact-enquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-5"
            >
              {/* Hidden Netlify inputs */}
              <input type="hidden" name="form-name" value="contact-enquiry" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="label-caps text-[0.66rem] text-[var(--muted)]">Your Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Siddharth Rathore"
                    className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                      errors.name ? 'border-[var(--danger)]' : 'border-[var(--line)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-[var(--danger)]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="label-caps text-[0.66rem] text-[var(--muted)]">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="siddharth@example.com"
                    className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                      errors.email ? 'border-[var(--danger)]' : 'border-[var(--line)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-[var(--danger)]">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="label-caps text-[0.66rem] text-[var(--muted)]">Telephone *</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden ${
                      errors.phone ? 'border-[var(--danger)]' : 'border-[var(--line)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-[var(--danger)]">{errors.phone}</p>}
                </div>

                {/* Preferred Resort */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-resort" className="label-caps text-[0.66rem] text-[var(--muted)]">Preferred Destination</label>
                  <select
                    id="contact-resort"
                    name="resort"
                    value={formData.resort}
                    onChange={(e) => setFormData({ ...formData, resort: e.target.value })}
                    className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-hidden cursor-pointer"
                  >
                    {resorts.map((r) => (
                      <option key={r.id} value={r.slug}>
                        {r.name} {r.status === 'coming-soon' ? '(Register Interest)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Enquiry Type */}
              <div className="space-y-1.5">
                <label htmlFor="contact-enquiry-type" className="label-caps text-[0.66rem] text-[var(--muted)]">Enquiry Type</label>
                <select
                  id="contact-enquiry-type"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                  className="w-full bg-[var(--surface-2)] text-[var(--heading)] border border-[var(--line)] rounded-md px-3.5 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-hidden cursor-pointer"
                >
                  <option value="Resort booking">Resort booking</option>
                  <option value="Event or celebration">Event or celebration</option>
                  <option value="Group stay">Group stay</option>
                  <option value="General enquiry">General enquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="label-caps text-[0.66rem] text-[var(--muted)]">Your Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Share details regarding your preferred dates, safari queries, or retreat requirements..."
                  className={`w-full bg-[var(--surface-2)] text-[var(--heading)] border rounded-md px-3.5 py-2.5 text-sm focus:outline-hidden resize-none ${
                    errors.message ? 'border-[var(--danger)]' : 'border-[var(--line)] focus:border-[var(--accent)]'
                  }`}
                />
                {errors.message && <p className="text-xs text-[var(--danger)]">{errors.message}</p>}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData({ ...formData, consent: e.target.checked });
                      if (e.target.checked && errors.consent) setErrors({ ...errors, consent: '' });
                    }}
                    className="w-4 h-4 mt-0.5 accent-[var(--accent)] rounded"
                  />
                  <span className="text-xs text-[var(--muted)] leading-relaxed">
                    I agree to be contacted by Élan Vanya reservations team regarding my request.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-[var(--danger)] mt-1">{errors.consent}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending enquiry...</span>
                    </span>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs text-[var(--muted)]">Loading contact desk...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
