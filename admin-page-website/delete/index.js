const urlDelete = "https://web-production-4687.up.railway.app/v1/removePortfolio"

const logoutBtn = document.getElementById("logoutBtn")
const submitBtn = document.getElementById("submitBtn")
const itemNameInput = document.getElementById("item-input")

logoutBtn.onclick = () => {
   if (confirm("Logging out of admin account.")) {
    localStorage.clear()
    window.location.href = "/admin-page-website"
   }    
}

submitBtn.onclick = async (e) => {
    e.preventDefault()
    if (confirm(`This will delete the project ${itemNameInput.value}`)) {
    
    const payload = {
        key: localStorage.getItem("sessionKey"),
        title: itemNameInput.value
    }
    const resultData = await fetch(urlDelete, {method:"post", body:JSON.stringify(payload)})
    const result = await resultData.json()
    
    if(result.Status == "Failed") {
        alert("Failed to delete project.")
    } else if (result.Status == "404") {
        alert("Project does not exist.")
    } else {
        alert("Successfully deleted project.")
        itemNameInput.value = ""
    }
    } else {
        return
    }
}
