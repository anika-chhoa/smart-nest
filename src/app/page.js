import Banner from "@/components/shared/Banner";
import FeaturedProperties from "@/components/shared/FeaturedProperties";
import RentalStatistics from "@/components/shared/RentalStatistics";
import TopLocations from "@/components/shared/TopLocations";
import WhyChooseUs from "@/components/shared/WhyChooseUs";



const HomePage = () => {
  return (
    <div>
      <Banner/>
      <FeaturedProperties/>
      <WhyChooseUs/>
      <RentalStatistics/>
      <TopLocations/>
    </div>
  );
};

export default HomePage;
