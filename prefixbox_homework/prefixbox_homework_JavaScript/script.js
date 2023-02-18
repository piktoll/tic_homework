class Product {
    constructor(id, name, price, element, ifOnSale) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.element = element;
        this.ifOnSale = ifOnSale;
    }
}

window.onload = function () {
    /* DOM */
    const productsEl = document.querySelector('.products');
    const dropdownEl = document.querySelector('.order');
    const checkBoxEl = document.querySelector('.sale');

    checkBoxEl.addEventListener('change', renderProducts);
    dropdownEl.addEventListener('change', renderProducts);

    /* parsing in the products */
    const catalog = Array.from(document.querySelectorAll('.product')).map(n => new Product(
        parseInt(n.querySelector('.product-data').getAttribute('data-identifier')),
        n.querySelector('.product-name').innerHTML,
        parseInt(n.querySelector('.product-price').innerHTML.split('.').join('')),
        n,
        n.querySelectorAll('.product-old-price').length > 0));
    /*
        Creates a new product object for every product.

        Detailed explanation:
        Parameter 1 passed in as the data identifier attribute for the unique identification of the product,
        Parameter 2 passed in as the product name,
        Parameter 3 passed in as the price but the dot is removed first in order not to be misinterpreted as a decimal dot (e.g. parsing in 3.500 as 3.5),
        Parameter 4 passed in as the HTML element as the visual representation of the product,
        Parameter 5 passed in as a boolean if the product is on sale (if the product has an old(er) price).
    */
    renderProducts();

    function renderProducts() {
        let arr = [...catalog];

        if (checkBoxEl.checked)
            arr = arr.filter(n => n.ifOnSale);

        switch (parseInt(dropdownEl.value)) {
            case 0:
                const priceAsc = arr.sort(sortByPrice).map(n => n.element);
                productsEl.replaceChildren(...priceAsc);
                break;

            case 1:
                const priceDesc = arr.sort(sortByPrice).reverse().map(n => n.element);
                productsEl.replaceChildren(...priceDesc);
                break;

            case 2:
                const nameAsc = arr.sort(sortByName).map(n => n.element);
                productsEl.replaceChildren(...nameAsc);
                break;

            case 3:
                const nameDesc = arr.sort(sortByName).reverse().map(n => n.element);
                productsEl.replaceChildren(...nameDesc);
                break;

            default:
                console.log("Unknown input");
                break;
        }
    }

    function sortByName(a, b) {
        // This sorts ascending by default
        return (a.name > b.name) ? 1 : -1;
    }

    function sortByPrice(a, b) {
        // This sorts ascending by default
        return (a.price > b.price) ? 1 : -1;
    }
}