<template>
  <router-view/>
</template>

<style>
*{
    margin: 0px;
}
#app {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
body {
    background: rgb(255,255,255);
    background: linear-gradient(180deg, skyblue 0%, lightcyan (135,206,250,1) 75%);
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
}
::-webkit-scrollbar{
    width: 5px;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: lightgrey;
}
</style>
