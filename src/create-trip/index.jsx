import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import {doc, setDoc} from "firebase/firestore";
import {db} from "@/service/firebaseConfig";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
      console.log("Please enter Trip Days less than 5");
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    }).catch((err) => {
      console.error("Failed to fetch user profile", err);
      toast("Failed to sign in, please try again.");
    });
  };

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if ((formData?.noOfDays > 5) || (!formData?.location || !formData?.budget || !formData?.traveler)) {
      toast("Please fill all details and ensure trip days are 5 or less.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{Location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
    


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip=async(TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {userSelection : formData,
      tripData : JSON.parse(TripData),
      userEmail : user?.email,
      id : docId
    });
    setLoading(false);
  }

 

  return (
    <div className='sm:ox-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>
        Tell us your travel preferences🗺️🏕️
      </h2>

      <p className='mt-3 text-gray-500'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What destination do you have in mind?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                if (v) {
                  setPlace(v);
                  handleInputChange('location', v);
                }
              }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder={'Ex.3'}
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler === item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                <h2 className='text-sm text-gray-500'>{item.people}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='my-10 justify-end flex'>
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
        {loading? 
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>
          : 'Generate Trip'
        }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              <h2 className='font-bold text-lg mt-'>Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication security</p>
              <Button
              
                onClick={login}
                className='w-full mt-5 flex gap-4 item-center'>
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
                
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;









// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
// import { chatSession } from '@/service/AIModel';
// import React, {useState , useEffect} from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { toast } from 'sonner';
// import axios from 'axios';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';


// function CreateTrip() {
//   const [place, setPlace] = useState();

//   const[openDialog, setOpenDialog]=useState(false);
//   const [formData, setFormData] = useState([]);
//   const handleInputChange=(name, value) =>{

//     if(name=='noOfDays' && value>5){
//       console.log("Please enter Trip Days less than 5")
//       return;
//     }
//     setFormData({
//       ...formData,
//       [name] : value
//     })
//   };

//   useEffect(() =>{
//     console.log(formData);
//   }, [formData])

//   const login = useGoogleLogin({
//     onSuccess:(codeResp)=>console.log(codeResp),
//     onError:(error)=>console.log(error)
//   })
//   const OnGenerateTrip=async()=>{

//     const user = localStorage.getItem('user')

//     if(!user){
//       setOpenDialog(true)
//       return;
//     }
//     if(formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler){
//       toast("Please fill all details")
//       return;
//     }
//     const FINAL_PROMPT=AI_PROMPT.replace('{Location}', formData?.location.label).replace('{totalDays}', formData?.noOfDays).replace('{traveler}', formData?.traveler).replace('{budget}',formData?.budget ).
    

//     console.log(FINAL_PROMPT);

//     const result=await chatSession.sendMessage(FINAL_PROMPT);

//     console.log(result?.response?.text());

//   }

//   const GetUserProfile = (tokenInfo) => {
//   axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
//     headers: {
//       Authorization: `Bearer ${tokenInfo?.access_token}`,
//       Accept: 'Application/json',
//     },
//   }).then((resp) => {
//     console.log(resp);
//     localStorage.setItem('user', JSON.stringify(resp.data));
//     setOpenDialog(false);
//     OnGenerateTrip();
//   });
// };

//   return (
//     <div className='sm:ox-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//       <h2 className='font-bold text-3xl'>
//         Tell us your travel preferences🗺️🏕️</h2>

//       <p className='mt-3 text-gray-500'>
//         Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences
//       </p>

//       <div className='mt-20 flex flex-col gap-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What destination do you have in mind?</h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange:(v)=>{setPlace(v); 
//               handleInputChange('location', v)
//               // console.log(v)
//               }
//             }}
//           />
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
//           <Input placeholder={'Ex.3'} type="number"
//           onChange={(e) => handleInputChange('noOfDays',e.target.value )} 

//           />
//         </div>
      

//       <div>
//       <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
//         <div className='grid grid-cols-3 gap-5 mt-5'>
//           {SelectBudgetOptions.map((item, index) => (
//             <div key={index}
//             onClick={()=>handleInputChange('budget', item.title)} 
//              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
//               <h2 className='text-4xl'>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>

//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//       <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
//         <div className='grid grid-cols-3 gap-5 mt-5'>
//           {SelectTravelesList.map((item, index) => (
//             <div key={index}
//             onClick={() =>handleInputChange('traveler', item.people)} 
//             className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler==item.people && 'shadow-lg border-black'}`}>
//               <h2 className='text-4xl'>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               <h2 className='text-sm text-gray-500'>{item.people}</h2>
//             </div>
//           ))}
//       </div> 
//       </div>
//       </div>
//           <div className='my-10 justify-end flex'>
//           <Button onClick={OnGenerateTrip}>Generate Trip</Button>
//           </div>
          
//           <Dialog open={openDialog}>
  
//   <DialogContent>
//     <DialogHeader>
//       <DialogDescription>
//         <h2 className='font-bold text-lag mt-'>Sign In WIth Google</h2>
//         <p>Sign in to the App with Google Authentication security</p>

//         <Button
//          onClick = {login}        
//          className='w-full mt-5 flex gap-4 item-center'><FcGoogle className='h-7 w-7' />
//          Sign In With Google</Button>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>

  
//       </div>
//   )
      
// }

// export default CreateTrip
