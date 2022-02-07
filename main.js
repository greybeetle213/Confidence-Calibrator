function loop(){
    ctx.drawImage(backdrop,-2*unit,-2*unit,1333*unit,1000*unit)
    ctx.fillStyle = "black"
    ctx.font = '30px serif'
    ctx.fillText(currentQuestion[0], 150*unit, 610*unit)
    ctx.font = '200px serif'
    switch(avaragePointsLost){
        case Infinity:
            ctx.fillText("∞", 550*unit, 450*unit)
            break
        case 0:
            ctx.fillText("0", 580*unit, 450*unit)
            break
        default:
            ctx.fillText(String(avaragePointsLost).slice(0,4), 420*unit, 450*unit)
    }
    ctx.font = '50px serif'
    if(pointsLostText[2] > 0){
        if(pointsLostText[0] != "-Infi"){
            if(Number(pointsLostText[0]) < -1){
                ctx.fillStyle = "red"
                ctx.fillText(pointsLostText[0], 580*unit, pointsLostText[1]*unit)
                pointsLostText[1] -= 2
                pointsLostText[2] -= 1
            }else{
                ctx.fillStyle = "green"
                ctx.fillText(pointsLostText[0], 580*unit, pointsLostText[1]*unit)
                pointsLostText[1] -= 2
                pointsLostText[2] -= 1
            }
        }else{
            ctx.fillStyle = "red"
            ctx.fillText("∞", 580*unit, pointsLostText[1]*unit)
            pointsLostText[1] -= 2
            pointsLostText[2] -= 1
        }
    }
    //slider bouning box ctx.fillRect(220*unit, 725*unit, 890*unit, 25*unit);
}

function main(){
    document.getElementById("display").height = window.innerHeight - 10
    document.getElementById("display").width = (window.innerHeight - 10)*1.333
    ctx = document.getElementById("display").getContext("2d")
    canvas = document.getElementById("display")
    unit = canvas.height/1000
    backdrop = new Image()
    backdrop.src = "backdrop.png"
    questions = questions.split("\n")
    pointsLost = 0
    pointsLostText = ["", 0, 0]
    ammountOfQuestionsAsked = 0
    avaragePointsLost = 0
    for(i=0;i<=questions.length-1;i++){
        questions[i] = questions[i].split(",")
    }
    currentQuestion = questions[Math.floor(Math.random()*questions.length)]
    canvas.addEventListener('mousedown', function(e) {
        clickPos = getCursorPosition(canvas, e)
        //console.log(clickPos)
        if(clickPos.x >= 220*unit && clickPos.x <= 1110*unit && clickPos.y >= 725*unit && clickPos.y <= 750*unit){
            percent = Math.round((clickPos.x - 220*unit)/(890*unit)*100)
            console.log(percent + "%")
            if(currentQuestion[1] == "yes"){
                pointsLost += -Math.log2(percent/100)
                pointsLostText = [String(Math.log2(percent/100)).slice(0,5), 535, 60]
            }else{
                pointsLost += -Math.log2(1-(percent/100))
                pointsLostText = [String(Math.log2(1-(percent/100))).slice(0,5), 535, 60]
            }
            ammountOfQuestionsAsked ++
            avaragePointsLost = pointsLost/ammountOfQuestionsAsked
            currentQuestion = questions[Math.floor(Math.random()*questions.length)]
        }
    })
    setInterval(loop,10)
}
