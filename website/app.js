/* Global Variables */
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=`;

const apiKey = `&appid=e164cfd4904ab196c554b2d30002af48&units=imperial`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// get the button by the dom methods
let btn = document.getElementById("generate");
btn.addEventListener("click", triggerGenerate);

/* Function called by event listener */
function triggerGenerate() {
  let zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  // calling the async function
  weatherFetch(baseUrl, zip, apiKey).then((data) => {
    console.log(data);

    postData("/sendAll", {
      date: d,
      temp: data.list[0].main.temp,
      content: feelings,
    });
    fetchData();
  });
}
// Intializing the async & fetch function
let weatherFetch = async (url, zip, key) => {
  let response = await fetch(url + zip + key);
  try {
    let finalData = await response.json();
    return finalData;
  } catch (err) {
    console.log("error", err);
  }
};

/* Function to POST data */

let postData = async (url = "", data = {}) => {
  console.log(data);
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    let newData = await response.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log(err);
  }
};

/* Function to GET Project Data */

let fetchData = async () => {
  let request = await fetch("/all");

  try {
    let allData = await request.json();
    console.log(allData);
    document.getElementById("date").textContent = `Date: ${allData.date} `;
    document.getElementById(
      "temp"
    ).innerHTML = `Temp: <span class= "degrees">${Math.round(
      allData.temp
    )}</span> degrees `;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings:<span class="degrees"> ${allData.content}</span> `;
  } catch (err) {
    console.log("error:" + err);
  }
};
