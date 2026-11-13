import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Globe, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { validateContact, type ContactFields } from "@/lib/axon-content";
const keys = ["name", "company", "email", "phone", "service", "message"] as const;
export function Contact() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<ContactFields>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  function submit(e: FormEvent) {
    e.preventDefault();
    const next = validateContact(fields);
    setErrors(next);
    if (Object.keys(next).length) return;
    const body = keys.map((key, i) => `${t.fields[i]}: ${fields[key]}`).join("\n");
    window.location.href = `mailto:care@axondt.com?subject=${encodeURIComponent("AXON consultation — " + fields.company)}&body=${encodeURIComponent(body)}`;
    toast.success(t.success);
  }
  return (
    <section id="contact" className="section-pad bg-background">
      <div className="page-width contact-grid">
        <div>
          <p className="eyebrow">{t.contactLabel}</p>
          <h2 className="section-heading whitespace-pre-line">{t.contactTitle}</h2>
          <p className="body-copy mt-5">{t.contactIntro}</p>
          <div className="contact-details">
            {[
              [Mail, t.email, "care@axondt.com", "mailto:care@axondt.com"],
              [Globe, t.visit, "www.axondt.com", "https://axondt.com"],
              [
                MapPin,
                t.office,
                t.city,
                "https://www.google.com/maps/search/?api=1&query=Riyadh+Saudi+Arabia",
              ],
            ].map(([Icon, label, text, url], i) => {
              const ContactIcon = Icon as typeof Mail;
              return (
                <a
                  key={i}
                  href={url as string}
                  className="contact-item"
                  target={i > 0 ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="icon-box">
                    <ContactIcon size={20} />
                  </span>
                  <span>
                    <span className="small-label">{label as string}</span>
                    <span className="block font-medium" dir={i < 2 ? "ltr" : undefined}>
                      {text as string}
                    </span>
                  </span>
                  <ArrowUpRight className="ms-auto size-4 text-muted-foreground" />
                </a>
              );
            })}
          </div>
          <a
            className="map-preview"
            href="https://www.google.com/maps/search/?api=1&query=Riyadh+Saudi+Arabia"
            target="_blank"
            rel="noreferrer"
          >
            <span className="map-grid" />
            <MapPin className="relative size-7 text-primary" />
            <span className="relative font-medium">{t.city}</span>
            <span className="relative text-xs text-muted-foreground">{t.map} ↗</span>
          </a>
        </div>
        <form onSubmit={submit} noValidate className="contact-form">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {keys.map((key, i) => (
              <div key={key} className={i > 3 ? "sm:col-span-2" : ""}>
                <label htmlFor={key} className="form-label">
                  {t.fields[i]}
                  {key !== "phone" && <span className="text-primary"> *</span>}
                </label>
                {key === "service" ? (
                  <select
                    id={key}
                    value={fields[key]}
                    className="form-input"
                    onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                  >
                    <option value="">{t.placeholders[i]}</option>
                    {t.services.map(([title], n) => (
                      <option key={n} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                ) : key === "message" ? (
                  <textarea
                    id={key}
                    rows={4}
                    className="form-input"
                    placeholder={t.placeholders[i]}
                    value={fields[key]}
                    onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                  />
                ) : (
                  <input
                    id={key}
                    className="form-input"
                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    autoComplete={
                      key === "name"
                        ? "name"
                        : key === "email"
                          ? "email"
                          : key === "phone"
                            ? "tel"
                            : "organization"
                    }
                    dir={key === "email" || key === "phone" ? "ltr" : undefined}
                    placeholder={t.placeholders[i]}
                    value={fields[key]}
                    onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `${key}-error` : undefined}
                  />
                )}{" "}
                {errors[key] && (
                  <p id={`${key}-error`} className="mt-1 text-xs text-destructive" role="alert">
                    {t[errors[key]]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="mt-6 w-full" size="lg">
            {t.send}
            <Send />
          </Button>
          <p className="mt-3 text-center text-xs leading-6 text-muted-foreground">{t.note}</p>
        </form>
      </div>
    </section>
  );
}
