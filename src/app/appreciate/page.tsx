import Carousel from '@/components/Carousel';
import Link from 'next/link';
import CreatorDiscoveryChart from '@/components/CreatorDiscoveryChart';


export const metadata = {
  title: "Appreciate Case Study | Machinga",
  description: "How a fintech compounds interest. Content strategy and multi-format production for Appreciate.",
  alternates: { canonical: "https://studiomachinga.com/appreciate" }
};

export default function AppreciatePage() {
  return (
    <main className="cs-page">
      {/*  Hero Section  */}
      <section className="cs-fs-hero">
        <video 
          className="cs-fs-hero-bg" 
          src={`/assets/Appreciate.MP4`}
          autoPlay loop muted playsInline
        ></video>
        <div className="cs-fs-hero-content">
          <h1 className="cs-fs-hero-title">APPRECIATE</h1>
          <p className="cs-fs-hero-sub">How a fintech compounds interest</p>
          <p className="cs-fs-hero-text">0 &rarr; 124K followers in 18 months.</p>
          <div className="cs-fs-hero-tags-container">
            <div className="cs-fs-hero-tags-row-engagement">
              <span className="cs-fs-tag cs-fs-tag-white">Content Engine</span>
            </div>
            <div className="cs-fs-hero-tags-row-sub">
              <span className="cs-fs-tag">Content Strategy</span>
              <span className="cs-fs-tag">Engine Architecture</span>
              <span className="cs-fs-tag">Multi-format Production</span>
              <span className="cs-fs-tag">Creator Discovery</span>
              <span className="cs-fs-tag">Ongoing Optimisation</span>
            </div>
          </div>
        </div>

        <Link href="/?expanded=true" className="cs-fs-back-btn" style={{ textDecoration: 'none' }} aria-label="Back to Work">
          ←
        </Link>

        <div className="cs-fs-scroll-indicator">
          <a href="#challenge" className="cs-fs-scroll-btn" style={{ textDecoration: 'none' }}>
            <span>DETAIL</span>
            <div className="cs-cue-line"></div>
          </a>
        </div>
      </section>

      {/*  Editorial Header  */}
      <section className="cs-hero" id="challenge">
        <div className="cs-container">
            <h1 className="cs-title" style={{ display: 'block' }}>
                <span className="sweep-reveal-text">A Fintech With</span> <br />
                <span className="sweep-reveal-text green-text" style={{ transitionDelay: '0.8s' }}>Keeda.</span>
            </h1>

            <div className="cs-meta">
                <div className="meta-item">
                    <span className="meta-label">Brand</span>
                    <span className="meta-value">Appreciate</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Work</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Content Strategy</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Engine Build</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Ongoing Production</span>
                    </div>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Platform</span>
                    <span className="meta-value">Instagram-first, multi-platform</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">18 months+ Ongoing</span>
                </div>
            </div>

            <div className="cs-hero-image" style={{ marginBottom: "4rem" }}>
                <img src={`/assets/Appreciate case studies assets/Appreciate_hero.gif`}
                    alt="A Fintech With Knack Hero Image"
                    style={{width: "100%", borderRadius: "12px", maxWidth: "800px", display: "block", margin: "0 auto"}} />
            </div>
        </div>
      </section>

      {/*  Challenge Section  */}
      <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">01 — The Category Problem</span>
                <h2 className="cs-section-heading">Every fintech on Instagram looks like a fintech on Instagram.</h2>
                <p className="cs-section-text">Tip carousels. Market update graphics. Talking heads explaining compound interest with the energy of someone who just learned what compound interest is. It's not wrong. It's just invisible. When every brand in a category sounds identical, being educational isn't a differentiator. It's background noise. Appreciate came to us as a clean slate. A new investing app helping Indians access US markets. Good product. Real ambition. No following, no content, no established voice. The brief was to build all three from scratch. We could have made better finance content than everyone else. We didn't think that was the right bet.</p>
            </div>

            <div className="cs-image-center" style={{ display: "flex", justifyContent: "center", width: "100%", margin: "2rem 0" }}>
                <img src={`/assets/Appreciate case studies assets/instagram_image.jpg`} alt="App Mockup Challenge"
                    style={{maxWidth: "100%", width: "300px", height: "auto", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}} />
            </div>

            <div className="cs-content-narrow" style={{marginTop: "4rem"}}>
                <span className="cs-section-label">02 — The Strategic Bet</span>
                <h2 className="cs-section-heading">Entertainment that happens to be about finance.</h2>
                <p className="cs-section-text">The category was trying to educate people into caring about finance. We thought the sequence was wrong. You don't earn someone's attention by being useful first. You earn it by being interesting first, and then you get to be useful. If you entertain people consistently enough, they start associating financial literacy with enjoyment rather than obligation. That's not just a content strategy. Over time, it becomes a brand position that nobody else in the category has thought to occupy.</p>

                <div className="cs-quote" style={{fontSize: "clamp(1.8rem, 5vw, 36px)", fontWeight: "800", marginTop: "4rem", marginBottom: "4rem", lineHeight: "1.2"}}>
                    Build at the intersection of finance and entertainment, and drill deep.
                </div>

                <p className="cs-section-text">Not finance content that's also entertaining. Entertainment that happens to be about finance where the finance message is the twist, not the premise.</p>
                <p className="cs-section-text">The proof is in the comment sections. Routinely, across multiple formats, people would watch a reel all the way through and discover at the end that it was an ad for Appreciate. And their response wasn't irritation. It was delight. The ad reveal was the punchline, not the interruption.</p>
                <p className="cs-section-text">That bet required a client with the appetite for the unconventional. Appreciate had it. They challenged the work, asked harder questions, and said yes to things that looked strange on paper. A brief with that kind of energy behind it is rare. This engine is what it produces.</p>
            </div>

            <div className="cs-content-narrow" style={{marginTop: "6rem"}}>
                <span className="cs-section-label">03 — The Engine</span>
                <h2 className="cs-section-heading">A system, not a calendar.</h2>
                <p className="cs-section-text">Building at that intersection required three parallel workflows running simultaneously. Each operates on a different time horizon and serves a different function.</p>
            </div>

            <div className="cs-engine-grid" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginTop: "3rem"}}>
                <div className="cs-engine-card" style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "1rem"}}>Workflow 01</span>
                    <h3 style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.5rem"}}>The Newsroom</h3>
                    <div style={{fontFamily: "Helvetica, Arial, sans-serif", color: "#888", fontSize: "14px", marginBottom: "1.5rem"}}>4× per week &middot; Speed + Volume</div>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>Topical reels pegged to US market news. A stock moves, a company does something interesting. We turn it into a retention-edited explainer within hours.</p>
                </div>
                
                <div className="cs-engine-card" style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "1rem"}}>Workflow 02</span>
                    <h3 style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.5rem"}}>The Virality Lab</h3>
                    <div style={{fontFamily: "Helvetica, Arial, sans-serif", color: "#888", fontSize: "14px", marginBottom: "1.5rem"}}>Lower frequency &middot; High experimentation</div>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>Ideas designed specifically to travel. Low-cost production. Not because we're cheap, but because low cost means more shots on goal. More attempts means more format discovery.</p>
                </div>

                <div className="cs-engine-card" style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "1rem"}}>Workflow 03</span>
                    <h3 style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", marginBottom: "0.5rem"}}>High-Conviction Bets</h3>
                    <div style={{fontFamily: "Helvetica, Arial, sans-serif", color: "#888", fontSize: "14px", marginBottom: "1.5rem"}}>1–2× per cycle &middot; Bigger swings</div>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>The pieces where we spend more. On a creator. On production quality. On a longer format. Because we have high confidence in the idea. The ones that land, land disproportionately.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Dark Section  */}
    <section className="cs-dark-section">
        <div className="cs-container">
            <div className="cs-dark-grid">
                <div>
                    <video src={`/assets/Appreciate case studies assets/Sab_karte_hai_GlobalInvesting_AppreciateGlobal_Investing_Podcast_episode_3Disclaimer-_Inves.mp4`} autoPlay loop muted playsInline style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 20px 40px rgba(0,0,0,0.5)"}}></video>
                </div>
                <div>
                    <span className="cs-section-label" style={{color: "#888"}}>04 — The Virality Lab</span>
                    <h2 className="cs-section-heading">Format discovery is the whole point.</h2>
                    <p className="cs-section-text">The animated podcast format is the clearest example. A character called Avidit interviewing animated celebrity stand-ins on a fake podcast set. A format that could hook into any topical trigger. We built it, then waited for the right one.</p>
                    <p className="cs-section-text">The product message lands as a punchline. The audience has been entertained for 45 seconds. Then, in the last ten, they realise they've just watched an ad for Appreciate.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Four Screens  */}
    <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow" style={{textAlign: "center", marginBottom: "3rem"}}>
                <h2 className="cs-section-heading">Find a format. Don't move on. Double down.</h2>
                <p className="cs-section-text">The Shiba Inu playing Elon Musk, laughing the signature awkward laugh from Nikhil Kamath's podcast, applied to whatever US market news was breaking that week. Same format logic. Different trigger. That one went from one reel to eight. Then ten. Each iteration slightly sharper than the last.</p>
            </div>

            <div className="cs-four-screens">
                <video
                    src={`/assets/Appreciate case studies assets/Global_Investing_Podcast_-_Episode_2_What_is_फ़क_यू_Money_Artwork_by_aviditstudiosLike_-_Commen.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
                <video
                    src={`/assets/Appreciate case studies assets/Once_upon_a_time_there_was_a_kingfisher_bird...Welcome_to_Appreciate_Podcast_EP05Note-_All_char.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
                <video
                    src={`/assets/Appreciate case studies assets/Par_woh_Tusla_ka_market_shareWith_aviditstudiospodcasts_stockmarket_ev_uscompanies_usstock.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
                <video
                    src={`/assets/Appreciate case studies assets/What_is_F.I.R.E_Appreciate_Podcast_EP04_-_Deploying_Inherited_Capital_for_Global_Investing_ap.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
            </div>
        </div>
    </section>

    {/*  Split Section (Result)  */}
    <section className="cs-split-section" style={{backgroundColor: "#F5F5F7", paddingTop: "4rem", paddingBottom: "4rem"}}>
        <div className="cs-container">
            <div className="cs-split-grid reverse">
                <div className="cs-split-image">
                    <video src={`/assets/Appreciate case studies assets/Apun_hi_Shareholder._Apun_hi_Owner...Disclaimer-_Investments_in_securities_markets_are_subject_t.mp4`} autoPlay loop muted playsInline
                        style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", objectFit: "cover"}}></video>
                </div>
                <div style={{paddingRight: "3rem"}}>
                    <span className="cs-section-label">05 — High-Conviction</span>
                    <h2 className="cs-section-heading" style={{fontSize: "24px", fontWeight: "800", lineHeight: "1.3"}}>POV: You're a shareholder of US companies.</h2>
                    <p className="cs-section-text">A Bombay man walks around the city acting like he has ownership stakes in every US brand he encounters. McDonald's, Apple, Nike, Hermès, Starbucks, KFC. The joke is the gap between retail investor and the way he's throwing his weight around.</p>
                    <p className="cs-section-text">The reel plays out as pure entertainment. Appreciate appears once, right at the end. The value has already been given to the viewer before the brand even shows up.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Three Screens Section  */}
    <section className="cs-block-section" style={{paddingTop: "6rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow" style={{textAlign: "center", marginBottom: "3rem"}}>
                <h2 className="cs-section-heading" style={{fontSize: "2rem"}}>When something hits at that scale, the only correct response is to make it a series.</h2>
                <p className="cs-section-text">The Vir Saini collaboration, the 'American Keeda' series, is the clearest example of a high-conviction bet becoming a content franchise. The first reel crossed 6 million views. Certain pieces that followed crossed 10 million.</p>
            </div>

            <div className="cs-three-screens">
                <video
                    src={`/assets/Appreciate case studies assets/American_Keeda_hai_toh_hai_Appreciate_investing_stocks_stockmarket.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
                <video
                    src={`/assets/Appreciate case studies assets/American_Keeda_ka_kuch_nahi_ho_sakta_Appreciate_americankeeda_USStocks_GlobalInvesting_.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
                <video
                    src={`/assets/Appreciate case studies assets/American_Keeda_3_Appreciate.mp4`}
                    autoPlay loop muted playsInline
                    style={{width: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></video>
            </div>
        </div>
    </section>

    {/*  Creator Discovery Custom Chart Section  */}
    <CreatorDiscoveryChart />

    {/*  Split Section (05 - The AI Frontier)  */}
    <section className="cs-split-section" style={{backgroundColor: "#F5F5F7", paddingTop: "4rem", paddingBottom: "4rem"}}>
        <div className="cs-container">
            <div className="cs-split-grid">
                <div className="cs-split-image">
                    <video src={`/assets/Appreciate case studies assets/export_22.mp4`} autoPlay loop muted playsInline
                        style={{width: "100%", borderRadius: "16px", objectFit: "cover"}}></video>
                </div>
                <div style={{paddingLeft: "3rem"}}>
                    <span className="cs-section-label">05 — The AI Frontier</span>
                    <h2 className="cs-section-heading">The engine absorbs new<br />tools without losing its<br />identity.</h2>
                    <p className="cs-section-text">The Wall Street Express: a 50-second AI-generated piece following a stock market bull through Mumbai's local train system, all the way to Manhattan. A bull in a commuter train, glasses on, reading the paper, stepping off at Wall Street. Pixar-level characterisation, fintech substance, built entirely with GenAI tools.</p>
                    <p className="cs-section-text">It earned Appreciate a feature in a leading advertising industry publication. More importantly, it demonstrated that the engine can absorb new tools and new formats without losing its identity. Because the identity was never about a specific format.</p>
                    <p className="cs-section-text" style={{fontWeight: "800"}}>It was always about the bet</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Stats Section  */}
    <section className="cs-stats-section">
        <div className="cs-container">
            <div className="cs-content-narrow" style={{marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem"}}>
                <span className="cs-section-label" style={{marginBottom: "0", whiteSpace: "nowrap"}}>06 — The Numbers</span>
                <div style={{flexGrow: "1", height: "1px", backgroundColor: "#e0e0e0"}}></div>
            </div>
            <div className="cs-stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div className="cs-stat-item">
                    <h4>124<span style={{fontSize: "inherit", color: "var(--green)"}}>k+</span></h4>
                    <span>Instagram followers from 0</span>
                </div>
                <div className="cs-stat-item">
                    <h4>400<span style={{fontSize: "inherit", color: "var(--green)"}}>k+</span></h4>
                    <span>Total audience across platforms</span>
                </div>
                <div className="cs-stat-item">
                    <h4>1<span style={{fontSize: "inherit", color: "var(--green)"}}>M+</span></h4>
                    <span>Views consistently on viral bets</span>
                </div>
                <div className="cs-stat-item">
                    <h4>100<span style={{fontSize: "inherit", color: "var(--green)"}}>M+</span></h4>
                    <span>Total views over 18 months</span>
                </div>
            </div>
            <p className="cs-stats-text" style={{maxWidth: "800px", margin: "3rem auto 0", fontSize: "1.2rem", lineHeight: "1.6", textAlign: "center"}}>That's what 18 months of content-first brand building actually produces. Not just an audience, but a warmer market for every paid rupee that follows.</p>
        </div>
    </section>

    {/*  07 What 18 Months Actually Is  */}
    <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">07 — What 18 Months Actually Is</span>
                <h2 className="cs-section-heading">This isn't a campaign. It's the founding story of a brand's voice.</h2>
                <p className="cs-section-text">A campaign has a budget, a start date, and an end date. It lives on a media plan. It represents a single, focused push to drive a number. When the plan runs out, the push stops. If you want to push again, you need a new campaign.</p>
                <p className="cs-section-text">A content engine represents a different philosophy. It is a long-term capital investment. You are building an infrastructure. In the early months, the cost of production is high relative to the audience you reach. But as the engine runs, the audience grows, the library of content compounds, and the cost per organic view falls. Over 18 months, the client spent less on media than they would have on a single traditional TV campaign. But they built an asset that they own, that produces views every day, and that continues to recruit users without a media budget.</p>
                
                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "2rem", marginTop: "4rem", marginBottom: "2rem"}}>
                    <p style={{fontSize: "clamp(1.8rem, 5vw, 36px)", fontWeight: "800", lineHeight: "1.2", margin: "0", color: "#1a1a1a"}}>That's the engagement model. Not a project with a start and end date, but a compounding asset that appreciates over time.</p>
                </div>
                <p style={{color: "var(--green)", fontSize: "1rem", fontWeight: "600", marginTop: "1rem"}}>(Yes, we intended that.)</p>
            </div>
        </div>
    </section>

    {/*  Tags Section  */}
    <section style={{backgroundColor: "#1D1D1F", padding: "4rem 0"}}>
        <div className="cs-container" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem"}}>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem"}}>
                <span style={{backgroundColor: "#ffffff", color: "#000000", border: "1px solid #ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", fontWeight: "700", whiteSpace: "nowrap"}}>Content Engine</span>
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem"}}>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Content Strategy</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Engine Architecture</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Multi-format Production</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Creator Discovery</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Ongoing Optimisation</span>
            </div>
        </div>
    </section>

    {/*  Ready to build yours  */}
    <section className="cs-next-project" style={{background: "#ffffff", padding: "8rem 0", textAlign: "center", position: "relative", zIndex: "10"}}>
        <div className="cs-next-content" style={{color: "#1a1a1a", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: "2"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem"}}>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
                <span style={{color: "#888", margin: "0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700"}}>READY TO BUILD YOUR ENGINE</span>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
            </div>
            <h2 className="cs-next-title" style={{color: "#1a1a1a", marginBottom: "3rem"}}>Earn your audience,<br />and <span style={{color: "var(--green)"}}>tune in.</span></h2>
            <Link href="/#contact" className="btn-gradient" style={{display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "600"}}>
                Start the conversation
            </Link>
        </div>
    </section>
      <Carousel currentProject="appreciate" />
    </main>
  );
}
