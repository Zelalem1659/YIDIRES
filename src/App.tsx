import { useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bike, Check, ChevronDown, Clock3,
  Globe2, Heart, MapPin, Menu, Package, Search, ShoppingBasket, Sparkles,
  Store, UtensilsCrossed, X,
} from 'lucide-react'
import './App.css'

type Language = 'en' | 'am'
type Category = 'food' | 'grocery' | 'package'
const currentYear = new Date().getFullYear()

const copy = {
  en: {
    navHow: 'How it works', navExplore: 'Explore', navPartner: 'Partner with us',
    signIn: 'Sign in', comingSoon: 'Coming soon', eyebrow: 'MADE FOR THE WAY ETHIOPIA MOVES',
    heroTitle: 'A little more', heroAccent: 'delivered.', heroText: 'Your favorite food, everyday essentials, and everything in between — brought right to your door.',
    addressLabel: 'Your delivery address', addressPlaceholder: 'Enter your area or a nearby landmark',
    find: 'Find delivery', addressHint: 'For example: Bole, near Edna Mall',
    addressNotice: 'Ordering is coming soon. We’re getting ready to deliver to',
    addressError: 'Please enter an area or landmark first.',
    heroTag: 'A taste of home,', heroTagBold: 'wherever you are.', heroBadge: 'Made for Ethiopia',
    heroSmall: 'Good things are on the way', heroDelivery: 'Delivered with care',
    servicesEyebrow: 'WHAT CAN WE GET YOU?', servicesTitle: 'A little something for every day.',
    servicesText: 'From a meal you’re craving to the things you forgot, we’ve got you.',
    food: 'Food', foodText: 'Your favorites, fresh to your door.', grocery: 'Groceries',
    groceryText: 'The everyday essentials, made easy.', package: 'Packages',
    packageText: 'Send a little something across town.', explore: 'Explore',
    discoverEyebrow: 'GOOD FOOD, GOOD MOOD', discoverTitle: 'Find your next favorite.',
    discoverText: 'A little inspiration for your next order.', viewAll: 'Explore categories',
    sampleNotice: 'A sneak peek at what’s coming. These are illustrative examples, not available to order yet.',
    all: 'All', foodTag: 'FOOD', groceryTag: 'GROCERIES', packageTag: 'PACKAGES',
    card1: 'The comfort food edit', card1Text: 'Local flavors, made with love',
    card2: 'Fresh market finds', card2Text: 'The good stuff for your kitchen',
    card3: 'Coffee & a little treat', card3Text: 'A break worth looking forward to',
    card4: 'Across-town essentials', card4Text: 'For the things that need to get there',
    stepsEyebrow: 'SIMPLE AS THAT', stepsTitle: 'More life. Less running around.',
    stepsText: 'We’re building a simpler way to get the things you love, right where you are.',
    step1: 'Tell us where you are', step1Text: 'Add your area and a nearby landmark so we can find you.',
    step2: 'Find what you love', step2Text: 'Explore food, groceries, and more from your neighborhood.',
    step3: 'We’ll bring it to you', step3Text: 'Sit back and let us take care of the trip.',
    partnerEyebrow: 'LET’S GROW TOGETHER', partnerTitle: 'There’s room for everyone at our table.',
    partnerText: 'Whether you make great food, run a local shop, or know your way around town, let’s move Ethiopia forward together.',
    merchant: 'Become a merchant', driver: 'Deliver with us', partnerSoon: 'Partner applications are coming soon.',
    footerText: 'A little more of what you love, delivered with care.',
    footerExplore: 'EXPLORE', footerConnect: 'GET INVOLVED', footerAbout: 'ABOUT YIDRES',
    footerAboutText: 'Made with love for Ethiopia.', footerRights: 'All rights reserved.',
    footerAdmin: 'Administration', footerPayments: 'Telebirr, Chapa & cash on delivery planned',
    menu: 'Open menu', close: 'Close menu', language: 'Change language',
    skip: 'Skip to content',
  },
  am: {
    navHow: 'እንዴት ይሰራል', navExplore: 'ያስሱ', navPartner: 'አጋር ይሁኑ',
    signIn: 'ግባ', comingSoon: 'በቅርቡ', eyebrow: 'ለኢትዮጵያ አኗኗር የተዘጋጀ',
    heroTitle: 'ትንሽ ተጨማሪ', heroAccent: 'ይድረስ።', heroText: 'የሚወዱት ምግብ፣ የዕለት ተዕለት እቃዎች እና ሌሎችም — እስከ ቤትዎ ድረስ።',
    addressLabel: 'የማድረሻ አድራሻዎ', addressPlaceholder: 'አካባቢዎን ወይም የሚታወቅ ምልክት ያስገቡ',
    find: 'መላኪያ ፈልግ', addressHint: 'ለምሳሌ፦ ቦሌ፣ ኤድና ሞል አጠገብ',
    addressNotice: 'ትዕዛዝ በቅርቡ ይጀምራል። ለማድረስ እየተዘጋጀን ነው፦',
    addressError: 'እባክዎ መጀመሪያ አካባቢ ወይም ምልክት ያስገቡ።',
    heroTag: 'የቤትዎ ጣዕም፣', heroTagBold: 'የትም ቢሆኑ።', heroBadge: 'ለኢትዮጵያ የተዘጋጀ',
    heroSmall: 'መልካም ነገሮች በመንገድ ላይ ናቸው', heroDelivery: 'በጥንቃቄ ይደርሳል',
    servicesEyebrow: 'ምን እናድርስልዎ?', servicesTitle: 'ለየቀኑ ትንሽ ደስታ።',
    servicesText: 'ከሚመኙት ምግብ እስከ የረሱት እቃ፣ ከጎንዎ ነን።',
    food: 'ምግብ', foodText: 'የሚወዱት ትኩስ ምግብ እስከ ቤትዎ።', grocery: 'ግሮሰሪ',
    groceryText: 'የዕለት ተዕለት እቃዎች በቀላሉ።', package: 'ጥቅሎች',
    packageText: 'በከተማ ውስጥ ጥቅል ይላኩ።', explore: 'ያስሱ',
    discoverEyebrow: 'ጥሩ ምግብ፣ ጥሩ ስሜት', discoverTitle: 'ቀጣዩን ተወዳጅዎን ያግኙ።',
    discoverText: 'ለቀጣይ ትዕዛዝዎ ትንሽ ሀሳብ።', viewAll: 'ምድቦችን ያስሱ',
    sampleNotice: 'በቅርቡ የሚመጣው ቅምሻ። እነዚህ ምሳሌዎች ብቻ ናቸው፤ ለትዕዛዝ ገና አልተዘጋጁም።',
    all: 'ሁሉም', foodTag: 'ምግብ', groceryTag: 'ግሮሰሪ', packageTag: 'ጥቅሎች',
    card1: 'የቤት ጣዕም', card1Text: 'የአገር ውስጥ ጣዕሞች በፍቅር',
    card2: 'ትኩስ የገበያ ምርቶች', card2Text: 'ለማዕድ ቤትዎ የሚሆኑ ምርጥ እቃዎች',
    card3: 'ቡና እና ትንሽ ጣፋጭ', card3Text: 'የሚጠባበቁት የእረፍት ጊዜ',
    card4: 'የከተማ ውስጥ መላኪያ', card4Text: 'መድረስ ለሚፈልጉ እቃዎች',
    stepsEyebrow: 'እንደዚሁ ቀላል ነው', stepsTitle: 'ለሕይወት ብዙ ጊዜ፣ ለሩጫ ትንሽ።',
    stepsText: 'የሚወዱትን እቃዎች ወዳሉበት የሚያደርስ ቀላል መንገድ እየገነባን ነው።',
    step1: 'ያሉበትን ይንገሩን', step1Text: 'እርስዎን ለማግኘት አካባቢዎን እና የሚታወቅ ምልክት ያክሉ።',
    step2: 'የሚወዱትን ያግኙ', step2Text: 'በአካባቢዎ ያሉ ምግቦችን፣ ግሮሰሪዎችን እና ሌሎችንም ያስሱ።',
    step3: 'እኛ እናደርስልዎታለን', step3Text: 'ዘና ይበሉ፤ ጉዞውን ለእኛ ይተዉት።',
    partnerEyebrow: 'አብረን እንደግ', partnerTitle: 'በማዕዳችን ለሁሉም ቦታ አለ።',
    partnerText: 'ጣፋጭ ምግብ ያዘጋጃሉ፣ ሱቅ ያስተዳድራሉ ወይም ከተማውን በደንብ ያውቃሉ? ኢትዮጵያን አብረን እናንቀሳቅስ።',
    merchant: 'ነጋዴ አጋር ይሁኑ', driver: 'ከእኛ ጋር ያድርሱ', partnerSoon: 'የአጋር ምዝገባ በቅርቡ ይጀምራል።',
    footerText: 'የሚወዱት ነገር በጥንቃቄ ይድረስ።',
    footerExplore: 'ያስሱ', footerConnect: 'ይቀላቀሉን', footerAbout: 'ስለ ይድረስ',
    footerAboutText: 'ለኢትዮጵያ በፍቅር የተዘጋጀ።', footerRights: 'መብቱ የተጠበቀ ነው።',
    footerAdmin: 'አስተዳደር', footerPayments: 'ቴሌብር፣ ቻፓ እና በደረሰ ጊዜ ጥሬ ገንዘብ ክፍያ ታቅደዋል',
    menu: 'ምናሌ ክፈት', close: 'ምናሌ ዝጋ', language: 'ቋንቋ ቀይር',
    skip: 'ወደ ዋናው ይሂዱ',
  },
}

