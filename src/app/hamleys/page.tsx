import Carousel from '@/components/Carousel';
import Link from 'next/link';


export const metadata = {
  title: "Hamleys Case Study | Machinga",
  description: "How a 250-year-old toy store helped Gen Z defuse a time bomb on Valentine's Day. Machinga's campaign strategy for Hamleys India.",
  alternates: { canonical: "https://studiomachinga.com/hamleys" }
};

export default function HamleysPage() {
  return (
    <main className="cs-page">
      {/*  Hero Section  */}
      <section className="cs-fs-hero">
        <video 
          className="cs-fs-hero-bg" 
          src={`/assets/hamleys.mp4`}
          autoPlay loop muted playsInline preload="metadata"></video>
        <div className="cs-fs-hero-content">
          <h1 className="cs-fs-hero-title">HAMLEYS</h1>
          <p className="cs-fs-hero-sub">How a 265-year-old toy store solved Valentine’s for Gen Z.</p>
          <p className="cs-fs-hero-text">5M+ organic views in one week. Recommissioned year two.</p>
          <div className="cs-fs-hero-tags-container">
            <div className="cs-fs-hero-tags-row-engagement">
              <span className="cs-fs-tag cs-fs-tag-white">Creative Strategy</span>
              <span className="cs-fs-tag cs-fs-tag-white">Campaign/Project</span>
            </div>
            <div className="cs-fs-hero-tags-row-sub">
              <span className="cs-fs-tag">Campaign Strategy</span>
              <span className="cs-fs-tag">On-ground Activation</span>
              <span className="cs-fs-tag">Video Production</span>
              <span className="cs-fs-tag">Social Media Content</span>
            </div>
          </div>
        </div>

        <Link href="/?expanded=true" className="cs-fs-back-btn" style={{ textDecoration: 'none' }} aria-label="Back to Work">
          ←
        </Link>

        <div className="cs-fs-scroll-indicator">
          <a href="#challenge" className="cs-fs-scroll-btn" style={{ textDecoration: 'none' }}>
            <span>CASE STUDY</span>
            <div className="cs-cue-line"></div>
          </a>
        </div>
      </section>

      {/*  Editorial Header  */}
      <section className="cs-hero" id="challenge">
        <div className="cs-container">
            <h1 className="cs-title" style={{ display: 'block' }}>
                <span className="sweep-reveal-text">No Awkwardness</span> <br />
                <span className="sweep-reveal-text green-text" style={{ transitionDelay: '0.8s' }}>Here.</span>
            </h1>

            <div className="cs-meta">
                <div className="meta-item">
                    <span className="meta-label">Brand</span>
                    <span className="meta-value" style={{fontWeight: "800", fontSize: "18px"}}>Hamleys India</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Campaign</span>
                    <span className="meta-value" style={{fontWeight: "800", fontSize: "18px"}}>#SkipTheAwkward</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Work</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Campaign Strategy</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Creative</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>On-Ground Activation</span>
                    </div>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Result</span>
                    <span className="meta-value" style={{fontWeight: "800", fontSize: "18px"}}>5M+ organic views.<br />In one week.<br />Before Valentine's Day.</span>
                </div>
            </div>

            <div className="cs-hero-image" style={{marginTop: "4rem", display: "flex", justifyContent: "center"}}>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/hamelys videos/Hamleys Vday Video 25  (1).mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}} preload="metadata"></video>
                </div>
            </div>
        </div>
      </section>

      {/*  01 The Signal  */}
      <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">01 — The Signal</span>
                <p className="cs-section-text">Hamleys didn't come to us with a brief. They came with data. Footfall numbers showing a consistent spike every Valentine's week, from people who weren't parents, weren't children, and weren't Hamleys' traditional audience at all. They were couples. Gen Z couples. Walking into a 265year-old toy store in February, buying things, and walking out. The brand had never spoken to them. Never made anything for them. Never even acknowledged they existed. And yet, there they were. The data deserved a closer read than a gifting brief usually gets.</p>

                <div className="cs-quote" style={{fontSize: "24px", fontWeight: "800", borderLeft: "4px solid var(--green)", paddingLeft: "20px", marginTop: "4rem", marginBottom: "4rem", lineHeight: "1.3"}}>
                    Most agencies would have called this a "gifting opportunity" and started designing hearts. We called it a signal worth reading properly.
                </div>
            </div>

            <div className="cs-image-center" style={{marginTop: "4rem", display: "flex", justifyContent: "center"}}>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/hamelys videos/Hamleys_meme_revised_cut.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}} preload="metadata"></video>
                </div>
            </div>

            {/*  02 The Diagnosis  */}
            <div className="cs-content-narrow" style={{marginTop: "6rem"}}>
                <span className="cs-section-label">02 — The Diagnosis</span>
                <p className="cs-section-text">So we read it. We started where culture always leaves its fingerprints: language. Specifically, the new vocabulary that Gen Z had quietly assembled to describe their relationships. Not borrowed from older generations, but coined fresh, because existing words weren't accurate enough.</p>
                
                <p className="cs-section-text" style={{textTransform: "uppercase", fontWeight: "800", fontSize: "1.1rem", lineHeight: "1.8", margin: "3rem 0", letterSpacing: "1px"}}>
                    MICROMANCE / SITUATIONSHIP / BREAD-CRUMBING / BENCHING FLASH CONNECTIONS / AUTHENTICITY / FISCAL ATTRACTION LOUD LOOKING / YAP-TRAPPING / GHOSTING
                </p>

                <p className="cs-section-text">Twenty-odd words. Each one describing some shade of connection that doesn't fit into "are we dating or not." Language follows culture. These words don't exist because someone invented them in a vacuum. They exist because there's a lived reality they're trying to name. And that reality is this: for a generation that values authenticity over intensity and genuine moments over orchestrated displays, putting a label on a relationship too early isn't romantic. It's anxiety-inducing.</p>
                <p className="cs-section-text">"Gen Z isn't commitment-phobic. They're precision-phobic. The relationship exists. The feeling exists. What they resist is being forced to file it under a category before it's ready."</p>
                <p className="cs-section-text">Which brings us to Valentine's Day.</p>
            </div>

            <div className="cs-image-center" style={{marginTop: "4rem", display: "flex", justifyContent: "center"}}>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/hamelys videos/30 seconder_first_cut.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}} preload="metadata"></video>
                </div>
            </div>

            <div className="cs-content-narrow" style={{marginTop: "4rem"}}>
                <p className="cs-section-text">If relationships are already living in this deliberately ambiguous space, then Valentine's Day, which by cultural design forces a declarative statement through whatever you do or don't do, becomes something else entirely. It becomes a high-stakes event. Everything gets amplified. A text becomes a thesis statement. Silence becomes a verdict. And a gift? A gift on Valentine's Day isn't a gift. It's a position paper. Too expensive: you're coming on too strong. Too casual: you don't care enough. Too romantic: you're rushing things. Too impersonal: you never really got them at all. It's exhausting. Seventy percent of Gen Z says they don't feel connected to Valentine's Day. That's not indifference. That's a generation that wants genuine connection and finds the performance of it suffocating.</p>

                <div className="cs-quote" style={{fontSize: "24px", fontWeight: "800", borderLeft: "4px solid var(--green)", paddingLeft: "20px", marginTop: "4rem", marginBottom: "4rem", lineHeight: "1.3"}}>
                    Valentine's Day, for Gen Z, is primarily an anxiety event.
                </div>
            </div>

            {/*  03 The Product Insight  */}
            <div className="cs-content-narrow" style={{marginTop: "6rem"}}>
                <span className="cs-section-label">03 — The Product Insight</span>
                <p className="cs-section-text">Now here's where it gets interesting. In a category full of gifts that carry unintended signals, where every choice makes a statement you may not want to make, there is one product that has quietly possessed a superpower this entire time.</p>

                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", margin: "3rem 0"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>The Hamleys Plush Bear</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>"Think about what makes it genuinely unusual as a gift object. It's romantic enough to be sweet, casual enough to be safe. It works for someone you're deeply in love with. It works for someone you've been on three dates with and aren't sure about yet. It works for your best friend. It works for your maybe-something."</p>
                </div>

                <p className="cs-section-text">Here's the mechanism: the receiver supplies the meaning. You hand it over, and they decide what it says. That's not a weakness of the product. It's the whole point. The Teddy Bear is the only gift that gets more versatile by being vague. It lets you say everything and nothing at the same time.</p>
                <p className="cs-section-text">Which means: in a holiday built entirely on the terror of saying the wrong thing, the Plush Bear is the one thing you can give without accidentally filing your relationship under the wrong category.</p>

                <div className="cs-quote" style={{fontSize: "24px", fontWeight: "800", borderLeft: "4px solid var(--green)", paddingLeft: "20px", marginTop: "4rem", marginBottom: "4rem", lineHeight: "1.3"}}>
                    It lets you skip the awkward. That's the line. And it wrote itself.
                </div>
            </div>

            {/*  04 The Campaign  */}
            <div className="cs-content-narrow" style={{marginTop: "6rem"}}>
                <span className="cs-section-label">04 — The Campaign</span>
                <h2 className="cs-section-heading">SKIP THE AWKWARD</h2>
                <p className="cs-section-text">We didn't try to out-romance the jewellers and the florists. We sold something no one else was selling: relief. First, we needed to name the anxiety. So the social content did exactly that each piece of creative was a different symptom of the same Valentine's paralysis. Not interpreted, not explained. Just accurately described, with the deadpan delivery of someone who has been there.</p>

                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", margin: "3rem 0"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>Visual Strategy</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>The visual strategy was an extension of the insight. While every brand was screaming in pink and saccharine red, we went white, black, and red highlights. Clean. Minimal. A deliberate exhale in the middle of an anxiety-inducing creative landscape. The design isn't just aesthetic. It mirrors the proposition. Skip the clutter. Skip the pressure. Skip the awkward.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  05 The Activation  */}
    <section className="cs-split-section" style={{backgroundColor: "#F5F5F7", paddingTop: "4rem", paddingBottom: "4rem"}}>
        <div className="cs-container">
            <div className="cs-split-grid reverse">
                <div className="cs-split-image" style={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                        <video src={`/assets/hamelys videos/Hamleys_1min_first_cut.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}} preload="metadata"></video>
                    </div>
                </div>
                <div style={{paddingRight: "3rem"}}>
                    <span className="cs-section-label">05 — The Activation</span>
                    <p className="cs-section-text">The digital loop needed a physical body. So we put a life-sized bear in high-footfall mall atriums across the Valentine's week window, February 12 to 14, and gave it one very simple offer.</p>
                    
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem"}}>
                        <div style={{background: "#ffffff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "1.5rem"}}>
                            <p style={{margin: "0", fontWeight: "600", fontSize: "14px"}}>Cupid sent me to cure stupid.<br />Hug me for a Valentine's surprise.</p>
                        </div>
                        <div style={{background: "#ffffff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "1.5rem"}}>
                            <p style={{margin: "0", fontWeight: "600", fontSize: "14px"}}>Feelings: Messy ✗<br />Hugs: Simple & Free ✓</p>
                        </div>
                        <div style={{background: "#ffffff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "1.5rem"}}>
                            <p style={{margin: "0", fontWeight: "600", fontSize: "14px"}}>Bear hugs loading...<br />Buffering a Valentine's surprise for you.</p>
                        </div>
                        <div style={{background: "#ffffff", border: "1px solid #eaeaea", borderRadius: "12px", padding: "1.5rem"}}>
                            <p style={{margin: "0", fontWeight: "600", fontSize: "14px"}}>No labels required. No declarations needed. Just show up.</p>
                        </div>
                    </div>

                    <p className="cs-section-text" style={{marginTop: "2rem"}}>The bear didn't ask anything of you. It didn't require you to define the relationship, make a declaration, or buy something. It just stood there, absurd in the best possible way, offering the one thing Gen Z actually wanted on Valentine's Day. A way out of the performance. People stopped. People took photos. People tagged their situationship partners with plausible deniability. The bear turned the store into content people wanted to share, because it was already doing the thing the campaign was saying. It was the proposition, in person, in the mall.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  06 The Numbers  */}
    <section className="cs-stats-section">
        <div className="cs-container">
            <div className="cs-content-narrow" style={{marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem"}}>
                <span className="cs-section-label" style={{marginBottom: "0", whiteSpace: "nowrap"}}>06 — The Numbers</span>
                <div style={{flexGrow: "1", height: "1px", backgroundColor: "#e0e0e0"}}></div>
            </div>
            <div className="cs-stats-grid">
                <div className="cs-stat-item">
                    <h4>5<span style={{fontSize: "inherit", color: "var(--green)"}}>M+</span></h4>
                    <span>Organic views</span>
                </div>
                <div className="cs-stat-item">
                    <h4>1<span style={{fontSize: "inherit", color: "var(--green)"}}> Week</span></h4>
                    <span>Before Valentine's Day</span>
                </div>
                <div className="cs-stat-item">
                    <h4>Year <span style={{fontSize: "inherit", color: "var(--green)"}}>2</span></h4>
                    <span>Recommissioned</span>
                </div>
            </div>

            <div className="cs-content-narrow" style={{marginTop: "4rem"}}>
                <p className="cs-section-text" style={{textAlign: "center"}}>A brand that had never spoken to Gen Z was suddenly being shared by them, tagged by them, argued about by them in comment sections. The bear activation drove foot traffic into stores. Passive footfall converted to active purchasers because we'd given them a narrative that fit their relationship status, whatever that was.</p>
                
                <p className="cs-section-text" style={{textAlign: "center", fontWeight: "800", fontSize: "1.2rem", marginTop: "2rem"}}>More importantly, Hamleys went from being a toy store for kids to being a gifting destination for anyone who has ever stared at a chat window for 47 minutes and closed it without sending anything.</p>
            </div>
        </div>
    </section>

    {/*  07 The Sequel  */}
    <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">07 — The Sequel</span>
                <p className="cs-section-text">Hamleys came back the following Valentine's Day to do it again.</p>

                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", margin: "3rem 0"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>What recommission means</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>That's the real result. Recommission means the campaign earned the brand something durable: a new audience, a new relevance, and a creative platform that had legs. The highest compliment a campaign gets is being treated like an asset rather than an expense.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Tags Section  */}
    <section style={{backgroundColor: "#1D1D1F", padding: "4rem 0"}}>
        <div className="cs-container" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem"}}>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem"}}>
                <span style={{backgroundColor: "#ffffff", color: "#000000", border: "1px solid #ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", fontWeight: "700", whiteSpace: "nowrap"}}>Creative Strategy</span>
                <span style={{backgroundColor: "#ffffff", color: "#000000", border: "1px solid #ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", fontWeight: "700", whiteSpace: "nowrap"}}>Campaign/Project</span>
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem"}}>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Campaign Strategy</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>On-ground Activation</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Video Production</span>
                <span style={{border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap"}}>Social Media Content</span>
            </div>
        </div>
    </section>

    {/*  Ready to build yours  */}
    <section className="cs-next-project" style={{background: "#ffffff", padding: "8rem 0", textAlign: "center", position: "relative", zIndex: "10"}}>
        <div className="cs-next-content" style={{color: "#1a1a1a", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: "2"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem"}}>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
                <span style={{color: "#888", margin: "0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700"}}>READY FOR YOUR SIGNAL</span>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
            </div>
            <h2 className="cs-next-title" style={{color: "#1a1a1a", marginBottom: "3rem"}}>Decode culture,<br />and <span style={{color: "var(--green)"}}>pull the trigger.</span></h2>
            <Link href="/#contact" className="btn-gradient" style={{display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "600"}}>
                Start the conversation
            </Link>
        </div>
    </section>
      <Carousel currentProject="hamleys" />
    </main>
  );
}
