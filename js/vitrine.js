const X = response => {

    this.widget = null;
    this.reference = null;
    this.recommendation = null;

    for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
            const obj = response.data[key];
            switch(key){
                case "widget":
                    this.widget = obj;
                    break;
                
                case "reference":
                    this.reference = obj;
                    break;
                
                case "recommendation":
                    this.recommendation = obj;
                    break;

                default:
                    console.log("Erro");
                    break;
                
            }
        }
    }
    console.log("variaveis de estado: ");
    console.log("this.widget: ", this.widget);
    console.log("this.reference: ", this.reference);
    console.log("this.recommendation: ", this.recommendation);

    this.recommendation.map(recomendations => {
        // console.log("recomendations: ", recomendations);
    });

}