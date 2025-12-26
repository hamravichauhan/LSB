import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Sparkles,
  Newspaper,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Lock,
  Users,
  ExternalLink,
  Search,
} from "lucide-react";

/**
 * LumiRights — Lesbian Rights Activist Website (single-file App)
 * - Beautiful landing page + registration
 * - Accessible, responsive UI
 * - Simple news section (static by default)
 *
 * NOTE: This demo stores registrations in localStorage.
 * For production: connect a backend (Firebase/Supabase/your API),
 * add email verification, rate limiting, and secure storage.
 */

const BRAND = {
  name: "LumiRights",
  tagline: "Dignity. Safety. Equal Rights — for every lesbian, everywhere.",
};

const gradientText =
  "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={classNames("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-white/70">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

function Input({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      <div className="relative">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        ) : null}
        <input
          {...props}
          className={classNames(
            "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35",
            "outline-none ring-0 focus:border-white/25 focus:bg-black/40",
            Icon ? "pl-10" : ""
          )}
        />
      </div>
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      <textarea
        {...props}
        className={classNames(
          "min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35",
          "outline-none ring-0 focus:border-white/25 focus:bg-black/40"
        )}
      />
    </label>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99]";
  const styles = {
    primary:
      "bg-white text-black hover:bg-white/90 shadow-[0_12px_40px_-18px_rgba(255,255,255,0.9)]",
    ghost: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    subtle: "bg-black/30 text-white hover:bg-black/40 border border-white/10",
  };
  return (
    <button {...props} className={classNames(base, styles[variant], className)}>
      {children}
    </button>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

const defaultNews = [
  {
    id: "n1",
    title: "Community legal aid hours expanded this month",
    source: "LumiRights Updates",
    date: "2025-12-10",
    summary:
      "New weekly office hours for name-change support, workplace discrimination guidance, and safety planning.",
    url: "#",
    tags: ["Legal", "Support"],
  },
  {
    id: "n2",
    title: "New mutual-aid fund cycle opens for applications",
    source: "LumiRights Updates",
    date: "2025-12-03",
    summary:
      "Small grants for housing, healthcare travel, and emergency safety needs — reviewed confidentially.",
    url: "#",
    tags: ["Mutual Aid"],
  },
  {
    id: "n3",
    title: "Toolkit: safer reporting + documentation for harassment",
    source: "LumiRights Resources",
    date: "2025-11-21",
    summary:
      "A step-by-step guide to document incidents, preserve evidence, and get support without compromising privacy.",
    url: "#",
    tags: ["Safety", "Guide"],
  },
];

const campaigns = [
  {
    icon: Shield,
    title: "Legal & Policy Advocacy",
    desc: "We work with lawyers and allies to push anti-discrimination protections and challenge harmful policies.",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Peer circles, resource navigation, safety planning, and referrals to trusted local services.",
  },
  {
    icon: Sparkles,
    title: "Education & Visibility",
    desc: "Workshops, stories, and media toolkits that humanize lesbian lives and reduce stigma.",
  },
  {
    icon: Heart,
    title: "Mutual Aid",
    desc: "Rapid support for urgent needs, prioritizing confidentiality and community care.",
  },
];

const events = [
  {
    title: "Know Your Rights: Workplace",
    date: "Jan 08, 2026",
    time: "6:30 PM",
    place: "Online",
    note: "Free, captioned session with Q&A",
  },
  {
    title: "Community Meetup + Support Circle",
    date: "Jan 18, 2026",
    time: "4:00 PM",
    place: "City Center",
    note: "Location shared after RSVP",
  },
  {
    title: "Storytelling for Change",
    date: "Feb 02, 2026",
    time: "7:00 PM",
    place: "Online",
    note: "Learn safe ways to share your story",
  },
];

function safeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function useLocalStorageList(key) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [key, items]);

  return [items, setItems];
}

