require.config({
    "paths": {
        "jquery": "jquery-1.11.2.min",
        "ich": "ICanHaz.min"
    }
});

define(["jquery", "ich"], function($) {
    $(document).ready(function() {

        // load ich temlates
        $.get("templates.html", function(html) {
            var scripts = $(html);
            $(html).filter("script").each(function (index, data) {
                var script = $(data);
                ich.addTemplate(script.attr("id"), script.html());
            });
        }).done(function() {
            var test1 = ich.test();
            var test2 = ich.test2();
            $('#theList').append(test2).append(test1);

            for (var i = 0; i < 3; i++) {
                var data = {
                    value: "erez berez " + i
                }
                var itemHtml = ich.listItem(data);

                list.append(itemHtml);
            }
            $(".item").first().focus();
        });


        var list = $("#theList");

        $(document).on("keydown", ".item", function(data) {
            switch (data.keyCode) {
                // case 9:
                // $(this).before('<li>amir');
                // return false;

                case 13:
                var nextInput = $(this).nextAll(".item").first();
                if (nextInput.length >= 1) {
                    nextInput.focus();
                } else {
                    var data = { value: "hello new" };
                    var appendMe = $(ich.listItem(data));
                    $(this).parent().append(appendMe);
                    appendMe.focus();
                }
                return false;

                case 38:
                $(this).prevAll(".item").first().focus();
                return false;

                case 40:
                $(this).nextAll(".item").first().focus();
                return false;
            }
        });


    });

});
