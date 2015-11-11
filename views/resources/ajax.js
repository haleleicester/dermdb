var submit = function(packet, url){
    Logger("transport", "Ajax", "Sending ajax request to "+url);
    Logger("transport", "Ajax", "Packet: " + packet);
    $.ajax({
        url: "http://localhost:3000" + url,
        method: "POST",
        dataType: 'json',
        data: packet,
        contentType: "application/json",
        success: function (data) {
            Logger("transport", "Ajax", "Response: " + JSON.stringify(data));
            if (data.status === "ok") {
                Logger("success", "Ajax", "POST succeed!")
                BootstrapDialog.alert({
                    title: 'Success',
                    message: JSON.stringify(data),
                    type: BootstrapDialog.TYPE_SUCCESS, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    buttonLabel: 'Continue' // <-- Default value is 'OK',
                });
            } else {
                console.log(data);
                errorHandler(data);
            }
        },
        error: function (e) {
            errorHandler(e.responseJSON);
            console.log(e.responseJSON);
            Logger("error", "Ajax", "An unknown error has occurred... Please try again.");
        }
    });
};

function errorHandler(packet){
    if (typeof packet !== "undefined" && typeof packet.data !== "undefined") {
        Logger("transport", "Ajax", "Error: " + packet.data.message);
        BootstrapDialog.alert({
            title: 'Error',
            message: packet.statusCode + " - " + packet.data.message + ": " + packet.data.description + " (" + packet.data.code + ")",
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttonLabel: 'Continue' // <-- Default value is 'OK',
        });
    } else {
        BootstrapDialog.alert({
            title: 'Error',
            message: "An unknown exception has occurred! It is recommended you refresh the page, if you have been served with an error code, please forward this to the developer.",
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttonLabel: 'Continue' // <-- Default value is 'OK',
        });
    }
}