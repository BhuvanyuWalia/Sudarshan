require('dotenv').config();
const mongoose = require('mongoose');
const Organisation = require('./models/organisation.js');
const Country = require('./models/country.js');

main().then(()=>{
    console.log("connected to DB - Sudarshan");
}).catch((err)=>{
    console.log("error connecting to DB");
});

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}

let initOrgData = [
    {
      "name": "United Nations",
      "headquarters": "New York, USA",
      "formation_date": "1945-10-24",
      "purpose": "Maintain international peace and security",
      "website": "https://www.un.org",
      "logo": "/logos/un.png"
    },
    {
      "name": "World Trade Organization",
      "headquarters": "Geneva, Switzerland",
      "formation_date": "1995-01-01",
      "purpose": "Regulate international trade",
      "website": "https://www.wto.org",
      "logo": "/logos/wto.png"
    },
    {
      "name": "World Health Organization",
      "headquarters": "Geneva, Switzerland",
      "formation_date": "1948-04-07",
      "purpose": "International public health agency",
      "website": "https://www.who.int",
      "logo": "/logos/who.png"
    },
    {
      "name": "International Monetary Fund",
      "headquarters": "Washington D.C., USA",
      "formation_date": "1944-12-27",
      "purpose": "Ensure global monetary cooperation",
      "website": "https://www.imf.org",
      "logo": "/logos/imf.png"
    },
    {
      "name": "World Bank",
      "headquarters": "Washington D.C., USA",
      "formation_date": "1944-07-01",
      "purpose": "Provide financial support to developing countries",
      "website": "https://www.worldbank.org",
      "logo": "/logos/worldbank.png"
    },
    {
      "name": "Association of Southeast Asian Nations",
      "headquarters": "Jakarta, Indonesia",
      "formation_date": "1967-08-08",
      "purpose": "Promote political and economic cooperation in Southeast Asia",
      "website": "https://asean.org",
      "logo": "/logos/asean.png"
    },
    {
      "name": "North Atlantic Treaty Organization",
      "headquarters": "Brussels, Belgium",
      "formation_date": "1949-04-04",
      "purpose": "Collective defense alliance",
      "website": "https://www.nato.int",
      "logo": "/logos/nato.png"
    },
    {
      "name": "BRICS",
      "headquarters": "Rotating",
      "formation_date": "2009-06-16",
      "purpose": "Promote economic cooperation among Brazil, Russia, India, China, and South Africa",
      "website": "https://brics2024.gov.in",
      "logo": "/logos/brics.png"
    },
    {
      "name": "Organisation of Islamic Cooperation",
      "headquarters": "Jeddah, Saudi Arabia",
      "formation_date": "1969-09-25",
      "purpose": "Safeguard interests of the Muslim world",
      "website": "https://www.oic-oci.org",
      "logo": "/logos/oic.png"
    },
    {
      "name": "European Union",
      "headquarters": "Brussels, Belgium",
      "formation_date": "1993-11-01",
      "purpose": "Political and economic union of European countries",
      "website": "https://europa.eu",
      "logo": "/logos/eu.png"
    },
    {
      "name": "G7",
      "headquarters": "Rotating",
      "formation_date": "1975-11-15",
      "purpose": "Forum of seven largest advanced economies",
      "website": "https://www.g7germany.de",
      "logo": "/logos/g7.png"
    },
    {
      "name": "G20",
      "headquarters": "Rotating",
      "formation_date": "1999-12-15",
      "purpose": "Forum for international economic cooperation",
      "website": "https://g20.org",
      "logo": "/logos/g20.png"
    },
    {
      "name": "African Union",
      "headquarters": "Addis Ababa, Ethiopia",
      "formation_date": "2002-07-09",
      "purpose": "Promote unity and solidarity among African countries",
      "website": "https://au.int",
      "logo": "/logos/au.png"
    },
    {
      "name": "South Asian Association for Regional Cooperation",
      "headquarters": "Kathmandu, Nepal",
      "formation_date": "1985-12-08",
      "purpose": "Promote regional cooperation among South Asian countries",
      "website": "https://saarc-sec.org",
      "logo": "/logos/saarc.png"
    },
    {
      "name": "International Atomic Energy Agency",
      "headquarters": "Vienna, Austria",
      "formation_date": "1957-07-29",
      "purpose": "Promote safe and peaceful use of nuclear energy",
      "website": "https://www.iaea.org",
      "logo": "/logos/iaea.png"
    }
];

async function addOrgData(){
    try {
        await Organisation.deleteMany({});
        initOrgData = initOrgData.map((obj)=>({...obj, author:'684b5d7778ff94b9b1eafe75'}));
        await Organisation.insertMany(initOrgData);
        console.log("Organisations data saved in DB");
    } catch (err) {
        console.log("Error inserting organisations:", err);
    }
}



