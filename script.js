
function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
const sampledata = {
  "info": {
    "category": "Billboard",
    "chart": "HOT 100",
    "date": "2019-05-11",
    "source": "Billboard-API"
  },
  "content": {
    "1": {
      "rank": "1",
      "title": "Old Town Road",
      "artist": "Lil Nas X Featuring Billy Ray Cyrus",
      "weeks at no.1": "5",
      "last week": "1", 
      "peak position": "1",
      "weeks on chart": "9",
      "detail": "same"
    },
    "2": {
      "rank": "2",
      "title": "ME!",
      "artist": "Taylor Swift Featuring Brendon Urie",
      "last week": "100",
      "peak position": "2",
      "weeks on chart": "2",
      "detail": "up"
    },
    "3": {
      "rank": "3",
      "title": "Wow.",
      "artist": "Post Malone",
      "last week": "2",
      "peak position": "2",
      "weeks on chart": "19",
      "detail": "down"
    },
    "4": {
      "rank": "4",
      "title": "Sucker",
      "artist": "Jonas Brothers",
      "last week": "5",
      "peak position": "1",
      "weeks on chart": "9",
      "detail": "up"
    },
    "5": {
      "rank": "5",
      "title": "Sunflower (Spider-Man: Into The Spider-Verse)",
      "artist": "Post Malone & Swae Lee",
      "last week": "3",
      "peak position": "1",
      "weeks on chart": "28",
      "detail": "down"
    },
    "6": {
      "rank": "6",
      "title": "7 Rings",
      "artist": "Ariana Grande",
      "last week": "4",
      "peak position": "1",
      "weeks on chart": "15",
      "detail": "down"
    },
    "7": {
      "rank": "7",
      "title": "Without Me",
      "artist": "Halsey",
      "last week": "6",
      "peak position": "1",
      "weeks on chart": "30",
      "detail": "down"
    },
    "8": {
      "rank": "8",
      "title": "Dancing With A Stranger",
      "artist": "Sam Smith & Normani",
      "last week": "7",
      "peak position": "7",
      "weeks on chart": "16",
      "detail": "down"
    },
    "9": {
      "rank": "9",
      "title": "Bad Guy",
      "artist": "Billie Eilish",
      "last week": "9",
      "peak position": "7",
      "weeks on chart": "5",
      "detail": "same"
    },
    "10": {
      "rank": "10",
      "title": "Talk",
      "artist": "Khalid",
      "last week": "8",
      "peak position": "8",
      "weeks on chart": "12",
      "detail": "down"
    },
    // Add the rest of the sample data here...
  }
}

async function fetchData() {
  try {
    const jsonified = sampledata;
    const artistOneWeeks = jsonified.content['1']['weeks on chart'];
    const artistTwoWeeks = jsonified.content['2']['weeks on chart'];
    console.log("Artist One Weeks:", artistOneWeeks);
    console.log("Artist Two Weeks:", artistTwoWeeks);
    // adjustSVGHeights(artistOneWeeks, artistTwoWeeks);
  } catch (error) {
    console.error(error);
  }
}

const svgIDs = [
  "First_B_First_Line",
  "First_B_Second_Line",
  "First_B_Third_Line",
  "First_B_Fourth_Line",
  "First_B_Fifth_Line",
  "First_L_First_Line",
  "First_L_Second_Line",
  "First_L_Third_Line",
  "First_L_Fourth_Line",
  "First_L_Fifth_Line",
  "Second_L_First_Line",
  "Second_L_Second_Line",
  "Second_L_Third_Line",
  "Second_L_Fourth_Line",
  "Second_L_Fifth_Line",
  "Second_B_First_Line",
  "Second_B_Second_Line",
  "Second_B_Third_Line",
  "Second_B_Fourth_Line",
  "Second_B_Fifth_Line",
  "Third_B_First_Line",
  "Third_B_Second_Line",
  "Third_B_Third_Line",
  "Third_B_Fourth_Line",
  "Third_B_Fifth_Line"
];

