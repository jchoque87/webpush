console.log("Worker");
self.addEventListener('push', e=>{
    const data = e.data.json();
    //console.log(data);
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://tuguia.live/principal/img/icono_6.png'
    })
});