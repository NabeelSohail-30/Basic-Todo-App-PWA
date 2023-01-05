
/*---------------------------------------------------------------*/

const url = window.location.href;
let baseUrl = "";

if (url.split(":")[0] === 'https') {
    baseUrl = 'https://excited-train-deer.cyclic.app/';
} else {
    baseUrl = 'http://localhost:5001';
}


/*---------------------------------------------------------------*/


let getAllTodos = () => {
    axios.get(`${baseUrl}/todos`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data.data);
            document.querySelector("#todoList").innerHTML = "";

            response?.data?.data.map((eachTodo, index) => {
                document.querySelector("#todoList").innerHTML +=
                    `
                        <div class="row">
                            <div class="col-11">
                                <label for="" id="lblTodo">
                                    ${eachTodo.todo}
                                </label>
                            </div>
                            <div class="col-1">
                                <button class="btn-del" onclick="deleteTodo(${eachTodo._id});">
                                    <img src="img/delete.png" alt="">
                                </button>
                            </div>
                        </div>
                    `
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.message);
        })
}


let addTodo = () => {

    let todo = document.querySelector("#txtTodo").value

    axios.post(`${baseUrl}/todo`, {
        todo: todo
    })
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            alert(response.data.message);

            getAllTodos();

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error.message);
        })

}


let deleteTodo = (id) => {

    axios.delete(`${baseUrl}/todo/${id}`)
        .then(function (response) {
            // handle success
            console.log("response is success");
            console.log(response.data);

            alert(response.data.message);
            getAllTodos();

        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
            alert(error.message);
        })
}

getAllTodos();