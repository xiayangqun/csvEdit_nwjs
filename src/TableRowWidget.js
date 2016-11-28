/**
 * Created by xiayangqun on 2016/11/28.
 */

var TableRowWidget=function () {
    this.tableRowNode=null;
};

TableRowWidget.prototype.init = function (configRowArray,csvRowArray)
{
    this.tableRowNode = document.createElement('tr');

    if(configRowArray.length != csvRowArray.length)
    {
        alert('出错了!!!!,配置表的每行元素与现有的每行元素不相等');
        return;
    }

    configRowArray.forEach(function (eachConfig,pos) {
        var tableCellNode = document.createElement('td');
        var eachCsv = csvRowArray[pos];
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
    childNodes.forEach(function (child) {
        if(child.firstChild.nodeName.toLowerCase() == 'select')
            ret.push(child.firstChild.value);
        else
            ret.push(child.firstChild.value);
    }.bind(this));
    var str=ret.join(LocalData.currentCsvConfig.splitChar);
    return str;
};
