import ScreenRecorder from "./components/ScreenRecorder";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
function App() {
  return (
    <div className="app-shell">
      <Hero />
      <main>
        <ScreenRecorder />
        <section
          className="section features-section"
          id="features"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Built for momentum</p>
            <h2 id="features-title">Everything you need to press record.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card feature-card-dark">
              <span className="feature-number">01</span>
              <h3>One-click capture</h3>
              <p>
                Choose a window, tab, or screen and begin without leaving your
                workflow.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-number">02</span>
              <h3>Pause when you need to</h3>
              <p>
                Collect your thoughts, then resume from the same recording
                without stitching clips.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-number">03</span>
              <h3>Yours by default</h3>
              <p>
                Your recording is processed in your browser and downloaded
                directly to your device.
              </p>
            </article>
          </div>
        </section>
        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div>
            <p className="eyebrow">A calmer way to explain</p>
            <h2 id="about-title">Less setup. More showing.</h2>
          </div>
          <p className="about-copy">
            Screenly keeps screen recording focused on the part that matters:
            making a clear point. It is lightweight enough for a quick note and
            capable enough for a full walkthrough.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
