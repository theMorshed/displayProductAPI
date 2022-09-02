// loadAllProducts function to load all products in api
const loadAllProducts = async () => {
    // fetch data from api
    const response = await fetch('https://fakestoreapi.com/products');
    // make all product data as json format
    const allProducts = await response.json();
    // return all products
    return allProducts;
}

// declare neccessary variable and get container element of UI
const productContainer = document.getElementById('product-container');
const progressBar = document.getElementById('progress-bar');
const categoryContainer = document.getElementById('category-list');

// display single product in ui 
const displaySingleProduct = (allProducts) => {
    productContainer.textContent = '';
    allProducts.forEach(product => {
        const { title, image, description } = product;
        const singleProductDiv = document.createElement('div');
        singleProductDiv.classList.add('md:basis-1/4');
        singleProductDiv.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    ${title.length > 15 ? title.slice(0, 15) : title}
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>${description.length > 20 ? description.slice(0, 20) + '...' : description}</p>
                <div class="card-actions justify-end mt-4">
                    <label for="my-modal-3" class="badge badge-outline cursor-default modal-button" onclick="displayDetails('${title}', '${image}', '${description}')">Details</label>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(singleProductDiv);
    })
    progressBar.classList.add('hidden');
}

// display initial product when site is load first
const displayInitialProduct = async () => {
    const allProducts = await loadAllProducts();
    displaySingleProduct(allProducts);
}

// display category in the UI
categoryContainer.addEventListener('click', async (event) => {
    const categoryValue = event.target.innerText;
    const allProducts = await loadAllProducts();
    const matchedProducts = allProducts.filter(product => product.category.includes(categoryValue));
    displaySingleProduct(matchedProducts);
});

// display category with this function
const displayCategories = async () => {
    // get category list container by dom
    const categoryContainer = document.getElementById('category-list');
    // get all product by invoke loadAllProducts asynchronous function
    const products = await loadAllProducts();
    const uniqueCategory = [];
    // loop through all product and working with their category
    products.forEach(product => {
        if (uniqueCategory.indexOf(product.category) === -1) {
            // if category isn't exists then push it in a category array
            uniqueCategory.push(product.category);
        }
    });

    // display all category in UI
    uniqueCategory.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('py-3', 'px-5', 'text-primary', 'bg-indigo-100', 'cursor-default')
        li.innerText = category;
        categoryContainer.appendChild(li);
    })
}

// search product by this function
const searchProduct = () => {
    const inputField = document.getElementById('input-search');
    inputField.addEventListener('keypress', async (event) => {
        productContainer.textContent = '';
        progressBar.classList.remove('hidden');
        if (event.key === 'Enter') {
            const searchValue = inputField.value;
            const allProducts = await loadAllProducts();
            const matchedProducts = allProducts.filter(product => product.category.includes(searchValue));
            displaySingleProduct(matchedProducts);
        }
    })
}

// display single product title and image in modal
const displayDetails = (title, image, description) => {
    // get modal title, image and description UI field for display dynamic content
    const productTitle = document.getElementById('product-title');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-desc');
    productTitle.innerText = title;
    productImage.innerHTML = `<img src="${image}" alt="">`;
    productDescription.innerText = description;
}

displayInitialProduct();
displayCategories();
searchProduct();