/* 

THE NEWRAWDATA IS CREATED NOT YET RENDERED

Buttons for field and processing call requests
line by line chatbot 

TODO: Cache current stage and pass to priming mats.

TODO:
Interaction -> 

def ask(question, chat_log=None):
    prompt_text = f'{chat_log}{restart_sequence}: {question}{start_sequence}:'
    response = openai.Completion.create(
      engine="davinci",
      prompt=prompt_text,
      temperature=0.8,
      max_tokens=150,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.3,
      stop=["\n"],
    )

    The following is a conversation with new character in a story.
    The assistant is somber, creative, and cnocerned.

*/

require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
let ui = null;
let prompt = null;
let userInput;
let  numToken = 8;
let nTimesPressed = 0;
let prompt01 = "The following is a conversation with new character in a story. The character is somber, dejected, and cnocerned.\nA: When was this?\nB: Sunday afternoon I think, or is it Saturday?\nA: Were you alone?\nB: No, I remember seeing my mom, in the park, but younger.\n";
let userName = 'user';
let botName = 'A:';
let convo = null;

// Place to store all the priming dreams
let primeMats='';
let dialog = prompt01; //store all the on going dialog.

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

  // The first prompt on load


  // let initPrompt = `
  //   <div>
  //   <p>${prompt01}</p>
  //   </div>
  // `

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

      dialog += nTimesPressed==0 ? `A: ${input}`: `\nA: ${input}`;


    
    console.log(`DIALOG-00: \n${dialog}`);
    //get prompt
    //condition ? exprIfTrue : exprIfFalse
    userInput = `${prompt01}A: ${input}`;

    //console.log(nTimesPressed);
    
    //console.log("prompt: " + document.getElementById('prompt').value);
    //console.log("-------------------------");

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

  
    
    makecall(dialog);
    console.log(`Prompt-${nTimesPressed}: \n${dialog}`);

   

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

/*
let text = "Hello world, welcome to the universe.";
let result = text.indexOf("welcome");

text.slice(0, result);

*/




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
        //console.log(prompt+' '+response.data.choices[0].text);
        let data = response.data.choices[0].text.replace('###', '').replace('A:', '').replace('B:', '');
        // data.replace('###', '');
        // data.replace('A:', '');
        //.replace('characterToReplace', '');
        // data.replace(((nTimesPressed%2==1) ? "A:" : "B:"), '');
        let rawData = response.data.choices[0].text;
        let displayText = `${botName}: ${data}`;
        displayText = data;

        let html = `
            <div class='gentext'>
                <p>${displayText}</p>
            </div>
            `;
        
        let index = rawData.indexOf('B:');

        if(index >0){
          newRawData = rawData.slice(index, rawData.length);
          console.log("Slicing: "+ newRawData);
          
          
        }else{
          newRawData = rawData;
        }


        console.log(`test-> ${newRawData}`);
        dialog+= newRawData;
        console.log('INDEX: ' + index);
        
        // return html;
        
        
        console.log(`DIALOG-01 \n${dialog}`)

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
        //console.log(data);
        return(newRawData);
        //typeWriter(displayText, 'valueInput');
  });
  //makecall("Who's there?");
//console.log(document.querySelector('.ui').textContent);