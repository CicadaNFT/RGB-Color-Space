document.getElementById(["r","g","b","c","m","y"][Math.floor(Math.random()*6)]).click();

var colorWell;
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);
function startup() {
    console.log()
    colorWell = document.querySelector("#colorWell");
    colorWell.value = getHex(getRGBArr(document.body.style.backgroundColor));
    colorWell.addEventListener("input", updatePicker, false);
    colorWell.addEventListener("change", updatePicker, false);
    colorWell.select();
}

function updatePicker(event) {
    const rgbArray = getRGBarray(event.target.value)
    document.getElementById("pickerText").innerHTML = 'Color Picker: [' +rgbArray + ']'
    updateRGB(getClosest(rgbArray, document.getElementById("interval").value))
}
  
function updateRGB(rgbArray){
    rgb = 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
    document.body.style.backgroundColor = rgb;
    const rgbText = document.getElementById("rgbText");
    rgbText.style.borderColor = rgb;
    rgbText.innerHTML = rgb ;
    document.getElementById("hexText").innerHTML = getHex(rgbArray)

    let rgbArr = rgb.replace(/[^\d,]/g, '').split(',');
    document.getElementById("rSlider").value = rgbArr[0];
    document.getElementById("gSlider").value = rgbArr[1];
    document.getElementById("bSlider").value = rgbArr[2];
}

function sliderColors(){
    const r = document.getElementById("rSlider").value;
    const g = document.getElementById("gSlider").value;
    const b = document.getElementById("bSlider").value;
    updateRGB([r,g,b])
}

function buttonColors(cid){
    const rgbText = document.getElementById(cid).style.backgroundColor;
    updateRGB(getRGBArr(rgbText))
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

function randColors(){
    let colArr = []
    for (let i = 0; i < 3; i++) {
      colArr.push(between(0,11)*25)
    }
    updateRGB(colArr)
}

function getRGBarray(input) {
    try {
        let splitArray = getRGBArr(input)
        if(splitArray.length == 3) {
            return [splitArray[0],splitArray[1],splitArray[2]];
        }
        let m;
        if(input.length == 3 || input.length == 6){
            input = '#'+input
        }
        if(input.length == 7){
            m = input.match(/^#([0-9a-f]{6})$/i)[1];
            if(m) {
                return [
                    parseInt(m.substr(0,2),16),
                    parseInt(m.substr(2,2),16),
                    parseInt(m.substr(4,2),16)
                ];
            } 
        }
        if(input.length == 4) {
            m = input.match(/^#([0-9a-f]{3})$/i)[1];
            if(m) {
                return [
                    parseInt(m.charAt(0),16)*0x11,
                    parseInt(m.charAt(1),16)*0x11,
                    parseInt(m.charAt(2),16)*0x11
                ];
            } 
        }
    }
    catch(err) {
    }
}

function getClosest(rgb, step){
    return rgb.map(function(x) { return Math.round(x/step)*step; });
}

function textColors(value){
    let rgb = getRGBarray(value)
    if(rgb !== undefined){
        let input = document.getElementById("inputText")
        input.innerHTML = 'Find closest RGB: [' + getRGBarray(value) + ']'
        updateRGB(getClosest(rgb, document.getElementById("interval").value))
    }
}

function updateInterval(interval){
    document.getElementById("rSlider").step = interval;
    document.getElementById("gSlider").step = interval;
    document.getElementById("bSlider").step = interval;
}

function toHex(r_g_b) { 
    let hex = Number(r_g_b).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

function getRGBArr(rgbText){
    return rgbText.replace(/[\[(rgb)\]]/g, '').split(/[\s,]+/)
}

function getHex(rgb) {   
    return '#'+toHex(rgb[0])+toHex(rgb[1])+toHex(rgb[2]);
};
