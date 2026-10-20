import { Link } from "react-router-dom";
import useMenu from "../hook/useMenu";
import { formatPrice } from "../utils/currency";
import Container from "../components/Container/Container";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Button from "../components/Button/Button";
import Tag from "../components/Tag/Tag";
import ScallopEdge from "../components/ScallopEdge/ScallopEdge";
import Marquee from "../components/Marquee/Marquee";
import Accordion from "../components/Accordion/Accordion";
import styles from "./Home.module.css";

// Simple functional icons (stroke based)
const IconLeaf = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconFire = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const IconHeart = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const testimonials = [
  {
    quote:
      "The chicken is always crispy, never greasy. It feels like a Sunday dinner at my grandmother's house.",
    name: "Marcus T.",
    role: "Local regular",
  },
  {
    quote:
      "I stop by for the spicy sandwich at least twice a week. The staff knows my order before I reach the counter.",
    name: "Elena R.",
    role: "Downtown worker",
  },
  {
    quote:
      "We ordered the family bucket for a small party. Everything arrived hot and the sides were fantastic.",
    name: "Devon K.",
    role: "First-time visitor",
  },
];

const faqs = [
  {
    question: "Do you have vegetarian options?",
    answer:
      "We focus on fried chicken, but our salads, fries, and biscuits are vegetarian-friendly.",
  },
  {
    question: "How spicy is the spicy chicken?",
    answer:
      "It has a noticeable kick, but it is not overwhelming. You can always ask for a side of our cooling ranch.",
  },
  {
    question: "Do you offer catering?",
    answer:
      "Yes. For large orders, please call the restaurant directly at least 24 hours in advance.",
  },
  {
    question: "Are there allergens in the fry oil?",
    answer:
      "Our chicken is fried in a soybean oil blend. If you have severe allergies, please speak with a manager before ordering.",
  },
  {
    question: "What are your opening hours?",
    answer: "We are open daily from 10:00 AM to 10:00 PM.",
  },
];

