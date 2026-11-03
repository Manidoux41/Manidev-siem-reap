import type { SiteLocale } from "@/lib/i18n";
import type { PublicTestimonial } from "@/lib/testimonials";
import { testimonialMessages } from "@/lib/testimonial-messages";
import { TestimonialForm } from "@/components/testimonial-form";

export function TestimonialSection({ locale, testimonials, projects, available }: {
  locale: SiteLocale;
  testimonials: PublicTestimonial[];
  projects: { id: string; title: string }[];
  available: boolean;
}) {
  const messages = testimonialMessages[locale];
  return (
    <section className="section testimonial-section" id="testimonials" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">{messages.title}</h2>
      <p className="testimonial-intro">{messages.intro}</p>
      {testimonials.length ? (
        <div className="testimonial-list">
          {testimonials.map((item, index) => (
            <figure key={index} className="testimonial-card">
              <blockquote><p>{item.testimony}</p></blockquote>
              <figcaption><strong>{item.displayName}</strong><span>{item.project.title}</span></figcaption>
            </figure>
          ))}
        </div>
      ) : <p>{messages.empty}</p>}
      <div className="contact-form-wrap">
        <TestimonialForm locale={locale} projects={projects} available={available} />
      </div>
    </section>
  );
}