function Nav({ onJump }) {
  const links = [
    { id: "mission", label: "Mission" },
    { id: "work", label: "Our Work" },
    { id: "events", label: "Events" },
    { id: "news", label: "News" },
    { id: "register", label: "Register" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={() => onJump("top")}
          className="group inline-flex items-center gap-2"
          aria-label={`${BRAND.name} home`}
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black shadow-[0_12px_30px_-18px_rgba(255,255,255,0.9)]">
            <Heart className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">{BRAND.name}</div>
            <div className="text-xs text-white/60">Lesbian Rights Network</div>
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onJump(l.id)}
              className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <Button variant="ghost" onClick={() => onJump("register")}>
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [registrations, setRegistrations] = useLocalStorageList("lumirights_registrations");

  const [newsQuery, setNewsQuery] = useState("");
  const [news] = useState(defaultNews);

  const filteredNews = useMemo(() => {
    const q = newsQuery.trim().toLowerCase();
    if (!q) return news;
    return news.filter((n) =>
      [n.title, n.summary, n.source, ...(n.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [news, newsQuery]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    interests: ["Updates"],
    anonymity: "public",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const onJump = (id) => {
    const el = document.getElementById(id === "top" ? "page-top" : id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleInterest = (label) => {
    setForm((f) => {
      const set = new Set(f.interests);
      if (set.has(label)) set.delete(label);
      else set.add(label);
      return { ...f, interests: Array.from(set) };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const fullName = form.fullName.trim();
    const email = form.email.trim();

    if (!fullName) {
      setStatus({ type: "error", msg: "Please enter your name." });
      return;
    }
    if (!safeEmail(email)) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }
    if (!form.consent) {
      setStatus({ type: "error", msg: "Please agree to the consent + privacy note." });
      return;
    }

    const entry = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...form,
      fullName,
      email,
      phone: form.phone.trim(),
      city: form.city.trim(),
      message: form.message.trim(),
      interests: form.interests.length ? form.interests : ["Updates"],
    };

    setRegistrations((xs) => [entry, ...xs].slice(0, 250));
    setForm({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      interests: ["Updates"],
      anonymity: "public",
      message: "",
      consent: false,
    });

    setStatus({
      type: "success",
      msg: "Registered! (Demo) Your info is saved locally in this browser.",
    });
  };

  const stats = useMemo(
    () => [
      { k: "People registered", v: String(registrations.length) },
      { k: "Support circles", v: "24+" },
      { k: "Legal referrals", v: "180+" },
    ],
    [registrations.length]
  );

  return (
    <div id="page-top" className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(236,72,153,0.25),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgba(99,102,241,0.18),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_20%,rgba(217,70,239,0.16),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <Nav onJump={onJump} />

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pb-14 pt-12 md:px-6 md:pb-20 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill icon={Shield}>Safety-first</Pill>
              <Pill icon={Lock}>Privacy-respecting</Pill>
              <Pill icon={Sparkles}>Community-powered</Pill>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl"
            >
              Build a world where <span className={gradientText}>lesbians</span> live freely.
            </motion.h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {BRAND.tagline} Join the network to get updates, attend support circles, volunteer, or
              access resources.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => onJump("register")}>
                Register <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => onJump("work")}>
                See how we fight
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <Card key={s.k} className="p-4">
                  <div className="text-2xl font-semibold">{s.v}</div>
                  <div className="mt-1 text-xs text-white/60">{s.k}</div>
                </Card>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/55">
              <span className="font-semibold text-white/70">Safety note:</span> Use an email you
              trust. You can choose anonymity below. Never share sensitive details if it could put
              you at risk.
            </p>
          </div>

          <div className="relative">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white/80">Featured</div>
                  <div className="mt-1 text-xl font-semibold">How we help, week by week</div>
                  <p className="mt-2 text-sm text-white/65">
                    Direct support, legal navigation, and advocacy — built with confidentiality.
                  </p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { t: "Confidential support circles", d: "Trained facilitators + peer care." },
                  { t: "Rapid referrals", d: "Legal, housing, healthcare navigation." },
                  { t: "Policy advocacy", d: "Letters, meetings, campaigns." },
                  { t: "Safety resources", d: "Documentation + planning toolkits." },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex gap-3 rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/80" />
                    <div>
                      <div className="text-sm font-semibold text-white/85">{x.t}</div>
                      <div className="text-xs text-white/60">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>Legal</Tag>
                <Tag>Safety</Tag>
                <Tag>Community</Tag>
                <Tag>Mutual Aid</Tag>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* Mission */}
      <section id="mission" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <SectionTitle
          eyebrow="Our mission"
          title={
            <>
              We protect rights, amplify voices, and build <span className={gradientText}>safer futures</span>.
            </>
          }
          subtitle="We’re a community-led network supporting lesbians through legal navigation, mutual aid, education, and policy advocacy."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold">Rights & Safety</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              We prioritize safety, confidentiality, and real-world support — especially where stigma is high.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold">Community Care</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Peer groups, resource navigation, and ally engagement — so no one has to face things alone.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold">Visibility</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Stories, workshops, and campaigns that shift culture and normalize lesbian lives.
            </p>
          </Card>
        </div>
      </section>

      {/* Our Work */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <SectionTitle
          eyebrow="What we do"
          title={
            <>
              How we fight for <span className={gradientText}>lesbian rights</span>
            </>
          }
          subtitle="From the ground up: support, advocacy, education, and mutual aid."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {campaigns.map((c) => (
            <Card key={c.title} className="p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag>Volunteer</Tag>
                    <Tag>Donate</Tag>
                    <Tag>Share resources</Tag>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white/75">Impact</div>
                <div className="mt-1 text-xl font-semibold">Your support becomes action</div>
                <p className="mt-2 text-sm text-white/70">
                  We invest in safe programs, trusted partnerships, and confidential assistance.
                </p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Heart className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { t: "Confidential intake", d: "We protect identities and risk levels." },
                { t: "Care coordination", d: "Warm handoffs to verified resources." },
                { t: "Advocacy loop", d: "Support stories inform policy work." },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="text-sm font-semibold text-white/85">{x.t}</div>
                  <div className="mt-1 text-xs text-white/60">{x.d}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-semibold text-white/75">Get involved</div>
            <div className="mt-1 text-xl font-semibold">3 quick ways</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4" /> Register for updates + events
              </li>
              <li className="flex gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4" /> Volunteer skills (design, legal, facilitation)
              </li>
              <li className="flex gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4" /> Share resources in your area
              </li>
            </ul>
            <Button className="mt-5 w-full" onClick={() => onJump("register")}>
              Register now
            </Button>
          </Card>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <SectionTitle
          eyebrow="Upcoming"
          title={
            <>
              Events & workshops for <span className={gradientText}>support</span> and change
            </>
          }
          subtitle="Online options are captioned whenever possible. In-person locations may be shared after RSVP for safety."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {events.map((ev) => (
            <Card key={ev.title} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{ev.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {ev.date} • {ev.time}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {ev.place}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{ev.note}</p>
                </div>
              </div>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => onJump("register")}>
                RSVP via registration
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="news" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="News"
            title={
              <>
                Updates & related <span className={gradientText}>lesbian news</span>
              </>
            }
            subtitle="This demo shows sample posts. Connect this section to RSS/JSON feeds for real-time news."
          />
          <div className="w-full md:max-w-sm">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">Search news</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <input
                  value={newsQuery}
                  onChange={(e) => setNewsQuery(e.target.value)}
                  placeholder="Search: legal, safety, mutual aid…"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pl-10 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-black/40"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {filteredNews.map((n) => (
            <Card key={n.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-white/60">{n.source}</div>
                  <div className="mt-1 text-lg font-semibold">{n.title}</div>
                  <div className="mt-2 text-xs text-white/55">{n.date}</div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <Newspaper className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{n.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(n.tags || []).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-5">
                <a
                  href={n.url}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
                >
                  Read more <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No news items match your search.
          </div>
        ) : null}
      </section>

      {/* Register */}
      <section id="register" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <SectionTitle
              eyebrow="Join the network"
              title={
                <>
                  Register — safely, on <span className={gradientText}>your terms</span>
                </>
              }
              subtitle="Choose how public you want to be. In this demo, your info is saved in your browser only."
            />

            <div className="mt-6 grid gap-4">
              <Card className="p-6">
                <div className="text-sm font-semibold text-white/80">Privacy options</div>
                <p className="mt-2 text-sm text-white/70">
                  If you are in a high-risk situation, consider using a new email and selecting
                  anonymous mode. Do not share addresses, legal case details, or anything that could put you at risk.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill icon={Lock}>Anonymous mode available</Pill>
                  <Pill icon={Shield}>Safety-first language</Pill>
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-sm font-semibold text-white/80">What you’ll get</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" /> Event invites + support circles
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" /> Legal + safety resources
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" /> Volunteer + campaign opportunities
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <Card className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Full name"
                  icon={Users}
                  placeholder="Your name"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                />
                <Input
                  label="Email"
                  icon={Mail}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Phone (optional)"
                  icon={Phone}
                  placeholder="+91…"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
                <Input
                  label="City (optional)"
                  icon={MapPin}
                  placeholder="Your city"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-white/80">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {["Updates", "Events", "Volunteer", "Legal aid", "Mutual aid"].map((x) => {
                    const active = form.interests.includes(x);
                    return (
                      <button
                        key={x}
                        type="button"
                        onClick={() => toggleInterest(x)}
                        className={classNames(
                          "rounded-full border px-3 py-1 text-xs font-semibold transition",
                          active
                            ? "border-white/25 bg-white text-black"
                            : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
                        )}
                      >
                        {x}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-white/80">Visibility preference</div>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    { v: "public", t: "Public", d: "Ok to show my first name" },
                    { v: "private", t: "Private", d: "Only staff can see" },
                    { v: "anonymous", t: "Anonymous", d: "No name displayed" },
                  ].map((x) => (
                    <button
                      type="button"
                      key={x.v}
                      onClick={() => setForm((f) => ({ ...f, anonymity: x.v }))}
                      className={classNames(
                        "rounded-2xl border p-3 text-left transition",
                        form.anonymity === x.v
                          ? "border-white/25 bg-white/10"
                          : "border-white/10 bg-black/30 hover:bg-black/40"
                      )}
                    >
                      <div className="text-sm font-semibold">{x.t}</div>
                      <div className="mt-1 text-xs text-white/60">{x.d}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Message (optional)"
                placeholder="Tell us what kind of support you’re looking for…"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                />
                <div>
                  <div className="text-sm font-semibold text-white/85">Consent + privacy</div>
                  <div className="mt-1 text-xs text-white/60">
                    I understand this is a demo. For a real deployment, the site should explain how data is stored and used.
                  </div>
                </div>
              </label>

              {status.type === "error" ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {status.msg}
                </div>
              ) : null}
              {status.type === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                  {status.msg}
                </div>
              ) : null}

              <Button className="w-full" type="submit">
                Register <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-xs text-white/55">
                Tip: For production, connect a backend (Supabase/Firebase) and enable email verification.
              </div>
            </form>
          </Card>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white/80">Recent registrations (demo)</div>
              <div className="mt-1 text-xs text-white/55">
                Stored in your browser only. Clear by clicking “Reset”.
              </div>
            </div>
            <Button
              variant="subtle"
              onClick={() => {
                localStorage.removeItem("lumirights_registrations");
                setRegistrations([]);
              }}
            >
              Reset
            </Button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {registrations.slice(0, 6).map((r) => (
              <Card key={r.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">
                      {r.anonymity === "anonymous" ? "Anonymous" : r.fullName}
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-white/60">{r.anonymity}</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(r.interests || []).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                {r.city ? <div className="mt-3 text-xs text-white/60">City: {r.city}</div> : null}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <SectionTitle
          eyebrow="Contact"
          title={
            <>
              Reach us — safely and <span className={gradientText}>confidentially</span>
            </>
          }
          subtitle="Replace these details with your organization’s real contact methods."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-sm text-white/70">hello@lumirights.org</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Hotline</div>
                <div className="text-sm text-white/70">+00 0000 000 000</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Office</div>
                <div className="text-sm text-white/70">By appointment only</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <span className="font-semibold text-white/75">{BRAND.name}</span> — © {new Date().getFullYear()}
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="hover:text-white" onClick={() => onJump("register")}>
              Register
            </button>
            <button className="hover:text-white" onClick={() => onJump("news")}>
              News
            </button>
            <button className="hover:text-white" onClick={() => onJump("contact")}>
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
