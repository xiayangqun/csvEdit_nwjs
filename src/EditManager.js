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


        LocalData.currentCsvDir=currentCsvRoot;
        LocalData.save();
        this._currentCsvRoot=currentCsvRoot;
        this.removeAllChild();
        var fs=require('fs');



        if(fs.existsSync(this._currentCsvRoot+"/config.json")) {
            //如果当前目录下存在这个 config.json
            var inputNode=document.createElement('input');
            inputNode.type='text';
            inputNode.placeholder='查找csv文件';
            inputNode.className='middleInput';
            inputNode.addEventListener('input',function (event) {
                var value=event.target.value;
                var allPNode=this._divNode.querySelectorAll('p');
                allPNode.forEach(function (pNode) {
                    if(value=='')
                        pNode.style.display='block';
                    else if(pNode.innerText.includes(value))
                        pNode.style.display='block';
                    else
                        pNode.style.display='none';
                })
            }.bind(this));
            this._divNode.appendChild(inputNode);

            var configString = fs.readFileSync(this._currentCsvRoot + "/config.json", 'utf8');
            LocalData.currentCsvConfig = JSON.parse(configString);
            var allCsvFileNames = fs.readdirSync(this._currentCsvRoot);
            var divInNode=document.createElement('div');
            divInNode.style.width='100%';
            divInNode.style.height='500px';
            divInNode.style.overflow='auto';
            allCsvFileNames.forEach(function (csvFileName) {
                var stat = fs.statSync(this._currentCsvRoot + '/' + csvFileName);
                if (stat.isFile() && csvFileName != 'config.json'&&csvFileName[0] !='.') {
                    var pNode = document.createElement('p');
                    pNode.innerText=csvFileName;
                    divInNode.appendChild(pNode);
                    pNode.addEventListener('click', function (event) {
                        if (this._currentItem)
                            this._currentItem.style.backgroundColor = 'transparent';
                        this._currentItem = pNode;
                        this._currentItem.style.backgroundColor = 'rgba(33,176,248,1)';
                        FilesManager.changeFileName(this._currentCsvRoot + '/' + csvFileName);

                    }.bind(this));
                    pNode.addEventListener('dblclick',function (event) {
                        nw.Shell.showItemInFolder(this._currentCsvRoot + '/' + csvFileName);
                    }.bind(this));
                    pNode.title='双击在文件件中打开文件目录';
                }
            }.bind(this));
            this._divNode.appendChild(divInNode);
            FilesManager.changeFileName('');
            var input = document.createElement('input');
            input.className='middleInput';
            input.type = 'text';
            input.placeholder = '输入新的csv文件名';
            this._divNode.appendChild(input);
            input.style.marginTop='15px';
            input.style.marginBottom='5px';

            var sureButton = document.createElement('button');
            sureButton.className='middleButton-sure';
            sureButton.textContent = '新建文件';
            sureButton.addEventListener('click', function (event) {
                var fullPath = this._currentCsvRoot + '/' + input.value;
                var fs = require('fs');
                fs.writeFileSync(fullPath, '', 'utf8');
                this.changeCurrentCsvRoot(this._currentCsvRoot);
            }.bind(this));
            this._divNode.appendChild(sureButton);

            var editButton=document.createElement('button');
            editButton.textContent='编辑模板文件';
            editButton.className='middleButton-edit';
            editButton.addEventListener('click',function (event) {
                nw.Window.open('configEdit.html',{new_instance:true},function (win) {});
                nw.Window.get().close(true);
            }.bind(this));
            this._divNode.appendChild(editButton);
        }
        else
        {
            //不存在这个 config.json这个文件,那么需要重新编辑
            nw.Window.open('configEdit.html',{new_instance:true},function (win) {});
            nw.Window.get().close();
        }
    },

    removeAllChild:function () {

        while(this._divNode.childNodes &&this._divNode.childNodes.length!=0)
        {
            this._divNode.removeChild(this._divNode.firstChild);
        }
    }

};