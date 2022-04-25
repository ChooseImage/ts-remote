/* 

Buttons for field and processing call requests
line by line chatbot 

*/

require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
let ui = null;
let prompt = null;
let userInput;
let  numToken = 10;
let nTimesPressed = 0;
let prompt01 = "A: When was this?\nB: Sunday afternoon I think, or is it Saturday?\nA: Were you alone?\nB: No, I remember seeing my mom, in the park, but younger.\n";
let userName = 'user';
let botName = 'A:';
let convo = null;

// Place to store all the priming dreams
let primeMats='';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});




//nameInput();



document.addEventListener('DOMContentLoaded', function () {

  ui = document.querySelector('.ui');
  primes = document.querySelector('#primes');
  convo = document.querySelector('.convo');
  //Lprimes = document.querySelector('#Lprimes');

  // set/store user name

  //userName = window.prompt("Please enter your name:", "User");

  // The first prompt on load


  let initPrompt = `
    <div>
    <p>${prompt01}</p>
    </div>
  `

  // ------------------------------------------------------------- // 

  // const p1 = document.createElement('div');

  // p1.innerHTML = initPrompt;
  // convo.insertAdjacentElement("afterbegin", p1);



  // btn handling adding fields 

  //document.querySelector('.btn').addEventListener('click',()=>{
    //Add field btn function
    
  //   let field = `
  //   </br>
  //     <input type="text" id="userPrimes${nTimesPressed}" name="userPrime">
  //   `;

  //   let inputField = document.createElement('div');
  //   inputField.innerHTML = field;
  //   primes.appendChild(inputField);
    
    
  // });


    /*
     btn handling storing prompts, concacting primes and prompts
     making calls 
     */

  document.querySelector(`#Lbtnsubmit0`).addEventListener('click',()=>{

    // collect the first input and make request 
    

      let id = `Linput${nTimesPressed}`
      let input = document.getElementById(`${id}`).value;
      let INPUT = `
        <div class = 'userArea'>
          <p>${input}</p>
        </div>
      `
    
    //get prompt
    //condition ? exprIfTrue : exprIfFalse
    userInput = `${prompt01}A: ${input}`;

    console.log(nTimesPressed);
    
    //console.log("prompt: " + document.getElementById('prompt').value);
    console.log("-------------------------");

    //combine user Priming and prompts 

    modelPrompt = primeMats + userInput;


    // Remove user input box

    let elem = document.getElementById(`Linput${nTimesPressed}`);
    elem.parentElement.removeChild(elem);

    // Insert userInput as new HTML

    const p2 = document.createElement('div');

    p2.innerHTML = INPUT;
    convo.insertAdjacentElement("beforeend", p2);

    nTimesPressed++;

  
    
    makecall(userInput);

   

    console.log(`call made, nTimePressed = ${nTimesPressed}`);
    

    //primeMats = [];

  });

});

const openai = new OpenAIApi(configuration);

const addField = () => {

  // This goes in makecall(), need to wait the site to render the response first
  
  let html =`
  <textarea name="Text1" cols="40" rows="5" id="Linput${nTimesPressed}"></textarea>
                `

  const p = document.createElement('div');
  p.innerHTML = html;
  convo.appendChild(p);
}




const makecall = (async (prompt) => {

  //console.log("make call",prompt)
  
    console.log('making your request...');

      const response = await openai.createCompletionFromModel({
          model:"davinci:ft-personal-2022-02-22-23-16-53",
          prompt: prompt,
          max_tokens:numToken,
          stop: ["A"]
        });
        
       // console.log(data);
        console.log(prompt+' '+response.data.choices[0].text);
        let data = response.data.choices[0].text.replace('###', '.\n').replace('A:', '').replace('B:', '');
        // data.replace('###', '');
        // data.replace('A:', '');
        //.replace('characterToReplace', '');
        // data.replace(((nTimesPressed%2==1) ? "A:" : "B:"), '');
        let displayText = `${botName}: ${data}`;
        displayText = data;

        let html = `
            <div class='gentext'>
                <p>${displayText}</p>
            </div>
            `;

        // return html;


        /*

        TYPEWRITER WORK IN PROGRESS

        const typeWriter = (txt, id)=> {

          let i = 0;
          let speed = 50;
          if (i < txt.length) {
            document.getElementById(id).innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
         setTimeout(typeWriter, 500);
         typeWriter(displayText, 'valueInput');
        
          let i = 0;
          let speed = 50;
          if (i < txt.length) {
            document.getElementById(id).innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
         */


  
        const p = document.createElement('div');
        //"clearcontent('clear')
        
        p.innerHTML = html;
        convo.appendChild(p);

        addField();
        console.log(data);
        return(data);
        //typeWriter(displayText, 'valueInput');
  });
  //makecall("Who's there?");
//console.log(document.querySelector('.ui').textContent);