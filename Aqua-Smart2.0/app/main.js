
window.onload = () => { 
  const isLoggedIn = checkLogin()
  if(isLoggedIn){
    usersPage()      
 
  } else  {
    mainPage()  

  } 

}


function buttonP() {                              //Logout function
  console.log('initializing main document...');
  document.getElementById('logout').addEventListener('click', logoutt);
}

function logoutt(){           // Log out function
  //console.log("closed")
  localStorage.removeItem("jwt");
  localStorage.removeItem("email");
  location.reload();
}

const personalInformation = async () => {           //  With this arrow function, we will get the personal information about the user from MongoDB
  const response = await fetch('/users', {          // Call fetch to get all about the users
    headers: {
      Authorization: localStorage.getItem('jwt')    // Give acces to the unique token
    }
  })
  const email = localStorage.getItem('email');      // Contains email of the user who logged in

  const users = await response.json()               // Get all of the users and set as "json"
  
  users.forEach(element => {                        // This forEach will find the information for an specific user with the email
    if (element.email == email){
      console.log(element)
      document.getElementById('firstname').textContent =  'Nombre: ' +  element.name + ' ' + element.lastname        // Print firstname
      document.getElementById('emailps').textContent =  'Email: ' +  element.email        // Print Password
      document.getElementById('passps').textContent =  'Password: ' + '********'       // Print Password
      document.getElementById('tampecera').textContent =  'tampecera: ' +  element.tampecera        // Print Password
 }
  });
}



 
  // f u n c i o n a l

const updateUser = async () => {           //  With this arrow function, we will get the personal information about the user from MongoDB
  console.log('123');
  let  users;
try{
  const response = await fetch('/users', {          // Call fetch to get all about the users
    headers: {
      Authorization: localStorage.getItem('jwt')    
    }
  })
  const email = localStorage.getItem('email');      // Contains email of the user who logged in
  const users = await response.json()               // Get all of the users and set as "json"
  
  users.forEach(element => {                        // This forEach will find the information for an specific user with the email
    if (element.email == email){
      console.log(element)
      
        const userNode = document.getElementById('change-information')
        userNode.onclick = async e => {      
         // e.preventDefault()     
          
          const name = document.getElementById('firstname1').value
          console.log(name);
          const lastname = document.getElementById('lastname2').value
          console.log(lastname)
          const email2 = document.getElementById('email3').value
          console.log(email2);
          //const passwordChanged = document.getElementById('password4').value
          //console.log(passwordChanged);
         //const newPassword = bcrypt.hash(passwordChanged);

          const newUser={
            name: name,
            lastname: lastname,
            email: email2,
          //  password: newPassword
          }


          console.log(newUser);
          console.log('JSON : ', JSON.stringify(newUser));
          try{
            
            await fetch(`/users/${element._id}`, {                             
                method: 'PATCH',      
                body: JSON.stringify(newUser),                                     
                headers: {
                Authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json'              
                },
              }
            
          ) 
        
          }catch(error){
            console.log(error)
          }  
        localStorage.setItem('email', email2)                  
        alert('Information updated it');
      } 
    }
    });
  }catch(error){
    console.log(error)
}
}

const getUsers = async () => {                      //  With This arrow function, we will see the information about the users from our database MongoDB
  const response = await fetch('/users', {        // Fetch to our API "/users"
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })
  
  const users = await response.json()             // We convert the result of the fetch in "JSON type"
  console.log(users)                              // In this template, we will define the structure to display
  const template = user => `                      
  <li>
      ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
  </li>
    `
  const userList = document.getElementById('user-list')                   // Find the ID from the template that we want to display the information
  userList.innerHTML = users.map(user => template(user)).join('')         // Display the information
  users.forEach(user => {                                                 // Set fetch to each user to delete them  
      const userNode = document.querySelector(`[data-id="${user._id}"]`)  // Get the user id
      userNode.onclick = async e => {                                     // If this button is clicked then remove the user from MongoDB
          await fetch(`/users/${user._id}`, {                             // Call the api method to get the user from MongoDB with their id
              method: 'DELETE',                                           // with "method:" we need to define what parameters we want to use, in this case we want to delete an user, so the method is "DELETE"
              headers: {
              Authorization: localStorage.getItem('jwt')                  // Give acces to the unique credentials
              }
          })
          userNode.parentNode.remove()                                    // Remove the user from MongoDB       
          alert('Elimiminado con exito')                                  //  Send a little message to the user 
      }
  });
}





const checkLogin = () =>      
localStorage.getItem('jwt')     // Get the unique token

const usersPage = () => {       // This arrow function will display the template for the user logged in
  
  loadInitialTemplate()
  addFormListener()
  //getUsers()
  personalInformation()
  updateUser()
  //getDataTemperature()  
  gotoChart1Listener()
  gotoChart2Listener()
  gotoModule1Listener()
  gotoModule2Listener()
  getDuringDayData()
  //getDht11OneData()
  //getLightSensorLastStatus()
  //getDht11Data()
  //getLightSensorData()
  //getPerson()
  //getHardwareUsed()
  //getRoom1Data()                      //Room 1 data
  //getRoom2Data()                      //Room 2 data
  
  
  //getAllDataFromChart()                //All data from CHARTS
      
    //getRoom2GetDate5() 
  //getInfrarredSensorData()
  //getFingerprintData()
  const email = localStorage.getItem('email');
  console.log(email);
}



