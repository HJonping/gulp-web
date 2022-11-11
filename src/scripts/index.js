import $ from 'jquery'
import './modules/plugin/jquery-tab.js'
import './modules/common/index.js'

$(function () {
    let activeClasssName = 'on'
    $('.tab-container').tabs({
        tabTitles: '.tab-title .item',
        tabTitleActiveClass: activeClasssName,
        tabContents: '.tab-conent-wrap .tab-conent',
        tabContentActiveClass: activeClasssName
    })

})