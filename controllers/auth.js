
export const addUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'register'
    })
}

export const loginUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}

export const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}