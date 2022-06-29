//back4app Parse Init
Parse.initialize("iex6JkXMCvDfxCHsA6ZCTH8SyWZmFiyQ1Ke9OY0V", "1ztLLdOZDCOObMmWcXJ0AjZ0ZnCNazXtlXU2cZsO"); 
Parse.serverURL = "https://parseapi.back4app.com/";

var quizData = [];

var assuntos = [];

var forward = false;

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const e_text = document.getElementById('e_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0
readAll().then(res=>loadQuiz());

console.log(assuntos);

function loadQuiz() {
    if (currentQuiz == 0) {
        body = document.getElementById("body");
        body.style.visibility = "visible";
    }
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    e_text.innerText = currentQuizData.e;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    let textoResposta = document.getElementById("respostaCorreta");
    
    if(answer) {
        if  (currentQuiz < quizData.length) {
            if(answer === quizData[currentQuiz].correct) {
                textoResposta.innerHTML = "Que soft! Você acertou!"
                if (!forward) {
                    score++
                }
            } else {
                textoResposta.innerHTML = `Que cringe! Você errou, a resposta é ${(quizData[currentQuiz].correct).toUpperCase()}.`;
            }
        }
       // textoResposta.style.visibility = "visible";
        
        console.log(currentQuiz);
        console.log(quizData.length);
        if (forward) {
            if(currentQuiz < quizData.length) {
                loadQuiz()
            } else {
                quiz.innerHTML = `
                    <h2>Você respondeu ${score}/${quizData.length} questões corretamente.</h2>

                    <button onclick="location.reload()">Tentar Novamente</button>
                `
            }
            textoResposta.style.visibility = "hidden";
            submitBtn.innerText = "Responder";
            forward = false;
        } else {
            currentQuiz++
            textoResposta.style.visibility = "visible";
            submitBtn.innerText = "Avançar";
            forward = true;
        }
    }
})

//back4App Parse functions

async function readAll(){
   
    const Perguntas = Parse.Object.extend("Questoes");
    const query = new Parse.Query(Perguntas);
    query.notEqualTo("resposta", "z");
    const results = await query.find();
    let quizTemp = {};
    let assuntoTemp = [];
    for (let i = 0; i < results.length; i++) {
    const object = results[i];
        quizTemp = {
            question: object.get('questao'),
            a: object.get('alternativaA'),
            b: object.get('alternativaB'),
            c: object.get('alternativaC'),
            d: object.get('alternativaD'),
            e: object.get('alternativaE'),
            correct: object.get('resposta'),
        };
        preencheAssuntos(object.get('assunto1'));
        preencheAssuntos(object.get('assunto2'));
        preencheAssuntos(object.get('assunto3'));
        preencheAssuntos(object.get('assunto4'));
        preencheAssuntos(object.get('assunto5'));
        preencheAssuntos(object.get('assunto6'));
        preencheAssuntos(object.get('assunto7'));
        preencheAssuntos(object.get('assunto8'));
        preencheAssuntos(object.get('assunto9'));
        preencheAssuntos(object.get('assunto10'));
        quizData.push(quizTemp);    
    }
    
}

function preencheAssuntos(assuntoInput) {
     let assuntoEncontrado = false;
     if ((assuntoInput != '') && (assuntoInput != ' ')) {
       assuntos.forEach(assunto=> {
         if (assunto == assuntoInput) {
             assuntoEncontrado = true;
         }
       });
       if ((!assuntoEncontrado) && ((typeof assuntoInput !== 'undefined'))) {
           assuntos.push(assuntoInput);
       }
     }
}