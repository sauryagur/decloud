//imports
import {} from "./aptos.js";
page.js("https://unpkg.com/@aptos-labs/ts-sdk/dist/browser/index.global.js",()=>{
    "aptos library imported successfully".c();
});
function checkWallet() {
    return new Promise((resolve, reject) => {
        if (window.dapp) {
            resolve(window.dapp);
        } else {
            reject("WellDone Wallet not found.");
        }
    });
}

// const addressDisplay = document.getElementById('address');

function connectedToWallet(){
    //open explorer.html
    window.location.href = "./explorer";
}

$$$(".connectButton").then(connectButton=>{
    connectButton.addEventListener('click', async () => {
        try {
            // Retry up to 5 times to check for the wallet
            let wallet;
            for (let i = 0; i < 5; i++) {
                try {
                    wallet = await checkWallet();
                    break; // Exit the loop if wallet is found
                } catch (err) {
                    console.log(`Attempt ${i + 1}: ${err}`);
                    await new Promise(resolve => setTimeout(resolve, 500)); // wait for 500ms
                }
            }
    
            if (!wallet) {

                'WellDone Wallet not found. Please install it.'.c();
                return;
            }
    
            // Connect to the wallet and get the address
            // const address = await window.dapp.request("aptos", { method: "dapp:accounts" });
            const response = await window.dapp.request("aptos", { method: "dapp:accounts" });
            console.log(response);
            //therefore
            let address = response.aptos.address;
            if (response){
                alert("Connected to wallet.");
                connectedToWallet();
            }
            // addressDisplay.textContent = `Connected Address: ${address.aptos.address}`;
    
        } catch (error) {
            // addressDisplay.textContent = 'Failed to connect to wallet.';
            console.error('Error connecting to WellDone Wallet:', error);
        }
    });
    
});
// adding onclick on pricing button
$$$(".pricing").then(pricing=>{
    pricing.addEventListener('click', () => {
        window.location.href = "./pricing";
    });
});

$$$(".actuploadButton").then(actuploadButton=>{
    $$$(".fakeUploadButton").then(fakeUploadButton=>{
        fakeUploadButton.addEventListener('click', () => {
            actuploadButton.click();
        })
    });
});