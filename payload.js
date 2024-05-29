// preload.js

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {});



window.addEventListener('DOMContentLoaded', () => {
    // const replaceText = (selector, text) => {
    //     const element = document.getElementById(selector)
    //     if (element) element.innerText = text
    // }

    // for (const dependency of['chrome', 'node', 'electron']) {
    //     replaceText(`${dependency}-version`, process.versions[dependency])
    // }

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i' || e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
            e.preventDefault()
        }
    })
})