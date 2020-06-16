import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HomeComponent from "../../../../components/Home/HomeComponent";
import LoadingPage from "../../../../components/LoadingSpinner/LoadingPage";
import firebase from "../../../../util/firebase";
import Router from "next/router";
import { useAuth } from "../../../../util/auth";

const Home = () => {
  const auth = useAuth();
  const user = auth.user;
  const router = useRouter();
  let { city, id } = router.query;
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async (city, id) => {
    const callGetHome = firebase.functions().httpsCallable("callGetHome");
    let response = await callGetHome({
      city,
      id,
    });
    const { home } = response.data;
    // if there is a home found set home in state

    if (home) {
      setHome(home);
      setLoading(false);
    } else {
      setLoading(false);
      setHome(false);
    }
  };
  useEffect(() => {
    if (id) {
      getData(city, id);
    }
  }, [id]);

  return (
    <div className=" flex flex-col flex-grow flex-shrink-0 h-full bg-white antialiased">
      {loading && <LoadingPage />}
      {home && <HomeComponent home={home} user={user} />}
      {!loading && !home && (
        <div className="flex flex-grow justify-center items-center">
          <div className="flex flex-col items-center">
            <span>Hmm - we didn't find a home.</span>
            <div className="w-40 mt-6 bg-indigo-500 inline-flex justify-center items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 py-3 text-white">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
              </svg>
              <span onClick={() => Router.back()} className="ml-2">
                Go back
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
