document.addEventListener("DOMContentLoaded",()=>{
    fetch("./filesInfo")
    .then(data=>data.text())
    .then(
        (data)=>{
            data = JSON.parse(data);
            let length = data.length;
            $$$(".container").then(cointainer=>{
                "works".c();
                cointainer.update();
                let string;
                data.forEach(fileName => {
                                string +=`
                                <div class="row">
                            <div class="col col-3 filesListGrid pt-5">
                                <div class="leftfiles"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-files">
                                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>
                                    </svg><span>${fileName}</span></div>
                            </div>
                            <div class="col col-9 fileDisplay p-5">
                                <div class="fileBox"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-file-lock2" style="font-size: 58px;">
                                        <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1m2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224"></path>
                                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"></path>
                                    </svg><span>FileText</span></div>
                            </div>
                        </div>
                                `;
                    
                });
                string.c();
                cointainer.update(string);
            });
        }
    );
})