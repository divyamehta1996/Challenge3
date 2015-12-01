
var AddButtons = document.querySelectorAll('[id^=button-]');
var SubmitButtons = document.querySelectorAll('[id^=submit-]');
var form_ids = {};
var lists_form_ids = {}

console.log(SubmitButtons);
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var renderListElement = function(text, id){
    return res = '<div id="el-'+id +'" class="list-element"><div class="text">'+text+'</div>'+'<button class="del" id="del-'+id+'">Delete</button></div>'
}

for(k=0;k<SubmitButtons.length;k++){
    SubmitButtons[k].addEventListener('click', function(){
        id = this.id.split('-')[1];
        list = form_ids['button-'+id].list
        data = []
        for (var property in list) {
            if (list.hasOwnProperty(property)) {
                data.push(list[property]);
            }
        }
        alert('Submited data'+data);
    }, false)
}

for(i=0; i<AddButtons.length; i++){
    form_ids[AddButtons[i].id]={id: AddButtons[i].id.match(/\d+/), list:{}};
    AddButtons[i].addEventListener('click', function () {
        console.log(form_ids[this.id].id);
        inputVal = document.getElementById('text-'+form_ids[this.id].id).value;
        document.getElementById('text-'+form_ids[this.id].id).value = '';
        list = document.getElementById('list-'+form_ids[this.id].id);
        elementId = makeid();
        lists_form_ids[elementId]=form_ids[this.id].id;
        list.innerHTML = list.innerHTML + renderListElement(inputVal, elementId);
        delButton = document.getElementById('del-'+elementId);
        form_ids[this.id].list[elementId]=inputVal;
        delButtons = document.querySelectorAll('[id^=del-]');
        for(j=0;j<delButtons.length; j++){
            delButtons[j].addEventListener('click', function(){
                elId = this.id.split('-')[1];
                console.log(this);
                console.log(elId);
                document.getElementById('el-'+elId).remove();
                delete form_ids['button-'+lists_form_ids[elId]].list[elId];
            }, false);
        }
    },false);
}

