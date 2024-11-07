import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Function to capitalize the first letter of a string and format day keys
  const formatDayKey = (key) => {
    // Split 'day1' into 'Day' and '1' and add a space
    return 'Day ' + key.charAt(3).toUpperCase(); // key.charAt(3) gets the number after "day"
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div className='mt-5'>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort(([a], [b]) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')))
            .map(([dayKey, dayData]) => (
              <div key={dayKey} className="mb-5"> {/* Added margin-bottom for spacing between days */}
                <h2 className="font-medium text-lg">{formatDayKey(dayKey)}</h2> {/* Formatting day keys */}

                <div className="grid md:grid-cols-2 gap-5">
                  {Object.entries(dayData).map(([timeKey, placeDetails]) => (
                    <div key={timeKey} className="">
                      <h2 className="font-medium text-sm text-orange-600">{capitalizeFirstLetter(timeKey)}</h2> {/* Capitalizing time keys */}
                      <PlaceCardItem place={placeDetails} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;


// import React from 'react';
// import PlaceCardItem from './PlaceCardItem';

// function PlacesToVisit({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>

//       <div className='mt-5'>
//         {trip.tripData?.itinerary &&
//           // Convert the itinerary map to an array and sort by day order
//           Object.entries(trip.tripData.itinerary)
//             .sort(([a], [b]) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')))
//             .map(([dayKey, dayData]) => (
//               <div key={dayKey} className="grid grid-cols-2 gap-5">
//                 <div>
//                   <h2 className="font-medium text-lg">{dayKey}</h2>

//                   <div className="grid md:grid-cols-2 gap-5">
//                     {Object.entries(dayData).map(([timeKey, placeDetails]) => (
//                       <div key={timeKey} className="">
//                         <h2 className="font-medium text-sm text-orange-600">{timeKey}</h2>
//                         <PlaceCardItem place={placeDetails} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;