let initCountryData = [
  {
    name: "United States of America",
    capital: "Washington, D.C.",
    region: "Americas",
    GDP: 21433,
    population: 331002647,
    currency: "United States Dollar (USD)",
    flag: "/flags/united_states.png",
    geometry: { type: "Point", coordinates: [-77.0364, 38.8951] }
  },
  {
    name: "China",
    capital: "Beijing",
    region: "Asia",
    GDP: 14342,
    population: 1439323776,
    currency: "Renminbi (CNY)",
    flag: "/flags/china.png",
    geometry: { type: "Point", coordinates: [116.3974, 39.9067] }
  },
  {
    name: "India",
    capital: "New Delhi",
    region: "Asia",
    GDP: 2875,
    population: 1380004385,
    currency: "Indian Rupee (INR)",
    flag: "/flags/india.png",
    geometry: { type: "Point", coordinates: [77.2090, 28.6139] }
  },
  {
    name: "Japan",
    capital: "Tokyo",
    region: "Asia",
    GDP: 5082,
    population: 126476461,
    currency: "Yen (JPY)",
    flag: "/flags/japan.png",
    geometry: { type: "Point", coordinates: [139.8395, 35.6528] }
  },
  {
    "name": "Germany",
    "capital": "Berlin",
    "region": "Europe",
    "GDP": 3846,
    "population": 83783945,
    "currency": "Euro (EUR)",
    "flag": "/flags/germany.png",
    geometry: { type: "Point", coordinates: [13.4050, 52.5200] }
  },
  {
    "name": "United Kingdom",
    "capital": "London",
    "region": "Europe",
    "GDP": 2827,
    "population": 67886011,
    "currency": "Pound Sterling (GBP)",
    "flag": "/flags/united_kingdom.png",
    geometry: { type: "Point", coordinates: [-0.1276, 51.5072] }
  },
  {
    "name": "France",
    "capital": "Paris",
    "region": "Europe",
    "GDP": 2716,
    "population": 65273512,
    "currency": "Euro (EUR)",
    "flag": "/flags/france.png",
    geometry: { type: "Point", coordinates: [2.3522, 48.8566] }
  },
  {
    "name": "Italy",
    "capital": "Rome",
    "region": "Europe",
    "GDP": 2001,
    "population": 60461826,
    "currency": "Euro (EUR)",
    "flag": "/flags/italy.png",
    geometry: { type: "Point", coordinates: [12.4964, 41.9028] }
  },
  {
    "name": "Brazil",
    "capital": "Brasília",
    "region": "Americas",
    "GDP": 1839,
    "population": 212559417,
    "currency": "Real (BRL)",
    "flag": "/flags/brazil.png",
    geometry: { type: "Point", coordinates: [-47.8825, -15.7942] }
  },
  {
    "name": "Canada",
    "capital": "Ottawa",
    "region": "Americas",
    "GDP": 1736,
    "population": 37742157,
    "currency": "Canadian Dollar (CAD)",
    "flag": "/flags/canada.png",
    geometry: { type: "Point", coordinates: [-75.6972, 45.4215] }
  },
  {
    "name": "Russia",
    "capital": "Moscow",
    "region": "Europe/Asia",
    "GDP": 1687,
    "population": 145934462,
    "currency": "Russian Ruble (RUB)",
    "flag": "/flags/russia.png",
    geometry: { type: "Point", coordinates: [37.6173, 55.7558] }
  },
  {
    "name": "Australia",
    "capital": "Canberra",
    "region": "Oceania",
    "GDP": 1392,
    "population": 25499884,
    "currency": "Australian Dollar (AUD)",
    "flag": "/flags/australia.png",
    geometry: { type: "Point", coordinates: [149.1300, -35.2809] }
  },
  {
    "name": "Spain",
    "capital": "Madrid",
    "region": "Europe",
    "GDP": 1400,
    "population": 46754778,
    "currency": "Euro (EUR)",
    "flag": "/flags/spain.png",
    geometry: { type: "Point", coordinates: [-3.7038, 40.4168] }
  },
  {
    "name": "Mexico",
    "capital": "Mexico City",
    "region": "Americas",
    "GDP": 1265,
    "population": 128932753,
    "currency": "Mexican Peso (MXN)",
    "flag": "/flags/mexico.png",
    geometry: { type: "Point", coordinates: [-99.1332, 19.4326] }
  },
  {
    "name": "South Korea",
    "capital": "Seoul",
    "region": "Asia",
    "GDP": 1631,
    "population": 51269185,
    "currency": "Won (KRW)",
    "flag": "/flags/south_korea.png",
    geometry: { type: "Point", coordinates: [126.9780, 37.5665] }
  },
  {
    "name": "Indonesia",
    "capital": "Jakarta",
    "region": "Asia",
    "GDP": 1119,
    "population": 273523615,
    "currency": "Rupiah (IDR)",
    "flag": "/flags/indonesia.png",
    geometry: { type: "Point", coordinates: [106.8456, -6.2088] }
  },
  {
    "name": "Netherlands",
    "capital": "Amsterdam",
    "region": "Europe",
    "GDP": 907,
    "population": 17134872,
    "currency": "Euro (EUR)",
    "flag": "/flags/netherlands.png",
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
  },
  {
    "name": "Saudi Arabia",
    "capital": "Riyadh",
    "region": "Asia",
    "GDP": 779,
    "population": 34813871,
    "currency": "Saudi Riyal (SAR)",
    "flag": "/flags/saudi_arabia.png",
    geometry: { type: "Point", coordinates: [46.6753, 24.7136] }
  },
  {
    "name": "Turkey",
    "capital": "Ankara",
    "region": "Asia/Europe",
    "GDP": 761,
    "population": 84339067,
    "currency": "Turkish Lira (TRY)",
    "flag": "/flags/turkey.png",
    geometry: { type: "Point", coordinates: [28.9784, 41.0082] }
  },
  {
    "name": "Sweden",
    "capital": "Stockholm",
    "region": "Europe",
    "GDP": 538,
    "population": 10099265,
    "currency": "Krona (SEK)",
    "flag": "/flags/sweden.png",
    geometry: { type: "Point", coordinates: [18.0686, 59.3293] }
  }
];

async function saveCountryData(){
  try {
    await Country.deleteMany({});
    initCountryData = initCountryData.map((obj)=>({...obj, author:'684b5d7778ff94b9b1eafe75'}));
    await Country.insertMany(initCountryData);
    console.log("Country data is saved");
  } catch (err){
    console.log("error inserting countries :", err);
  }
}


saveCountryData();
// addOrgData();