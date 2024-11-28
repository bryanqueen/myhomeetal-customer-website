import VoidCard from "@/app/components/VoidCard";

const NotFound = () => {
  return (
    <main>
      <div className='flex min-h-[100vh] max-lg:items-center justify-center lg:pt-[10%]'>
        <VoidCard
          title="Oops, This product is unavailable"
          bodyText="We're sorry, but the product you're looking for is currently unavailable at the moment."
          btnText='Return to Home'
          link='/'
        />
      </div>
    </main>
  );
};

export default NotFound;
