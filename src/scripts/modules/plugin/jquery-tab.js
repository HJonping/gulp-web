import jQuery from 'jquery'

(function ($) {
    
    /**
        * 给$的原型添加tabs方法
        * @param option.tabTitles        tab标题头选择器
        * @param option.tabTitleActiveClass   当前显示tab标题需要添加的calssName
        * @param option.tabContents          tab内容选择器
        * @param option.tabContentActiveClass   当前显示页面需要添加的calssName
    */
    //给$原型添加tabs方法
    $.fn.tabs = function (option) {
        let $wrap = this;//获取最外层的大容器
        const { tabTitles} = option

        $wrap.find(tabTitles).on('click', function () {
            const { tabTitleActiveClass, tabContents, tabContentActiveClass } = option
            $(this).addClass(tabTitleActiveClass).siblings().removeClass(tabTitleActiveClass);
            // 获取当前点击的页面的索引
            let idx = $(this).index();
            // 获取索引一致的页面，添加tabContentClass类，其他兄弟移除此类
            $wrap.find(tabContents).eq(idx).addClass(tabContentActiveClass).siblings().removeClass(tabContentActiveClass);
        })
    }
}(jQuery))