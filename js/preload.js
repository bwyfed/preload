/**
 * Created by BWY on 2017/11/22.
 */
(function($){
    //构造函数
    function PreLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] :imgs;
        this.opts = $.extend({},PreLoad.DEFAULTS,options); //mixin选项
        this._unordered();
    }
    //默认参数
    PreLoad.DEFAULTS = {
        each: null, //每一张图片加载完毕后执行的方法
        all: null   //所有图片加载完毕后执行的方法
    };
    PreLoad.prototype._unordered = function() { //每张图片的无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs,function(i,src) {
            if(typeof src !== 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len - 1) { //加载完毕
                    opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        });
    };
    $.extend({
        preload: function(imgs, opts) {
            new PreLoad(imgs,opts);
        }
    });
})(jQuery);