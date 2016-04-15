/**
 * Created by wangtingdong on 16/4/10.
 */

var select_type=document.getElementById('select_type'),
    select_school=document.getElementById('select_school'),
    select_workPlace=document.getElementById('select_workPlace'),
    place=document.getElementById('location'),
    school=document.getElementById('school');

//绑定事件函数
function on(element,eventName,listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, listener);
    }
    else {
        element['on' + eventName] = listener;
    }
}

on(select_type,'change',function(e){
    switch (e.target.id) {
        case 'on_school' :
            select_school.className='';
            select_workPlace.className='hide';
            break;
        case 'out_school' :
            select_school.className='hide';
            select_workPlace.className='';
            break;
    }
});

(function(){
    var text='';
    for(var i=0;i<schoolList.length;i++) {
        text+='<option>'+schoolList[i].name+'</option>'
    }
    place.innerHTML=text;
    changeSchool();
})();

on(place,'change',changeSchool);

function changeSchool(){
    var index=place.selectedIndex,
        text= '',
        schoolName=schoolList[index].school;
    for(var i=0;i<schoolName.length;i++) {
        text+='<option>'+schoolName[i].name+'</option>';
    }
    school.innerHTML=text;
}

//console.log(schoolList);
