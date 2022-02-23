/* 

Bottons for field and processing call requests

*/

require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
let ui = null;
let prompt = null;
let userInput;
let  numToken = 10;
let nTimesPressed = 1;

// Place to store all the priming dreams
let primeMats;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});


document.addEventListener('DOMContentLoaded', function () {

  ui = document.querySelector('.ui');
  primes = document.querySelector('#primes');


  // btn handling adding fields 

  document.querySelector('#btn-addField').addEventListener('click',()=>{
    //Add field btn function
    nTimesPressed++;
    let field = `
    </br>
      <input type="text" id="userPrimes${nTimesPressed}" name="userPrime">
    `;

    let inputField = document.createElement('div');
    inputField.innerHTML = field;
    primes.appendChild(inputField);
    
  });


    /*
     btn handling storing prompts, concacting primes and prompts
     making calls 
     */

  document.querySelector('#btn').addEventListener('click',()=>{

    //store user primes if there's any
    //const up1 = document.getElementById('userPrime1').value;
    
    //concact primes
    for(let i =1; i<= nTimesPressed; i++){
      let id = `userPrimes${i}`
      primeMats += document.getElementById(`userPrimes2`).value;
    }


    console.log(primeMats);


  

  
    //get prompt

    userInput = document.getElementById('prompt').value;
    console.log("-------------------------")
    console.log("prompt: " + document.getElementById('prompt').value);

    //combine user Priming and prompts 
    
   // let modelPrompt = `${up1} \n ${up2} \n ${up3} \n ${userInput}`
    //makecall(modelPrompt);
  });

 // makecall('I went down the alley');

});

const openai = new OpenAIApi(configuration);


const makecall = (async (prompt) => {

  //console.log("make call",prompt)
  
    console.log('making your request...');

      const response = await openai.createCompletionFromModel({
          model:"MY_MODEL",
          prompt: prompt,
          max_tokens:numToken
        });
  
        console.log(prompt+' '+response.data.choices[0].text);
        let data = userInput+' '+response.data.choices[0].text;

    

        let html = `
            <div>
                <p>${data}</p>
            </div>
            `;

        // return html;
  
        const p = document.createElement('div');
        //"clearcontent('clear')
        
        p.innerHTML = html;
        ui.appendChild(p);

  });
  //makecall("Who's there?");
//console.log(document.querySelector('.ui').textContent);