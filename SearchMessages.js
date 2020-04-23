fetch('messages.json').then(function(response){
    return response.json();
}).then(function(json){
    let messages = json;
    initialize(messages);
}).catch(function(err){
    console.log('Fetch problem: ' + err.message);
});

var messages = document.querySelector('.content .messages .list');
var li = messages.getElementsByTagName('li');
var activeMessage = searchActive().trim();

for(let i = 0; i < li.length; i++){
    li[i].onclick = function(){
        let active = document.querySelector('.active');
        active.removeAttribute('class');
        this.setAttribute('class', 'active');
        activeMessage = searchActive().trim();
    }
}

function searchActive(){
    for(let i = 0; i < li.length; i++){
        if(li[i].getAttribute('class') === 'active'){
            return(li[i].querySelector('.head .user .name').textContent);
        }
    }
}

function initialize(messages){
    const searchTerm = document.querySelector('.input_search input');
    const searchBtn = document.querySelector('.input_search button');
    const messagesList = document.querySelector('.content .messages .list ul');

    let lastSearch = '';
    let searchGroup;
    // searchGroup = messages;
    // updateDisplay();

    searchGroup = [];
    searchBtn.onclick = selectSearch;

    function selectSearch(ev){
        var ev = window.event || ev;
        ev.preventDefault();

        searchGroup = [];
        if(lastSearch === searchTerm.value.trim()){
            return;
        }else {
            lastSearch = searchTerm.value.trim();
            if(searchTerm.value.trim() === ''){
                searchGroup = messages;
                updateDisplay();
            }else{
                let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
                for(let i = 0; i < messages.length; i++){
                    if(messages[i].name.toLowerCase().indexOf(lowerCaseSearchTerm) !== -1){
                        searchGroup.push(messages[i]);
                    }
                }
                updateDisplay();
            }
        }
    }

    function updateDisplay(){
        while(messagesList.firstChild){
            messagesList.removeChild(messagesList.firstChild);
        }

        if(searchGroup.length === 0){
            const para = document.createElement('p');
            para.textContent = 'No result to display!';
            messagesList.appendChild(para);
        }else{
            for(let i = 0; i < searchGroup.length; i++){
                fetchBlob(searchGroup[i]);
            }
        }
    }

    function fetchBlob(message){
        let url = '12_15-assets/' + message.image;
        fetch(url).then(function(response){
            return response.blob();
        }).then(function(blob){
            let objectURL = URL.createObjectURL(blob);
            showMessage(objectURL, message);
        }).catch(function(err){
            console.log('Fetch problem: ' + err.message);
        });
    }

    function showMessage(objectURL, message){
        const li = document.createElement('li');
        if(message.name === activeMessage){
            li.setAttribute('class', 'active');
        //     alert('1');
        // }else{
        //     alert('0');
        //     alert(activeMessage);
        }
        const divHead = document.createElement('div');
        const image = document.createElement('img');
        const divHeader_user = document.createElement('div');
        const divHeader_name = document.createElement('span');
        const divHeader_point = document.createElement('i');
        const divHeader_descript = document.createElement('span');
        const divHeader_time = document.createElement('span');
        const divBody = document.createElement('div');
        const divBody_p = document.createElement('p');
        const divBody_num = document.createElement('span');

        divHead.setAttribute('class', 'head');
        divHeader_user.setAttribute('class', 'user');
        divHeader_name.setAttribute('class', 'name');
        divHeader_point.setAttribute('class', 'point');
        divHeader_descript.setAttribute('class', 'descript');
        divHeader_time.setAttribute('class', 'time');
        divBody.setAttribute('class', 'body');
        divBody_num.setAttribute('class', 'num');

        messagesList.appendChild(li);
        li.appendChild(divHead);
        li.appendChild(divBody);

        divHead.appendChild(image);
        image.src = objectURL;
        image.alt = message.image.toString();
        divHead.appendChild(divHeader_user);
        divHead.appendChild(divHeader_time);

        divHeader_user.appendChild(divHeader_name);
        divHeader_user.appendChild(divHeader_descript);
        var name = document.createTextNode(message.name);
        divHeader_name.appendChild(name);
        divHeader_name.insertBefore(divHeader_point, name);
        divHeader_descript.textContent = message.descript;

        divHeader_time.textContent = message.time;

        divBody.appendChild(divBody_p);
        divBody.appendChild(divBody_num);
        divBody_p.textContent = message.body;
        divBody_num.textContent = message.num;
    }
}

