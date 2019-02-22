var ws;

$("#connect").on("click", function(){
    //Init of WebSocket
    ws = new WebSocket("ws://localhost:8080");

    //Status Connected
    ws.onopen = function open() {
        setStatus('CONNECTED');
    };

    //Status Disconnected
    ws.onclose = function open() {
        setStatus('DISCONNECTED');
    };
    
    //Get Message
    ws.onmessage = function (data) {
        addMsg(JSON.parse(data.data));
    };
});

function sendMsg(data){
    //Send msg to socket
    ws.send(JSON.stringify(data));
}


//Helpers
$("#msg").on('keypress',function(e) {
    if(e.which == 13) {
        let username = $("#username").val();
        let msg = $("#msg").val();

        if(msg !== "" && username !== "") {
            sendMsg({ msg: msg, username: username });
            $("#msg").val("");
        }
    }
});

function setStatus(status) {
    $('#status').html(status);
}

function addMsg(data){
    var classs = "";
    if(data.username === $("#username").val()){
        classs = "text-right"
    }

    $("#chat").append('<li class="list-group-item">'
                        + '<div class="'+ classs +'">'
                            + '<b>'+ data.username +'</b>'
                            + '<p>'+ data.msg +'</p>'
                        + '</div>'
                    + '</li>');
}
