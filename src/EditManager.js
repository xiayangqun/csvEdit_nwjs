/**
 * Created by xiayangqun on 2016/11/23.
 */
EditManager={

    _divNode:null,
    _currentItem:null,
    _currentCsvRoot:'',
    
    init:function (divRoot) {
        this._divNode=divRoot;
    },
    
    changeCurrentCsvRoot:function (currentCsvRoot) {

        this._currentCsvRoot=currentCsvRoot;
        this.removeAllChild();
        var fs=require('fs');



        if(fs.existsSync(this._currentCsvRoot+"/config.json")) {
            //如果当前目录下存在这个 config.json
            var configString = fs.readFileSync(this._currentCsvRoot + "/config.json", 'utf8');
            LocalData.currentCsvConfig = JSON.parse(configString);

            var allCsvFileNames = fs.readdirSync(this._currentCsvRoot);
            allCsvFileNames.forEach(function (csvFileName) {
                var stat = fs.statSync(this._currentCsvRoot + '/' + csvFileName);
                if (stat.isFile() && csvFileName != 'config.json') {
                    var pNode = document.createElement('p');
                    var textNode = document.createTextNode(csvFileName);
                    pNode.appendChild(textNode);
                    this._divNode.appendChild(pNode);
                    pNode.addEventListener('click', function (event) {
                        if (this._currentItem)
                            this._currentItem.style.backgroundColor = 'white';
                        this._currentItem = pNode;
                        this._currentItem.style.backgroundColor = 'darkolivegreen';
                        FilesManager.changeFileName(this._currentCsvRoot + '/' + csvFileName);

                    }.bind(this));
                }
            }.bind(this));
            FilesManager.changeFileName('');


            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = '输入新的csv文件名';
            this._divNode.appendChild(input);

            var sureButton = document.createElement('button');
            sureButton.textContent = '新建文件';
            sureButton.addEventListener('click', function (event) {
                var fullPath = this._currentCsvRoot + '/' + input.value;
                var fs = require('fs');
                fs.writeFileSync(fullPath, '', 'utf8');
                this.changeCurrentCsvRoot(this._currentCsvRoot);
            }.bind(this));
            this._divNode.appendChild(sureButton);
        }
        else
        {
            //不存在这个 config.json这个文件,那么需要重新编辑
            LocalData.currentCsvDir=currentCsvRoot;
            LocalData.save();
            console.log(LocalData);
            nw.Window.open('configEdit.html',{},function (win) {});
        }
    },

    removeAllChild:function () {

        while(this._divNode.childNodes &&this._divNode.childNodes.length!=0)
        {
            this._divNode.removeChild(this._divNode.firstChild);
        }
    }

};