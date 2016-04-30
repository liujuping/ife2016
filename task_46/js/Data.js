/**
 * Created by wangtingdong on 16/4/30.
 */

var CANVAS_WIDTH=document.getElementsByTagName('body')[0].offsetWidth,
    CANVAS_HEIGHT=document.getElementsByTagName('body')[0].offsetHeight,
    KEY_CODES = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    },
    KEY_STATUS = {
        'left':false,
        'top':false,
        'right':false,
        'down':false
    },
    MAP={
        arr:[],
        width:CANVAS_WIDTH,
        height:CANVAS_HEIGHT,
        cell_width:34,
        cell_height:34,
        rows:parseInt(CANVAS_WIDTH/34)+1,
        cols:parseInt(CANVAS_HEIGHT/34)+1
    };
