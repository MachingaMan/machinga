import Carousel from '@/components/Carousel';
import Link from 'next/link';


export const metadata = {
  title: "Aava Case Study | Machinga",
  description: "How two words made a 20-year-old water brand uncopyable. Brand positioning and campaign strategy for Aava.",
  alternates: { canonical: "https://studiomachinga.com/aava" }
};

export default function AavaPage() {
  return (
    <main className="cs-page">
      {/*  Hero Section  */}
    <section className="cs-hero">
        <div className="cs-container">
            <h1 className="cs-title" style={{ lineHeight: "1.1", marginBottom: "4rem", display: 'block' }}>
                <span className="sweep-reveal-text">Alkaline,</span> <br />
                <span className="sweep-reveal-text">But</span> <span className="sweep-reveal-text sweep-green">True.</span>
            </h1>

            <div className="cs-meta" style={{marginBottom: "4rem"}}>
                <div className="meta-item">
                    <span className="meta-label">Brand</span>
                    <span className="meta-value" style={{fontWeight: "600"}}>Aava</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Work</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Brand Positioning</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Campaign Strategy</span>
                        <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Film Production</span>
                    </div>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Platform</span>
                    <span className="meta-value" style={{fontWeight: "600"}}>Instagram + Digital</span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Result</span>
                    <span className="meta-value" style={{fontWeight: "600"}}>A two-word line that competitors have not copied.<br />Because they can't.</span>
                </div>
            </div>

            <div className="cs-hero-image" style={{marginBottom: "6rem"}}>
                <img src={`/assets/AAva videos/hero section.png`} alt="Aava Hero Image"
                    style={{width: "100%", borderRadius: "20px", display: "block", margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}} />
            </div>
        </div>
    </section>

    {/*  01 The Trap  */}
    <section className="cs-block-section">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">01 — The Trap</span>
                <p className="cs-section-text">In 2024, alkaline water was everywhere. Health communities had been talking about the benefits of high-pH water for years: immunity, antioxidants, reduced inflammation. The market had responded with enthusiasm. Dozens of new DTC brands launched claiming alkalinity. The shelves filled up. So did Instagram.</p>
                <p className="cs-section-text">For Aava, a 20-year-old natural mineral water brand from the Aravalli Hills, this should have been the moment. Their water has always been naturally alkaline, pH 7.8–8.5, rich in bicarbonates, silica, magnesium, calcium. Not because of what Aava does to it, but because of where it comes from. And because Aava protects it. The Aravallis are among the oldest mountain ranges on earth. Twenty years of trickling through layers of alluvium and clay. The minerals aren't added. They're there. The alkalinity isn't engineered. It's geological.</p>
                <p className="cs-section-text">The trend arrived. And instead of rewarding Aava, it handed the category's language to anyone willing to claim it. Because the brands crowding into the alkaline water space were doing something quite different. Take regular water. Strip it with RO purification. Remove everything in it, including the minerals. Then ionise it temporarily to push the pH above 7. Now you can call it alkaline. The alkalinity will hold long enough to pass a test and label the bottle. One brand added minerals back to their RO water to make the claim. Another launched water that was black. Their reasoning: it's alkaline because it's black. We're not making that up.</p>
                <p className="cs-section-text">The category that should have given Aava a platform gave the platform to everyone. The genuine article was indistinguishable from the imitations — not because the products were similar, but because the language available to describe them was the same.</p>

                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3"}}>
                    The genuine article was indistinguishable from the imitations not because the products were similar, but because the language available to describe them was the same. Every brand said "alkaline." The word had been diluted into meaninglessness.
                </div>
            </div>
        </div>
    </section>

    {/*  02 The Diagnosis  */}
    <section className="cs-block-section" style={{paddingTop: "2rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">02 — The Diagnosis</span>
                <p className="cs-section-text">The brief, as Aava framed it, was a communication problem. How do you convey the distinction of natural alkalinity in a market full of manufactured alkalinity, without requiring a chemistry lecture from every bottle? Aava came to that brief with a sharp instinct already formed: whatever we say has to hold up under scrutiny.</p>
                <p className="cs-section-text">That was the right instinct. It just needed sharpening into something structural. We worked from that instinct to find the real goalpost: whatever we say has to be structurally uncopyable. Not just true. Impossible for a competitor to safely repeat.</p>

                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", margin: "3rem 0"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>The Deeper Problem</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>The alkaline water trend had made pH the headline number. But pH is not the benefit — it's a symptom. Aava's water is alkaline because it is mineral-rich. The minerals came first. The pH followed. Competitors had inverted this entirely. They engineered the indicator without the mineralogy that makes the number meaningful. A stat had been separated from its cause and turned into a marketing variable.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  03 The Insight  */}
    <section className="cs-block-section" style={{paddingTop: "2rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">03 — The Insight</span>
                <p className="cs-section-text">We entered the nature vs. nurture debate. And we came down hard on nature. The born genius. The natural athlete. The person who just has it — whatever it is — without trying. There's a cultural reverence for that. For things that arrive as they are, without engineering or interference.</p>
                <p className="cs-section-text">Aava didn't create its alkalinity. It discovered it. The water arrives at the bottling facility already alkaline, already mineral-rich, already exactly what it needs to be. Aava's role in the process is essentially: don't ruin it. Don't strip it with RO. Don't ionise it. Don't add things back. Just protect what's already there and put it in a bottle.</p>

                <div style={{textAlign: "center", margin: "5rem 0"}}>
                    <h2 style={{fontSize: "36px", color: "var(--green)", textTransform: "uppercase", fontWeight: "800", marginBottom: "1rem", letterSpacing: "1px"}}>#BornAlkaline</h2>
                    <p style={{fontSize: "1.2rem", color: "#666", fontWeight: "500"}}>Two words. Every RTB lands naturally underneath them.</p>
                </div>

                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "4rem"}}>
                    <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center"}}>
                        <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "0.5rem", textTransform: "uppercase"}}>Not RO purified</span>
                        <p style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", margin: "0", lineHeight: "1.3"}}>It retains the goodness<br />within.</p>
                    </div>
                    <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center"}}>
                        <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "0.5rem", textTransform: "uppercase"}}>No UV treatment</span>
                        <p style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", margin: "0", lineHeight: "1.3"}}>It's naturally<br />bacteria-free.</p>
                    </div>
                    <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center"}}>
                        <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "0.5rem", textTransform: "uppercase"}}>No added minerals</span>
                        <p style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", margin: "0", lineHeight: "1.3"}}>They were already<br />there.</p>
                    </div>
                    <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center"}}>
                        <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "0.5rem", textTransform: "uppercase"}}>Not ionised</span>
                        <p style={{fontSize: "20px", fontWeight: "800", color: "#1a1a1a", margin: "0", lineHeight: "1.3"}}>It's born<br />that way.</p>
                    </div>
                </div>

                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", margin: "3rem 0"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>Why it's uncopyable</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>A competitor cannot say they are born alkaline. Because they weren't. They were made alkaline, temporarily, by a process that involves first removing everything natural about water and then adding some of it back. Born is not a claim you can manufacture. The line is a trap for imitators. Use it without the product to back it, and the claim destroys you.</p>
                </div>
            </div>

            <div className="cs-image-center" style={{marginTop: "4rem", display: "flex", justifyContent: "center"}}>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/AAva videos/1777466446827621.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                </div>
            </div>
        </div>
    </section>

    {/*  04 The Campaign  */}
    <section className="cs-block-section" style={{paddingTop: "4rem", paddingBottom: "4rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow" style={{textAlign: "center", marginBottom: "3rem"}}>
                <span className="cs-section-label">04 — The Campaign</span>
                <h2 className="cs-section-heading">Three films. Three registers. One argument.</h2>
            </div>

            <div className="cs-three-screens" style={{marginBottom: "4rem"}}>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/AAva videos/Happy_Accident_Portrait_For CC.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                </div>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/AAva videos/Sip test_Portrait_CC_SUBS (1).mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                </div>
                <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", margin: "0 auto", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                    <video src={`/assets/AAva videos/1777466243541432.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                </div>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem"}}>
                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "1rem", textTransform: "uppercase"}}>Taste a Happy Accident</span>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>The brand launch film. Beautiful slow-motion product shots, ASMR sound design, and a voice-over so matter-of-fact it tips into self-deprecation: "Don't even give us the credit. Honestly, we had nothing to do with it." Brands that manufacture their alkalinity have to work hard to make it sound impressive. Aava's answer was the opposite. We barely did anything. The understatement is the proof of confidence.</p>
                </div>
                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "1rem", textTransform: "uppercase"}}>The (Subtle) Sip Test</span>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>The anti-ad. A deadpan film that does the opposite of what product advertising usually does: no transformation, no performance, no before-and-after. Just water drunk, and the quiet confidence that the benefit doesn't need announcing. Every RTB lands as a negative that's actually a positive: not RO purified, not UV treated, no added minerals, not artificially alkaline. Each one a thing Aava doesn't have to do. "Look again."</p>
                </div>
                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "16px", fontWeight: "800", display: "block", marginBottom: "1rem", textTransform: "uppercase"}}>Don't Be That Client</span>
                    <p className="cs-section-text" style={{fontSize: "1rem", marginBottom: "0"}}>The funny one. And the one that escaped the building. A well-worn viral format: the impossible client, the exasperated employee, the conflict that escalates past reason. We cast a fake alkaline water brand called Generic in the lead role. The client's instructions map, beat for beat, onto what competitor brands actually do to manufacture alkalinity: strip with RO, ionise to push the pH, add minerals back, make it black. Turned up to 11, it becomes absurdist comedy. Except nothing was exaggerated.</p>
                </div>
            </div>

            <div className="cs-content-narrow">
                <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem"}}>
                    <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>What "Don't Be That Client" proved</span>
                    <p className="cs-section-text" style={{marginBottom: "0"}}>When a film about your competitor's manufacturing process becomes a meme template, you've won the category argument without winning a single debate. Reposted by Zepto and Instamart.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  05 What Uncopyable Actually Means  */}
    <section className="cs-split-section" style={{backgroundColor: "#F5F5F7", paddingTop: "6rem", paddingBottom: "6rem"}}>
        <div className="cs-container">
            <div className="cs-split-grid reverse">
                <div className="cs-split-image" style={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"}}>
                        <video src={`/assets/AAva videos/Happy_Accident_Portrait_For CC.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                    </div>
                </div>
                <div style={{paddingRight: "3rem"}}>
                    <span className="cs-section-label">05 — What Uncopyable Actually Means</span>
                    <p className="cs-section-text">Since #BornAlkaline launched, not one competitor has adopted the language. That's unusual. In crowded categories, successful lines get imitated. Brands pick up the vocabulary of whoever breaks through and wear it as their own. It happened with "natural." It happened with "pure." It happened with "alkaline" itself.</p>
                    
                    <div style={{border: "1px solid #eaeaea", borderRadius: "16px", padding: "2.5rem 2rem", marginTop: "3rem", background: "#ffffff"}}>
                        <span style={{color: "var(--green)", fontSize: "18px", fontWeight: "800", display: "block", marginBottom: "1rem"}}>The real result</span>
                        <p className="cs-section-text" style={{marginBottom: "0"}}>Born Alkaline hasn't been copied. Because the brands who would copy it know that copying it would invite scrutiny they can't survive. The moment a brand that ionises RO water calls itself Born Alkaline, someone asks the obvious question. That's what uncopyable means. Not a line that's clever enough that no one thinks to copy it. A line that's true enough that copying it is dangerous. Aava had that product for twenty years. It took two words to say it.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  Ready to build yours  */}
    <section className="cs-next-project"
        style={{background: "#ffffff", padding: "8rem 0", textAlign: "center", position: "relative", zIndex: "10"}}>
        <div className="cs-next-content"
            style={{color: "#1a1a1a", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: "2"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem"}}>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
                <span
                    style={{color: "#888", margin: "0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700"}}>READY TO DISCOVER YOUR BRAND</span>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
            </div>
            <h2 className="cs-next-title" style={{color: "#1a1a1a", marginBottom: "3rem"}}>Find what’s true,<br />and <span style={{color: "var(--green)"}}>make it stick.</span></h2>
            <Link href="/#contact" className="btn-gradient"
                style={{display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "600"}}>
                Start the conversation
            </Link>
        </div>
    </section>
      <Carousel currentProject="aava" />
    </main>
  );
}
