const inputElements = document.querySelectorAll(".form-class [name]");


function onSubmit(event) {
    event.preventDefault();
    console.log("submitted");
    const employee = Array.from(inputElements).reduce(
        (res, cur) => {
            res[cur.name] = cur.value;
            return res;
        }, {}
    )
    console.log(employee);
}
function onChange(event) {
    if (event.target.name == "salary") {
        if (+event.target.value < 1000 || +event.target.value > 40000) {
            error.innerHTML = "<span style='color: red;'>" + "Please enter salary from 1000 to 40000</span>"
            setTimeout(function () {
                error.innerHTML = '';
            }, 5000)
        }

    }

}





