import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  Menu,
  X,
  Globe2,
  MapPin,
  ShieldCheck,
  Layers3,
  Boxes,
  ReceiptText,
  ChartNoAxesCombined,
  Users,
  Code2,
  Headset,
  ShoppingBag,
  Factory,
  Truck,
  Building2,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  Network,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Download,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { Contact } from "./contact";
import { sectionIds } from "@/lib/axon-content";
import logo from "@/assets/axon-logo.png";
import odoo from "@/assets/odoo.png";
import network from "@/assets/neural-network.jpg";
const serviceIcons = [
  Layers3,
  ReceiptText,
  Boxes,
  ChartNoAxesCombined,
  ShoppingBag,
  Users,
  Code2,
  Headset,
];
const industryIcons = [
  ShoppingBag,
  Factory,
  Boxes,
  Building2,
  HeartPulse,
  BriefcaseBusiness,
  Truck,
  GraduationCap,
];
function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="AXON Digital Transformation"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <img src={logo} alt="AXON Digital Transformation" width={1920} height={1047} />
    </a>
  );
}
function LanguageButton() {
  const { lang, setLang } = useLanguage();
  return (
    <Button
      variant="ghost"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className="language-button"
    >
      <Globe2 size={15} />
      <span>{lang === "ar" ? "English" : "العربية"}</span>
    </Button>
  );
}
function Consultation({ outline = false }: { outline?: boolean }) {
  const { t } = useLanguage();
  return (
    <Button asChild size="lg" variant={outline ? "heroOutline" : "default"}>
      <a href="#contact">
        {t.consult}
        <ArrowUpRight className="direction-icon" />
      </a>
    </Button>
  );
}
function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label={t.quick}>
          {sectionIds.map((id, i) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageButton />
          <Button asChild className="header-consult">
            <a href="#contact">
              {t.consult}
              <ArrowUpRight className="direction-icon" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav[0] + " — ×" : t.quick}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label={t.quick}>
          {sectionIds.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {t.nav[i]}
            </a>
          ))}
          <Consultation />
        </nav>
      )}
    </header>
  );
}
function Hero() {
  const { t, lang } = useLanguage();
  return (
    <section id="home" className="hero">
      <img
        className="hero-image"
        src={network}
        alt=""
        width={1920}
        height={1024}
        fetchPriority="high"
      />
      <div className="hero-content page-width">
        <div className="hero-eyebrow">
          <span className="status-dot" />
          {t.eyebrow}
        </div>
        <p className="hero-brand" dir="ltr">
          AXON <span>Digital Transformation</span>
        </p>
        <h1 className={lang === "en" ? "hero-title english-title" : "hero-title"}>
          <span>{t.hero[0]}</span>
          <span>
            {t.hero[1]} <em>{t.hero[2]}</em>
          </span>
        </h1>
        <p className="hero-description">{t.tagline}</p>
        <div className="hero-actions">
          <Consultation />
          <Button asChild variant="heroOutline" size="lg">
            <a href="#services">
              {t.explore}
              <ArrowDown />
            </a>
          </Button>
        </div>
        <div className="hero-trust">
          {t.trust.map((item, i) => {
            const Icon = [Layers3, ShieldCheck, MapPin][i];
            return (
              <span key={item}>
                {Icon && <Icon size={15} />} {item}
              </span>
            );
          })}
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label={t.nav[1]}>
        <ArrowDown size={16} />
      </a>
      <span className="hero-corner" dir="ltr">
        {lang === "ar" ? "01 — ترابط. تحوّل. نمو." : "01 — CONNECT. TRANSFORM. GROW."}
      </span>
    </section>
  );
}
function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section-pad">
      <div className="page-width">
        <div className="about-grid">
          <div>
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2 className="section-heading whitespace-pre-line">{t.aboutTitle}</h2>
            <p className="body-copy mt-6">{t.about}</p>
            <p className="body-copy mt-4">{t.about2}</p>
            <Button asChild variant="link" className="mt-5 px-0">
              <a href="/company-profile.pdf" target="_blank" rel="noreferrer">
                {t.profile}
                <Download size={16} />
              </a>
            </Button>
          </div>
          <div className="odoo-visual">
            <div className="visual-caption">
              <span className="status-dot" />
              <span>
                {t.explore === "اكتشف خدماتنا" ? "منظومة واحدة مترابطة" : "ONE CONNECTED ECOSYSTEM"}
              </span>
              <Network size={17} />
            </div>
            <img src={odoo} alt="Odoo ERP" width={1376} height={768} loading="lazy" />
            <div className="visual-facts">
              <span>
                <strong>2025</strong>
                {t.founded}
              </span>
              <span>
                <strong>{t.stats[2]?.[0]}</strong>
                {t.location}
              </span>
              <span>
                <strong>Odoo ERP</strong>
                {t.industry}
              </span>
            </div>
          </div>
        </div>
        <div className="highlight-grid">
          {t.highlights.map(([title, text], i) => {
            const Icon = [Network, TrendingUp, Sparkles][i];
            return (
              <div className="highlight" key={title}>
                {Icon && (
                  <span className={`icon-box tone-${i}`}>
                    <Icon size={22} />
                  </span>
                )}
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="section-pad bg-secondary">
      <div className="page-width">
        <div className="section-top">
          <div>
            <p className="eyebrow">{t.servicesLabel}</p>
            <h2 className="section-heading">{t.servicesTitle}</h2>
          </div>
          <p className="body-copy section-intro">{t.servicesIntro}</p>
        </div>
        <div className="service-grid">
          {t.services.map(([title, text], i) => {
            const Icon = serviceIcons[i];
            return (
              <a href="#contact" key={title} className="service-card">
                <div className="flex items-center justify-between">
                  <span className={`icon-box tone-${i % 3}`}>{Icon && <Icon size={23} />}</span>
                  <span className="service-number">0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight className="service-arrow direction-icon" size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Approach() {
  const { t } = useLanguage();
  return (
    <section className="section-pad">
      <div className="page-width">
        <p className="eyebrow text-center">{t.approachLabel}</p>
        <h2 className="section-heading text-center">{t.approachTitle}</h2>
        <div className="timeline">
          {t.steps.map(([title, text], i) => (
            <div key={title} className="timeline-step">
              <span className="step-dot">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Why() {
  const { t } = useLanguage();
  return (
    <section id="why" className="why-section section-pad">
      <div className="page-width">
        <div className="why-grid">
          <div>
            <p className="eyebrow">{t.whyLabel}</p>
            <h2 className="section-heading whitespace-pre-line">{t.whyTitle}</h2>
            <p className="body-copy mt-5">{t.whyIntro}</p>
            <div className="why-wordmark" dir="ltr">
              AXON
              <span>
                {t.explore === "اكتشف خدماتنا" ? "ترابط يصنع القيمة." : "CONNECTED BY PURPOSE."}
              </span>
            </div>
          </div>
          <div className="values-grid">
            {t.values.map((v, i) => (
              <div key={v} className="value-item">
                <span className="value-index">0{i + 1}</span>
                <div>
                  <Check size={18} />
                  <h3>{v}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stats-strip">
          {t.stats.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Industries() {
  const { t } = useLanguage();
  return (
    <section id="industries" className="section-pad">
      <div className="page-width">
        <div className="section-top">
          <div>
            <p className="eyebrow">{t.industriesLabel}</p>
            <h2 className="section-heading">{t.industriesTitle}</h2>
          </div>
          <p className="body-copy section-intro">{t.industriesIntro}</p>
        </div>
        <div className="industry-grid">
          {t.industries.map((name, i) => {
            const Icon = industryIcons[i];
            return (
              <a href="#contact" className="industry-item" key={name}>
                {Icon && <Icon size={24} />}
                <span>{name}</span>
                <ArrowUpRight size={16} className="ms-auto direction-icon" />
              </a>
            );
          })}
        </div>
        <div className="construction-band">
          <Building2 size={30} />
          <div>
            <h3>{t.construction}</h3>
            <p>{t.constructionText}</p>
          </div>
          <a href="/company-profile.pdf" target="_blank" rel="noreferrer" aria-label={t.profile}>
            <ArrowUpRight size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="cta-section">
      <div className="page-width cta-inner">
        <div>
          <p className="eyebrow">AXON · DIGITAL TRANSFORMATION</p>
          <h2>{t.cta}</h2>
          <p>{t.ctaText}</p>
        </div>
        <Consultation />
      </div>
    </section>
  );
}
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-grid">
          <div>
            <Brand light />
            <p>{t.footer}</p>
          </div>
          <div>
            <h3>{t.quick}</h3>
            <div className="footer-links">
              {sectionIds.slice(1).map((id, i) => (
                <a key={id} href={`#${id}`}>
                  {t.nav[i + 1]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3>{t.nav[5]}</h3>
            <a href="mailto:care@axondt.com" dir="ltr">
              care@axondt.com
            </a>
            <p>{t.city}</p>
            <LanguageButton />
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.rights}</span>
          <a href="#home">
            {t.back}
            <ArrowRight className="-rotate-90" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
export function Website() {
  const { t } = useLanguage();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading, .service-card, .highlight, .timeline-step, .industry-item",
      )
      .forEach((e) => {
        e.classList.add("reveal");
        observer.observe(e);
      });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Approach />
        <Why />
        <Industries />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <Button
        className="whatsapp-button"
        size="icon"
        aria-label={t.whatsapp}
        onClick={() => toast.info(t.whatsappNote)}
      >
        <MessageCircle size={24} />
      </Button>
      <Toaster position="bottom-center" />
    </>
  );
}
