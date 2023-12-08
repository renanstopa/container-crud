document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("containerForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const loaded = document.getElementById("loaded").value;
        const content = document.getElementById("content").value.trim();

        const data = {loaded, content};

        fetch(`/container`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data?.id) {
                    Swal.fire({
                        title: "Success",
                        text: "Container created",
                        icon: "success"
                    }).then(() => {
                        window.location.href = `home.html`;
                    });

                    return;
                }

                if(data?.errors){
                    messageError = data.errors.reduce(function (previousValue, error){
                        return error.defaultMessage + "<br />" + previousValue;
                    }, "")

                    Swal.fire({
                        title: "Oops...",
                        html: "<div>" + messageError + "</div>",
                        icon: "error"
                    })

                    return;
                }

                Swal.fire({
                    title: "Something went wrong",
                    text: data.message,
                    icon: "error"
                })
            })
            .catch(error => {
                console.log(error);
            })
    })
})