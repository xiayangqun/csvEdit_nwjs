/**
 * Created by xiayangqun on 2016/11/23.
 */
FilesManager={

    _divNode:null,
    _tableNode:null,

    _csvFileName:'',
    _tableRowWidgets:[],

    init:function (divNode) {
        this._divNode=divNode;

        this._tableNode=document.createElement('table');
        this._divNode.appendChild(this._tableNode);

        var addButton=document.createElement('button');
        addButton.appendChild(document.createTextNode('新增加一行'));
        addButton.addEventListener('click',this._onAddButtonClick.bind(this));
        this._divNode.appendChild(addButton);


        var addButton=document.createElement('button');
        addButton.appendChild(document.createTextNode('保存'));
        addButton.addEventListener('click',this._onSaveButtonClick.bind(this));
        this._divNode.appendChild(addButton);

    },


    changeFileName:function (fileName) {
        this._csvFileName = fileName;
        this.clearTableNde();

        if (this._csvFileName != '')
        {
            //读取本地的CSV表
            var fs=require('fs');
            var string= fs.readFileSync(this._csvFileName,'utf8');
            var eachCsvRows= string.split('\r');
            eachCsvRows.forEach(function (eachCsvRow) {

                if(eachCsvRow == '') return;

                var eachCsvCells=eachCsvRow.split(LocalData.currentCsvConfig.splitChar);
                var eachConfCells=LocalData.currentCsvConfig.rows[eachCsvCells[1]];
                var tableRowWidget=new TableRowWidget();
                tableRowWidget.init(eachConfCells,eachCsvCells);
                this._tableNode.appendChild(tableRowWidget.tableRowNode);
                this._tableRowWidgets.push(tableRowWidget);
            }.bind(this));
        }
        else
        {
            var tableRow=document.createElement('tr');
            var tableCell=document.createElement('td');
            var textNode=document.createTextNode('尚未选择具体的csv文件');
            tableCell.appendChild(textNode);
            tableRow.appendChild(tableCell);
            this._tableNode.appendChild(tableRow);
        }
    },


    _onAddButtonClick:function (event) {
        alert('点击了新增按钮')
    },

    _onSaveButtonClick:function (event) {

        var strArray=[];
        this._tableRowWidgets.forEach(function (item) {

            strArray.push(item.getString());

        }.bind(this));

        var writeStr= strArray.join('\r');
        console.log(this._csvFileName);
        console.log(writeStr);

        var fs=require('fs');
        fs.writeFileSync(this._csvFileName,writeStr,'utf8');
        alert("文件保存成功了\n"+this._csvFileName);
    },


    clearTableNde:function () {
        this._tableRowWidgets=[];
        while (this._tableNode.childNodes.length!=0)
        {
            this._tableNode.removeChild(this._tableNode.lastChild);
        }
    }
};