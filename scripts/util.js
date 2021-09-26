module.exports = function (){
    this.splitCommand = (text = '', removeQuotations = false) => {
        let regex = new RegExp("(?<=^[^\"]*(?:\"[^\"]*\"[^\"]*)*) (?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
    
        text = text.trim();
        text = this.escapeRegExp(text);
        text = text.split(regex);
    
        if(removeQuotations){
            let newText = [];
            for (const value of text) {
                newText.push(this.replaceAll(this.replaceAll(value, '"', ''), "\\", ''));
            }
            text =newText;
        }
    
        return text;
    }
    this.makeSentence = (object = [], skip = 0) => {
        if(typeof object === 'object' && Object.keys(object).length > 0) {
            let outputText = '';
            for (let i = 0; i < Object.keys(object).length; i++) {
                if(i < skip) { continue; }
    
                outputText += ' ' + object[Object.keys(object)[i]];
            }
            return outputText.trim();
        }
    }
    this.replaceAll = (str, find, replace) => {
        if(str == null) { return; }
        return str.toString().replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }
    this.escapeRegExp = (string) => {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    this.randomInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}