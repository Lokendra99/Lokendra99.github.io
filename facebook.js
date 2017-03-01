$(document).ready(function(){


    $('#description').hide();
    // calling profile picture and my information posted on facebook.
    $(".about_me").click(function(){
    var myToken="EAACEdEose0cBAMiLIZCIBTOwWGZCbHXAfXxww0AQLYwFjR9PuxbYa0ob6vpe2F4AG7ijbDblRVZC79Wo0IXiE8AgtW86Bix7WRhSssnCZCUiU5gF6vzJwHIA174cq7cz6rDdhyB1NLEz9TOWfMERHTD9FZBwWfdqTxByNImfREsFKZBRwC90ZBNlTQjuXZB9B1cZD";

        $.ajax({
            url:'https://graph.facebook.com/100004597240420/picture?type=large&redirect=false&access_token=' + myToken,
            type:'GET',
            timeout:100000,
            success:function (response) {
                console.log(response.data.url);
                // $('.profile').append(response.data.url);
                htmlString = '<img src="' + response.data.url + '" class="profile_image_getting_from_fb">';
                $('.profile').append(htmlString);

            },
            beforeSend: function() {
                $('#hidden_feature').hide();
                $('#description ').fadeIn();
            },
            complete: function() {
                $('#description ').fadeOut();
            }



        });

        $.ajax({
    url: 'https://graph.facebook.com/me?access_token=' + myToken,
    type: 'GET',
    dataType: 'JSON',
    timeout:100000,

    success: function (data) {
        console.log(data);
        $.each(data, function (index, value) {
            if (typeof value == "string" || typeof value == "number") {
                console.log(index + " " + value);
                $("table").append("<tr><td>" + "<b>"+ index + "</b>"+"</td>" + "<td>" + value + "</td></tr>");

            }
        });
        console.log("hometown" + " " + data.hometown.name);
        $("table").append("<tr><td>" + " <b>hometown</b>" + "</td>" + "<td>" + data.hometown.name + "</td></tr>");
        for (x in data.education) {
            console.log("school" + " " + data.education[x].school.name);
            $("table").append("<tr><td>" + "<b>school</b>" + "</td>" + "<td>" + data.education[x].school.name + "</td></tr>")
        }

    },
    error:function (errorObject,errorName,extraOptionalError) {
        console.log(errorObject);
        console.log(errorName);
        console.log(extraOptionalError);

        $(".error_object_main_content").html(errorObject.responseText + "<br>" + "status" + " " + errorObject.status);
        $(".error").html(errorName);
        $("#optionalerror").html(extraOptionalError);

    }

}

);


    });
    //calling profile picture and the recent posts
    $('.feeds_button').click(function() {

        var myToken = 'EAACEdEose0cBAMiLIZCIBTOwWGZCbHXAfXxww0AQLYwFjR9PuxbYa0ob6vpe2F4AG7ijbDblRVZC79Wo0IXiE8AgtW86Bix7WRhSssnCZCUiU5gF6vzJwHIA174cq7cz6rDdhyB1NLEz9TOWfMERHTD9FZBwWfdqTxByNImfREsFKZBRwC90ZBNlTQjuXZB9B1cZD';

        $.ajax({
            url: 'https://graph.facebook.com/100004597240420/picture?type=large&redirect=false&access_token=' + myToken,
            type: 'GET',
            timeout: 100000,
            success: function (response) {
                console.log(response.data.url);
                // $('.profile').append(response.data.url);
                htmlString = '<img src="' + response.data.url + '" class="profile_image_getting_from_fb animated bounceIn">';
                $('.profile').append(htmlString);

            },
            beforeSend: function () {
                $('#hidden_feature').hide();
                $('#description ').fadeIn();
            },
            complete: function () {
                $('#description ').fadeOut();
            }


        });
        //calling first 5 posts




            $.ajax({
                url: 'https://graph.facebook.com/me?fields=feed.limit(5)&access_token=' + myToken,
                type: 'GET',
                dataType: 'JSON',
                timeout: 100000,

                success: function (response) {
                    console.log(response);
                    //for(i in response.feed.data)
                    $.each(response.feed.data, function (index, value) {

                        console.log(value.story + value.created_time + value.status_type + value.link);
                        $("section").append('<a href= "' + value.link + '" class="link_display">' + "<div class='yes font_change animated flipInX'>" + "<b>" + value.story + "</b>" + "<br>" + value.created_time + "<br>" + value.status_type + "<br>" + value.id + "<br>" + value.type + "<br>" + "</div>" + "</a>" + "<br>");


                    });
                    var next_posts_url=response.feed.paging.next;


                $(window).scroll(function () {
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                    //calling again and again 5 posts as the you scroll down to the bottom of the window.



                    $.ajax({
                        url: next_posts_url,
                        type: 'GET',
                        dataType: 'JSON',
                        timeout: 100000,

                        success: function (response1) {
                            console.log(response1);
                            //for(i in response.feed.data)
                            $.each(response1.data, function (index, value) {

                                console.log(value.story + value.created_time + value.status_type + value.link);
                                $("section").append('<a href= "' + value.link + '" class="link_display">' + "<div class='yes font_change'>" + "<b>" + value.story + "</b>" + "<br>" + value.created_time + "<br>" + value.status_type + "<br>" + value.id + "<br>" + value.type + "<br>" + "</div>" + "</a>" + "<br>");
                                next_posts_url=response1.paging.next;


                            })

                        }


                    })
                }})
                },
                error: function (errorObject, errorName, extraOptionalError) {
                    console.log(errorObject);
                    console.log(errorName);
                    console.log(extraOptionalError);

                    $(".error_object_main_content").html(errorObject.responseText + "<br>" + "status" + " " + errorObject.status);
                    $(".error").html(errorName);
                    $("#optionalerror").html(extraOptionalError);

                }



                })
            });


            });


