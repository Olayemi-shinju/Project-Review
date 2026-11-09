import Navbar from '../components/layouts/NavBar';
import Hero from '../components/layouts/Hero';
import FeaturedProjects from '../components/projects/FeaturedProjects';
import Footer from '../components/layouts/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects/>
         <Footer />
      </main>
    </>
  );
}

export default Home;