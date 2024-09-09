import {createHTMLElementHandler} from "../lib";


createHTMLElementHandler("div")
    .addClass("test")
    .appendTo(document.body)
    .fill("hello")
    .appendChild(" word")
    .fillHTML("<span>world</span>").on("click", () => {
    console.log("click")
})
