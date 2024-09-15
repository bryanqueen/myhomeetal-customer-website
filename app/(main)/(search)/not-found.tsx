import TopBanner from "@/app/components/banner/TopBanner";
import MainFooter from "@/app/components/MainFooter";
import Navigation from "@/app/components/Navigation";
import VoidCard from "@/app/components/VoidCard";


const NotFound = () => {
  return (
    <main>
      <TopBanner />
      <Navigation />
      <div className='flex min-h-[100vh] items-center justify-center'>
        <VoidCard
          title="Product Not Found Oops!"
          bodyText="We're sorry, but the product you're looking for is currently unavailable at the moment."
          btnText='Return to Home'
          link='/'
        />
      </div>

      <MainFooter />
    </main>
  );
};

export default NotFound;
