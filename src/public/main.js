const PUBLIC_VAPID_KEY = "BMi6qt_BmLWmu8foUtxY_7Rt1woUdSK_NdUjj3WIfOGSqojw2TaEepr3OqUht4fq81h9JyUucyuBof-grPnVQNA";
window.addEventListener('load', async()=>{
    if(!'serviceWorker' in navigator){
        console.log("Service workers are not supported.");
        return;
    }
    console.log("Service working is supported");
    const sw = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });
    console.log("new Server Worker");    
    await subscribe();
});
const subscribe = async () =>{

    const serviceWorker = await navigator.serviceWorker.ready;
    const subscription = await serviceWorker.pushManager.getSubscription();

    if(!subscription){
        console.log('suscribing...');
        const pushSubscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
        });

        await fetch("/subscription",{
            method: "POST",
            body: JSON.stringify(pushSubscription),
            headers: {
                "content-type": "application/json"
            }
        });

        console.log("subscribed");        
    }
}

const form = document.querySelector("#myform");
const message = document.querySelector("#message");

form.addEventListener('submit', function(e){
    e.preventDefault();
    fetch("/new-message",{
        method: 'POST',
        body: JSON.stringify({
            message:message.value
        }),
        headers: {"Content-Type": "application/json"}
    });
    form.reset();
});

