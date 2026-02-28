const sampleDives = [
  {
    id: 1,
    trip: "Cozumel 2/26",
    location: "Palancar Reef",
    date: "02/10/26",
    maxDepth: 90,
    underwaterTime: 50,
    beginningPsi: 3000,
    endingPsi: 500,
    gas: "Air",
    airTemp: 85,
    waterTemp: 82,
    visibility: "Great (60-100ft)",
    current: "Moderate",
    weight: 15
  },
  {
    id: 2,
    trip: "Cozumel 2/26",
    location: "Santa Rosa Wall",
    date: "02/11/26",
    maxDepth: 100,
    underwaterTime: 55,
    beginningPsi: 3000,
    endingPsi: 600,
    gas: "Nitrox 32%",
    airTemp: 86,
    waterTemp: 83,
    visibility: "Great (60-100ft)",
    current: "Weak",
    weight: 14
  },
  {
    id: 3,
    trip: "Roatan 6/24",
    location: "West End Wall",
    date: "02/12/26",
    maxDepth: 80,
    underwaterTime: 45,
    beginningPsi: 3000,
    endingPsi: 700,
    gas: "Air",
    airTemp: 88,
    waterTemp: 84,
    visibility: "Superb (100ft+)",
    current: "Moderate",
    weight: 16
  },
  {
    id: 4,
    trip: "Roatan 6/24",
    location: "Half Moon Bay",
    date: "02/13/26",
    maxDepth: 75,
    underwaterTime: 40,
    beginningPsi: 3000,
    endingPsi: 800,
    gas: "Nitrox 32%",
    airTemp: 87,
    waterTemp: 83,
    visibility: "Great (60-100ft)",
    current: "Weak",
    weight: 15
  }
];

if (!localStorage.getItem("dives")) {
  localStorage.setItem("dives", JSON.stringify(sampleDives));
}