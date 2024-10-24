export const SelectTravelesList=[
    {
        id:1,
        title: 'Just Me',
        desc: 'A solo traveles in exploration',
        icon: "✈️​",
        people: '1'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡​',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '🎡',
        people: '5 to 10 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵​',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰​'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💸​'
    }
]

export const AI_PROMPT="Generate Travel Plan for Location : {Location}, for {totalDays} Days for {traveler} with a {budget}, Give me a hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating descriptions and suggest itinerary with the placeName, Place Details, Place image url, Geo coordinates, ticket Pricing, Time to travel each of the location for {totalDays} with each day plan with best time to visit in JSON format.";