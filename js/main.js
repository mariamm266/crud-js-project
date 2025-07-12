var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var searchInput = document.getElementById("searchInput");
var bookmark=[];
if(localStorage.getItem("bookmarkList")!==null){
    bookmark = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBook();
}
function addBook(){
    let name = siteNameInput.value.trim();
    let url = siteUrlInput.value.trim();

    const isNameValid = name.length>=3;
    const isUrlValid = url.includes(".com");
    if(!isNameValid || !isUrlValid){
        const modal= new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
        return;
    }
    var mark = {siteName:siteNameInput.value , siteUrl:siteUrlInput.value}
    bookmark.push(mark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmark))
    displayBook();
}
function displayBook(){
    var temp ="";
    for(var i=0 ; i<bookmark.length ; i++){
        temp+=`<tr>
                        <td>`+(i+1)+`</td>
                        <td>`+bookmark[i].siteName+`</td>
                        <td><button class="btn btn-light" onclick="visitWeb('${bookmark[i].siteUrl}')"><i class="fa-solid fa-eye" style="color: #FFD43B;" ></i> Visit</button></td>
                        <td><button class="btn btn-outline-danger" onclick="deleteBook(`+i+`)"><i class="fa-solid fa-trash"></i> Delete</button></td>
                        <td><button class="btn btn-outline-info" onclick="update(`+i+`)">Update</button></td>
                    </tr>`
    }
    document.getElementById("tabeleContent").innerHTML = temp
}

function visitWeb(url){
    window.open(`https://`+url+``,`_blank`);
}

function deleteBook(index){
    bookmark.splice(index , 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmark)); 
    displayBook(); 
}

function search(){
    var searchVal = searchInput.value.toLowerCase();
    var temp =""
    for(var i = 0 ; i < bookmark.length ; i++){
        if(bookmark[i].siteName.toLowerCase().includes(searchVal)== true){
            temp+=`<tr>
                        <td>`+(i+1)+`</td>
                        <td>`+bookmark[i].siteName+`</td>
                        <td><button class="btn btn-light" onclick="visitWeb('${bookmark[i].siteUrl}')"><i class="fa-solid fa-eye" style="color: #FFD43B;" ></i> Visit</button></td>
                        <td><button class="btn btn-outline-danger" onclick="deleteBook(`+i+`)"><i class="fa-solid fa-trash"></i> Delete</button></td>
                        <td><button class="btn btn-outline-info" onclick="update(`+i+`)">Update</button></td>
                    </tr>`
        }
    }
    document.getElementById("tabeleContent").innerHTML = temp
}

function clearForm(){
    siteNameInput.value ="";
    siteUrlInput.value = "";
}
var currentIndex;
function update(index){
    currentIndex = index;
    siteNameInput.value = bookmark[index].siteName;
    siteUrlInput.value = bookmark[index].siteUrl;
    document.getElementById("editBtn").style.display = "inline-block"
    document.getElementById("addBtn").style.display = "none"
}

function editData(){
    let name = siteNameInput.value.trim();
    let url = siteUrlInput.value.trim();

    const isNameValid = name.length>=3;
    const isUrlValid = url.includes(".com");
    if(!isNameValid || !isUrlValid){
        const modal= new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
        return;
    }
    else{
        bookmark[currentIndex].siteName = siteNameInput.value;
        bookmark[currentIndex].siteUrl = siteUrlInput.value;
        displayBook();
        localStorage.setItem("bookmarkList" , JSON.stringify(bookmark));
        document.getElementById("editBtn").style.display = "none"
        document.getElementById("addBtn").style.display = "inline-block"
        clearForm();
    }
}