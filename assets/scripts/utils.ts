

export default class Utils {
    static  getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    static getRandColor(type:TypeColor):string|number {
        var color_num = Math.floor(Math.random() * 16777216)
        if(type==TypeColor.String){
        let _color = color_num.toString(16);
        // Avoid loops.
        return '#000000'.slice(0, -_color.length) + _color;
        }else {
            return color_num
        }
    }
    static getRandomInRange(min:number, max:number) {
        return Math.random() * (max - min) + min;
    }
    // static getRandGray():Color{
    //     let color = this.getRandomInRange(0.4,0.9)
    //     return new Color(color,color,color)
    // }
    
}
export enum TypeColor{
    String,
    Numeric
}