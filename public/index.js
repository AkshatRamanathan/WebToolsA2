document.addEventListener('DOMContentLoaded', start);
document.getElementById("form").addEventListener('submit', handleSubmit);

function handleSubmit(e){
    e.preventDefault();
    console.log(e.target.elements)
}

function drawQuestion(ques) {
    document.getElementById("data").innerHTML = "";
    console.log(ques);
    const questionDiv = document.createElement("aside");
    const questionSpan = document.createElement("span");
    const answerSpan = document.createElement("input");
    questionSpan.textContent = ques.question;
    questionSpan.setAttribute("id", ques.id);
    questionDiv.appendChild(questionSpan);
    questionDiv.appendChild(document.createTextNode(" "));
    questionDiv.appendChild(answerSpan);
    document.getElementById("data").appendChild(questionDiv);
}

async function start() {
    fetch('/survey/getQuestion').then((res) => res.json().then((ques) => {
        drawQuestion(ques);
    })
    );

}