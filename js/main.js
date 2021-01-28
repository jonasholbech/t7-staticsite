function init() {
  fetch("https://kea-alt-del.dk/t7/api/categories")
    .then((r) => r.json())
    .then(function (data) {
      categoriesRecieved(data);
    });
}
init();

function categoriesRecieved(cats) {
  createNavigation(cats);
  createSections(cats);
  fetchProducts();
}

function createSections(categories) {
  //<section id="starter">
  //<h2>Starter</h2>
  categories.forEach((category) => {
    const section = document.createElement("section");
    section.setAttribute("id", category.category);
    const h2 = document.createElement("h2");
    h2.textContent = category.category;
    section.appendChild(h2);
    document.querySelector(".productlist").appendChild(section);
  });
}

function createNavigation(categories) {
  categories.forEach((cat) => {
    console.log(cat);
    const a = document.createElement("a");
    a.textContent = cat.category;
    a.setAttribute("href", `#${cat.category}`);
    document.querySelector("nav").appendChild(a);
  });
}

function fetchProducts() {
  // fetch data
  fetch("https://kea-alt-del.dk/t7/api/products?limit=20")
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      dataReceived(data);
    });
}

function dataReceived(products) {
  //loop through products
  products.forEach(showProduct);
}

/*
<article class="product">
          <img class="product_image" src="" alt="" />
          <section class="productbody">
            <h3 class="data_name"></h3>
            <p></p>
            <h4 class="data_price">49,-</h4>
            <h4 class="data_discount">DISC,-</h4>

            <button>See details</button>
          </section>
        </article>
*/
//executed once for each product
function showProduct(myProduct) {
  //finding the template
  const temp = document.querySelector("#productTemplate").content;
  //clone the template
  const myCopy = temp.cloneNode(true);

  const img = myCopy.querySelector(".product_image");
  img.setAttribute(
    "src",
    `https://kea-alt-del.dk/t7/images/webp/640/${myProduct.id}.webp`
  );
  if (!myProduct.discount) {
    //console.log("NOT DISCOUNT")
    myCopy.querySelector(".data_discount").classList.add("hidden");
  } else {
    myCopy.querySelector(".data_discount").textContent =
      Math.round((100 - myProduct.discount) * 0.01 * myProduct.price) + ",-";
    myCopy.querySelector("article").classList.add("discount");
  }
  myCopy.querySelector(".data_price").textContent = myProduct.price + ",-";
  if (myProduct.soldout) {
    const p = document.createElement("p");
    p.textContent = "Sold Out";
    p.classList.add("soldout");
    myCopy.querySelector("article").appendChild(p);
  }

  //1. find the article
  const article = myCopy.querySelector("article");

  //2. add classes

  //fill out the template
  myCopy.querySelector(".data_name").textContent = myProduct.productdisplayname;

  myCopy.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t7/api/products/` + myProduct.id)
      .then((res) => res.json())
      .then(showDetails);
  });
  //append
  const parentElem = document.querySelector("section#" + myProduct.category);
  parentElem.appendChild(myCopy);
}

const modal = document.querySelector(".modal-background");
//once we have our data, ....
function showDetails(data) {
  console.log(data);
  modal.querySelector(".modal-name").textContent = data.productdisplayname;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  //  //...
  modal.classList.remove("hide");
}
/*
const veggiefilter = document.querySelector("#veggiefilter");
veggiefilter.addEventListener("click", veggieFilterClicked);

function veggieFilterClicked() {
  veggiefilter.classList.toggle("active");
  //b select all non veggie
  const articles = document.querySelectorAll("article:not(.vegetarian)");
  //console.log(articles)
  articles.forEach((elem) => {
    elem.classList.toggle("hidden");
  });
}

const alcoholfilter = document.querySelector("#alcoholfilter");
alcoholfilter.addEventListener("click", alcoholFilterClicked);

function alcoholFilterClicked() {
  alcoholfilter.classList.toggle("active");
  //b select all non veggie
  const articles = document.querySelectorAll("article.alcoholic");
  //console.log(articles)
  articles.forEach((elem) => {
    elem.classList.toggle("hidden");
  });
}*/

//close the modal when clicked

modal.addEventListener("click", () => {
  modal.classList.add("hide");
});
