// Main app — composes the page sections
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "split"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <div className="page">
      <Nav />
      <Hero layout={tweaks.heroLayout} />
      <Marquee />
      <HowItWorks />
      <DemoSection />
      <Features />
      <KitsSection />
      <Gallery />
      <Testimonials />
      <Specs />
      <FAQ />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio
            label="Layout"
            value={tweaks.heroLayout}
            onChange={(v) => setTweak('heroLayout', v)}
            options={[
              { value: 'split', label: 'Split' },
              { value: 'centered', label: 'Centered' },
              { value: 'fullbleed', label: 'Full bleed' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