const authListener = action => () => {                      // Authincate user
  const form = document.getElementById(`${action}-form`)
  form.onsubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch(`/${action}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

     const responseData = await response.text()
     console.log(responseData);
     if (response.status >= 300){
        const errorNode= document.getElementById('error')
        errorNode.innerHTML = responseData
     } else {
        var em = document.getElementById('password').value;
        localStorage.setItem('email', em);
        localStorage.setItem('jwt', `Bearer ${responseData}`)
        usersPage()
     }
}
}



const addFormListener = () =>{                                  // This arrow function is the main page if the user is logged in                         
  const userForm = document.getElementById('user-form')       // Get the template HTML
  userForm.onsubmit = async (e) => {
      e.preventDefault()                                      // Prevent the evente restart page
      const formData = new FormData(userForm)
      const data = Object.fromEntries(formData.entries())
      console.log(data)
      await fetch('/users',{                                  // This fetch will display information about the user
          method: 'POST',                                     // In this case, we are using the method "POST" because we want to see information about the user
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',             // Here we have a new functions, which will return a JSON object containing
              Authorization: localStorage.getItem('jwt')      // Give acces to the unique token

          }
      })
      userForm.reset()   // Reset the FORM
      getUsers()        // Get the users list
    
  }
}

/* ------------------------T E M P L A T E S     P A  G  E --------------------*/

const registerPage = () => {            // This arrow function will get the template to register users 
  console.log('Pagina de registro');
  loadRegisterTemplate()                // Load the template to register users
  var em = document.getElementById('password').value;
  localStorage.setItem('email', em);
  addRegisterListener()                 // Call the api "/register"
  gotoLoginListener()                   // Call the function to go to the login page
  gotoMainListener()
  
}

const loginPage = () => {             // This arrow function will display the template to login in 
      loadLoginTemplate()              // Load the template     
      var em = document.getElementById('password').value;
      localStorage.setItem('email', em);
      addLoginListener()              // Call the api "login"
      gotoRegisterListener()          // This button will register to the register page 
      gotoMainListener()
}

const mainPage = () => {
  loadMainTemplate()
  gotoLoginListener() 
  //loginPage() 
  gotoRegisterListener() 
  //gotoUpdateListener()
}

var variable
var variable2

const chart1Page = () => {
  
  loadChart1Template()
  gotoUsersPageListener()
  gotoChart2Listener()
  gotoModule1Listener()
  //creategrapich()
  //getDataTemperature()  // get last 5 data
  //getDht11Data()
  getDth11DataRoom1FiveDays()
  getDth11DataRoom1AllDays()
  TimeRealCountGrapichHumedityRoom1()
  //repetirCadaSegundo()
  buttonP()
  variable = creategrapich()
  variable2 = creategrapichTemperatureRoom1()
}

const chart2Page = () => {
  loadChart2Template()
  gotoUsersPageListener()
  gotoChart1Listener()
  gotoModule1Listener()
  gotoModule2Listener()
  buttonP()
 
  
}

const module1Page = () => {
  loadModule1Template()
  gotoUsersPageListener()
  gotoChart1Listener()
  gotoChart2Listener()
  gotoModule2Listener()
  //getDht11OneData()
  //TiempoRealTemperaturaHumedad();
  //getDht11OneData2()
  //getLightSensorLastStatus()
  //TiempoRealLight()
  getDth11DataRoom1()                 // ROOM 1 TEMPERATURE AND HUMIDITY  
  getDuringDayData()                  //During day data people
  TimeRealCont()
  TimeRealCountHallway()
  getHallwayData()                    //Hallway data
  TimeRealCountHallwayIn()
  changeCheckbox()
  getDth11DataRoom2()                // ROOM 2 TEMPERATURE AND HUMIDITY 
  TimeRealCountRoom2()
  getOneDataLightRoom1()
  getOneDataLightRoom2()
  TimeRealCountLightRoom1()
  TimeRealCountLightRoom2()
  //TiempoRealTemperaturaHumedad()
  //getDht11Data()
  //repetirCadaSegundo2()
  buttonP()
  
}

const module2Page = () => {
  loadModule2Template()
  gotoUsersPageListener()
  gotoChart1Listener()
  gotoChart2Listener()
  gotoModule1Listener()
  buttonP()

}


/* ------------------------E N D   T E M P L A T E S     P A  G  E --------------------*/

const getPerson = async () => {                      
  const response = await fetch('/person', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })


  
  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
    console.log(element)
      

  });
  
  //getDataTemperature() = setInterval(10000);
}



/* - - - - - - - - -   C H A R T S   F U N C T I O N S  - - - - - - - - - */

// 

var datoanterior;
var datoanteriorhumidity;
var conteoprincipalglobal;

function creategrapich()
{
  
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx,{
    type: 'bar',
    data:{
      datasets: [{
        label: 'Stocks de productos',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        showLine: true,
        spanGaps: true

      }]

    },
    options:{
      scales:{
        y:{
          beginAtZero:true
        }
      }
    }
    
  })
  return myChart;
}


function creategrapichTemperatureRoom1()
{
  var ctx2 = document.getElementById('myChartTemperatureRoom1');
  var myChart2 = new Chart(ctx2,{
    type: 'bar',
    data:{
      datasets: [{
        label: 'Stocks de productos',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        showLine: true,
        spanGaps: true

      }]

    },
    options:{
      scales:{
        y:{
          beginAtZero:true
        }
      }
    }
    
  })
  return myChart2;
}

//Metodo principal
const getDataTemperature = async () => {                      
  const response = await fetch('/dht11_sensor/allDataChart', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })
  
  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
    console.log(element)
  //  console.log(variable);
    //console.log(myChart)
    //console.log(variable)
    
    variable.data['labels'].push(element.date)
    variable.data['datasets'][0].data.push(element.humidity)
    
  });
  
  variable.update();
  // Cantidad de claves almacena la primera cantidad de datos del json cuando inicia
  var cantidadDeClaves = Object.keys(data).length;
  datoanterior = cantidadDeClaves;
  
 // console.log(cantidadDeClaves);
  
  //getDataTemperature() = setInterval(10000);
}




// Con esto tomamos en tiempo real los datos de mongo.

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
identificadorIntervaloDeTiempo = setInterval(getDataTemperatureTimeReal, 5000);
}
/*
let identificadorIntervaloDeTiempoHumidity;
function repetirCadaSegundo2() {
  identificadorIntervaloDeTiempoHumidity = setInterval(getDht11Data2, 5000);
  }
*/
// Metodo que busca cada cierto tiempo
const getDataTemperatureTimeReal = async () =>
{
  const response2 = await fetch('/dht11_sensor/allDataChart', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })


  const data2 = await response2.json()             
  //console.log(data)                            
  data2.forEach(element => {
  
  
  });

  var cantidadDeClaves2 = Object.keys(data2).length;
  // CantidadDeClaves 2 toma el valor cada 5 segundos de mongo.
  console.log('datos mongo tiempo real: '+ cantidadDeClaves2);
  console.log('datos mongo cuando inicia: ' +datoanterior);

  // CantidaddeClave 1 toma el valor anterior.
  if (cantidadDeClaves2 != datoanterior)
  {
    data2.forEach(element => {
      variable.data['labels'].push(element.date)
      variable.data['datasets'][0].data.push(element.humidity)
    });
    variable.update();
    datoanterior = cantidadDeClaves2;
  }

}



const getAllDataFromChart = async () => {                    
  const response = await fetch('/dht11_sensor/allDataChart', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}






// 


/*const getDht11Data = async () => {                      
  const response = await fetch('/dht11_sensor', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     document.getElementById('value-humedity').textContent = element.humidity;
  });
  var cantidadDeClaves = Object.keys(data).length;
  datoanteriorhumidity = cantidadDeClaves;
  
  //getDataTemperature() = setInterval(10000);
}


/*


const getDht11Data2 = async () => {                      
  const response2 = await fetch('/dht11_sensor', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data2 = await response2.json()             
  //console.log(data)                            
  data2.forEach(element => {
     console.log(element.humidity)
  });
  
  var cantidadDeClaves2 = Object.keys(data2).length;
  console.log('datos mongo tiempo real: '+ cantidadDeClaves2);
  console.log('datos mongo cuando inicia: ' +datoanteriorhumidity);
  //getDataTemperature() = setInterval(10000);
/*
  if (cantidadDeClaves2 != datoanterior)
  {
    data2.forEach(element => {
      document.getElementById('value-humedity').textContent = element.humidity;

    });
  }
  
}
*/



let conteoTemperaturaHumedad = 0;
let conteoLuces = 0;


function TiempoRealTemperaturaHumedad() {

conteoTemperaturaHumedad =  setInterval(getDht11OneData2, 10000);
 
}
function TiempoRealLight() {

  conteoLuces =  setInterval(getLightSensorLastStatusTimeReal, 10000);
   
  }


const getDht11OneData = async () => {          
  const response = await fetch('/dht11_sensor_oneValue', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     /*console.log(element)
     console.log('humidity: ' + element.humidity)
     console.log('Temperature: ' + element.temperature)


     document.getElementById('value-humidity').textContent = element.humidity;
     document.getElementById('value-temperature').textContent = element.temperature;*/
  });
  console.log()
  if (document.getElementById('value-humidity').textContent >= 30)
  {
     document.getElementById('text-humedity').textContent = 'Warning';
  }
  var conteoprincipal = Object.keys(data).length;
  conteoprincipalglobal = conteoprincipal;
  console.log(conteoprincipalglobal)
  //getDataTemperature() = setInterval(10000);
}






const getDht11OneData2 = async () => {                      
  const response = await fetch('/dht11_sensor_oneValue', {       
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     document.getElementById('value-humidity').textContent = element.humidity;
     document.getElementById('value-temperature').textContent = element.temperature;
     
  
  });
 
  
}



// Conteo real temperatura y humedad



//










const getLightSensorData = async () => {                    
  const response = await fetch('/light_sensor', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}

const getLightSensorLastStatus = async () => {                    
  const response = await fetch('/light_sensor/lastStatus', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
  });

}

const getLightSensorLastStatusTimeReal = async () => {                    
  const response = await fetch('/light_sensor/lastStatus', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
  });

}




const getHardwareUsed = async () => {                    
  const response = await fetch('/hardware', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}



/*     ----------------PEOPLE IN THE ROOM---------------  */

const getRoom1Data = async () => {                    
  const response = await fetch('/storage_room/room1', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     
  });

}

const getRoom2Data = async () => {                    
  const response = await fetch('/storage_room/room2', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     /*
   
     */
  });

}   


const getRoom2GetDate5 = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room2get5', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}   





/*   -----------------END  PEOPLE IN THE ROOM-------------------  */


const getInfrarredSensorData = async () => {                    
  const response = await fetch('/infrarred', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}


const getFingerprintData = async () => {                    
  const response = await fetch('/fingerprint', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

  });

}  

// Conteo en tiempo real variables.

let conteoRealRoom1 = 0;
let conteoRealGrapichHumedityRoom1 = 0;
let conteoRealHallway = 0;
let conteoRealHallwayIn = 0;
let conteoRealRoom2 = 0;
let conteoLighRealTimeRoom1 = 0
let conteoLighRealTimeRoom2 = 0
function TimeRealCont() {

conteoRealRoom1 =  setInterval(getDth11DataRoom1RealTime, 10000);
 
}
function TimeRealCountGrapichHumedityRoom1() {

  conteoRealGrapichHumedityRoom1 =  setInterval(getDth11DataRoom1AllDaysTimeReal, 10000);
 
}

function TimeRealCountHallway() {

  conteoRealHallway =  setInterval(getDuringDayDataTimeRealHallwey, 10000);
 
}

function TimeRealCountHallwayIn() {

  conteoRealHallwayIn =  setInterval(getHallwayDataTimeReal, 10000);
 
}

function TimeRealCountRoom2() {

  conteoRealRoom2 =  setInterval(getDth11DataRoom2TimeReal, 10000);
 
}

function TimeRealCountLightRoom1() {

  conteoLighRealTimeRoom1 =  setInterval(getOneDataLightRoom1TimeReal, 10000);
 
}

function TimeRealCountLightRoom2() {

  conteoLighRealTimeRoom2 =  setInterval(getOneDataLightRoom2TimeReal, 10000);
 
}

// Hallway people in



const getHallwayData = async () => {                    
  const response = await fetch('/storage_room/hallway', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
    console.log(element.people_in)   
    document.getElementById('value-people-in-hallway').textContent = element.people_in;
  });

}

const getHallwayDataTimeReal = async () => {                    
  const response = await fetch('/storage_room/hallway', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
      
    document.getElementById('value-people-in-hallway').textContent = element.people_in;
  });

}
//

// Hallway people



function changeCheckbox()
{
var checkbox = document.getElementById("main-checkbox");
checkbox.addEventListener("change", validarCheckbox, false);


function validarCheckbox(){
  var checked = checkbox.checked;  
  if(checked)
  {
    alert('Checkbox Seleccionado');
    getNamePeopleHallway();
  }
}
}


// HallWay Names People
let ArrayPerson = []
/*
const getNamePeopleHallway = async () => {                    
  const response = await fetch('/storage_room/duringDayPeople', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })
  let person;
  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     for(person=0; person<1;person++)
      console.log(element.names_of_people_that_got_in[i].first_names)
  });

  
  

}
*/
// End HallWay names People

 // Aqui es donde no funciona xd
const getDuringDayData = async () => {                    
  const response = await fetch('/storage_room/duringDayPeople', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })
  const data = await response.json()             
  //console.log(data)   
 // comparador = 0;
  data.forEach(element => {
     console.log(element)
   

  });


}



// End hallway people


const getDth11DataRoom1 = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     console.log('humidity: ' + element.humidity)
     console.log('Temperature: ' + element.temperature)

     document.getElementById('value-humidity').textContent = element.humidity;
     document.getElementById('value-temperature').textContent = element.temperature;
     document.getElementById('value-people-in').textContent = element.MainStorage.people_in;
  });

}



const getDth11DataRoom1RealTime = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     console.log('humidity: ' + element.humidity)
     console.log('Temperature: ' + element.temperature)
     console.log('People in: ' + element.MainStorage.people_in)

     document.getElementById('value-humidity').textContent = element.humidity;
     document.getElementById('value-temperature').textContent = element.temperature;
     document.getElementById('value-people-in').textContent = element.MainStorage.people_in;


  });

} 


// One date Sensor Light

const getOneDataLightRoom1 = async () => {                    
  const response = await fetch('/light_sensor/OneDataLightRoom1', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
  });

}

const getOneDataLightRoom1TimeReal = async () => {                    
  const response = await fetch('/light_sensor/OneDataLightRoom1', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log('room1 light ' + element.lightStatus)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light').textContent = 'TURN ' + element.lightStatus
     }
  });

}


// End One date Sensor Light


// All day Room 1.




// End all day Room 1 

const getDth11DataRoom1AllDays = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1getAllDay', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
  
    });
  
  // Cantidad de claves almacena la primera cantidad de datos del json cuando inicia
  var cantidadDeClaves = Object.keys(data).length;
  datoanterior = cantidadDeClaves;

}

const getDth11DataRoom1AllDaysTimeReal = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1getAllDay', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
    // console.log(element)
  
    });

  var cantidadDeClaves2 = Object.keys(data).length;
  // CantidadDeClaves 2 toma el valor cada 5 segundos de mongo.
  console.log('datos mongo tiempo real: '+ cantidadDeClaves2);
  console.log('datos mongo cuando inicia: ' +datoanterior);

  // CantidaddeClave 1 toma el valor anterior.
  if (cantidadDeClaves2 != datoanterior)
  {
    getDth11DataRoom1FiveDaysTimeReal();
    datoanterior = cantidadDeClaves2; 
  }
  
  // Cantidad de claves almacena la primera cantidad de datos del json cuando inicia


}


let arrayInvertedDataDate = []
let arrayInvertedDataHum = []
let arrayInvertedDataTemp = []
let humInver ;
let dateInver;
let tempInver;

// Five days Room 1.
const getDth11DataRoom1FiveDays = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1get5', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()      

  data.forEach(element => {
   arrayInvertedDataDate.push(element.date)
   arrayInvertedDataHum.push(element.humidity)
   arrayInvertedDataTemp.push(element.temperature)
   
 });

  humInver = arrayInvertedDataHum.reverse();
  dateInver = arrayInvertedDataDate.reverse();
  tempInver = arrayInvertedDataTemp.reverse();

  humInver.forEach(element => {
      variable.data['datasets'][0].data.push(element)
  });

  dateInver.forEach(element => {
    variable.data['labels'].push(element)
    variable2.data['labels'].push(element)
  });

  tempInver.forEach(element =>{
    variable2.data['datasets'][0].data.push(element)
  });
  arrayInvertedDataDate = []
  arrayInvertedDataHum = []
  arrayInvertedDataTemp = []
  humInver = []
  dateInver = []
  tempInver = []

  
  variable.update();
  variable2.update();
  

  // Cantidad de claves almacena la primera cantidad de datos del json cuando inicia


}

const getDth11DataRoom1FiveDaysTimeReal = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room1get5', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })
  variable2.destroy() 
  variable.destroy();
  variable = creategrapich()
  variable2 = creategrapichTemperatureRoom1()
  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
    console.log(element)
    arrayInvertedDataDate.push(element.date)
    arrayInvertedDataHum.push(element.humidity)
    arrayInvertedDataTemp.push(element.temperature)

  });
  
 
   humInver = arrayInvertedDataHum.reverse();
   dateInver = arrayInvertedDataDate.reverse();
   tempInver = arrayInvertedDataTemp.reverse();

   humInver.forEach(element => {
       variable.data['datasets'][0].data.push(element)
   });
 
   dateInver.forEach(element => {
    variable.data['labels'].push(element)
    variable2.data['labels'].push(element)
   });
   tempInver.forEach(element =>{
    variable2.data['datasets'][0].data.push(element)
  });
  variable.update();
  variable2.update();
  arrayInvertedDataDate = []
  arrayInvertedDataHum = []
  arrayInvertedDataTemp = []
  humInver = []
  dateInver = []
  tempInver = []

  // Cantidad de claves almacena la primera cantidad de datos del json cuando inicia

}


// end five day




// Grapich Temperature Time real Start



// End second grapihc


const getDth11DataRoom2 = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room2', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     console.log('humidity room 2: ' + element.humidity)
     console.log('Temperature room 2: ' + element.temperature)

     document.getElementById('value-humidity-room2').textContent = element.humidity;
     document.getElementById('value-temperature-room2').textContent = element.temperature;
     document.getElementById('value-people-in-room2').textContent = element.SecondStorage.people_in;
  });

} 

const getDth11DataRoom2TimeReal = async () => {                    
  const response = await fetch('/dht11_sensor/dht11Room2', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)

     console.log('humidity: ' + element.humidity)
     console.log('Temperature: ' + element.temperature)

     document.getElementById('value-humidity-room2').textContent = element.humidity;
     document.getElementById('value-temperature-room2').textContent = element.temperature;
     document.getElementById('value-people-in-room2').textContent = element.SecondStorage.people_in;
  });

} 


const getOneDataLightRoom2 = async () => {                    
  const response = await fetch('/light_sensor/OneDataLightRoom2', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status-room2').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light-room2').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status-room2').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light-room2').textContent = 'TURN ' + element.lightStatus
     }
  });

}

const getOneDataLightRoom2TimeReal = async () => {                    
  const response = await fetch('/light_sensor/OneDataLightRoom2', {
    headers: {                                    // headers allow define parameters
      Authorization: localStorage.getItem('jwt')  // With this line of code, we are giving acces to get "jwt" that is the unique token from users
    }
  })

  const data = await response.json()             
  //console.log(data)                            
  data.forEach(element => {
     console.log(element)
     if (element.lightStatus == 'ON')
     {
        document.getElementById('light-status-room2').className = 'fas fa-lightbulb turn-on'
        document.getElementById('content-light-room2').textContent = 'TURN ' + element.lightStatus
     }
     else
     {
      document.getElementById('light-status-room2').className = 'fas fa-lightbulb turn-off'
      document.getElementById('content-light-room2').textContent = 'TURN ' + element.lightStatus
     }
  });

}





 /*- - - - - - - - -   E N D   C H A R T S   F U N C T I O N S  - - - - - - - - -  */


/*
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
                            E N D     S E C T I O N     F U N C T I O N           keyword: section1End
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
*/





/*
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
                            S T A R T     S E C T I O N     T E M P L A T E         keyword: section2
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
*/

const loadMainTemplate = () =>{         // notFound.html
 const template = `<link rel="stylesheet" href="css/style.css">
 <nav class="back navbar navbar-dark  fixed-top ">
 <div class="container-fluid">
   <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
   <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
     <span class="navbar-toggler-icon"></span>
   </button>
   <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
     <div class="back offcanvas-header">
       <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
       <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
     </div>
     <div class="back offcanvas-body">
       <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
         <li class="nav-item">
           <a class="nav-link active dis-menu" aria-current="page" href="#" id="main">Home</a>
         </li>
         
         <li class="nav-item">
           <a class="nav-link dis-menu" href="#" id="login">Login</a>
           
         </li>
         <li class="nav-item">
           <a class="nav-link dis-menu" href="#" id="register">Register</a>
         </li>
       </ul>
     </div>
   </div>
 </div>
</nav>


      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" >
            <div class="container-dis">
            <img src="img/img1 (1).jpg" class="d-block w-100" alt="...">
          </div>
            <div class="carousel-caption d-none d-md-block">
              <h5>Welcome to Aqua-Smart</h5>
              <p>100% efficient service against any anomaly, a sophisticated system, intuitive to any user.

                We have a wide range of services for a successful monitoring.</p>
            </div>
          </div>
          <div class="carousel-item"  data-bs-interval="3000">
            <div class="container-dis">
              <img src="img/img1 (2).jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-caption d-none d-md-block">
              <h5>DO YOU WANT TO HAVE A SMART FISH TANK IN YOUR HOME?</h5>
              <p>Aqua-Smart offers you an app to monitor your smart fish tank. 

                What are you waiting for?
                Do it now</p>
                <p class="primary-button"><a href="#" class="  mt3 ">Contact Us</a></p>
            </div>
          </div>
          <div class="carousel-item" >
            <div class="container-dis">
            <img src="img/img1 (3).jpg" class="d-block w-100" alt="...">
          </div>
            <div class="carousel-caption d-none d-md-block">
              <h5>TIRED OF MANUALLY MONITORING YOUR FISH TANK?</h5>
              <p>Aqua-Smart offers you a monitoring application so that your fish are in a pleasant environment. 

                What are you waiting for?
                Do it now and get access to our modern system.</p>
              <p class="primary-button"><a href="#" class="">Register</a></p>  
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <div class="content-img">
                  <img src="img/dis1.jpg" alt="">
                </div>
                <div class="cnt">
                <h5 class="card-title">Mission</h5>
              </div>
                <p class="card-text">Our mission is to create smart fish tanks that offer a safe environment for fishes and other organisms. 
                Through integrating different technologies, we want to make the process of fish tank maintenance easier, 
                bringing fish enthusiasts and nature lovers a unique experience. We make an effort to promote 
                the preservation of aquatic ecosystems by making awareness of marine life and the importance of it to our planet.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <div class="content-img">
                  <img src="img/dis2.jpg" alt="">
                </div>
                <div class="cnt">
                <h5 class="card-title">Vision</h5>
                </div>
                <p class="card-text">Our vision is to become global leaders in design, development, and comertialization of smart fish talks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-row">
      <div class="container-title">
        <p>Founders</p>
      </div>
   <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <div class="card-dis">      <div class="imgBX">
        <img src="img/Javier.jpeg" alt="">
    </div>
      <div class="content-card card-body dis-founder">
        <div class="content-details">
          <br>
          <br>
          <h5 class="card-title">Javier De La Cruz Polanco</h5>
          <br>
          <br>
          <p class="card-text">Web Design</p>
        </div>
      </div>
    </div>

    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-dis">      <div class="imgBX">
        <img src="img/cris.jpeg" alt="">
    </div>
      <div class="content-card card-body dis-founder">
        <div class="content-details">
          <br>
          <br>
          <h5 class="card-title">cristopher elliot gonzalez vega </h5>
          <br>
          <br>
          <p class="card-text">Databases</p>
        </div>
      </div>
    </div>

    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-dis">      <div class="imgBX">
        <img src="img/ledesma.jpeg" alt="">
    </div>
      <div class="content-card card-body dis-founder">
        <div class="content-details">
          <br>
          <br>
          <h5 class="card-title">Braian daniel ledesma aleman</h5>
          <br>
          <br>
          <p class="card-text">Arduino</p>
        </div>
      </div>
    </div>

    </div>
  </div>
</div>
</div>

<footer>
  <div class="container-footer">
    
  </div>
</footer>


 `
 const body = document.getElementsByTagName('body')[0]     //  Select the body to display the template
 body.innerHTML = template; 
 //const name = document.getElementById('firstname1').value
  //console.log(name); 
}


const loadInitialTemplate = () =>{                  //  If the users is logged, will use this template with their information
  const template = `
  
    
  <link rel="stylesheet" href="css/user.css">
<div class="body">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
       
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart1">My Pecera </a>
          </li>
          
      
          
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="logout">Logout</a>
          </li>
          <li class="nav-item"> 
            
           
          </li>
          <li class="nav-item">
           
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>





<section id="about" class="about-section-padding">
<div class="container cont1">
    <div class="row">
        <div class="col-lg-4 col-md-12 col-12 text-dis">
            <div class="about-text">
                <br>
                <h2>Account Information</h2>
                <p>This information is use for start sesion</p>
                <br>
            </div>
        </div>
        <div class="col-lg-8 col-md-12 col-12 ps-lg-5  account">
            <form action="" id="user-form" class="account-form">
                <div>
                <label for="" id="firstname"></label>
                </div>
                <div>
                <label for="" id="emailps"></label>
                <label for="" id="passps"></label>
                <label for="" id="tampecera"></label>

                </div>    
            </form>
            <br>
        </div>
    </div>
</div>
</section>




<section id="about" class="about-section-padding">
<div class="container">
<div class="row">
<div class="col-lg-4 col-md-12 col-12 text-dis">
    <div class="about-text">
        <br>
        <h2>Change Information</h2>
        <p>In this section we can change all us information personal</p>
        <br>
    </div>
</div>
<div class="col-lg-8 col-md-12 col-12 ps-lg-5  account">
    <form id="update-form" action="" class="account-password">
        <div class="container-input">
             <input type="text" name="" id="firstname1" required="required">
             <span>Firstname</span>
        </div>
        <div class="container-input">
            <input type="text" name="" id="lastname2" required="required">
            <span>Last Name</span>
       </div>
       <div class="container-input">
            <input type="text" name="" id="email3" required="required">
            <span>Email</span>
      </div>
        <br>
        <div class="container-button">
            <input type="submit"  class="button-save" id="change-information" value="Confirm">
            
            
        </div>
    </form>
</div>
</div>
</div>
</section>

  <ul id="user-list" class="dis-ul"></ul>
  <ul id="userInformation" class="dis-ul"></ul>
</div>
  `
  const body = document.getElementsByTagName('body')[0]     //  Select the body to display the template
  body.innerHTML = template;                                //  Convert the body
  buttonP();                                                //  Call the function to logout 
}


const loadRegisterTemplate = () =>{     //  This arrow functions will create the template to register users
  const template = `
  
  <link rel="stylesheet" href="css/register.css">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="main">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="user.html">About us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="register">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

<div class= "login">
<div class="form-container">
  <img src="img/logo.png" alt="logo" class="logo">
  <h1 class="title">Welcome</h1>
  <p class="subtitle">Enter your credentials</p>

    <form id="register-form" class="form">
        
          <label for="password" class="label">First Name</label>
          <input name="name" type="text"  placeholder="Example" class="input input-password">
            
          <label for="password" class="label">Last Name</label>
          <input name="lastname" type="text"  placeholder="Example" class="input input-password">
            
          <label for="password" class="label">Email</label>
          <input name="email" type="email" id="password" placeholder="Example@gmail.com" class="input input-password">
            
          <label for="new-password" class="label">Password</label>
          <input name="password" type="password" id="new-password" placeholder="*******" class="input input-password">
          <div id="error" class="error"></div>

          <label for="new-password" class="label">Selecciona pecera</label>
          <select id="tampecera" name="tampecera">
          <option name="tampecera" value="chico">chico | Max. 5 peces</option>
          <option name="tampecera" value="mediano">mediano | Max. 10 peces</option>
          <option name="tampecera" value="grande">grande | Max. 15 peces</option>
          </select>

      
        
          <input type="submit" class="primary-button login-button" id="" value="Confirm">
           
    </form>
</div>
</div>

 <a href="#" id="login">Iniciar sesion </a>
<div id="error"></div>
  `



  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template

// Agregar la clase "register-form-container" al div que contiene el formulario
const formContainer = document.querySelector('.form-container');
formContainer.classList.add('register-form-container');

}

//mostrarCapacidadMaxima() 


const loadLoginTemplate = () =>{      // This is the template to login in
  const template = `

  
  <link rel="stylesheet" href="css/register.css">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="main">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="user.html">About us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="register">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

  <div class= "login">
    <div class="form-container">
      <img src="img/logo.png" alt="logo" class="logo">
      <h1 class="title">Welcome</h1>
      <p class="subtitle">Enter your credentials</p>

    <form id="login-form" class="form">
        
          <label for="password" class="label">Email</label>
          <input name="email" type="email" id="password" placeholder="Example@gmail.com" class="input input-password">
            
          <label for="new-password" class="label">Password</label>
          <input name="password" type="password" id="new-password" placeholder="*******" class="input input-password">
          
          <div id="error" class="error"></div>
          <input type="submit" class="primary-button login-button" id="" value="Confirm">
          <a href="#" class="primary-button login-button a-style" id="register"  >Registrarse</a>
    </form>
    </div>
  </div>
    
    
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}


const loadChart1Template = () =>{      // This is the template to login in
  const template = `
  <div class="body">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
  
        <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="usersPage">Home</a>
          </li>
        
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart1">My Pecera </a>
          </li>
       
          
          
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="logout">Logout</a>
          </li>
          <li class="nav-item">
           
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

*************************************************************************************************************************

head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRAFICAS DE LA PECERA</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@latest/dist/Chart.min.js"></script>
</head>

<style>

body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
}

#header {
  background-color: #333;
  color: #fff;
  padding: 20px; 
}

#header h1 {
  margin: 0;
}

#content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;  
  border-radius: 5px;
} 

h2 {
  border-bottom: 1px solid #ccc;
}

canvas {
  max-width: 100%;
  height: auto !important;
}

table {
  width: 100%;
  border-collapse: collapse; 
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ccc;
}

</style>




<div id="content">
  <div class="section">
      <h2>NIVEL DE AGUA EN LA PECERA</h2>
      <canvas id="grafica1"></canvas>
  </div>

  <div class="section">
      <h2>TEMPERATURA DE LA PECERA </h2>    
      <canvas id="grafica2"></canvas>
  </div>

  <div class="section">
      <h2>CONDUCTIVIDAD EN LA PECERA</h2>
      <canvas id="grafica3"></canvas>
  </div>

  <div class="section">
    <h2>VALORES EN LA BASE DE DATOS</h2>
    <table id="tabla-datos">
        <thead>
            <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TEMPERATURA</th>
                <th>NIVEL DE AGUA</th>
                <th>LUZ</th>
                <th>CONDUCTIVIDAD</th>
            </tr>
        </thead>
        <tbody id="lista-datos"></tbody>
    </table>
</div>
</div>

<script>
  async function fetchAndDisplayData() {
      try {
          const response = await fetch('*'); // Reemplaza * con la URL correcta para obtener los datos
          const data = await response.json();
          const keys = Object.keys(data[0]);

          // Tomar los últimos 10 valores
          const last10Data = data.slice(-10);
          
          // Conjunto de datos para la primera gráfica
          const arrayT1 = last10Data.map(item => item.Sen_Nivel);
          const fechas = last10Data.map(item => item.Fecha); // Agregar este paso para obtener las fechas
          const ctx1 = document.getElementById('grafica1').getContext('2d');
          const etiquetas1 = fechas; // Usar las fechas como etiquetas
          const datosGrafica1 = {
              label: 'Sensor de Nivel de agua',
              data: arrayT1,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
          };

          new Chart(ctx1, {
              type: 'bar',
              data: {
                  labels: etiquetas1,
                  datasets: [datosGrafica1],
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
              },
          });

          // Conjunto de datos para la segunda gráfica
          const arrayT2 = last10Data.map(item => item.Sen_Temp);
          const ctx2 = document.getElementById('grafica2').getContext('2d');
          const etiquetas2 = fechas; // Usar las fechas como etiquetas
          const datosGrafica2 = {
              label: 'Sensor de Temperatura',
              data: arrayT2,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
          };
          
          new Chart(ctx2, {
              type: 'bar',
              data: {
                  labels: etiquetas2,
                  datasets: [datosGrafica2],
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          },
                      }],
                  },
              },
          });


           // Conjunto de datos para la tercera gráfica (Sen_PH)
        const arrayT3 = last10Data.map(item => item.Sen_PH);
        const ctx3 = document.getElementById('grafica3').getContext('2d');
        const etiquetas3 = fechas; // Usar las fechas como etiquetas
        const datosGrafica3 = {
            label: 'Sensor de pH',
            data: arrayT3,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
        };
        
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: etiquetas3,
                datasets: [datosGrafica3],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
            },
        });

        
           // Mostrar los últimos 10 valores en la tabla
        const tbody = document.querySelector('#lista-datos');
        last10Data.forEach(item => {
            const row = document.createElement('tr');
            keys.forEach(key => {
                const td = document.createElement('td');
                if (key === 'Sen_Nivel') {
                    td.textContent = item[key];
                } else if (key === 'Sen_Temp') {
                    td.textContent = item[key];
                } else if (key === 'Sen_PH') {
                    td.textContent = item[key];
                  } else if (key === 'Sen_Luz') {
                    td.textContent = item[key];
                } else if (key === 'Fecha') {
                    td.textContent = item[key];
                  } else if (key === 'ID_Sensores') {
                    td.textContent = item[key];
                }
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error('Error:', err);
    }
}


  fetchAndDisplayData();
</script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.8.2/dist/chart.min.js" integrity="sha256-srZ7wC4CLlY0F9UFji68dTwYJQ5o93Quq2+iyQ4gH/I=" crossorigin="anonymous"></script>






  `
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template

  buttonP()

}


const loadChart2Template = () =>{      // This is the template to login in
  const template = `

  <div class="body">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="usersPage">Home</a>
          </li>
       
          
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart1">My Pecera </a>
          </li>
       
          <li class="nav-item">   
          <li class="nav-item">
              <a class="nav-link active dis-menu" aria-current="page" href="#" id="logout">Logout</a>
           </li>
          </li>
          <li class="nav-item">
          
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p>
      
<section class="bg-grey ">
<div class="container">
    <div class="row">
        <div class="col-lg-12 my-3">
            <div class="card rounder-0">
                <div class="card-header">
                    <h6>Temperatura Del Agua</h6>
                </div>
                <div class="card-body">
                    <div>
                        <canvas id="myChart"></canvas>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
<p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p><p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p>
<p>HOLA</p>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.8.2/dist/chart.min.js" integrity="sha256-srZ7wC4CLlY0F9UFji68dTwYJQ5o93Quq2+iyQ4gH/I=" crossorigin="anonymous"></script>





  `
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template


  buttonP()
}

const loadModule1Template = () =>{      // This is the template to login in
  const template = `
  <link rel="stylesheet" href="css/module.css">

  <div class="body">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="usersPage">Home</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart1">Graphic Room 1</a>
          </li>
          
       
          
          <li class="nav-item">   
          <li class="nav-item">
              <a class="nav-link active dis-menu" aria-current="page" href="#" id="logout">Logout</a>
           </li>
          </li>
          <li class="nav-item">
          
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>




        <div class="container">
          <div class="row">
            <div class="col-lg-8 my-3">
              <div class="row">
              <div class="card rounded-0" style="width: 50%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-8">Humedity</h6>
                </div>
                <div class="card-body">
                  <p id= "value-humidity"> </p>
                </div>
              </div>

              <div class="card rounded-0 "style=" width: 50%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-8">Temperature</h6>
                </div>
                <div class="card-body">
                  <p id= "value-temperature"></p>
                </div>
              </div>

              <div class="card rounded-0 my-2"style=" width: 100%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-10">Person Inside</h6>
                </div>
                <div class="card-body">
                  <p id = "value-people-in"> </p>
                </div>
              </div>
              </div>
         
            </div>

            

            <div class="col-lg-4 my-3"  >
              <div class="card rounded-0" style="height: 97.5%;">
                <div class="card-header bg-light">
                  <h6 class="font-weight-bold mb-0">Personas dentro</h6>
                </div>
                <div class="card-body">
                  <i class="fas fa-lightbulb" id="light-status"></i></body>
                  <p class = "turn" id = "content-light"></p>
                </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 my-3" style="margin: 0; padding: 0;">
            <div class="card rounded-0" >
              <div class="card-header bg-light">
                <h6 class="font-weight-bold mb-0">People of that got in</h6>
              </div>
              <div class="card-body">
              <p id="value-people-got-in"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 my-3" style="margin: 0; padding: 0;">
            <div class="card rounded-0">
              <div class="card-header bg-light">
                <h6 class="font-weight-bold mb-0">People of that got on</h6>
              </div>
              <div class="card-body">
                <p id="value-people-got-on"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 my-3" style="margin: 0; padding: 0;">
            <div class="card rounded-0" style="height: 100%;">
              <div class="card-header bg-light">
                <h6 class="font-weight-bold mb-0">People who couldn't get in</h6>
              </div>
              <div class="card-body">
                <p id = "value-people-couldnt-get-in"></p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 my-3" style="margin: 0; padding: 0;">
          <div class="card rounded-0" style="height: 100%;">
            <div class="card-header bg-light">
              <h6 class="font-weight-bold mb-0">People in Hallway</h6>
            </div>
            <div class="card-body">
              <p id="value-people-in-hallway"></p>
            </div>
          </div>
        </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12 my-3">
            <div class="card rounded-0">
              <div class="card-header bh-light">
                <input type="checkbox" id="main-checkbox"><h6 class="font-weight-bold mb-0">Name Person Today</h6></input>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      

      <section class="bg-grey ">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 my-3">
              <div class="row">
              <div class="card rounded-0" style="width: 50%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-8">Humedity</h6>
                </div>
                <div class="card-body">
                  <p id= "value-humidity-room2"> </p>
                </div>
              </div>

              <div class="card rounded-0 "style=" width: 50%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-8">Temperature</h6>
                </div>
                <div class="card-body">
                  <p id= "value-temperature-room2"></p>
                </div>
              </div>

              <div class="card rounded-0 my-2"style=" width: 100%;     height: 200px;">
                <div class="card-title ">
                  <h6 class="font-weight-bold mb-10">Person Inside</h6>
                </div>
                <div class="card-body">
                  <p id = "value-people-in-room2"> </p>
                </div>
              </div>
              </div>
         
            </div>

            

            <div class="col-lg-4 my-3"  >
              <div class="card rounded-0" style="height: 97.5%;">
                <div class="card-header bg-light">
                  <h6 class="font-weight-bold mb-0">Personas dentro</h6>
                </div>
                <div class="card-body">
                  <i class="fas fa-lightbulb" id="light-status-room2"></i></body>
                  <p class = "turn" id = "content-light-room2"></p>
                </div>
            </div>
          </div>
        </div>
       
      </section>


      

  `
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template
  buttonP()
}


const loadModule2Template = () =>{      // This is the template to login in
  const template = `

  <div class="body">
  <nav class="back navbar navbar-dark  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="notFound.html">Aqua-Smart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="back offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="back offcanvas-header">
        <h5 class="back offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="back offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active dis-menu" aria-current="page" href="#" id="usersPage">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart1">Chart1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Chart2">Chart2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link dis-menu" href="#" id="Module1">Module1</a>
          </li>
          <li class="nav-item">   
          <li class="nav-item">
              <a class="nav-link active dis-menu" aria-current="page" href="#" id="logout">Logout</a>
           </li>
          </li>
          <li class="nav-item">
          
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<p>jeje</p>
<p>JEJEJE</p>
<p>JEJE</p>
<p>if you read this, you're going to be pro :)</p>




  `
  const body = document.getElementsByTagName('body')[0]
  body.innerHTML = template
  buttonP()
}



/*
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
                            E N D     S E C T I O N     T E M P L A T E          keyword: section2End
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
*/




/*
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
                            S T A R T     S E C T I O N     G O T O   P A G E       keyword: section3
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
*/






const gotoLoginListener = () =>{                          // Here, we are adding like a "href" to redirect the user in the template Login
  const gotoLogin = document.getElementById('login')      // Find the form with its id
  gotoLogin.onclick = (e) => {                            // If is clicked will redirect to the login page
      e.preventDefault()                                  // Prevent restart page
      loginPage()                                         // Send to the login page
  }
}

const gotoRegisterListener = () => {            
              // Here, we are adding like a "href" to redirect the user in the template register
  const gotoRegister = document.getElementById('register')  // Find the form with its id
  gotoRegister.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      registerPage()                                        // Send to the register page
  }
}

