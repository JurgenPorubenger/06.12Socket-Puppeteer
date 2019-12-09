const socket = io.connect('http://localhost:3002');


let btn = document.querySelector('#btn').addEventListener('click',()=>{
    let urlText = document.querySelector('#url_text').value;
    let selectorText = document.querySelector('#selector_text').value;
    console.log(selectorText,urlText);
    socket.emit('start',{urlText,selectorText});

});
console.log('main2');
socket.on('news', function (data) {
    const node = document.createElement("div");                 // Create a <li> node
    node.innerHTML = `<a href=${data.url}>${data.message}</a><br><p>${data.text}</p>`;
    node.classList.add('article');
    document.querySelector('.main_div').appendChild(node);
    console.log(data);
    socket.on('disconnectThatSoc', function(){
        socket.disconnect();
    });
});
