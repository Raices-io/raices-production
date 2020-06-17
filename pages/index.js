import TopNav from "../components/Navigation/TopNav";
import BottomNav from "../components/Navigation/BottomNav";
import LocationCard from "../components/Cards/LocationCard";
import Features from "../components/LandingPage/Features";
// test for vercel
const locations = [
  {
    name: "Medellin",
    image:
      "https://res.cloudinary.com/dvqw5uhrr/image/upload/v1575403683/Raices/Envigado/envigado.png",
    subtitle: "Greenery and food",
  },
];

const Explore = () => {
  return (
    <div className=" relative flex flex-col w-screen h-full flex-grow bg-white overflow-y-scroll antialiased">
      <div className="z-40 hidden md:block px-12 mt-12">
        <TopNav fixed />
      </div>
      <div className="sm:py-6 pb-12 flex flex-col overflow-y-scroll h-full flex-grow mx-0 flex-grow sm:mt-8">
        {/* Features section */}
        <div className="flex px-5 flex flex-grow flex-shrink-0 justify-center items-center sm:px-12 pb-6 sm:pb-0">
          <Features />
        </div>
        {/* Location cards */}
        <div className="flex flex-col flex-grow flex-shrink-0 justify-center items-center sm:flex-row px-4">
          {locations.map((location, index) => {
            return <LocationCard location={location} key={index} />;
          })}
        </div>
      </div>
      <div className="flex w-full md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};
export default Explore;
