$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 加载文章分类
    initCate();
    // 初始富文本编辑器
    initEditor();

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！');
                }
                // 使用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();

                getDetails();
            }
        });
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image');
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    // 3. 初始化裁剪区域
    // $image.cropper(options);

    // 选择封面功能
    $('#btnChooseImage').on('click', function () {
        // 模拟点击行为
        $('#coverFile').click();
    });

    // 监听 coverFile 的 change
    $('#coverFile').on('change', function (e) {
        var files = e.target.files;
        if (files.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(files[0]);
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域    
    });

    // 定义文章的发布状态
    var art_state = '已发布';
    $('#btnSave2').on('click', function () {
        art_state = '草稿';
    });

    // 为表单绑定 submit 提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 基于 form 表单快速创建一个 FormData 对象
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        // 收集 Id
        fd.append('Id', obj.id);
        /* fd.forEach(function (v, k) {
            console.log(k, v);
        }); */

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
            });
    });

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！');
                }
                layer.msg('发布文章成功！');
                // location.href = '/article/art_list.html';
                window.parent.document.querySelector('[href="/article/art_list.html"]').click();
            }
        });
    }
    // 根据文章 ID 获取详情并填充
    // /article/art_edit.html?id=888&age=18
    // console.log(location.search); // ?id=10934
    // location.search.split('?') // ['?', 'id=10934']
    // location.search.split('?')[1] // id=10934&age=18
    const obj = {};
    function getDetails() {
        const arr = location.search.split('?')[1].split('&'); // ['id=10934', 'age=18']
        
        for(let i = 0; i < arr.length; i ++) {
            const c = arr[i].split('='); // ['id', '10934']
            obj[c[0]] = c[1];
        }
    
        $.ajax({
            url: `/my/article/${obj.id}`,
            success(res) {
                if(res.status !== 0) return layer.msg('获取文章详情失败！');
                // 这个填充数据的操作最好等到文章分类渲染完毕后再进行
                form.val('art_edit', res.data);

                // 解决富文本里面没有内容的问题，处理方式是：选择到这个富文本，手动的填充内容
                // 父亲如何操作子 iframe
                setTimeout(function() {
                    document.getElementById("content_ifr").contentDocument.getElementById('tinymce').innerHTML = res.data.content;
                }, 1000);
                // 把后端返回的图片给 img 的 src
                $('#image').attr('src', 'http://api-breakingnews-web.itheima.net' + res.data.cover_img);
                // 根据最新的信息初始化
                $image.cropper(options);
            }
        });
    }
});