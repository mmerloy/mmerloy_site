$(document).ready(function(){
    $('#create_news_frm').submit(function(e){
//        e.preventDefault();
        const current_url = window.location.protocol + '//' + window.location.host + '/create_news';
//        alert(current_url)
        $('#create_news_frm').css('background-color', 'green');
//        alert(new FormData())
        $.ajax({
            url: current_url,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: new FormData(document.getElementById('create_news_frm')),
            success: function(data){
                alert("Форма создана!");
            },
            error: function () {
				alert("Bad add to favorite request.");
			}
        });
    });
});
