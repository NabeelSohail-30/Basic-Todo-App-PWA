const url = window.location.href;
let baseUrl = "";

if (url.split(":")[0] === 'https') {
    baseUrl = 'https://excited-train-deer.cyclic.app/';
} else {
    baseUrl = 'http://localhost:5001';
}

/*------------------------------------------------------------------------*/

let cancel = () => {
    document.querySelector('#productId').value = null;
    document.querySelector("#name").value = null;
    document.querySelector("#price").value = null;
    document.querySelector("#cat").value = null;
    document.querySelector("#desc").value = null;
    getAllProducts();
}

/*------------------------------------------------------------------------*/

let addProduct = () => {

    let name = document.querySelector("#name").value
    let price = document.querySelector("#price").value
    let cat = document.querySelector("#cat").value
    let desc = document.querySelector("#desc").value

    axios.post(`${baseUrl}/product`, {
        name: name,
        price: price,
        category: cat,
        description: desc
    })
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            alert(response.data.message);

            getAllProducts();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            document.querySelector("#result").innerHTML =
                error.message
        })

}

/*------------------------------------------------------------------------*/

let getAllProducts = () => {
    axios.get(`${baseUrl}/products`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data.data);
            document.querySelector("#productList").innerHTML = ""

            response?.data?.data.map((eachProduct, index) => {
                document.querySelector("#productList").innerHTML +=
                    `
                    <div class='pr_card'>
                        <div class='prName'>${eachProduct.name} </div>
                        <div class='prPrice'>Price: ${eachProduct.price} PKR </div>
                        <div class='prCatg'>Category: ${eachProduct.category} </div>
                        <div class='prDesc'>Description: ${eachProduct.description} </div>
                        
                        <div class='action'>
                            <button class='btn-del' onclick="deleteProduct('${eachProduct._id}')">Delete </button>
                            <button class='btn-edit' onclick="editProduct('${eachProduct._id}')">Edit </button>
                        </div>
                    </div>
                    `

                document.querySelector('#btnUpdate').setAttribute("style", "display:none;");
                document.querySelector('#btnCancel').setAttribute("style", "display:none;");
                document.querySelector('.btn-add').setAttribute("style", "display:inline;");
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.data.message);
        })
}

getAllProducts();

/*------------------------------------------------------------------------*/

let deleteProduct = (id) => {

    axios.delete(`${baseUrl}/product/${id}`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            alert(response.data.message);
            getAllProducts();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.data.message);
        })
}

/*------------------------------------------------------------------------*/

let updateProduct = () => {
    let id = document.querySelector('#productId').value;
    console.log(id);
    let name = document.querySelector("#name").value
    let price = document.querySelector("#price").value
    let cat = document.querySelector("#cat").value
    let desc = document.querySelector("#desc").value

    axios.put(`${baseUrl}/product/${id}`, {
        name: name,
        price: price,
        category: cat,
        description: desc
    })
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            alert(response.data.message);

            getAllProducts();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.message);
        })

}

let editProduct = (id) => {
    console.log('edit id = ' + id)
    axios.get(`${baseUrl}/product/${id}`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data.data);

            document.querySelector('#name').value = response.data.data.name;
            document.querySelector('#productId').value = response.data.data._id;
            document.querySelector('#price').value = response.data.data.price;
            document.querySelector('#cat').value = response.data.data.category;
            document.querySelector('#desc').value = response.data.data.description;

            document.querySelector('#btnUpdate').setAttribute("style", "display:inline;");
            document.querySelector('#btnCancel').setAttribute("style", "display:inline;");
            document.querySelector('.btn-add').setAttribute("style", "display:none;");
            document.querySelector("#name").focus();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.data.message);
        })
}