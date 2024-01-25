document.addEventListener('DOMContentLoaded', start);
document.getElementById("form").addEventListener('submit', handleSubmit);

function drawResult(result) {
    console.log(result);
    let ansDiv = document.getElementById("data2");
    for (let x in result) {
        if (x == "message") continue;
        ansDiv.appendChild(document.createTextNode(result[x].answer));
        ansDiv.appendChild(document.createTextNode(" "));
        document.getElementById("data").style.display = "none";
        ansDiv.style.display = 'block';
    }
}

function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3000/survey/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include'
        },
        body: JSON.stringify({ "answer": e.target.elements[0].value })
    }).then((res) => res.json().then((out) => {
        // console.log(out);
        start();
    }));
}

function drawQuestion(ques) {
    if (ques.message == "done") drawResult(ques);
    document.getElementById("data").innerHTML = "";
    const questionDiv = document.createElement("aside");
    const questionSpan = document.createElement("span");
    const answerSpan = document.createElement("input");
    questionSpan.textContent = ques.question;
    questionSpan.setAttribute("id", ques.id);
    questionSpan.setAttribute("name", ques.id);
    questionDiv.appendChild(questionSpan);
    questionDiv.appendChild(document.createTextNode(" "));
    questionDiv.appendChild(answerSpan);
    document.getElementById("data").appendChild(questionDiv);
}

async function start() {
    fetch('http://localhost:3000/survey/getQuestion', {
        credentials: 'include',
    }).then((res) => res.json().then((ques) => {
        drawQuestion(ques);
    }));
}