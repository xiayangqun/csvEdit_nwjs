/**
 * Created by xiayangqun on 2016/11/23.
 */
DirectoriesManager={

    _divNode:null,
    _csvRootPath:'',
    _currentItem:null,
    
    init:function (divNode, csvRootPath) {

        if(this._divNode)
        {
            while (this._divNode.childNodes.length!=0)
            {
                this._divNode.removeChild(this._divNode.firstChild);
            }
        }

        this._divNode=divNode;
        this._csvRootPath=csvRootPath;

        var fs=require('fs');
        var allCsvDirNames=fs.readdirSync(this._csvRootPath);

        console.log(allCsvDirNames);

        allCsvDirNames.forEach(function (csvDirName) {
            var stat=fs.statSync(this._csvRootPath +'/'+csvDirName);
            if(stat.isDirectory())
            {
                var pNode=document.createElement('p');
                var textNode=document.createTextNode(csvDirName);
                pNode.appendChild(textNode);
                this._divNode.appendChild(pNode);
                
                pNode.addEventListener('click',function (event) {
                    if(this._currentItem) this._currentItem.style.backgroundColor='white';
                    this._currentItem=pNode;
                    pNode.style.backgroundColor='#3c763d';
                    EditManager.changeCurrentCsvRoot(this._csvRootPath+'/'+csvDirName);
                }.bind(this));
            }
        }.bind(this));


        var input=document.createElement('input');
        input.type='text';
        input.placeholder='输入新的文件夹名';
        this._divNode.appendChild(input);

        var sureButton=document.createElement('button');
        sureButton.textContent='新建文件夹';
        sureButton.addEventListener('click',function (event) {
            var fullPath= this._csvRootPath+'/'+input.value;
            var fs=require('fs');
            fs.mkdirSync(fullPath);
            this.init(this._divNode,this._csvRootPath);
        }.bind(this));
        this._divNode.appendChild(sureButton);
    }
};