export default function Home() {
  const { items } = useMenu();
  const featured = items.filter((item) => item.featured).slice(0, 3);

  return (
    <div className={styles.page}>
      {/* 1. HERO */}
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Los Pollos Hermanos</h1>
            <p className={styles.heroSubtext}>
              Fresh chicken, family recipes, and a table with room for everyone.
            </p>
            <div className={styles.heroActions}>
              <Button to="/shop" variant="primary" size="lg">
                Order now
              </Button>
              <Button to="#visitus" variant="secondary" size="lg">
                Visit us
              </Button>
            </div>
          </div>

          {/* Scallop is now inside the image wrap, but the wrap allows overflow */}
          <div className={styles.heroImageWrap}>
            <img
              src="/images/menu/placeholder.svg"
              alt="Los Pollos Hermanos restaurant exterior"
              className={styles.heroImage}
            />
            <ScallopEdge position="bottom" color="var(--color-bg)" size={32} />
          </div>
        </Container>
      </section>

      {/* 2. VALUE STRIP */}
      <section className={styles.valueStrip}>
        <Container>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <IconLeaf />
              </div>
              <h3 className={styles.valueTitle}>Fresh ingredients</h3>
              <p className={styles.valueText}>
                Locally sourced produce and chicken.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <IconFire />
              </div>
              <h3 className={styles.valueTitle}>Cooked with care</h3>
              <p className={styles.valueText}>
                Hand-breaded and fried to order.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <IconHeart />
              </div>
              <h3 className={styles.valueTitle}>Every day favorites</h3>
              <p className={styles.valueText}>
                Recipes the whole family loves.
              </p>
            </div>
          </div>
          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              <div className={styles.avatar} />
              <div className={styles.avatar} />
              <div className={styles.avatar} />
            </div>
            <span className={styles.proofText}>3k+ happy regulars</span>
          </div>
        </Container>
      </section>

      {/* 3. TICKER TAPE */}
      <Marquee tilt={-3}>
        <span>FRESH POLLO TIME</span>
        <span className={styles.marqueeDot}>•</span>
        <span>Visit us and try our famous chicken</span>
        <span className={styles.marqueeDot}>•</span>
      </Marquee>

      {/* 4. FAVORITES */}
      <section id="bestsellers" className={styles.section}>
        <Container>
          <div className={styles.favoritesHeader}>
            <SectionHeading>Our favorites</SectionHeading>
            <Link to="/shop" className={styles.textLink}>
              See the full menu
            </Link>
          </div>
          <div className={styles.favoritesList}>
            {featured.map((product) => (
              <article key={product.id} className={styles.favoriteCard}>
                <div className={styles.favoriteImage}>
                  <img src={product.image} alt="" />
                </div>
                <div className={styles.favoriteContent}>
                  <h3 className={styles.favoriteTitle}>{product.title}</h3>
                  <p className={styles.favoriteDesc}>{product.description}</p>
                  <div className={styles.favoriteTags}>
                    {product.tags?.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <p className={styles.favoritePrice}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. WHY US (BENTO GRID) */}
      <section id="whyus" className={styles.section}>
        <Container>
          <SectionHeading className={styles.centerHeading}>
            Why our chicken is the best
          </SectionHeading>
          <div className={styles.bentoGrid}>
            <div className={styles.bentoMedia}>
              <img
                src="/images/menu/placeholder.svg"
                alt="Chicken preparation"
              />
            </div>
            <div className={styles.bentoStats}>
              <span className={styles.statNumber}>900+</span>
              <span className={styles.statText}>
                Plates of crispy chicken served daily
              </span>
            </div>
            <div className={styles.bentoQuality}>
              <h3 className={styles.bentoTitle}>Quality service</h3>
              <p className={styles.bentoText}>
                Friendly faces and fast service every time.
              </p>
              <div className={styles.avatars}>
                <div className={styles.avatar} />
                <div className={styles.avatar} />
                <div className={styles.avatar} />
              </div>
            </div>
            <div className={styles.bentoTallPhoto}>
              <img src="/images/menu/placeholder.svg" alt="Fresh ingredients" />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className={styles.section}>
        <Container>
          <SectionHeading>Words from our regulars</SectionHeading>
          <div className={styles.testimonialWrap}>
            <div className={styles.testimonialImage}>
              <img src="/images/menu/placeholder.svg" alt="Happy customer" />
            </div>
            <div className={styles.testimonialContent}>
              <p className={styles.quote}>"{testimonials[0].quote}"</p>
              <div className={styles.author}>
                <strong>{testimonials[0].name}</strong>
                <span>{testimonials[0].role}</span>
              </div>
              <div className={styles.carouselControls}>
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label="Previous testimonial"
                >
                  ←
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label="Next testimonial"
                >
                  →
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. VISIT US */}
      <section id="visitus" className={styles.visitSection}>
        <Container className={styles.visitInner}>
          <h2 className={styles.visitTitle}>
            Visit us and try our famous chicken
          </h2>
          <address className={styles.visitAddress}>
            1212 South Valley Road
            <br />
            Albuquerque, NM
            <br />
            Open daily, 10:00 to 22:00
          </address>
          <Button
            href="https://maps.google.com/?q=Albuquerque+NM"
            variant="primary"
            size="lg"
          >
            Get directions
          </Button>
        </Container>
        {/* Changed color to yellow so it's visible against the cream background */}
        <ScallopEdge position="bottom" color="var(--color-yellow)" size={32} />
      </section>

      {/* 8. FAQ */}
      <section id="faq" className={styles.section}>
        <Container width="narrow">
          <SectionHeading className={styles.centerHeading}>
            Frequently asked questions
          </SectionHeading>
          <Accordion items={faqs} />
        </Container>
      </section>
    </div>
  );
}
