class ColorCard{
    id;
    color;
    addtolist;
    htmlElement;
    circle;
    text;

    constructor(newId, newColor, addtolist){
        this.id = newId;
        this.color = newColor;
        this.addtolist = addtolist;

        this.htmlElement = document.createElement("li");
        this.htmlElement.classList = "colors__color";

        this.circle = document.createElement("figure");
        this.circle.classList = "colors__circle";
        this.circle.style.background = this.color;

        this.text = document.createElement("p");
        this.text.innerText = "Copied";
        this.text.classList = "colors__text";

        this.htmlElement.onclick = this.clicked.bind(this);

        this.render();
    }

    clicked = () => {
        this.circle.classList.add("colors__circle--selected");
        document.title = this.color;
        setTimeout(() => {
            window.navigator.clipboard.writeText(this.color);
        }, 0);
    };

    render(){
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
        this.addtolist.appendChild(this.htmlElement);  
    }
};

class ColorList{
    id;
    htmlElement;

    constructor(newId){
        this.id = newId;
        this.htmlElement = document.createElement("ul");
        this.htmlElement.id = this.id;
        this.htmlElement.classList.add("colors");
        document.querySelector("body").appendChild(this.htmlElement);
    }
}

class HSLgenerator{
    randomHue;
    randomSaturation;
    randomLightless;
    hsl;

    constructor(){  
        this.generateHSL();
    }

    generateHue = function(){
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    };

    generateSaturation = function(){
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    };

    generateLightless = function(){
        this.randomLightless = Math.floor(Math.random() * (100 - 11) + 11) + "%";
    }

    generateHSL = function(){
        this.generateHue();
        this.generateSaturation();
        this.generateLightless();
        this.hsl = `hsl(${this.randomHue} ${this.randomSaturation} ${this.randomLightless})`;
    }
}

class App{
    id;
    colorList;
    hslGenerator;

    constructor(newId){
        this.id = newId;
        this.colorList = new ColorList(this.id);
        this.hslGenerator = new HSLgenerator();
        this.generateColorCards();
    }

    generateColorCards = function(){
        for(let i = 1; i <= 100; i++){
            this.hslGenerator.generateHSL();
            new ColorCard(i, this.hslGenerator.hsl, document.getElementById(this.colorList.id));
        }
    }
};

const app = new App("app");
