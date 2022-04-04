/* 

THE NEWRAWDATA IS CREATED NOT YET RENDERED

Buttons for field and processing call requests

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

*/

let submitPressed = false;
const priming = require('./priming.json');  // Load the priming data


require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
let ui = null;
let prompt = null;
let userInput;
let  numToken = 80;
let nTimesPressed = 0;

let userName = 'user';
let botName = 'A:';
let convo = null;
let whom = null;

// Place to store all the priming dreams

let dialog = null; //store all the on going dialog.
let primeMats='';




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});




const loadDialog = (n) => {

  const prompt01 = priming.mats[0].instruction + priming.mats[0].content;
  dialog = prompt01;

 // Try auto load html element from json prime
  const instruction =  priming.mats[n].instruction;
  const mat = priming.mats[n].content;

  convo = document.querySelector('.convo');
  const element = document.createElement('div');

  // SEPERATE MAT INTO LIST OF SENTENCES
  mat_splitted = mat.split('\n');
  //console.log(mat_splitted);

  let area = "placeholder";
  let prompt_element = '';

  for(let i =0; i<mat_splitted.length; i++){

    if(mat_splitted[i][0] === "A"){
      area = "userArea";
      let sentence = mat_splitted[i].replace('A:', '');
      prompt_element += `
      <div class = 'prompt ${area}'>
      <p> >>> ${sentence}</p>
      </div>
    `;

    }

    if(mat_splitted[i][0] === "B"){
      area = "machineArea";
      let sentence = mat_splitted[i].replace('B:', 'benet83: ');
      prompt_element += `
      <div class = 'prompt ${area}'>
      <p>${sentence}</p>
      </div>
    `;

    }

  }

  element.innerHTML = prompt_element;
  convo.insertAdjacentElement("beforeend", element);
  //console.log(prompt_element)

}




//////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {


  loadDialog(0);
  ui = document.querySelector('.ui');
  primes = document.querySelector('#primes');
  convo = document.querySelector('.convo');
  whom = document.querySelector('.whom');

  document.querySelector(`#Lbtnsubmit0`).addEventListener('click',()=>{

    // collect the first input and make request 
    
  if(submitPressed == false){ 

      let id = `Linput${nTimesPressed}`
      let input = document.getElementById(`${id}`).value;
      let INPUT = `
        <div class = 'userArea'>
          <p> >>> ${input}</p>
        </div>
      `

     // dialog += nTimesPressed==0 ? `A: ${input}`: `\nA: ${input}`;
      //condition ? exprIfTrue : exprIfFalse
    // Catching user input that is shorter than 5 char
     let filler = input.length >5 ? '' : ' Can you tell me more?';

      dialog += `\nA: ${input}${filler}`;

      //console.log(`Linput: ${input.length}`)
    
    //get prompt
    //condition ? exprIfTrue : exprIfFalse
    userInput = `${dialog}\nA: ${input}`;

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

    submitPressed = true;
    
  }
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
  whom.insertAdjacentElement('afterend',p);
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

        let data = response.data.choices[0].text.replace('###', '').replace('A:', '').replace('B:', '');

        let rawData = response.data.choices[0].text;
 
        
        let index = rawData.indexOf('B:');
        console.log(`Bindex: ${index}`);

        if(index != 1){
          console.log(`Original raw: ${rawData}`);
          newRawData = rawData.slice(index, rawData.length);
          console.log("Slicing: "+ newRawData);
          //console.log(dialog);
        }else{
          newRawData = rawData;
        }
        
        console.log(`newrawdata_length: ${newRawData.length}`);

        newRawData.replace('###', '\n');
        console.log(`test-> ${newRawData}`);
        if (newRawData.length == 1){
          newRawData += '...';
        }

        dialog+= newRawData;
        //console.log('INDEX: ' + index);
        
        console.log(`DIALOG-${nTimesPressed} \n${dialog}`)
        // return html;
        
        
        let displayText = `benet83: ${newRawData.replace('###', '').replace('A:', '').replace('B:', '')}`;

        let html = `
            <div class='gentext machineArea'>
                <p>${displayText}</p>
            </div>
            `;

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

        submitPressed = false;
        addField();
        //console.log(data);
        //return(newRawData);
  });