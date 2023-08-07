$(document).ready(function() {
    $.each($('.textCSS table'), function(ind) {
        $(this).attr('id', 'texttable-' + parseInt(ind + 1));
        var uni_id = $(this).attr("id");
        var cellpaddingval = $(`#${uni_id}`).attr("cellpadding");
        var borderval = $(`#${uni_id}`).attr("border");
        var tablewidth = $(`#${uni_id}`).attr("width");
        var tableheight = $(`#${uni_id}`).attr("height");

        $(` #${uni_id}`).css({
            "border": borderval + "px solid #DDDDDD"
        });

        if (tablewidth == undefined && tableheight == undefined) {
            $(`#${uni_id}`).css({
                "width": "100%",
                "height": "auto"
            });
        } else if (tablewidth == undefined) {
            $(`#${uni_id}`).css({
                "width": "100%",
                "height": tableheight
            });
        } else if (tableheight == undefined) {
            $(`#${uni_id}`).css({
                "width": tablewidth,
                "height": "auto"
            });
        }
        else{
				$(`#${uni_id}`).css({
                "width": tablewidth,
                "height": tableheight
            });

        }
        var cellspacing = $(`#${uni_id}`).attr("cellspacing");
        if (cellspacing) {
            $(`#${uni_id}`).css({
                "border-collapse": "separate",
                "border-spacing": cellspacing + "px"
            });
        }
        if (cellpaddingval) {
            $(`#${uni_id} tr td`).css('padding', cellpaddingval);
            $(`#${uni_id} tr th`).css('padding', cellpaddingval);
        }

    });

    $('.textCSS table > tbody > tr td').each(function(index, tr) {
        if (!undefined) {
            var verticalaligntab = $('.textCSS table > tbody > tr td:eq(' + index + ')').attr("valign");
            $('.textCSS table > tbody > tr td:eq(' + index + ')').css('vertical-align', verticalaligntab);
        }
    });
	$('.textCSS table > tbody > tr th').each(function(index, tr) {
        if (!undefined) {
            var verticalaligntab = $('.textCSS table > tbody > tr th:eq(' + index + ')').attr("valign");
            $('.textCSS table > tbody > tr th:eq(' + index + ')').css('vertical-align', verticalaligntab);
        }
    });
});