import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = await genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = await model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget.
                 Give me a hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates,
                 rating descriptions, and suggest itinerary with the placeName, Place Details, Place image url,
                 Geo coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan
                 with best time to visit in JSON format`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating descriptions and suggest itinerary with the placeName, Place Details, Place image url, Geo coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "name": "The D Las Vegas",\n      "address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$60 - $100 per night",\n      "image_url": "https://www.the-d.com/media/images/hotel/the-d-hotel-exterior-685x396.jpg",\n      "geo_coordinates": "36.1697, -115.1421",\n      "rating": "3.5 stars",\n      "description": "A centrally located hotel on Fremont Street with a lively atmosphere and affordable rates.  Offers a casino, restaurants and bars."\n    },\n    {\n      "name": "Golden Nugget Las Vegas",\n      "address": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$75 - $150 per night",\n      "image_url": "https://www.goldennugget.com/las-vegas/media/images/hotel/golden-nugget-las-vegas-hotel-exterior.jpg",\n      "geo_coordinates": "36.1699, -115.1416",\n      "rating": "4 stars",\n      "description": "A classic Las Vegas hotel with a lively casino, multiple restaurants, bars, and a shark tank aquarium."\n    },\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$50 - $80 per night",\n      "image_url": "https://www.circuscircus.com/media/images/hotel/circus-circus-hotel-exterior.jpg",\n      "geo_coordinates": "36.1077, -115.1715",\n      "rating": "3 stars",\n      "description": "A budget-friendly hotel known for its circus theme, midway games, and affordable rooms."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "morning": {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "A pedestrian mall with a canopy of lights, live music, street performers, and vintage casinos.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/slideshow/public/uploads/2021/08/fremontstreet-canopy-lights.jpg",\n        "geoCoordinates": "36.1695, -115.1423",\n        "ticketPricing": "Free",\n        "timeToTravel": "2 hours"\n      },\n      "afternoon": {\n        "placeName": "The Mob Museum",\n        "placeDetails": "A museum dedicated to the history of organized crime in the United States, with interactive exhibits and artifacts.",\n        "placeImageUrl": "https://www.themobmuseum.org/sites/default/files/styles/slideshow/public/2019-10/IMG_0097_1.jpg?itok=3N294U6B",\n        "geoCoordinates": "36.1681, -115.1462",\n        "ticketPricing": "$25 - $30",\n        "timeToTravel": "2 hours"\n      },\n      "evening": {\n        "placeName": "Free show on the Fremont Street Experience",\n        "placeDetails": "Enjoy a free concert or performance on the Fremont Street Experience.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/slideshow/public/uploads/2020/04/freemont-street-canopy-lights.jpg",\n        "geoCoordinates": "36.1695, -115.1423",\n        "ticketPricing": "Free",\n        "timeToTravel": "1 hour"\n      }\n    },\n    "day2": {\n      "morning": {\n        "placeName": "Hoover Dam",\n        "placeDetails": "A massive dam on the Colorado River, offering tours and scenic views.",\n        "placeImageUrl": "https://www.nps.gov/hdam/learn/nature/images/hooverdam-2015.jpg",\n        "geoCoordinates": "36.0058, -114.9982",\n        "ticketPricing": "$30 - $40",\n        "timeToTravel": "4 hours"\n      },\n      "afternoon": {\n        "placeName": "Red Rock Canyon National Conservation Area",\n        "placeDetails": "A scenic area with red rock formations, hiking trails, and scenic drives.",\n        "placeImageUrl": "https://www.nps.gov/redr/learn/nature/images/redrock-canyon-2015.jpg",\n        "geoCoordinates": "36.1751, -115.3418",\n        "ticketPricing": "$15 per vehicle",\n        "timeToTravel": "3 hours"\n      },\n      "evening": {\n        "placeName": "Free concert at a casino",\n        "placeDetails": "Many casinos offer free live music shows in the evenings.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/slideshow/public/uploads/2019/07/the-cosmopolitan-las-vegas.jpg",\n        "geoCoordinates": "36.1688, -115.1730",\n        "ticketPricing": "Free",\n        "timeToTravel": "2 hours"\n      }\n    },\n    "day3": {\n      "morning": {\n        "placeName": "Bellagio Conservatory & Botanical Garden",\n        "placeDetails": "A beautiful botanical garden with changing seasonal displays.",\n        "placeImageUrl": "https://www.bellagio.com/media/images/conservatory/2022/conservatory-christmas-2022.jpg",\n        "geoCoordinates": "36.1668, -115.1712",\n        "ticketPricing": "Free",\n        "timeToTravel": "1 hour"\n      },\n      "afternoon": {\n        "placeName": "The Venetian and The Palazzo",\n        "placeDetails": "Explore the Grand Canal Shoppes and enjoy the romantic ambiance of the Venetian.",\n        "placeImageUrl": "https://www.venetian.com/media/images/hotel/venetian-hotel-exterior.jpg",\n        "geoCoordinates": "36.1329, -115.1723",\n        "ticketPricing": "Free",\n        "timeToTravel": "2 hours"\n      },\n      "evening": {\n        "placeName": "Free street performers on the Strip",\n        "placeDetails": "Catch a free show from street performers on the Las Vegas Strip.",\n        "placeImageUrl": "https://www.visitlasvegas.com/sites/default/files/styles/slideshow/public/uploads/2018/12/las-vegas-strip-night-view.jpg",\n        "geoCoordinates": "36.1146, -115.1725",\n        "ticketPricing": "Free",\n        "timeToTravel": "1 hour"\n      }\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary focuses on free and low-cost attractions, offering a great experience on a budget.\n* Transportation costs are not included and should be considered separately.\n* This is a sample itinerary and can be adjusted based on your preferences.\n* Check for special events and promotions that might be happening during your visit.\n* Always confirm the latest opening hours, ticket prices, and availability before visiting.',
        },
      ],
    },
  ],
});
