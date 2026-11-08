import { useMemo, useState, type ReactNode } from 'react';
import logoDark from './assets/logo-dark.png';
import logoLight from './assets/logo-light.png';
import {
  SIZES, FABRICS, type SizeId, type FabricId, DELIVERY_FEE, PROTECTION_FEE, LEAD_DAYS, ECON, TARIFFS, TEAM, COMING_NEXT, unitEconomics,
} from './data';

const DAY = 86400000;
const money = (n: number): string => (n < 0 ? '−' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
const fmtDate = (d: Date): string => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const startOfToday = (): Date => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

function Sofa({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 600 260" className="sofa" role="img" aria-label={label}>
      <polygon points="70,200 84,200 78,246 72,246" fill="#6B4A33" />
      <polygon points="516,200 530,200 528,246 522,246" fill="#6B4A33" />
      <rect x="40" y="190" width="520" height="12" rx="3" fill="#6B4A33" />
      <g fill={color} style={{ transition: 'fill .3s' }}>
        <rect x="30" y="92" width="62" height="102" rx="16" />
        <rect x="508" y="92" width="62" height="102" rx="16" />
        <rect x="88" y="168" width="424" height="26" />
        <rect x="92" y="58" width="134" height="88" rx="16" />
        <rect x="233" y="58" width="134" height="88" rx="16" />
        <rect x="374" y="58" width="134" height="88" rx="16" />
      </g>
      <rect x="92" y="58" width="416" height="88" rx="16" fill="#000" fillOpacity="0.06" />
      <g fill={color} style={{ transition: 'fill .3s' }}>
        <rect x="90" y="136" width="139" height="42" rx="13" />
        <rect x="231" y="136" width="139" height="42" rx="13" />
        <rect x="372" y="136" width="139" height="42" rx="13" />
      </g>
      <rect x="88" y="172" width="424" height="22" fill="#000" fillOpacity="0.08" />
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={'eyebrow' + (light ? ' eyebrow--light' : '')}>{children}</p>;
}

export default function App() {
  const [sizeId, setSizeId] = useState<SizeId>('std');
  const [fabricId, setFabricId] = useState<FabricId>('oat');
  const [protect, setProtect] = useState(false);
  const [notice, setNotice] = useState('');
  const [hostDate, setHostDate] = useState('');
  const [tariff, setTariff] = useState(25);
  const [orders, setOrders] = useState(50);

  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[1];
  const fabric = FABRICS.find((f) => f.id === fabricId) ?? FABRICS[0];
  const today = startOfToday();
  const delivery = new Date(today.getTime() + LEAD_DAYS * DAY);
  const total = size.price + DELIVERY_FEE + (protect ? PROTECTION_FEE : 0);
  const econ = useMemo(() => unitEconomics(size.price, tariff, orders), [size.price, tariff, orders]);

  type HostTone = 'neutral' | 'good' | 'warn';
  let host: { tone: HostTone; text: string } = { tone: 'neutral', text: 'Pick a date to see whether a Nelson arrives in time.' };
  if (hostDate) {
    const [y, m, d] = hostDate.split('-').map(Number);
    const hd = new Date(y, m - 1, d);
    const orderBy = new Date(hd.getTime() - LEAD_DAYS * DAY);
    host = orderBy >= today
      ? { tone: 'good', text: `You're in time. Order by ${fmtDate(orderBy)} and your Nelson arrives before ${fmtDate(hd)}.` }
      : { tone: 'warn', text: `That's too tight for three weeks. The earliest delivery for an order today is ${fmtDate(delivery)}.` };
  }

  return (
    <>
      <div className="banner">A New Ventures class concept · UNC Kenan-Flagler · not a real store, no orders are taken</div>

      <header className="wrap header">
        <img src={logoDark} alt="Talo Home" className="logo" />
        <nav className="nav">
          <a href="#design">Design your sofa</a>
          <a href="#how">How it works</a>
          <a href="#deadline">Hosting date</a>
          <a href="#model">The business</a>
        </nav>
      </header>

      <main>
        <section className="wrap hero">
          <div className="stack-24">
            <Eyebrow>Made to order · Home in 3 weeks</Eyebrow>
            <h1>Custom, without the wait.</h1>
            <p className="lede">
              Designer-curated sofas for your first home. Choose your size and fabric, and we upholster it to order
              in the US and deliver it in three weeks, in time for the moment that matters.
            </p>
            <div className="row-12">
              <a href="#design" className="btn btn--primary">Design your Nelson · from {money(SIZES[0].price)}</a>
              <a href="#deadline" className="btn btn--outline">Got a hosting date?</a>
            </div>
          </div>
          <div className="hero-art">
            <Sofa color={fabric.hex} label={`Illustration of the Nelson sofa in ${fabric.name}`} />
            <p className="caption">Nelson · {size.label} · {fabric.name}</p>
          </div>
        </section>

        <section className="band band--dark">
          <div className="wrap stats">
            <div><span className="stat">8+ wks</span><span>the usual wait for affordable custom upholstery, shipped by container</span></div>
            <div><span className="stat stat--sand">3 wks</span><span>with Talo: frames and covers staged in the US, upholstered when you order</span></div>
            <div><span className="stat">5 free</span><span>fabric swatches mailed to you before you commit, because custom orders are final</span></div>
          </div>
        </section>

        <section id="design" className="wrap section stack-32">
          <div className="stack-8">
            <Eyebrow>Design your sofa</Eyebrow>
            <h2>The Nelson, made for your space</h2>
          </div>
          <div className="two-col">
            <div className="stack-28">
              <fieldset className="stack-12">
                <legend className="label">1 · Choose your size</legend>
                <div className="sizes">
                  {SIZES.map((s) => (
                    <button key={s.id} type="button" aria-pressed={s.id === sizeId}
                      className={'size' + (s.id === sizeId ? ' is-on' : '')} onClick={() => setSizeId(s.id)}>
                      <strong>{s.label}</strong>
                      <span>{s.inches} · {money(s.price)}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="stack-12">
                <legend className="label">2 · Choose your fabric: {fabric.name}</legend>
                <div className="swatches">
                  {FABRICS.map((f) => (
                    <button key={f.id} type="button" aria-label={f.name} aria-pressed={f.id === fabricId} title={f.name}
                      className={'swatch' + (f.id === fabricId ? ' is-on' : '')} style={{ background: f.hex }}
                      onClick={() => setFabricId(f.id)} />
                  ))}
                </div>
              </fieldset>
              <fieldset className="stack-12">
                <legend className="label">3 · Add-ons</legend>
                <label className="check">
                  <input type="checkbox" checked={protect} onChange={(e) => setProtect(e.target.checked)} />
                  Fabric protection, +{money(PROTECTION_FEE)}
                </label>
              </fieldset>
            </div>

            <aside className="summary" aria-label="Order summary">
              <div className="line"><span>Nelson sofa · {size.label}</span><span>{money(size.price)}</span></div>
              <div className="line"><span>White-glove delivery and setup</span><span>{money(DELIVERY_FEE)}</span></div>
              {protect && <div className="line"><span>Fabric protection</span><span>{money(PROTECTION_FEE)}</span></div>}
              <div className="line line--total"><span>Total</span><span>{money(total)}</span></div>
              <div className="eta">Order today, home by <strong>{fmtDate(delivery)}</strong> · 3 weeks</div>
              <button type="button" className="btn btn--primary btn--block" onClick={() => setNotice(
                `Concept demo: no order was placed. In the pilot, this Nelson (${size.label}, ${fabric.name}, ${money(total)}) would be upholstered on our domestic line and delivered by ${fmtDate(delivery)}.`
              )}>Order now</button>
              <button type="button" className="btn btn--outline btn--block" onClick={() => setNotice(
                'Concept demo: in the pilot, a free kit with up to 5 fabric swatches ships to your door so you can see colors in your own light.'
              )}>Send me a free swatch kit</button>
              {notice && <p role="status" className="notice">{notice}</p>}
            </aside>
          </div>
        </section>

        <section id="how" className="band band--sand">
          <div className="wrap section stack-32">
            <h2>How three weeks works</h2>
            <ol className="steps">
              {([
                ['Stage', 'Bought at scale', 'Frames and cut-and-sewn covers from our partner factories, held in US stock before you order.'],
                ['Design', 'You configure it', 'Pick size and fabric online after trying free swatches at home.'],
                ['Finish', 'Upholstered to order', 'Each sofa is finished on our domestic line the week you order.'],
                ['Deliver', 'Home in 3 weeks', 'A white-glove crew delivers it, sets it up and takes the packaging.'],
              ] as const).map(([k, t, d], i) => (
                <li key={k} className="card">
                  <span className="step-k">{i + 1} · {k.toUpperCase()}</span>
                  <strong className="card-title">{t}</strong>
                  <span className="muted">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="deadline" className="wrap section two-col two-col--center">
          <div className="stack-12">
            <Eyebrow>Hosts-in-waiting</Eyebrow>
            <h2>Hosting soon? Check your date.</h2>
            <p className="lede lede--sm">Holidays, a baby shower, parents in town. Tell us when guests arrive and we'll tell you the last day to order.</p>
          </div>
          <div className="panel panel--sage stack-12">
            <label htmlFor="hostdate" className="label">When do guests arrive?</label>
            <input id="hostdate" type="date" className="date" value={hostDate} onChange={(e) => setHostDate(e.target.value)} />
            <p role="status" className={'host host--' + host.tone}>{host.text}</p>
          </div>
        </section>

        <section id="model" className="band band--dark">
          <div className="wrap section stack-32">
            <div className="stack-8">
              <Eyebrow light>For our classmates · the business</Eyebrow>
              <h2 className="on-dark">Simulate the unit economics</h2>
              <p className="lede lede--sm on-dark-muted">
                Contribution per order and breakeven from our Proforma v3 recommended scenario. Change the tariff rate,
                the sofa size and monthly order volume.
              </p>
            </div>
            <div className="two-col">
              <div className="stack-24">
                <fieldset className="stack-12">
                  <legend className="label on-dark">Section 232 tariff on upholstered furniture</legend>
                  <div className="row-12">
                    {TARIFFS.map((t) => (
                      <button key={t.rate} type="button" aria-pressed={t.rate === tariff}
                        className={'pill' + (t.rate === tariff ? ' is-on' : '')} onClick={() => setTariff(t.rate)}>
                        {t.rate}% {t.note}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="stack-12">
                  <legend className="label on-dark">Sofa size</legend>
                  <div className="row-12">
                    {SIZES.map((s) => (
                      <button key={s.id} type="button" aria-pressed={s.id === sizeId}
                        className={'pill' + (s.id === sizeId ? ' is-on' : '')} onClick={() => setSizeId(s.id)}>
                        {s.label} {money(s.price)}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="stack-12">
                  <label htmlFor="orders" className="label on-dark">Orders per month: {orders}</label>
                  <input id="orders" type="range" min="10" max="150" step="1" value={orders}
                    onChange={(e) => setOrders(Number(e.target.value))} className="range" />
                </div>
              </div>
              <div className="econ">
                <div className="line"><span>Sofa + delivery fee</span><span>{money(econ.revenue)}</span></div>
                <div className="line"><span>Landed product (frame, cover, {tariff}% tariff, freight)</span><span>−{money(econ.landed)}</span></div>
                <div className="line"><span>White-glove carrier</span><span>−{money(ECON.CARRIER)}</span></div>
                <div className="line"><span>Finishing, shared services, fees, returns</span><span>−{money(ECON.OTHER_VARIABLE)}</span></div>
                <div className="line line--total"><span>Contribution per order</span><span>{money(econ.contribution)}</span></div>
                <div className="line"><span>Breakeven</span><span>{econ.breakeven} orders / month</span></div>
                <div className={'line line--total ' + (econ.profit >= 0 ? 'pos' : 'neg')}>
                  <span>Monthly profit at {orders} orders</span><span>{money(econ.profit)}</span>
                </div>
              </div>
            </div>
            <p className="fine on-dark-muted">
              Assumptions: {money(ECON.FACTORY_COST)} factory cost per frame and cover, about {money(ECON.FREIGHT)} freight,{' '}
              {money(ECON.CARRIER)} carrier, {money(ECON.OTHER_VARIABLE)} other variable costs and {money(ECON.FIXED_MONTHLY)} fixed
              monthly costs, back-solved from Proforma v3 ($450 contribution and about 44 orders a month to break even
              at 25%). The tariff is scheduled to rise from 25% to 30% on Jan 1, 2027.
            </p>
          </div>
        </section>

        <section className="wrap section stack-28">
          <h2>Coming next</h2>
          <ul className="coming">
            {COMING_NEXT.map((c) => (
              <li key={c.name}><strong className="card-title">{c.name}</strong><span className="muted">{c.note}</span></li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <img src={logoLight} alt="Talo Home" className="logo-lg" />
          <div className="stack-6 footer-text">
            <strong>Team</strong>
            <span>{TEAM.join(' · ')}</span>
            <span className="footer-muted">
              New Ventures · Module 4: Model and Management Sprint · UNC Kenan-Flagler, November 2026. Talo Home is a
              class concept: prices and dates are illustrative, and no orders or payments are taken.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
