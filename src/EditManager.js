/**
 * Created by xiayangqun on 2016/11/23.
 */
EditManager={

    _divNode:null,
    _currentCsvRoot:'',
    
    init:function (divRoot) {
        this._divNode=divRoot;
    },
    
    changeCurrentCsvRoot:function (currentCsvRoot) {
        this._currentCsvRoot=currentCsvRoot;
        this.removeAllChild();
        var fs=require('fs');
        var allCsvFileNames=fs.readdirSync(this._currentCsvRoot);

        allCsvFileNames.forEach(function (csvFileName) {
            var stat=fs.statSync(this._currentCsvRoot +'/'+csvFileName);
            if(stat.isFile())
            {
                var pNode=document.createElement('p');
                var textNode=document.createTextNode(csvFileName);
                pNode.appendChild(textNode);
                this._divNode.appendChild(pNode);
                pNode.addEventListener('click',function (event) {
                    alert(csvFileName);
                })
            }
        }.bind(this));

    },

    removeAllChild:function () {

        while(this._divNode.childNodes &&this._divNode.childNodes.length!=0)
        {
            this._divNode.removeChild(this._divNode.firstChild);
        }
    }

};