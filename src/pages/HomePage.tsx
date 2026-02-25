import Hero from '../components/Hero/Hero';
import FeaturedWorks from '../components/FeaturedWorks/FeaturedWorks';
import CategoriesSection from '../components/CategoriesSection/CategoriesSection';
import Contact from '../components/Contact/Contact';

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedWorks />
            <CategoriesSection />
            <Contact />
        </>
    );
};

export default HomePage;
