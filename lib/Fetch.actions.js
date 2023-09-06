import a from 'axios'

const url = 'https://ecommerce-back-end-iota.vercel.app/api'

export const resetTokenSender = async (router, body) => {
    try {
        const result = await fetch(`${url}${router}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        },
        );
        const response = await result.json();
        return (response);

    } catch (error) {
        console.log(error);
    }

}

export const RegisterUser = async (router, body) => {

    try {

        const result = await a.post(`${url}${router}`, body)

        return result
    } catch (error) {
        console.log(error);
    }
}

export const login = async (router, body) => {
    const result = await fetch(`${url}${router}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(body)
    },
    ).then((response) => response.json()).catch((error) => console.log(error))
    return result


};

export const changePassword = async (router, body) => {

    console.log(router);
    try {
        const result = await fetch(`${url}${router}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        },
        );
        const response = await result.json();
        return (response);

    } catch (error) {
        console.log(error);
    }

}