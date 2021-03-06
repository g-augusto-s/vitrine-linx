const X = response => {

    // ------------ Global variables ------------
    let widget = null;
    let reference = null;
    let recommendations = null;
    let current_page = 1;
    const records_per_page = 3;

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
            <div class="col-md-2 col-sm-12" >
                <a class="" href="${ref.item.detailUrl}" >
                    <img src="${ref.item.imageName}" class=""/>
                    <div class="row">
                        <p class="" >${ref.item.name}</p>
                        ${ref.item.oldPrice ? `<p>De: ${ref.item.oldPrice}</p>` : ''}
                        <div class="promocao" >
                            <p>Por: <strong>${ref.item.price}</strong></p>
                            <p>${ref.item.productInfo.paymentConditions}</p>
                            <p>sem juros</p>
                        </div>
                    </div>
                </a>
            </div>
            <button type="button" class="col-md-1" onclick="prevPage()" id="btn_prev" >Anterior</button>
        `;
    }
    
    // Return num of pages
    numPages = () => {
        return Math.ceil(widget.size / records_per_page);
    }

    // Previous page function
    prevPage = () => {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    // Next page function
    nextPage = () => {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
        
    // Render recommended products based on page
    changePage = (page) => {
        var productElement = document.getElementById("product-container");
    
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        productElement.innerHTML = renderProduct(reference);

        for (let i = (page-1) * records_per_page; i < (page * records_per_page) && i < recommendations.length; i++) {
            productElement.innerHTML +=  `
                <div class="col-md-2 col-sm-12" >
                    <a class="" href="${recommendations[i].detailUrl}" >
                        <img src="${recommendations[i].imageName}" class=""/>
                        <div class="row">
                            <p class="" >${recommendations[i].name}</p>
                            ${recommendations[i].oldPrice ? `<p>De: ${recommendations[i].oldPrice}</p>` : ''}
                            <div class="promocao" >
                                <p>Por: <strong>${recommendations[i].price}</strong></p>
                                <p>${recommendations[i].productInfo.paymentConditions}</p>
                                <p>sem juros</p>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
        // Add button after last recommended product
        productElement.innerHTML +=  `<button type="button" class="col-md-1" onclick="nextPage()" id="btn_next" >Próximo</button>`

        const btn_next = document.getElementById("btn_next");
        const btn_prev = document.getElementById("btn_prev");

        // Disable buttons when necessary
        if (page == 1) {
            btn_prev.disabled = true;
        } else {
            btn_prev.disabled = false;
        }

        if (page == numPages()) {
            btn_next.disabled = true;
        } else {
            btn_next.disabled = false;
        }
    }

    // Change to page one when document load
    window.onload = () => {
        changePage(1);
    };

    // Main
    this.getData();
    this.renderProduct(reference);
    
}