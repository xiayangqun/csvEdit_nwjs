/**
 * Created by xiayangqun on 2016/11/23.
 */
FilesManager={

    _divNode:null,
    _tableNode:null,

    _csvFileName:'',
    _tableRowWidgets:[],

    _addButton:null,
    _saveButton:null,


    init:function (divNode) {
        this._divNode=divNode;

        this._tableNode=document.createElement('table');
        this._tableNode.style.marginTop='5px';
        this._tableNode.style.marginLeft='5px';
        this._divNode.appendChild(this._tableNode);


        var pNode=document.createElement('p');
        pNode.style.height='10px';
        this._divNode.appendChild(pNode);

        this._addButton=document.createElement('button');
        this._addButton.className='csvAddButton';
        this._addButton.appendChild(document.createTextNode('新增加一行'));
        this._addButton.addEventListener('click',this._onAddButtonClick.bind(this));
        this._divNode.appendChild(this._addButton);

        var pNode=document.createElement('p');
        pNode.style.height='2px';
        this._divNode.appendChild(pNode);


        this._saveButton=document.createElement('button');
        this._saveButton.className='csvSaveButton';
        this._saveButton.appendChild(document.createTextNode('保存'));
        this._saveButton.addEventListener('click',this._onSaveButtonClick.bind(this));
        this._divNode.appendChild(this._saveButton);

    },


    changeFileName:function (fileName) {
        this._csvFileName = fileName;
        document.head.querySelector('title').textContent=fileName;
        this.clearTableNde();

        if (this._csvFileName != '')
        {
            //读取本地的CSV表
            var fs=require('fs');
            var string= fs.readFileSync(this._csvFileName,'utf8');
            var eachCsvRows= string.split('\r');

            eachCsvRows.forEach(function (eachCsvRow,pos) {

                if(eachCsvRow == '') return;

                var eachCsvCells=eachCsvRow.split(LocalData.currentCsvConfig.splitChar);
                var eachConfCells=LocalData.currentCsvConfig.rows[eachCsvCells[1]];
                var tableRowWidget=new TableRowWidget();
                tableRowWidget.init(eachConfCells,eachCsvCells);
                this._tableNode.appendChild(tableRowWidget.tableRowNode);
                this._tableRowWidgets.push(tableRowWidget);
                if(pos%2==0) tableRowWidget.tableRowNode.className='deeptr';
            }.bind(this));

            this._addButton.style.width=this._tableNode.clientWidth+'px';
            this._saveButton.style.width = this._tableNode.clientWidth+'px';

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

        if(this._csvFileName == '')
        {
            alert('尚未选择具体的csv文件');
            return;
        }
        var appendTableRowWidget=new TableRowWidget();
        var configRowArray=LocalData.currentCsvConfig.rows[appendTableRowWidget.getKeys(LocalData.currentCsvConfig.rows)[0]];
        var csvRowArray=[];
        csvRowArray[0]=this._tableRowWidgets.length+1;
        csvRowArray[1]=configRowArray[0];
        for(var i=2;i<configRowArray.length+1;i++)
            csvRowArray.push('');

        appendTableRowWidget.init(configRowArray,csvRowArray);
        this._tableNode.appendChild(appendTableRowWidget.tableRowNode);
        this._tableRowWidgets.push( appendTableRowWidget);
    },

    _onSaveButtonClick:function (event) {


        if(this._csvFileName == '')
        {
            alert('尚未选择具体的csv文件');
            return;
        }

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
    },

    //event ;'up','delete','down'
    onTrChanger:function (trIndex,event) {
        if(event =='delete')
        {
            var ok=confirm('删除操作不可逆,你确定要这样做吗?');
            if(ok)
            {
                var tableRowWidget=this._tableRowWidgets[trIndex-1];
                this._tableNode.removeChild(tableRowWidget.tableRowNode);
                this._tableRowWidgets.splice(trIndex-1,1);

            }
        }
        else if(event=='up')
        {
            if(trIndex > 1)
            {

                var tableRowWidget = this._tableRowWidgets[trIndex - 1];
                var upTableRowWidget = this._tableRowWidgets[trIndex-2];
                this._tableNode.insertBefore(tableRowWidget.tableRowNode, upTableRowWidget.tableRowNode);
                this._tableRowWidgets.splice(trIndex-2,2,tableRowWidget,upTableRowWidget);
            }
        }
        else if(event=='down')
        {
            if(trIndex<this._tableRowWidgets.length)
            {
                var tableRowWidget = this._tableRowWidgets[trIndex - 1];
                var downTableRowWidget = this._tableRowWidgets[trIndex];
                this._tableNode.insertBefore(downTableRowWidget.tableRowNode,tableRowWidget.tableRowNode);
                this._tableRowWidgets.splice(trIndex-1,2,downTableRowWidget,tableRowWidget);
            }
        }


        this._tableRowWidgets.forEach(function (tableRowWidget,pos) {
            tableRowWidget.changeTrIndex(pos+1);
        })
    }
    
};