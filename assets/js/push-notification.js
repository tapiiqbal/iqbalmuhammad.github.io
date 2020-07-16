const showNotifSaveCompetition = (params) => {
    const title = 'soccer-match';
    const options = {
        'body': `add ${params.name}to favourite success`,
        'image': params.emblemUrl,
        'badge': "../images/stadium/stadium-32.png",
        'actions': [{
            'action': 'yes-action',
            'title': 'Yes',
        }, {
            'action': 'no-action',
            'title': 'No',
        }],
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

const showNotifSaveTeam = (params) => {
    const title = 'soccer-match';
    const options = {
        'body': `add team ${params.name}to favourite success`,
        'image': params.crestUrl,
        'badge': '../images/stadium/stadium-64.png',
        'actions': [{
            'action': 'yes-action',
            'title': 'Yes',
        }, {
            'action': 'no-action',
            'title': 'No',
        }],
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

export { showNotifSaveCompetition, showNotifSaveTeam };