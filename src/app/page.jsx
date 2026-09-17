import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import TestimonialCarousel from "@/components/testimonialCarousel";
import { getAllTestimonials } from "@/lib/dal/testimonials";
import FormContact from "@/components/forms/formContact/FormContact";
import FooterLanding from "@/components/footer/FooterLanding";




export default async function Home() {

  const testimonials = await getAllTestimonials();

  return (
    <>

      <Hero />
      <main className="wrapper">

        <h1 className="mt-8 pb-2">Vores holdtyper</h1>

        <article>
          <h4 className="mt-4 pb-2">Børnehold</h4>
          <figure>
            <img src="/assets/boernedans.jpg" alt="Børnehold" width={600} height={400} />
          </figure>
          <p className="py-4 text-sm">På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med.</p>
        </article>

        <article>
          <h4 className="mt-8 pb-2">Selskabs- og seniordans</h4>
          <figure>
            <img src="/assets/seniordans.jpg" alt="Selskabs- og seniordans" width={600} height={400} />
          </figure>
          <p className="py-4 text-sm">Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. Undervisningen styrker balance, koordination og kondition, samtidig med at fællesskabet og danseglæden er i centrum.</p>
        </article>

        <article >
          <h4 className="mt-8 pb-2">Moderne dans og ballet</h4>
          <figure>
            <img src="/assets/modernedans.JPG" alt="Moderne dans og ballet" width={600} height={400} />
          </figure>
          <p className="py-4 text-sm">Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og koncentration skaber både fordybelse og effektiv motion.</p>
        </article>

        <article >
          <h4 className="mt-8 pb-2">Streetdance og hiphop</h4>
          <figure>
            <img src="/assets/streethiphop.jpg" alt="Streetdance og hiphop" width={600} height={400} />
          </figure>
          <p className="py-4 text-sm">Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd.</p>
        </article>

        <Newsletter />


      </main >

      <TestimonialCarousel testimonials={testimonials} />
      <FormContact />
      <FooterLanding />
    </>

  );
}
