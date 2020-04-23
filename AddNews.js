var addNewsBtn = document.querySelector('.add-message button');
var addMessageLi = document.querySelector('.add-message');
var addMessage = document.querySelector('.add-message input');
var senterName = document.querySelector('header .user-info .info .name').textContent;
var senterId = document.querySelector('header .user-info .info .identity').textContent;
addMessage.name = senterName;
addMessage.id = senterId;

showNews();
var localStorageLength = localStorage.length;

addNewsBtn.onclick = function(){
    var count = 0;
    var newMessContent = addMessage.value;
    var time = new Date();
    var localTime = time.toLocaleTimeString();
    if(localTime.slice(0, 2) == '上午'){
        localTime = localTime.slice(2, -3) + ' AM';
    }else{
        localTime = localTime.slice(2, -3) + ' PM';
    }

    for(let i = 0; i < localStorage.length; i++){
        if(localTime.slice(0, 5) == localStorage.key(i).slice(0, 5)){
            count++;
        }
    }
    
    if(count > 0){
        localTime = localTime + `${count}`;
    }

    // console.log(localTime);

    localStorage.setItem(localTime, newMessContent);
    showNews(localTime);
    addMessage.value = '';
}

function showNews(localTime){
    var arr = new Array(2);
    arr[0] = new Array();
    arr[1] = new Array();
    if(localTime){
        appendNews(localTime);
    }else{
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.key(i).slice(6, 8) == 'AM' || localStorage.key(i).slice(6, 8) == 'PM'){
                // appendNews(localStorage.key(i));
                let timeToNum = localStorage.key(i).slice(0, 5).split(':');
                let morAft = localStorage.key(i).slice(6);
                // console.log(parseInt(timeToNum[0] + timeToNum[1]));
                arr[0].push(parseInt(timeToNum[0] + timeToNum[1]));
                arr[1].push(morAft);
            }
        }
        arr[0] = arr[0].sort();
        for(let i = 0; i < localStorage.length; i++){
            let keyValue = arr[0][i].toString().slice(0, 2) + ':' + arr[0][i].toString().slice(-2) + ' ' + arr[1][i];
            // console.log(keyValue);
            appendNews(keyValue);
        }
    }
}

function appendNews(key){
    var li = document.createElement('li');
    li.style.paddingBottom = '27px';
    
    var img = document.createElement('img');
    img.src = './12_15-assets/Face2.png';
    img.alt = 'Face2.png';
    li.appendChild(img);

    var info = document.createElement('div');
    info.setAttribute('class', 'info');
    li.appendChild(info);

    var name = document.createElement('span');
    name.setAttribute('class', 'name');
    name.textContent = senterName;
    info.appendChild(name);

    var infoTime = document.createElement('span');
    infoTime.setAttribute('class', 'time');
    infoTime.textContent = key.slice(0, 8);
    info.appendChild(infoTime);

    var p = document.createElement('p');
    p.setAttribute('class', 'descript');
    p.textContent = localStorage.getItem(key);
    info.appendChild(p);

    addMessageLi.parentNode.insertBefore(li, addMessageLi);
}