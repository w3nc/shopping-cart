import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useMenu from "../hook/useMenu";
import useReducedMotion from "../hook/useReducedMotion";
import { formatPrice } from "../utils/currency";
import {
  getMenuPhoto,
  heroPhotos,
  photoStyle,
  prismPhotos,
} from "../data/menuPhotos";
import Container from "../components/Container/Container";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Button from "../components/Button/Button";
import Tag from "../components/Tag/Tag";
import Photo from "../components/Photo/Photo";
import { avatars } from "../assets/photos";
import ScallopEdge from "../components/ScallopEdge/ScallopEdge";
import Marquee from "../components/Marquee/Marquee";
import Accordion from "../components/Accordion/Accordion";
import Reveal from "../components/Reveal/Reveal";
import CountUp from "../components/CountUp/CountUp";
import TestimonialCarousel from "../components/TestimonialCarousel/TestimonialCarousel";
import CursorTrail from "../components/CursorTrail/CursorTrail";
import TurntableMedia from "../components/TurntableMedia/TurntableMedia";
import styles from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger);

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

const IconLeaf = () => (
  <svg {...iconProps}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconFire = () => (
  <svg {...iconProps}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const IconHeart = () => (
  <svg {...iconProps}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const valueCards = [
  {
    Icon: IconLeaf,
    title: "Fresh ingredients",
    text: "Locally sourced produce and chicken, delivered every morning.",
  },
  {
    Icon: IconFire,
    title: "Cooked with care",
    text: "Hand-breaded and fried to order, never rushed.",
  },
  {
    Icon: IconHeart,
    title: "Every day favorites",
    text: "Recipes the whole family loves, from first-timers to regulars.",
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

const cardColors = [
  "var(--color-surface)",
  "var(--color-butter)",
  "var(--color-yellow)",
];
const restTilts = ["-1.2deg", "1deg", "-0.6deg"];


const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1212+South+Valley+Road+Albuquerque+NM";

function pickFavorites(items) {
  const flagged = items.filter((item) => item.featured);
  return (flagged.length > 0 ? flagged : items).slice(0, 3);
}

function Avatars() {
  return (
    <span className={styles.avatars} aria-hidden="true">
      {avatars.map(({ src, alt }, index) => (
        <span key={alt} className={styles.avatar} data-tone={index}>
          <img src={src} alt="" width="40" height="40" loading="lazy" decoding="async" />
        </span>
      ))}
    </span>
  );
}

function TickerText() {
  return (
    <>
      <span>Fresh Pollo Time</span>
      <span className={styles.marqueeDot}>&bull;</span>
      <span>Visit us and try our famous chicken</span>
      <span className={styles.marqueeDot}>&bull;</span>
    </>
  );
}

export default function Home() {
  const { items, loading, error } = useMenu();
  const reduced = useReducedMotion();
  const featured = useMemo(() => pickFavorites(items), [items]);
  const favoritesListRef = useRef(null);

  // The earlier cards shrink and tilt a little as the next one slides over them.
  // It has to re-run when the menu arrives, because the cards do not exist before that.
  useGSAP(
    () => {
      const list = favoritesListRef.current;
      if (!list || reduced) return;

      const cards = gsap.utils.toArray(list.children);

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.95 - index * 0.02,
          rotation: index % 2 === 0 ? -2 : 2,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    },
    {
      scope: favoritesListRef,
      dependencies: [featured.length, reduced],
      revertOnUpdate: true,
    },
  );

  return (
    <div className={styles.page}>

      <section className={styles.hero} aria-labelledby="home-heading">
        <Container className={styles.heroTop}>
          <div className={styles.heroCopy}>
            <h1 id="home-heading" className={styles.heroTitle}>
              Los Pollos Hermanos
            </h1>
            <p className={styles.heroSubtext}>
              Fresh chicken, family recipes, and a table with room for everyone.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Button to="/shop" variant="primary" size="lg">
              Order now
            </Button>
            <Button to="/#visitus" variant="secondary" size="lg">
              Visit us
            </Button>
          </div>
        </Container>

        <div className={styles.heroBand}>
          {heroPhotos.map((name, index) => (
            <div key={name} className={styles.heroPanel} data-index={index}>
              <Photo
                name={name}
                alt={index === 1 ? undefined : ""}
                priority={index === 1}
                sizes="(min-width: 768px) 34vw, 100vw"
                className={styles.heroImage}
              />
            </div>
          ))}
        </div>
      </section>


      <section className={styles.valueStrip} aria-labelledby="value-heading">
        <ScallopEdge position="top" color="var(--color-surface)" size={32} />
        <Container>
          <Reveal className={styles.valueHeader} y={24}>
            <SectionHeading id="value-heading">
              Made for family dinners and quick lunch breaks
            </SectionHeading>
            <div className={styles.socialProof}>
              <Avatars />
              <span className={styles.proofText}>3k+ happy regulars</span>
            </div>
          </Reveal>

          <Reveal className={styles.valueGrid} stagger={0.12}>
            {valueCards.map(({ Icon, title, text }) => (
              <div key={title} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon />
                </span>
                <div>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueText}>{text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>


      <Marquee tilt={-3}>
        <TickerText />
      </Marquee>


      <section
        id="bestsellers"
        className={styles.section}
        aria-labelledby="favorites-heading"
      >
        <Container>
          <Reveal className={styles.favoritesHeader} y={32}>
            <SectionHeading id="favorites-heading">Our favorites</SectionHeading>
            <Link to="/shop" className={styles.textLink}>
              See the full menu
            </Link>
          </Reveal>

          {error ? (
            <p className={styles.menuNote}>
              The favorites could not load right now. The full menu is{" "}
              <Link to="/shop" className={styles.inlineLink}>
                here
              </Link>
              .
            </p>
          ) : null}

          <div className={styles.favoritesList} ref={favoritesListRef}>
            {loading
              ? [0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`${styles.favoriteCard} ${styles.favoriteSkeleton}`}
                    aria-hidden="true"
                  />
                ))
              : featured.map((product, index) => {
                  const mapped = getMenuPhoto(product);

                  return (
                    <article
                      key={product.id}
                      className={styles.favoriteCard}
                      style={{
                        "--stack": index,
                        "--rest-tilt": restTilts[index % restTilts.length],
                        backgroundColor: cardColors[index % cardColors.length],
                      }}
                    >
                      <div className={styles.favoriteImage}>
                        {mapped ? (
                          <Photo
                            name={mapped.photo}
                            alt=""
                            sizes="(min-width: 768px) 40vw, 100vw"
                            style={photoStyle(mapped)}
                          />
                        ) : (
                          <img
                            src={product.image}
                            alt=""
                            width="640"
                            height="480"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </div>
                      <div className={styles.favoriteContent}>
                        <h3 className={styles.favoriteTitle}>{product.title}</h3>
                        <p className={styles.favoriteDesc}>
                          {product.description}
                        </p>
                        {product.tags && product.tags.length > 0 ? (
                          <div className={styles.favoriteTags}>
                            {product.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </div>
                        ) : null}
                        <p className={styles.favoritePrice}>
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </article>
                  );
                })}
          </div>
        </Container>
      </section>


      <section
        id="whyus"
        className={styles.section}
        aria-labelledby="whyus-heading"
      >
        <Container>
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading id="whyus-heading" align="center">
              Why our chicken is the best
            </SectionHeading>
            <p className={styles.centerLead}>
              We focus on quality, simplicity and care in every step.
            </p>
          </Reveal>

          <Reveal className={styles.bentoGrid} stagger={0.1}>
            <TurntableMedia
              className={styles.bentoMedia}
              images={prismPhotos}
              title="Simple ingredients"
              text="We keep it pure. Real chicken, fresh breading and nothing unnecessary added."
            />
            <div className={styles.bentoStats}>
              <h3 className={styles.bentoStatsTitle}>A daily table</h3>
              <p className={styles.bentoStatsText}>
                From first-timers to five-times-a-week regulars. Everyone is
                welcome here.
              </p>
              <span className={styles.statNumber}>
                <CountUp end={900} suffix="+" />
              </span>
              <span className={styles.statText}>
                Plates of crispy chicken served daily
              </span>
            </div>
            <div className={styles.bentoQuality}>
              <span className={styles.stars} aria-hidden="true">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>
              <h3 className={styles.bentoTitle}>Quality service</h3>
              <p className={styles.bentoText}>
                Friendly faces and fast service every time, loved by 3,000+
                regulars across Albuquerque.
              </p>
              <Avatars />
            </div>
            <div className={styles.bentoTallPhoto}>
              <Photo
                name="fringChicken"
                sizes="(min-width: 768px) 28vw, 100vw"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </Reveal>
        </Container>
      </section>


      <section className={styles.section} aria-labelledby="words-heading">
        <Container>
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading id="words-heading" align="center">
              Words from our regulars
            </SectionHeading>
            <p className={styles.centerLead}>
              <span aria-hidden="true" className={styles.stars}>
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </span>{" "}
              <span className="sr-only">Rated five out of five. </span>
              Loved by 3k+ happy regulars
            </p>
          </Reveal>
          <Reveal y={24}>
            <TestimonialCarousel />
          </Reveal>
        </Container>
      </section>


      <Marquee tilt={2}>
        <TickerText />
      </Marquee>


      <section
        id="visitus"
        className={styles.visitSection}
        aria-labelledby="visit-heading"
      >
        <CursorTrail />
        <Container className={styles.visitInner}>
          <Reveal y={32}>
            <h2 id="visit-heading" className={styles.visitTitle}>
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
          <Reveal y={16} className={styles.visitActions}>
            <Button
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>
            <Button href="tel:+15055550142" variant="secondary" size="lg">
              Call (505) 555 0142
            </Button>
          </Reveal>
        </Container>
        <ScallopEdge position="bottom" color="var(--color-yellow)" size={32} />
      </section>


      <section
        id="faq"
        className={styles.faqSection}
        aria-labelledby="faq-heading"
      >
        <Container width="narrow">
          <Reveal className={styles.centerHeading} y={32}>
            <SectionHeading id="faq-heading" align="center">
              Frequently asked questions
            </SectionHeading>
          </Reveal>
          <Reveal y={24}>
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
