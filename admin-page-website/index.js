"use strict";
const loginBtn = document.getElementById("submitBtn");
const form = document.getElementById("login-form");
const link = "https://api.romanaugusto.tk/v1/login"
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginBtn.onclick = async (e) => {
    e.preventDefault();
    passwordInput.classList.remove("invalid")
    usernameInput.classList.remove("invalid")
    //form.submit()
    const data = new FormData(form);
    const email = data.get('username');
    const password = data.get('password');
    const json = {
        "username": email,
        "password": password
    }
    try {
    const jsonString = JSON.stringify(json)
    const result = await fetch(link, {method:"POST", body:jsonString})
    const resultJson = await result.json()

    if (resultJson.username == "valid") {
        if (resultJson.password == "valid") {
            const sessionKey = resultJson.key
            localStorage.setItem("sessionKey", sessionKey)
            localStorage.setItem("username", json.username)
            window.location.href = "/update"
        } else {
            passwordInput.classList.add("invalid")
        }
    } else {
        usernameInput.classList.add("invalid")
        passwordInput.classList.add("invalid")
    }
    } catch(e){
        alert("Server Error.")
    }
}