$(function(){
    var big_pre_width = 128,
        big_pre_height = 128,
        sma_pre_width = 90,
        sma_pre_height = 90,
        box_width = 400,
        box_height = 340;
    upload_img();
    //图片上传
    function upload_img(){
        $("#imgUpload").change(function(e){
            var file = e.target.files[0];
            var freader = new FileReader();
            freader.readAsDataURL(file);
            freader.onload=function(e){
                var dom_img = new Image();
                dom_img.src = e.target.result;
                dom_img.style.display = 'none';
                var img_pre = '<img src="'+e.target.result+'" />';
                dom_img.onload = function(){
                    $(".jcrop_w").empty().append(dom_img);
                    $(".pre-1").empty().append(img_pre);
                    $(".pre-2").empty().append(img_pre);
                    $(".jcrop_w>img").attr('id','target');
                    $('#save_btn').show();

                    // 选中部分居中显示
                    var _Jw = ($("#target").width() - big_pre_width) / 2,
                        _Jh = ($("#target").height() - big_pre_height) / 2,
                        _Jw2 = _Jw + big_pre_width,
                        _Jh2 = _Jh + big_pre_height;

                    $('#target').Jcrop({
                        setSelect: [_Jw, _Jh, _Jw2, _Jh2],
                        minSize :[20,20],
                        onChange: showPreview,
                        onSelect: showPreview,
                        allowSelect: false,
                        boxWidth:box_width,
                        boxHeight:box_height,
                        /*bgFade: true,*/
                        bgColor: "white",
                        aspectRatio: 1,
                        bgOpacity: .5,
                    })
                }
            }
        });
    };
    function showPreview(c){
        var iw = $('.jcrop_w>img').width(),
            ih = $('.jcrop_w>img').height(),
            ow = (box_width - iw) / 2,
            oh = (box_height - ih) / 2,
            rx = big_pre_width / c.w,
            ry = big_pre_height / c.h,
            rx1 = sma_pre_width / c.w,
            ry1 = sma_pre_height / c.h;
        pre_img($('.pre-1 img'), rx, iw, ry, ih, c.x, c.y, ow, oh);
        pre_img($('.pre-2 img'), rx1, iw, ry1, ih, c.x, c.y, ow, oh);

        var canvas = document.getElementById('myCanvas');
        var img = document.getElementById('target');
        var srcX = c.x;
        var srcY = c.y;
        var srcW = c.w;
        var srcH = c.h;
        canvas.width = $("#img-width").val();
        canvas.height = $("#img-height").val();
        if ($('#myCanvas') == null)
            return false;
        var context =canvas.getContext("2d" );
        context.drawImage(img,srcX,srcY,srcW,srcH,0,0, canvas.width, canvas.height);

        var imgURL = canvas.toDataURL("image/jpg");
        var img = '<img src="'+imgURL+'" />';
        $(".final-img").empty().append(img);
    }

    function pre_img(obj, rx, iw, ry, ih, cx, cy, ow, oh){
        obj.css({
            width: Math.round(rx * iw) + 'px',
            height: Math.round(ry * ih) + 'px'
        });
        if( cy >= oh && cx >= ow){
            obj.css({
                marginLeft: '-' + Math.round(rx * cx ) + 'px',
                marginTop: '-' + Math.round(ry * cy ) + 'px'
            });
        }else if( cy <= oh && cx >= ow){
            obj.css({
                marginLeft:'-' +  Math.round(rx * cx ) + 'px',
                marginTop:'-'+ Math.round(ry * cy) + 'px'
            });
        }else if(cy >= oh && cx <= ow){
            obj.css({
                marginLeft: '-' + Math.round(rx * cx) + 'px',
                marginTop: '-' +  Math.round(ry * cy) + 'px'
            });
        }else if( cy <= oh && cx <= ow){
            obj.css({
                marginLeft:'-' +  Math.round(rx * cx) + 'px',
                marginTop: '-' + Math.round(ry * cy) + 'px'
            });
        }
    };
});


