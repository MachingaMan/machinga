import Carousel from '@/components/Carousel';
import Link from 'next/link';


export const metadata = {
  title: "Contraband Case Study | Machinga",
  description: "How a stain launched a luxury fragrance to 88 million people. Campaign concept and production for Contraband.",
  alternates: { canonical: "https://studiomachinga.com/contraband" }
};

export default function ContrabandPage() {
  return (
    <main className="cs-page">
      {/*  Hero Section  */}
      <section className="cs-fs-hero">
        <video 
          className="cs-fs-hero-bg" 
          src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/Contraband.MP4`}
          autoPlay loop muted playsInline
        ></video>
        <div className="cs-fs-hero-content">
          <h1 className="cs-fs-hero-title">CONTRABAND</h1>
          <p className="cs-fs-hero-sub">How a stain did what a celebrity couldn't</p>
          <p className="cs-fs-hero-text">88 million plus views in two weeks.</p>
          <div className="cs-fs-hero-tags">
            <span className="cs-fs-tag">Campaign Strategy</span>
            <span className="cs-fs-tag">Scripts</span>
            <span className="cs-fs-tag">End-to-End DVC Production</span>
          </div>
        </div>

        <Link href="/?expanded=true" className="cs-fs-back-btn" style={{ textDecoration: 'none' }} aria-label="Back to Work">
          ←
        </Link>

        <div className="cs-fs-scroll-indicator">
          <a href="#challenge" className="cs-fs-scroll-btn" style={{ textDecoration: 'none' }}>
            <span>DETAIL</span>
            <span className="arrow">↓</span>
          </a>
        </div>
      </section>

      {/*  Section 01  */}
      <section className="cs-block-section" id="challenge">
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">01 — The Brief</span>
                <p className="cs-section-text">Most fragrance briefs ask for aspiration. Beautiful people. Golden hour. The suggestion of a life you could be living.</p>
                <p className="cs-section-text">This one was harder.</p>
                <p className="cs-section-text">Contraband came with a specific mandate: the brand personality is rooted in whimsy, absurdity, and the particular excitement of wanting something you probably shouldn't.</p>
                
                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3"}}>
                    Heart wants what it wants. Break free.
                </div>
                
                <p className="cs-section-text">Not a fragrance brief. A permission brief. The work had to feel illicit without being illegal, luxurious without being sterile, and playful without being cheap. All three, simultaneously. There was also a production constraint that sharpened everything: no humans in the shoot. Budget, not philosophy. But it forced a more interesting question. If you can't show a person experiencing the fragrance, how do you convey personality, lifestyle, and sensation with objects alone? And underneath all of it, the problem that never goes away with fragrance: you are trying to sell a smell through a screen. The one sense the medium cannot transmit is the one sense the product is entirely about.</p>
                <p className="cs-section-text">Contraband trusted us to find the answer. That trust was not small. The brief asked for something that didn't have an obvious solution, and the client didn't flinch when we brought back something genuinely strange.</p>
            </div>
        </div>
    </section>

    {/*  Section 02  */}
    <section className="cs-block-section" style={{paddingTop: "2rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">02 — The Brand + The SKU</span>
                <h2 className="cs-section-heading">Every Contraband fragrance tells its story</h2>
                <p className="cs-section-text">Contraband is a luxury fragrance house founded by Ananya Birla. The founding act is the brand's first statement: deliberately not a family venture. The name is not a metaphor for smuggling. It is a metaphor for desire: the specific quality of wanting something you've been told to resist.</p>
                <p className="cs-section-text">Every Contraband fragrance tells its story in three acts: The Introduction (top notes, the first handshake), The Discovery (heart, true character), The Impression (base, the memory that lingers after the person has gone). This is not just product architecture. It is the creative brief for every film. The beginning hooks. The middle reveals. The ending refuses to leave.</p>
                <p className="cs-section-text">Summer Chase is the fourth SKU, unreleased at the time of the campaign, which meant it had no history, no loyal user base, no inherited associations. It had to build its mythology from scratch. The brand's own copy for the fragrance does the brief's work better than a strategy document could:</p>
                
                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3"}}>
                    Where reality blurs at the edges. Some things were never meant to be right, just unforgettable. Would you still choose it, knowing how it ends?
                </div>
                
                <p className="cs-section-text">This is a fragrance about the morning after, not the night before. The conscious mistake. The scent of a decision you'd make again.</p>
            </div>
        </div>
    </section>

    {/*  Section 03  */}
    <section className="cs-block-section" style={{paddingTop: "2rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">03 — The Idea</span>
                <p className="cs-section-text" style={{fontSize: "2rem", fontWeight: "600", lineHeight: "1.3", color: "#1a1a1a", marginBottom: "2rem"}}>The question every fragrance campaign has to answer: if you can't show the smell, what do you show?</p>
                <p className="cs-section-text">The obvious answer, showing the experience, the moment, the charged glance, is what every fragrance brand does. It asks the viewer to feel something they can only observe from outside. We asked a different question: what if you don't show the experience at all? What if you show only what it left behind?</p>
                
                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3"}}>
                    Don't show the evening. Show what it left behind.
                </div>
            </div>

            <div className="cs-image-center" style={{marginTop: "4rem"}}>
                <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 1.mp4`} autoPlay loop muted playsInline style={{width: "100%", borderRadius: "20px", objectFit: "cover", display: "block", maxHeight: "600px"}}></video>
            </div>
        </div>
    </section>

    {/*  Section 04  */}
    <section className="cs-block-section" style={{paddingTop: "2rem", paddingBottom: "6rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <span className="cs-section-label">04 — How It Works</span>
                <h2 className="cs-section-heading">Let it Stain</h2>
                <p className="cs-section-text">60 million views is not a number that happens. It is a number that is built. Here is what was built, and why.</p>
                
                <div style={{display: "flex", flexDirection: "column", gap: "2rem", marginTop: "3rem"}}>
                    {/*  Box 1  */}
                    <div style={{border: "1px solid #e0e0e0", borderRadius: "16px", padding: "2.5rem", background: "#ffffff"}}>
                        <h3 style={{color: "var(--green)", fontSize: "1.5rem", fontWeight: "800", marginBottom: "1rem", textTransform: "uppercase"}}>The hook is a visual taboo.</h3>
                        <p style={{color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0"}}>Humans are wired to protect clean surfaces. Watching something irreversibly ruin white bedsheets produces immediate cognitive friction: the kind that stops a thumb mid-scroll before the brain decides to stop. The hook is not just beautiful. It is uncomfortable. That is the point.</p>
                    </div>

                    {/*  Box 2  */}
                    <div style={{border: "1px solid #e0e0e0", borderRadius: "16px", padding: "2.5rem", background: "#ffffff"}}>
                        <h3 style={{color: "var(--green)", fontSize: "1.5rem", fontWeight: "800", marginBottom: "1rem", textTransform: "uppercase"}}>The curiosity loops are stacked.</h3>
                        <p style={{color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0"}}>Viral retention is built on information gaps — the distance between what a viewer sees and what they understand. This film stacks five, in sequence.</p>
                    </div>
                </div>
            </div> {/*  End of cs-content-narrow  */}

            <style dangerouslySetInnerHTML={{ __html: `
                .loop-grid {
                    display: flex; 
                    flex-wrap: nowrap;
                    justify-content: center;
                    gap: 1.5rem; 
                    margin-top: 4rem;
                    width: 100%;
                }
                .loop-grid > div {
                    flex: 1 1 0;
                    min-width: 0;
                }
                .phone-frame {
                    width: 100%;
                    max-width: 220px;
                    aspect-ratio: 220 / 486;
                    border: 4px solid #000000;
                    border-radius: 36px;
                    box-sizing: border-box;
                    margin: 0 auto;
                    display: flex;
                }
                .phone-frame video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 32px;
                }
                @media (max-width: 900px) {
                    .loop-grid { flex-wrap: wrap; }
                    .loop-grid > div { flex: 1 1 calc(33.333% - 1.5rem); max-width: 220px; }
                }
                @media (max-width: 600px) {
                    .loop-grid > div { flex: 1 1 100%; }
                }
            ` }} />
            <div className="loop-grid">
                {/*  Video 2  */}
                <div>
                    <div className="phone-frame">
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 2.mp4`} autoPlay loop muted playsInline></video>
                    </div>
                    <p style={{fontSize: "0.85rem", lineHeight: "1.4", color: "#666", marginTop: "1.5rem"}}>Why is someone intentionally ruining a bed?</p>
                    <p style={{fontSize: "0.75rem", fontWeight: "700", color: "var(--green)", marginTop: "0.5rem", textTransform: "uppercase"}}>Opens immediately</p>
                </div>
                {/*  Video 3  */}
                <div>
                    <div className="phone-frame">
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 3.mp4`} autoPlay loop muted playsInline></video>
                    </div>
                    <p style={{fontSize: "0.85rem", lineHeight: "1.4", color: "#666", marginTop: "1.5rem"}}>What just happened here? Who is involved?</p>
                    <p style={{fontSize: "0.75rem", fontWeight: "700", color: "var(--green)", marginTop: "0.5rem", textTransform: "uppercase"}}>Opens within first few seconds</p>
                </div>
                {/*  Video 4  */}
                <div>
                    <div className="phone-frame">
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 4.mp4`} autoPlay loop muted playsInline></video>
                    </div>
                    <p style={{fontSize: "0.85rem", lineHeight: "1.4", color: "#666", marginTop: "1.5rem"}}>What do these objects have in common? When the composition becomes clearly deliberate.</p>
                    <p style={{fontSize: "0.75rem", fontWeight: "700", color: "var(--green)", marginTop: "0.5rem", textTransform: "uppercase"}}>Opens at 4 seconds</p>
                </div>
                {/*  Video 5  */}
                <div>
                    <div className="phone-frame">
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 5.mp4`} autoPlay loop muted playsInline></video>
                    </div>
                    <p style={{fontSize: "0.85rem", lineHeight: "1.4", color: "#666", marginTop: "1.5rem"}}>Whose lipstick is that? Whose phone number? Whatever this is, it didn't begin here.</p>
                    <p style={{fontSize: "0.75rem", fontWeight: "700", color: "var(--green)", marginTop: "0.5rem", textTransform: "uppercase"}}>Opens at 9 seconds</p>
                </div>
                {/*  Video 6  */}
                <div>
                    <div className="phone-frame">
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 6.mp4`} autoPlay loop muted playsInline></video>
                    </div>
                    <p style={{fontSize: "0.85rem", lineHeight: "1.4", color: "#666", marginTop: "1.5rem"}}>What is that object expanding, and why does it feel like it means something?</p>
                    <p style={{fontSize: "0.75rem", fontWeight: "700", color: "var(--green)", marginTop: "0.5rem", textTransform: "uppercase"}}>Opens at 11 seconds</p>
                </div>
            </div>

        </div>
    </section>

    {/*  New Section 1 (Product Arrives)  */}
    <section className="cs-block-section" style={{paddingTop: "2rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow">
                <div style={{border: "1px solid #e0e0e0", borderRadius: "36px", padding: "3rem", marginBottom: "4rem"}}>
                    <h3 style={{fontSize: "1.5rem", fontWeight: "800", color: "#1a1a1a", marginBottom: "1.5rem"}}>The product arrives at 17 seconds. Not before.</h3>
                    <p style={{color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0"}}>By this point, the viewer has watched more than 70% of the film without knowing what is being advertised, or even knowing if something is being advertised. Average view duration this high is what algorithms reward with reach. The Summer Chase bottle rolls into the mess, found in it, not presented above it. A product on a surface is a product in an advertisement. A product in the wreckage is a product in a story. When the bottle lands and "LET IT STAIN" appears, the brain connects backwards through the entire film simultaneously. The mess was the recipe. The fragrance notes were the ingredients. The stain is the sillage: the scent's trail, its longevity, the mark it refuses to stop making. "LET IT STAIN" does three things at once: describes what you're watching, characterises the emotional territory, and functions as a philosophy. The brand's entire thesis compressed to a command. Not a tagline. A permission slip.</p>
                </div>
            </div>

            <div className="cs-image-center" style={{marginTop: "0", marginBottom: "4rem"}}>
                <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 1.mp4`} autoPlay loop muted playsInline style={{width: "100%", borderRadius: "20px", objectFit: "cover", display: "block", maxHeight: "600px"}}></video>
            </div>

            <div className="cs-content-narrow">
                <div style={{borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "0 0 3rem 0", fontSize: "24px", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3"}}>
                    "Let It Stain" does three things at once: describes what you're watching, characterises the emotional territory, and functions as a philosophy. Not a tagline. A permission slip.
                </div>
            </div>
        </div>
    </section>

    {/*  05 - Cut: 5 Seconds  */}
    <section className="cs-split-section" style={{backgroundColor: "#F5F5F7", paddingTop: "6rem", paddingBottom: "6rem"}}>
        <div className="cs-container">
            <div className="cs-split-grid">
                <div style={{paddingRight: "3rem"}}>
                    <span className="cs-section-label">05 — Cut: 5 Seconds</span>
                    <h2 className="cs-section-heading">The Snackable</h2>
                    <p className="cs-section-text">The same creative DNA at a completely different velocity. A glass teapot on a tray, amber tea inside. From above, the Summer Chase bottle plunks in. Tea spills from the spout onto a dish of compressed coin tissues: they rise. Cut to close-up: the bottle rising through the amber liquid. Five seconds. Done.</p>
                    <p className="cs-section-text">No narrative, no buildup. The hook is pure cognitive dissonance (a luxury bottle brewing in a teapot) and the loop is frictionless enough that the completion rate runs well past 100%. The film has restarted before the brain finishes processing what it saw. 26.4 million views from a video shorter than a breath.</p>
                    <p className="cs-section-text">The teapot cut didn't ride the success of Let It Stain. It ran on its own mechanics. Two films, the same creative system. Proof that the approach was replicable, not a fluke.</p>
                </div>
                <div className="cs-split-image" style={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "220px", height: "486px", maxWidth: "100%", border: "4px solid #000000", borderRadius: "36px", boxSizing: "border-box", display: "flex"}}>
                        <video src={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/conntraband assets/contraband page video 7.mp4`} autoPlay loop muted playsInline style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "32px"}}></video>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  06 — The Numbers  */}
    <section className="cs-stats-section" style={{borderTop: "none", paddingTop: "6rem", paddingBottom: "4rem"}}>
        <div className="cs-container">
            <div className="cs-content-narrow" style={{marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem"}}>
                <span className="cs-section-label" style={{marginBottom: "0", whiteSpace: "nowrap"}}>06 — The Numbers</span>
                <div style={{flexGrow: "1", height: "1px", backgroundColor: "#e0e0e0"}}></div>
            </div>
            
            <div className="cs-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                <div className="cs-stat-item">
                    <h4>88<span style={{fontSize: "inherit", color: "var(--green)"}}>M+</span></h4>
                    <span>Total views</span>
                </div>
                <div className="cs-stat-item">
                    <h4>1.1<span style={{fontSize: "inherit", color: "var(--green)"}}>M+</span></h4>
                    <span>Likes on hero film</span>
                </div>
            </div>
            
            <div className="cs-content-narrow" style={{marginTop: "4rem"}}>
                <p className="cs-section-text">Let It Stain: 60 million views in two weeks. 1.1 million likes. The snackable cut: 26.4 million views. For a fragrance brand's fourth SKU, no human talent, a brief that asked luxury to feel illicit without being explicit.</p>
                <p className="cs-section-text" style={{fontWeight: "600", color: "#1a1a1a", marginTop: "2rem"}}>The number is not the point. The architecture is the point. The number is what happens when the architecture works.</p>
            </div>
        </div>
    </section>

    {/*  Black Background Bar  */}
    <section style={{padding: "4rem 0"}}>
        <div className="cs-container">
            <div style={{backgroundColor: "#000000", borderRadius: "20px", padding: "4rem 2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1.5rem"}}>
                <div style={{color: "#ffffff", padding: "14px 8vw", fontWeight: "600", fontSize: "1rem", border: "1px solid #888888", borderRadius: "50px", textAlign: "center", whiteSpace: "nowrap"}}>Engagement Model</div>
                <div style={{color: "#ffffff", padding: "14px 8vw", fontWeight: "600", fontSize: "1rem", border: "1px solid #888888", borderRadius: "50px", textAlign: "center", whiteSpace: "nowrap"}}>Campaign Concept</div>
                <div style={{color: "#ffffff", padding: "14px 8vw", fontWeight: "600", fontSize: "1rem", border: "1px solid #888888", borderRadius: "50px", textAlign: "center", whiteSpace: "nowrap"}}>Script</div>
                <div style={{color: "#ffffff", padding: "14px 8vw", fontWeight: "600", fontSize: "1rem", border: "1px solid #888888", borderRadius: "50px", textAlign: "center", whiteSpace: "nowrap"}}>Production</div>
            </div>
        </div>
    </section>

    {/*  Ready to build yours  */}
    <section className="cs-next-project" style={{background: "#ffffff", padding: "8rem 0", textAlign: "center", position: "relative", zIndex: "10"}}>
        <div className="cs-next-content" style={{color: "#1a1a1a", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: "2"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem"}}>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
                <span style={{color: "#888", margin: "0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700"}}>READY FOR YOUR LAUNCH</span>
                <div style={{height: "1px", backgroundColor: "#888", width: "60px"}}></div>
            </div>
            <h2 className="cs-next-title" style={{color: "#1a1a1a", marginBottom: "3rem"}}>Tell us what’s <span style={{color: "var(--green)"}}>impossible.</span></h2>
            <Link href="/#contact" className="btn-gradient" style={{display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "600"}}>
                Start the conversation
            </Link>
        </div>
    </section>
      <Carousel currentProject="contraband" />
    </main>
  );
}
