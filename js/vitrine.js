const X = response => {

    // ------------ Global variables ------------
    let widget = null;
    let reference = null;
    let recommendations = null;

    // ---------- Functions ------------

    // Get data from JSONP
    getData = () => {
        for (const key in response.data) {
            if (response.data.hasOwnProperty(key)) {
                const obj = response.data[key];
                switch(key){
                    case "widget":
                        widget = obj;
                        break;
                    
                    case "reference":
                        reference = obj;
                        break;
                    
                    case "recommendation":
                        recommendations = obj;
                        break;
    
                    default:
                        console.log("Erro");
                        break;
                }
            }
        }
    }

    // Render product reference
    renderProduct = (ref) => {
        return `
            <div class="col-2" >
                <a class="" href="${ref.item.detailUrl}" >
                    <img src="${ref.item.imageName}" class=""/>
                    <div class="row">
                        <p class="" >${ref.item.name}</p>
                        ${ref.item.oldPrice ? `<p>De: ${ref.item.oldPrice}</p>` : ''}
                        <div class="promocao" >
                            <h5>Por: <strong>${ref.item.price}</strong></h5>
                            <p>${ref.item.productInfo.paymentConditions}</p>
                            <p>sem juros</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // Render product recommendations
    renderRecomendations = (rec) => {
        return `
        ${rec.map(recommendation => 
            `<div class="col-2" >
                <a class="" href="${recommendation.detailUrl}" >
                    <img src="${recommendation.imageName}" class=""/>
                    <div class="row">
                        <p class="" >${recommendation.name}</p>
                        ${recommendation.oldPrice ? `<p>De: ${recommendation.oldPrice}</p>` : ''}
                        <div class="promocao" >
                            <h5>Por: <strong>${recommendation.price}</strong></h5>
                            <p>${recommendation.productInfo.paymentConditions}</p>
                            <p>sem juros</p>
                        </div>
                    </div>
                </a>
            </div>
            `
        ).join('')}
        `;
    }
    

    // Get the container element and update the innerHTML of him
    updateTemplate = (productContainer, ref, rec) => {
        let containerElement = document.getElementById(productContainer);
        containerElement.innerHTML = renderProduct(ref) + renderRecomendations(rec);
    }

    this.getData();
    this.updateTemplate("product-container", reference, recommendations);

    
}