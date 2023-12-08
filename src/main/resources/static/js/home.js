let page = 0;

document.addEventListener("DOMContentLoaded", function(){
    loadPage(page);

    const btnPage = document.getElementById("btnPage");
    btnPage.addEventListener("click", function (event){
        event.preventDefault();
        page++;
        loadPage(page);
    })
})

function loadPage(page){
    fetch(`/container?page=${page}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            if(data.length !== 0){
                const divPage = document.getElementById("divPage");
                divPage.classList.remove("hide");
            }

            const div = document.getElementById("divContainer");

            for(const container of data){
                const divContainerContent = document.createElement("div");
                const divContainerInformation = document.createElement("div");;
                const span = document.createElement("span");
                const divIconContent = document.createElement("div");;
                const icon = document.createElement("i");

                span.innerText = container.content;
                icon.addEventListener("click", function(event){
                    event.preventDefault();
                    window.location.href = `container.html?id=${container.id}`;
                })

                divContainerContent.classList.add("container-content", "d-flex");
                divContainerInformation.classList.add("container-information", "d-flex");
                span.classList.add("d-flex");
                divIconContent.classList.add("icon-content", "d-flex");
                icon.classList.add("fa-solid", "fa-eye");

                divContainerInformation.append(span);
                divIconContent.append(icon);
                divContainerContent.append(divContainerInformation);
                divContainerContent.append(divIconContent);
                div.append(divContainerContent);
            }
        })
}