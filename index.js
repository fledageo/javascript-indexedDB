let request = indexedDB.open("school",1);
let model = null;
request.onsuccess = handleSuccess;
request.onupgradeneeded = (e) => {
    let db = e.target.result
    db.createObjectStore("users",{keyPath:"id"})
};


function handleSuccess(event){
    model = event.target.result;
    form.onsubmit = e => {
        e.preventDefault();
        let obj = {id:Date.now()};
        form.querySelectorAll("input").forEach(inp => {
            obj[inp.id] = inp.value
        });
        console.log(obj);

        let transaction = model.transaction("users","readwrite");
        let users = transaction.objectStore("users");
        users.add(obj);
    }
}
