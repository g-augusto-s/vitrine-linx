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
                            <h5>Por: <strong>${ref.item.price}</strong></h5>
                            <p>${ref.item.productInfo.paymentConditions}</p>
                            <p>sem juros</p>
                        </div>
                    </div>
                </a>
            </div>
            <button onclick="prevPage()" id="btn_prev" >Anterior</button>
        `;
    }
    
    numPages = () => {
        return Math.ceil(widget.size / records_per_page);
    }

    prevPage = () => {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    nextPage = () => {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
        
    changePage = (page) => {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("product-container");
    
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        listing_table.innerHTML = renderProduct(reference);

        for (let i = (page-1) * records_per_page; i < (page * records_per_page) && i < recommendations.length; i++) {
            listing_table.innerHTML +=  `
                <div class="col-md-2 col-sm-12" >
                    <a class="" href="${recommendations[i].detailUrl}" >
                        <img src="${recommendations[i].imageName}" class=""/>
                        <div class="row">
                            <p class="" >${recommendations[i].name}</p>
                            ${recommendations[i].oldPrice ? `<p>De: ${recommendations[i].oldPrice}</p>` : ''}
                            <div class="promocao" >
                                <h5>Por: <strong>${recommendations[i].price}</strong></h5>
                                <p>${recommendations[i].productInfo.paymentConditions}</p>
                                <p>sem juros</p>
                            </div>
                        </div>
                    </a>
                </div>
            `
        }
        listing_table.innerHTML +=  `<button onclick="nextPage()" id="btn_next" >Próximo</button>`

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    window.onload = () => {
        changePage(1);
    };

    // Main program
    this.getData();
    this.renderProduct(reference);

    
}