function adjustSVGHeights(artistOneWeeks, artistTwoWeeks) {
  const low1 = 1;
  const high1 = 30;
  const low2 = 50;  // Adjusted lower bound of mapped range
  const high2 = 200;  // Adjusted upper bound of mapped range

  // Calculate the scaleY value based on the weeks on chart
  const scaleYArtistOne = map(artistOneWeeks, low1, high1, low2, high2);
  const scaleYArtistTwo = map(artistTwoWeeks, low1, high1, low2, high2);

  console.log("ScaleY Artist One:", scaleYArtistOne);
  console.log("ScaleY Artist Two:", scaleYArtistTwo);

  const allPathCoordinates = extractAllPathCoordinates();

  allPathCoordinates.forEach((coordinates, index) => {
    const scaledHeight = index % 2 === 0 ? scaleYArtistOne : scaleYArtistTwo; // Alternating between two artists

    // Adjust the y-coordinates of the path dynamically based on the scaled height
    const newY1 = coordinates.V1y * scaledHeight / 150;
    const newY2 = coordinates.V2y * scaledHeight / 150;

    // Update the path with the new coordinates
    const newPath = `M ${coordinates.Mx} ${newY1} H ${coordinates.H1x} V ${newY2} H ${coordinates.H2x} V ${coordinates.V2y} Z`;

    const svgElement = document.getElementById(svgIDs[index]);
    svgElement.setAttribute('d', newPath);
  });
}

// Function to extract coordinates from a path's 'd' attribute
function extractCoordinates(dAttribute) {
    // Split the 'd' attribute by spaces and/or commas
    const parts = dAttribute.split(/[\s,]+/);
    const coordinates = {
        Mx: parts[1],
        My: parts[2],
        H1x: parts[4],
        V1y: parts[6],
        H2x: parts[8],
        V2y: parts[10]
    };

    return coordinates;
}

// Function to iterate through all paths and extract their coordinates
function extractAllPathCoordinates() {
    const paths = document.querySelectorAll('.animLine');
    const allCoordinates = [];
    paths.forEach(path => {
        const dAttribute = path.getAttribute('d');
        const coordinates = extractCoordinates(dAttribute);
        allCoordinates.push(coordinates);
    });

    return allCoordinates;
}

// Extract and log all path coordinates
const allPathCoordinates = extractAllPathCoordinates();
// const apiWeeks = [];
// fetchWeeksData();
// async function fetchWeeksData () {
// fetch('your-api-whatever')
//    .then((data) => {
//        for (let i = 0; i < 25; i++) {
//          const element = data['content'][i + '']['weeks on chart'];
//          apiWeeks.push(element)
//        }
//    })
//}
console.log(allPathCoordinates)
const maxYPosition = -150;
const minYPosition = 150;

const maxWeeks = 30;
function findMaxInArray (array) {
  let currentMax = -99999;
  array.forEach((item) => {
    currentMax = Math.max(item, currentMax);
  })
}
const minWeeks = 2;

svgIDs.forEach((id, index) => {
  const svgElement = document.getElementById(id);
  const associatedPoints = allPathCoordinates[index];
  const scaledMaxY = 12;
  const loopedIndex = index % 10 + 1;
  const associatedData = sampledata['content'][loopedIndex + '']['weeks on chart'];
  // const asssociatedAPIData = apiWeeks[index];
  const newScaledStartY = map(parseInt(associatedData),minWeeks,maxWeeks, maxYPosition, minYPosition)
  const newPoints = {
    newMx: associatedPoints.Mx,
    newMy: newScaledStartY,
    newH1x: associatedPoints.H1x,
    newH2x: associatedPoints.H2x,
    newV1y: associatedPoints.V1y,
    newV2y: associatedPoints.V2y,
  }

  const newPath = `M ${newPoints.newMx} ${newPoints.newMy} H ${newPoints.newH1x} V ${newPoints.newV1y} H ${newPoints.newH2x} V ${newPoints.newV2y} Z`;
  console.log(associatedData)
  svgElement.setAttribute('d',newPath)
});

// Call fetchData to initiate the process
fetchData();