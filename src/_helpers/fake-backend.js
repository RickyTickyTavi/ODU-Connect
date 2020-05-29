export function configureFakeBackend() {
    let users = [{ 
        id: 1, 
            username: 'bobphelps', 
            password: 'bobphelps', 
            firstName: 'Bob', 
            lastName: 'Phelps', 
            title: 'Event Coordinator',
            company: 'Old Dominion University',
            email: 'phel012@gmail.com',
            streetname: '5115 Hampton Boulevard',
            city: 'Norfolk',
            state: 'VA',
            zipcode: '23529',
            keywords: 'Computer Science, Technology, Mentorship'},
        { id: 2, 
            username: 'oducadmin', 
            password: 'ODUc0nad!!30', 
            firstName: 'Cynthia', 
            lastName: 'Svelte', 
            title: 'System Administrator',
            company: '',
            email: 'csvelte@gmail.com',
            streetname: '1111 Cherry Lane',
            city: 'Norfolk',
            state: 'VA',
            zipcode: '23529',
            keywords: ''
    }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            title: user.title,
                            company: user.company,
                            email: user.email,
                            streetname: user.streetname,
                            city: user.city,
                            state: user.state,
                            zipcode: user.zipcode,
                            keywords: user.keywords
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security 
                    // is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('bobphelps:bobphelps')}`) {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('oducadmin:ODUc0nad!!30')}`) {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        resolve({ status: 401, text: () => Promise.resolve() });
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}