const gotoMainListener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoMain = document.getElementById('main')  // Find the form with its id
  gotoMain.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      mainPage()                                      
  }
}

const gotoChart1Listener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoChart1 = document.getElementById('Chart1')  // Find the form with its id
  gotoChart1.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      chart1Page()
      //console.log(myChart)
                                      
  }
}

const gotoUsersPageListener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoUsersPage = document.getElementById('usersPage')  // Find the form with its id
  gotoUsersPage.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      usersPage()                                      
  }
}

const gotoChart2Listener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoChart2 = document.getElementById('Chart2')  // Find the form with its id
  gotoChart2.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      chart2Page()
     console.log(myChart)
                                       
  }
}

const gotoModule1Listener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoModule1 = document.getElementById('Module1')  // Find the form with its id
  gotoModule1.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      module1Page()
                                       
  }
}

const gotoModule2Listener = () => {                        // Here, we are adding like a "href" to redirect main template
  const gotoModule2 = document.getElementById('Module2')  // Find the form with its id
  gotoModule2.onclick = (e) => {                           // If is clicked will redirect to the register page
      e.preventDefault()                                    // Prevent restart page
      module2Page()
                                       
  }
}



const addLoginListener    = authListener('login')
const addRegisterListener = authListener('register')


/*
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
                            E N D     S E C T I O N     G O T O   P A G E        keyword: section3End
---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+
*/








