let button = document.getElementById("button");

function fetchData() {
  axios
    .get("https://those-who-want-hard-apis.vercel.app/")
    .then((res) => {
      //Task - 1 - Show The Code Name For All Cities in Console
      let cityCodes = res.data.data.flights[0].results.apdet;
      console.log("cityCodes: ", cityCodes);

      let entry1 = document.getElementById("from-input").value;
      let entry2 = document.getElementById("to-input").value;
      let fromCity;
      let toCity;

      let cityCodeArr = Object.entries(cityCodes)
      console.log("cityCodeArr: ", cityCodeArr);

      for(let i = 0; i<cityCodeArr.length; i++){
        if(cityCodeArr[i][1].c == entry1){
          fromCity = (cityCodeArr[i][0])
          console.log("fromCity: ", fromCity);
        }
        if(cityCodeArr[i][1].c == entry2){
          toCity = cityCodeArr[i][0]
          console.log("toCity: ", toCity);
        }
      }

      let dataZero = res.data.data.flights[0].results.j;
      console.log("dataZero: ", dataZero);
      let dataOne = res.data.data.flights[1].results.j;
      console.log("dataOne: ", dataOne);
      let filteredArray = [];
      console.log("filteredArray: ", filteredArray);
      for (let i = 0; i < res.data.data.flights.length; i++) {
        for(let j = 0; j<res.data.data.flights[i].results.j.length; j++){
          if(res.data.data.flights[i].results.j[j].leg[0].flights[0].fr == fromCity 
            && 
            res.data.data.flights[i].results.j[j].leg[0].flights[0].to == toCity){
            filteredArray.push(res.data.data.flights[i].results.j[j].leg[0].flights[0])
          }
        }
      }
      console.log("filteredArray: ", filteredArray);
      
      let contentContainer = document.getElementById("container")

      let output = '';
      if(filteredArray.length==0){
        output = `<p>NO FLIGHTS FOUND</p>`
        contentContainer.innerHTML = output;
      }else if(filteredArray.length>0){
        for(let i = 0; i<filteredArray.length; i++){
          output +=`<div id="flight-info">
          <p>Date:${filteredArray[i].dd} </p>
          <p>${filteredArray[i].fr}(${filteredArray[i].dt}) ————> ${filteredArray[i].to} (${filteredArray[i].at})</p>
          <p>${filteredArray[i].eq}</p>
          <p>Class:${filteredArray[i].cc}/${filteredArray[i].fbn}</p>
          <p>Flight Number:${filteredArray[i].fn}</p>
          </div>`
          contentContainer.innerHTML = output;
        }
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
}
// fetchData()
button.addEventListener("click", fetchData);

//where to search 

// console.log("search ", res.data.data.flights[0].results.j[0].leg[0].flights[0]);
// console.log("imp",Object.entries(cityCodes));
// let temp= (res.data.data.flights[0].results.apdet)
// console.log("temp: ", temp);
