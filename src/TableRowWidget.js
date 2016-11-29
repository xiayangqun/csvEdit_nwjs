/**
 * Created by xiayangqun on 2016/11/28.
 */

var TableRowWidget=function () {
    this.tableRowNode = document.createElement('tr');
    this.csvRowArray=null;
};

TableRowWidget.prototype.init = function (configRowArray,csvRowArray,isSave)
{
    if(isSave !== false)
        this.csvRowArray=csvRowArray;

    this.removeTaleRowNode();
    if(configRowArray.length != csvRowArray.length-1)
    {
        alert('出错了!!!!,配置表的每行元素与现有的每行元素不相等');
        return;
    }
    //初始化第一个格子的序号
    var tableCellNode = document.createElement('td');
    tableCellNode.textContent=csvRowArray[0];
    // var indexNode=document.createTextNode(csvRowArray.shift());
    // tableCellNode.appendChild(indexNode);
    this.tableRowNode.appendChild(tableCellNode);

    //初始化第二个格子的标题
    var currentHead = csvRowArray[1];
    var tableCellNode = document.createElement('td');
    var select=document.createElement('select');
    var tableHeads= this.getKeys(LocalData.currentCsvConfig.rows);
    var sureIndex=0;
    tableHeads.forEach(function (eachHead,pos) {
        var option=document.createElement('option');
        option.textContent= eachHead;
        if(currentHead == eachHead)
            sureIndex =pos;
        select.appendChild(option);
    }.bind(this));
    select.selectedIndex=sureIndex;
    tableCellNode.appendChild(select);
    this.tableRowNode.appendChild(tableCellNode);
    select.addEventListener('change',this.changeHead.bind(this));


    configRowArray.forEach(function (eachConfig,pos) {

        if(pos==0) return;
        var tableCellNode = document.createElement('td');
        var eachCsv = csvRowArray[pos+1];
        if( LocalData.currentCsvConfig.cellEnum[eachConfig] != undefined)
        {
            //可枚举的下拉列表
            var cellEnumArray= LocalData.currentCsvConfig.cellEnum[eachConfig];
            var selectNode=document.createElement('select');
            var sureIndex=0;
            cellEnumArray.forEach(function (item,pos) {
                var optionNode= document.createElement('option');
                optionNode.textContent=item;
                selectNode.appendChild(optionNode);
                if(item == eachCsv) sureIndex = pos;
            }.bind(this));
            selectNode.selectedIndex=sureIndex;
            tableCellNode.appendChild(selectNode);

            // var textNode= document.createTextNode(eachConfig);
            // tableCellNode.appendChild(textNode);
            var textNode= document.createElement('p');
            textNode.textContent=eachConfig;
            tableCellNode.appendChild(textNode);
        }
        else
        {
            //不可枚举的任由用户填写的
            var textarea= document.createElement('textarea');
            tableCellNode.appendChild(textarea);
            textarea.placeholder=eachConfig;
            textarea.value=eachCsv;
            tableCellNode.appendChild(textarea);
        }

        this.tableRowNode.appendChild(tableCellNode);
    }.bind(this));
};

TableRowWidget.prototype.getString=function () {

    var ret=[];
    var childNodes=this.tableRowNode.childNodes;
    ret.push(childNodes[0].textContent);
    ret.push(childNodes[1].firstChild.value);
    for(var i=2;i<childNodes.length;i++)
    {
        var child=childNodes[i];
        if(child.firstChild.nodeName.toLowerCase() == 'select')
            ret.push(child.firstChild.value);
        else
            ret.push(child.firstChild.value);
    }
    var str=ret.join(LocalData.currentCsvConfig.splitChar);
    this.csvRowArray=ret;
    return str;
};

TableRowWidget.prototype.getKeys=function(obj)
{
    var keys=[];
    for (var p1 in obj) {
        if (obj.hasOwnProperty(p1))
            keys.push(p1);
    }
    return keys;
};

TableRowWidget.prototype.changeHead=function (event) {
    var target=event.target;
    var newHead = target.value;

    if(newHead == this.csvRowArray[1])
    {
        var configRowArray=LocalData.currentCsvConfig.rows[newHead];
        this.init(configRowArray,this.csvRowArray);
    }
    else
    {
        var configRowArray=LocalData.currentCsvConfig.rows[newHead];
        var csvRowArray=[];
        csvRowArray[0]=this.csvRowArray[0];
        csvRowArray[1]=newHead;
        for(var i=2;i<configRowArray.length+1;i++)
            csvRowArray.push('');
        this.init(configRowArray,csvRowArray,false);
    }
};

TableRowWidget.prototype.removeTaleRowNode=function () {
    while (this.tableRowNode.childNodes.length !=0) this.tableRowNode.removeChild(this.tableRowNode.firstChild);
};


