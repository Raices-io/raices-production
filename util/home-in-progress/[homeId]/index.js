// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../auth";
// import { useRouter } from "next/router";
// import ImageUploader from "../../../components/ImageUploader/ImageUploader";
// import GeneralInformationForm from "../../../components/addHome/GeneralInformationForm";
// import DescriptionsForm from "../../../components/addHome/DescriptionsForm";
// import MobileWizardNavigation from "../../../components/FormElements/MobileWizardNavigation";
// import WizardProgressHeader from "../../../components/FormElements/WizardProgressHeader";
// import HomeComponent from "../../../components/Home/HomeComponent.js";
// import firebase from "../../firebase";

// const Add = () => {
//   // ****
//   // AUTH
//   // ****
//   const auth = useAuth();
//   const user = auth.user;
//   // ****
//   // ROUTER
//   // ****
//   const router = useRouter();
//   const { homeId } = router.query;
//   // ****
//   // FIRESTORE
//   // ****
//   const firestore = firebase.firestore();

//   const [warningModalOpen, setWarningModalOpen] = useState(false);
//   const [component, setComponent] = useState(1);
//   const [percentage, setPercentage] = useState(25);
//   const [pendingHome, setPendingHome] = useState(null);
//   const [homeCreated, setHomeCreated] = useState(true);
//   const [loading, setLoading] = useState(true);

//   const fetchHome = async () => {
//     // fetch the pending home ref
//     try {
//       await firestore
//         .collection("pendingHomes")
//         .doc(homeId)
//         .get()
//         .then((snapshot) => {
//           console.log(snapshot);
//           if (!snapshot.exists) {
//             router.push("/add-home");
//             return;
//           } else {
//             setPendingHome((p) => {
//               return { ...snapshot.data(), id: snapshot.id };
//             });
//           }

//           setLoading((p) => false);
//         });
//     } catch (e) {
//       console.log(e);
//       router.push("/add-home");
//     }
//     setLoading((p) => false);
//   };

//   const handleBooleanChange = (name, value) => {
//     // value will be opposite of what we want it changed to
//     setPendingHome((oldHome) => {
//       return {
//         ...oldHome,
//         [name]: value,
//       };
//     });
//   };

//   const handleIterationChange = (name, value, add) => {
//     setPendingHome((oldHome) => {
//       let newValue = 0;
//       if (add) {
//         newValue = oldHome[name] + value;
//       } else {
//         newValue = oldHome[name] - value;
//         if (newValue < 0) {
//           return {
//             ...oldHome,
//           };
//         }
//       }
//       return {
//         ...oldHome,
//         [name]: newValue,
//       };
//     });
//   };
//   const handleCheckboxChange = (name, value, add) => {
//     // if add is false we're taking the value out of the array
//     let oldValue = pendingHome[name]; // this is the old array
//     if (add) {
//       oldValue.push(value);
//     } else {
//       oldValue = oldValue.filter((item) => item !== value);
//     }
//     setPendingHome((oldHome) => {
//       return {
//         ...oldHome,
//         [name]: oldValue,
//       };
//     });
//   };

//   const handleFormFieldChange = (ev) => {
//     const param = ev.target.name;
//     const value = ev.target.value.trimLeft();
//     setPendingHome((oldHome) => {
//       return {
//         ...oldHome,
//         [param]: value,
//       };
//     });
//   };
//   let title = "";
//   if (percentage === 25) {
//     title = "General information";
//   }
//   if (percentage === 50) {
//     title = "Photos";
//   }
//   if (percentage === 75) {
//     title = "Descriptions";
//   }
//   if (percentage === 100) {
//     title = "Preview";
//   }
//   // useEffect(() => {
//   //   if (!auth.user) {
//   //     router.push("/signin");
//   //   }
//   // }, [router]);
//   useEffect(() => {
//     if (homeId) {
//       fetchHome();
//     }
//   }, [user]);
//   return (
//     <div className="relative flex flex-col w-screen flex-grow bg-white h-full min-h-full overflow-hidden antialiased">
//       {/* Below is the form in progress. To accellerate launch to MVP we're going to use Google Forms and have our people manually upload homes to get started. */}
//       <WizardProgressHeader percentage={percentage} title={title} />
//       {pendingHome && (
//         <div className="mt-15 mb-20 flex flex-col h-full flex-grow mx-0  overflow-y-scroll flex-grow pt-2">
//           {percentage == 25 && (
//             <GeneralInformationForm
//               handleFormFieldChange={handleFormFieldChange}
//               handleBooleanChange={handleBooleanChange}
//               handleCheckboxChange={handleCheckboxChange}
//               handleIterationChange={handleIterationChange}
//               home={pendingHome}
//             />
//           )}
//           {percentage == 50 && (
//             <ImageUploader
//               handleFormFieldChange={handleFormFieldChange}
//               home={pendingHome}
//             />
//           )}
//           {percentage == 75 && (
//             <DescriptionsForm
//               handleFormFieldChange={handleFormFieldChange}
//               home={pendingHome}
//             />
//           )}
//           {percentage == 100 && <HomeComponent />}
//         </div>
//       )}
//       <MobileWizardNavigation
//         percentage={percentage}
//         setPercentage={setPercentage}
//         homeCreated={homeCreated}
//         images={images}
//       />
//     </div>
//   );
// };
// export default Add;
