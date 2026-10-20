import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useMenu from "../hook/useMenu";
import { formatPrice } from "../utils/currency";
import Container from "../components/Container/Container";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Button from "../components/Button/Button";
import Tag from "../components/Tag/Tag";
import ScallopEdge from "../components/ScallopEdge/ScallopEdge";
import Marquee from "../components/Marquee/Marquee";
import Accordion from "../components/Accordion/Accordion";
import Reveal from "../components/Reveal/Reveal";
import CountUp from "../components/CountUp/CountUp";
import TestimonialCarousel from "../components/TestimonialCarousel/TestimonialCarousel";
import CursorTrail from "../components/CursorTrail/CursorTrail";
import TurntableMedia from "../components/TurntableMedia/TurntableMedia";
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

const cardColors = ["var(--color-surface)", "var(--color-butter)", "#FFE9A8"];

export default function Home() {
  const { items } = useMenu();
  const featured = items.filter((item) => item.featured).slice(0, 3);
  const favoritesListRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!favoritesListRef.current) return;

      const cards = gsap.utils.toArray(favoritesListRef.current.children);

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.95 - index * 0.02,
          rotation: index % 2 === 0 ? -2 : 2,
          opacity: 0.8,
          scrollTrigger: {
            trigger: nextCard,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    },
    { scope: favoritesListRef },
  );

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

          <div className={styles.heroImageWrap}>
            <img
              src="/images/menu/hero-bg.jpg"
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
          <Reveal className={styles.valueGrid} stagger={0.1}>
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
          </Reveal>
          <Reveal y={16}>
            <div className={styles.socialProof}>
              <div className={styles.avatars}>
                <div className={styles.avatar} />
                <div className={styles.avatar} />
                <div className={styles.avatar} />
              </div>
              <span className={styles.proofText}>3k+ happy regulars</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. TICKER TAPE (First Instance) */}
      <Marquee tilt={-3}>
        <span>FRESH POLLO TIME</span>
        <span className={styles.marqueeDot}>•</span>
        <span>Visit us and try our famous chicken</span>
        <span className={styles.marqueeDot}>•</span>
      </Marquee>

      {/* 4. FAVORITES (Sticky Stack) */}
      <section id="bestsellers" className={styles.section}>
        <Container>
          <Reveal className={styles.favoritesHeader} y={32}>
            <SectionHeading>Our favorites</SectionHeading>
            <Link to="/shop" className={styles.textLink}>
              See the full menu
            </Link>
          </Reveal>

          <div className={styles.favoritesList} ref={favoritesListRef}>
            {featured.map((product, index) => (
              <article
                key={product.id}
                className={styles.favoriteCard}
                style={{
                  top: `${100 + index * 24}px`,
                  backgroundColor: cardColors[index % cardColors.length],
                }}
              >
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
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading>Why our chicken is the best</SectionHeading>
          </Reveal>
          <Reveal className={styles.bentoGrid} stagger={0.1}>
            {/* Turntable Media replaces the static image */}
            <TurntableMedia
              className={styles.bentoMedia}
              imageSrc="/images/menu/fresh-ingredients.jpg"
            />
            <div className={styles.bentoStats}>
              <span className={styles.statNumber}>
                <CountUp end={900} suffix="+" />
              </span>
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
              <img src="/images/menu/fresh-ingredients.jpg" alt="Fresh ingredients" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className={styles.section}>
        <Container>
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading>Words from our regulars</SectionHeading>
          </Reveal>
          <Reveal y={24}>
            <TestimonialCarousel />
          </Reveal>
        </Container>
      </section>

      {/* 3b. TICKER TAPE (Second Instance) */}
      <Marquee tilt={2}>
        <span>FRESH POLLO TIME</span>
        <span className={styles.marqueeDot}>•</span>
        <span>Visit us and try our famous chicken</span>
        <span className={styles.marqueeDot}>•</span>
      </Marquee>

      {/* 7. VISIT US */}
      <section id="visitus" className={styles.visitSection}>
        <CursorTrail />
        <Container className={styles.visitInner}>
          <Reveal y={32}>
            <h2 className={styles.visitTitle}>
              Visit us and try our famous chicken
            </h2>
          </Reveal>
          <Reveal y={24}>
            <address className={styles.visitAddress}>
              1212 South Valley Road
              <br />
              Albuquerque, NM
              <br />
              Open daily, 10:00 to 22:00
            </address>
          </Reveal>
          <Reveal y={16}>
            <Button
              href="https://maps.google.com/?q=Albuquerque+NM"
              variant="primary"
              size="lg"
            >
              Get directions
            </Button>
          </Reveal>
        </Container>
        <ScallopEdge position="bottom" color="var(--color-yellow)" size={32} />
      </section>

      {/* 8. FAQ */}
      <section id="faq" className={styles.section}>
        <Container width="narrow">
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading>Frequently asked questions</SectionHeading>
          </Reveal>
          <Reveal y={24}>
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
