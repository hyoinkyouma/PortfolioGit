const urlUpload = "https://api.romanaugusto.tk/v1/sendPortfolio"

const logoutBtn = document.getElementById("logoutBtn")
const itemNameInput = document.getElementById("item-input")
const linkInput = document.getElementById("link-input")
const imgInput = document.getElementById("img-input")
const descInput = document.getElementById("desc-input")
const submitBtn = document.getElementById("submitBtn")

logoutBtn.onclick = () => {
   if (confirm("Logging out of admin account.")) {
    localStorage.clear()
    window.location.href = "/"
   }    
}

submitBtn.onclick = async() => {
    if (imgInput.value == "" || linkInput.value == "" || itemNameInput == "") {
        alert("Fields Empty!")
        return
    }
    
    const payload = {
        key: key,
        img: imgInput.value,
        desc: descInput.value,
        link: linkInput.value,
        title: itemNameInput.value
    }
    try {
        const responseData = await fetch(urlUpload, {method:"post", body:JSON.stringify(payload)})
        const response = await responseData.json()
        if (response.Message == "Success") {
            alert("Project Sucessfully Uploaded!")
            imgInput.value = ""
            descInput.value = ""
            linkInput.value = ""
            itemNameInput.value = ""
        } else {
            alert("Project Upload Failed!")
        }
    } catch(e) {
        alert("Service Error")
    }
}