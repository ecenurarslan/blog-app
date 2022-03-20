export const BaseConfig = {

    api:{
        debug:{
            user: 'https://localhost:44377',
        },
        user: url => `${BaseConfig.api.debug.user}/api${url}`,
        resource: path => `${BaseConfig.api.debug.user}/uploads/${path}`,
    },
    service:{
        user:{},
        item:{}
    },
    utilities:{
        getFormDataHeader: () =>{
            const user = JSON.parse(localStorage.getItem('user'));
            return user && user.token ? {
                            'Authorization': `Bearer ${user.token}`} :
                            {};
        },
        getAuthorizedHeader: () => {
            const user = JSON.parse(localStorage.getItem('user'));
            return user && user.token ? {'Content-type':'application/json',
                            'Authorization': `Bearer ${user.token}`} :
                            {'Content-type':'application/json'};
        },
        getUser: () => JSON.parse(localStorage.getItem('user')),
    },
};