const categories: { id: Category; icon: typeof UtensilsCrossed; art: string; className: string }[] = [
  { id: 'food', icon: UtensilsCrossed, art: '🍛', className: 'food' },
  { id: 'grocery', icon: ShoppingBasket, art: '🥑', className: 'grocery' },
  { id: 'package', icon: Package, art: '📦', className: 'package' },
]

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [address, setAddress] = useState('')
  const [submittedAddress, setSubmittedAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[language]
  const cards = [
    { category: 'food', art: '🍲', name: t.card1, description: t.card1Text, style: 'dish' },
    { category: 'grocery', art: '🥬', name: t.card2, description: t.card2Text, style: 'market' },
    { category: 'food', art: '☕', name: t.card3, description: t.card3Text, style: 'coffee' },
    { category: 'package', art: '📦', name: t.card4, description: t.card4Text, style: 'parcel' },
  ] as const

  function selectCategory(next: Category) {
    setCategory(next)
    document.getElementById('discover')?.scrollIntoView()
  }

  return (
    <div className="site" lang={language}>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="YIDRES home">
            <span className="brand-mark"><span>y</span><i /></span>
            <span className="brand-name">yidres<span>ይድረስ</span></span>
          </a>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={() => setMenuOpen(false)}>{t.navExplore}</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t.navHow}</a>
            <a href="#partners" onClick={() => setMenuOpen(false)}>{t.navPartner}</a>
          </nav>
          <div className="header-actions">
            <button className="language" type="button" aria-label={t.language} onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}>
              <Globe2 size={17} /> {language === 'en' ? 'EN' : 'አማ'} <ChevronDown size={14} />
            </button>
            <button className="sign-in" disabled title={t.comingSoon}>{t.signIn} <ArrowUpRight size={15} /></button>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</span>
              <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
              <p className="hero-description">{t.heroText}</p>
              <form className="address-form" onSubmit={(event) => {
                event.preventDefault()
                const value = address.trim()
                setAddressError(!value)
                setSubmittedAddress(value)
              }}>
                <label htmlFor="address">{t.addressLabel}</label>
                <div className="address-input">
                  <MapPin size={20} aria-hidden="true" />
                  <input id="address" value={address} onChange={(event) => { setAddress(event.target.value); setAddressError(false); setSubmittedAddress('') }} placeholder={t.addressPlaceholder} maxLength={160} />
                  <button type="submit">{t.find} <ArrowRight size={18} /></button>
                </div>
                <p className="address-hint" aria-live="polite">{addressError ? t.addressError : submittedAddress ? `${t.addressNotice} ${submittedAddress}.` : t.addressHint}</p>
              </form>
              <div className="hero-bottom"><span className="avatar-stack"><b>🧡</b><b>☕</b><b>🌿</b></span><span>{t.heroSmall}<br /><strong>{t.heroDelivery} <Heart size={13} fill="currentColor" /></strong></span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-sun"><span className="sun-line line-one" /><span className="sun-line line-two" /></div>
              <div className="art-dots">✳</div>
              <div className="art-caption">{t.heroTag}<br /><strong>{t.heroTagBold}</strong></div>
              <div className="food-plate"><div className="plate-inner"><span>🍛</span></div></div>
              <div className="art-bag"><div className="bag-handle" /><span>y.</span></div>
              <div className="art-badge"><span>✳</span>{t.heroBadge}</div>
              <div className="art-sticker"><Bike size={27} /><span>YIDRES<br />DELIVERY</span></div>
            </div>
          </div>
          <div className="hero-scroll"><ArrowDown size={15} /></div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">{t.servicesEyebrow}</span>
              <h2>{t.servicesTitle}</h2><p>{t.servicesText}</p>
            </div>
            <div className="service-grid">
              {categories.map(({ id, icon: Icon, art, className }) => (
                <button className={`service-card ${className}`} key={id} onClick={() => selectCategory(id)}>
                  <span className="service-icon"><Icon size={20} /></span>
                  <span className="service-art" aria-hidden="true">{art}</span>
                  <span className="service-name">{t[id]}</span>
                  <span className="service-description">{t[`${id}Text`]}</span>
                  <span className="service-link">{t.explore} <ArrowRight size={16} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section discover-section" id="discover">
          <div className="container">
            <div className="section-heading heading-row">
              <div><span className="section-kicker">{t.discoverEyebrow}</span><h2>{t.discoverTitle}</h2><p>{t.discoverText}</p></div>
              <a className="text-link" href="#services">{t.viewAll} <ArrowUpRight size={17} /></a>
            </div>
            <p className="sample-notice">{t.sampleNotice}</p>
            <div className="filters" aria-label={t.viewAll}>
              {(['all', 'food', 'grocery', 'package'] as const).map((item) => (
                <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{t[item]}</button>
              ))}
            </div>
            <div className="discovery-grid">
              {cards.filter((card) => category === 'all' || card.category === category).map((card) => (
                <article className="discovery-card" key={card.style}>
                  <div className={`discovery-art ${card.style}`}><span aria-hidden="true">{card.art}</span><span className="art-sparkle">✳</span></div>
                  <div className="card-content"><span className="card-category">{t[`${card.category}Tag`]}</span><h3>{card.name}</h3><p>{card.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section how-section" id="how-it-works">
          <div className="container how-grid">
            <div className="how-intro"><span className="section-kicker">{t.stepsEyebrow}</span><h2>{t.stepsTitle}</h2><p>{t.stepsText}</p><div className="how-doodle" aria-hidden="true"><span>✳</span><Bike size={84} strokeWidth={1.3} /></div></div>
            <div className="steps">
              {[{ icon: MapPin, title: t.step1, text: t.step1Text }, { icon: Search, title: t.step2, text: t.step2Text }, { icon: Bike, title: t.step3, text: t.step3Text }].map(({ icon: Icon, title, text }, index) => (
                <div className="step" key={title}><span className="step-number">0{index + 1}</span><div className="step-icon"><Icon size={22} /></div><div><h3>{title}</h3><p>{text}</p></div><Check className="step-check" size={18} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section" id="partners">
          <div className="container partner-inner">
            <div className="partner-copy"><span className="partner-kicker"><Sparkles size={15} /> {t.partnerEyebrow}</span><h2>{t.partnerTitle}</h2><p>{t.partnerText}</p>
              <div className="partner-actions"><button disabled title={t.comingSoon}><Store size={17} />{t.merchant}<ArrowUpRight size={16} /></button><button disabled title={t.comingSoon}><Bike size={18} />{t.driver}<ArrowUpRight size={16} /></button></div><p className="partner-note"><Clock3 size={14} /> {t.partnerSoon}</p>
            </div>
            <div className="partner-art" aria-hidden="true"><span className="partner-orbit">✳</span><div className="partner-circle"><span>🛵</span></div><div className="partner-card"><span>y.</span><strong>Better<br />together.</strong><Heart size={18} fill="currentColor" /></div></div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid"><div><a className="brand footer-brand" href="#"><span className="brand-mark"><span>y</span><i /></span><span className="brand-name">yidres<span>ይድረስ</span></span></a><p>{t.footerText}</p><strong className="footer-slogan">You order. We deliver.</strong></div>
            <div><h3>{t.footerExplore}</h3><a href="#services">{t.navExplore}</a><a href="#how-it-works">{t.navHow}</a></div>
            <div><h3>{t.footerConnect}</h3><a href="#partners">{t.navPartner}</a><span>{t.footerAdmin} · {t.comingSoon}</span></div>
            <div><h3>{t.footerAbout}</h3><p>{t.footerAboutText}</p><p>{t.footerPayments}</p></div>
          </div>
          <div className="footer-bottom"><span>© {currentYear} YIDRES. {t.footerRights}</span><span>Made for Ethiopia <span className="ethiopia-dots">● ● ●</span></span></div>
        </div>
      </footer>
    </div>
  )
}

export default App
