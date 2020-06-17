import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { stringParser } from "../../../util/utilityFunctions";
import TopNav from "../../../components/Navigation/TopNav";
import BottomNav from "../../../components/Navigation/BottomNav";
// get in firebase
import { firebase } from "../../../util/firebase";
import HomeListCard from "../../../components/Cards/HomeListCard";
import PaginationButton from "../../../components/Pagination/PaginationButton";
import LoadingPage from "../../../components/LoadingSpinner/LoadingPage";
import Link from "next/link";
import { last } from "lodash";

const Index = () => {
  const perPage = 20;
  const [homes, setHomes] = useState([]);
  const [lastDoc, setLastDoc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [empty, setEmpty] = useState(true);
  const router = useRouter();
  // ****
  // FIRESTORE
  // ****
  const firestore = firebase.firestore();

  let { city } = router.query;
  if (city) {
    city = stringParser(city);
  }

  const getData = async (city, direction, lastDoc) => {
    let homesRef = null;
    let lastDocument;
    setLoading(true);
    // If no last doc, this is the first query
    if (!lastDoc) {
      console.log("no last doc");
      homesRef = await firestore
        .collection("homes")
        .orderBy("updated", "desc")
        .limit(perPage)
        .get();
      setPage(1);
    } else if (direction === "next") {
      console.log("next");
      homesRef = await firestore
        .collection("homes")
        .orderBy("updated", "desc")
        .limit(perPage)
        .startAfter(lastDoc)
        .get();
      setPage((p) => p + 1);
    } else {
      homesRef = await firestore
        .collection("homes")
        .orderBy("updated", "desc")
        .limit(perPage)
        .endAt(lastDoc)
        .get();
      setPage((p) => p - 1);
    }

    // if there are homes set empty state and set homes in state
    console.log(homesRef);
    if (!homesRef.empty) {
      setEmpty(false);
      // get and set the last doc
      let newHomes = [];
      homesRef.forEach((home) =>
        newHomes.push({ docId: home.id, ...home.data() })
      );
      setHomes((p) => newHomes);
      lastDocument = homesRef.docs[homesRef.docs.length - 1];
      setLastDoc((p) => lastDocument);
      setLoading(false);
    } else {
      setLoading(false);
      setEmpty(true);
      return;
    }
  };
  useEffect(() => {
    if (city) {
      getData(city, "next", null);
    }
  }, [city]);

  const getNext = () => {
    // fetch more data
    getData(city, "next", lastDoc);
  };
  const getPrevious = () => {
    // refetch data
    getData(city, "previous", lastDoc);
  };

  return (
    <div className="relative flex flex-col w-screen h-full flex-grow overflow-y-scroll antialiased">
      <div className="z-40 hidden md:block">
        <TopNav fixed />
      </div>
      <div className="mt-5 md:mt-20 pl-8 text-xl">
        <Link href={"/"}>
          <div className="ml-4 flex text-gray-600 items-center top-2 cursor-pointer">
            <svg
              className="h-5 w-5 flex justify-center items-center"
              stroke="currentColor"
              fill="text-grey-600"
              viewBox="0 0 24 24"
            >
              <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
            </svg>
            <span className=" text-xl text-center">
              Homes in {city && stringParser(city)}
            </span>
          </div>
        </Link>
      </div>
      {loading && <LoadingPage />}
      {!loading && !homes && (
        <Link href="/">
          <div className="flex flex-grow flex-shrink-0 justify-center items-center">
            <div className="flex flex-col items-center">
              <span>Hmm - we don't have any homes in this city yet.</span>
              <div className="w-40 mt-6 bg-indigo-500 inline-flex justify-center items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 py-3 text-white">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <span className="ml-2">Back to home</span>
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid flex-grow flex-shrink-0 mb-16 pb-10 grid-cols-1 mt-8 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12">
        {!loading &&
          homes &&
          homes.map((home) => (
            <HomeListCard property={home} city={city} key={home.title} />
          ))}
      </div>

      {homes && (
        <div className="px-12 h-12 mb-20 mt-6 flex justify-center items-center flex-shrink-0 flex-grow">
          <div className="flex w-56 justify-between ">
            <PaginationButton
              hidden={page <= 1}
              onClick={getPrevious}
              direction="back"
            />
            <PaginationButton
              hidden={homes.length < 10}
              onClick={getNext}
              direction="next"
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-0 w-full md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Index;
