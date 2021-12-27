<template>
  <router-view/>
</template>

<style>
*{
    margin: 0px;
    font-size: 1em;
}
#app {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
body {
    background: rgb(255,255,255);
    background: linear-gradient(180deg, skyblue 0%, lightcyan (135,206,250,1) 75%);
}

nav {
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;
}
h2 {
    font-size: 20px;
}
.main-box {
    width: 90%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgb(0, 220, 255) 0%, rgba(135,190,250,1) 75%);
    border: 1px solid black;
    border-radius: 25px;
    box-shadow: 5px 5px 10px lightgrey;
    padding: 10px 5px 20px 5px;
    margin: 25px;
}
.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(128, 128, 128, 0.233);
}
form, .login, .username, .password, .email {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0 10px 0;
}
.close-modal {
    height: 20px;
    width: 20px;
    position: relative;
    right: 10px;
    top: 5px;
    margin: 0 0 5px auto;
    border: solid 1px black;
    border-radius: 5px;
    cursor: pointer;
}
.text-box{
    max-height: 600px;
    overflow-y: scroll;
    margin: 15px 0 0 0;
}
.text {
    display: inline-block;
    width: 90%;
    background: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0 10px 0;
    align-self: center;
    overflow-wrap: break-word;
}
.text-bloc {
    display: flex;
    flex-direction: column;
}
.text-input {
    width: 90%;
    height: 30%;
    background: white;
    border-radius: 5px;
    padding: 10px 0 10px 0;
    margin: 10px 0 10px 0;
    text-align: left;
}
form button {
    background: lightskyblue;
    margin-top: 20px;
}
button {
    width: fit-content;
    color: darkblue;
    background: lightskyblue;
    border: solid 1px black;
    padding: 10px 15px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 0px 2px 6px darkblue;
    cursor: pointer;
    transition: ease-in-out 75ms;
}
button:active {
    transform: scale(0.95);
}

::-webkit-scrollbar{
    width: 5px;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: lightgrey;
}
</style>
