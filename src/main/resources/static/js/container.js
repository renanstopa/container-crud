document.addEventListener("DOMContentLoaded", function () {
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get("id");

    fetch(`/container/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                window.location, href = "home.html";
                return
            }

            const loaded = data.loaded;
            const content = data.content;

            const inputLoaded = document.getElementById("loaded");
            const inputContent = document.getElementById("content");

            inputLoaded.value = loaded;
            inputContent.value = content;
        })
        .catch(error => {
            console.log(error);
        })

    const form = document.getElementById("containerForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const loaded = document.getElementById("loaded").value;
        const content = document.getElementById("content").value.trim();

        const data = {loaded, content};

        fetch(`/container/${id}`, {
            method: "PATCH",
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
                        text: "Container updated",
                        icon: "success"
                    }).then(() => {
                        location.reload();
                    });

                    return;
                }

                if (data?.errors) {
                    messageError = data.errors.reduce(function (previousValue, error) {
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

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", function (event) {
        event.preventDefault();

        fetch(`/container/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.status !== 200) {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error"
                    })

                    return;
                }

                Swal.fire({
                    title: "Success",
                    text: "Container deleted",
                    icon: "success"
                }).then(() => {
                    window.location.href = "home.html";
                });
            })
    })
})