import Banner from "@/components/shared/Banner";
import FeaturedProperties from "@/components/shared/FeaturedProperties";
import RentalStatistics from "@/components/shared/RentalStatistics";
import WhyChooseUs from "@/components/shared/WhyChooseUs";



const HomePage = () => {
  return (
    <div>
      <Banner/>
      <FeaturedProperties/>
      <WhyChooseUs/>
      <RentalStatistics/>
    </div>
  );
};

export default HomePage;
