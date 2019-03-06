var vitrine = {

    insertData: function (tmpl, product) {
        tmpl.find('.item_thumb').attr("src", product.image);
        tmpl.find('.item_name').text(product.name);
        tmpl.find('.item_price').text(product.price);
        tmpl.find('.item_description').text(product.description);
    },

    renderProducts: function (products, s) {

        var rowCount = 1,
            numProducts = products.length,
            numRows = Math.ceil(products.length / s.numColumns),
            itemWidth;

        s.cartContainer.hide();
        s.container.fadeOut(s.fadeSpeed, function () {

            // Empty out main container on load
            s.container.html('').fadeIn(s.fadeSpeed);

            // Build rows based on number of products
            for (var r = 0; r < numRows; r++) {
                s.container.append('<div class="row ' + s.rowClass + (r + 1) + '"></div>');
            }

            // Get item column width
            var widthClasses = s.columnWidthClasses;
            for (var k in widthClasses) {
                if (k == s.numColumns) {
                    itemWidth = widthClasses[k];
                }
            }

            // List layout
            products.forEach(function (product, i) {

                if (!product.soldOut) {
                    var tmpl = $('#products-template').html(),
                        $tmpl = $(tmpl);

                    // Set item width
                    $tmpl.first().addClass(itemWidth);

                    // Insert data into template
                    simpleStore.insertData($tmpl, product);

                    // Render detail view on hash change
                    var getDetail = $tmpl.find('.simpleStore_getDetail');
                    getDetail.on('click', function (e) {
                        e.preventDefault();
                        window.location.hash = 'product/' + product.id;
                    });

                    // Check where to add new item based on row
                    if (i === 0) {
                        i = 1;
                    }
                    if (i % (s.numColumns) === 0) {
                        rowCount++;
                    }

                    // Append to appropriate container
                    $('.' + s.rowClass + rowCount).append($tmpl);
                }
            });
        });
    }
}