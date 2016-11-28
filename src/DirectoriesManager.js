/**
 * Created by xiayangqun on 2016/11/23.
 */
DirectoriesManager={

    _divNode:null,
    _csvRootPath:'',
    _currentItem:null,
    
    init:function (divNode, csvRootPath) {

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

    }
};