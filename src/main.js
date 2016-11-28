/**
 * Created by xiayangqun on 2016/11/23.
 */

//console.log('Hello World');
//var LocalData=require('src/LocalData');
LocalData.init();
//LocalData.csvRootDir='';
if(LocalData.csvRootDir == '')
{
    nw.Window.open('dirChoice.html',{},function (win) {});
}
else
{
    nw.Window.open('csvEdit.html',{},function (win) {});
}




















