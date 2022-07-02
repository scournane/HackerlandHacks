export let api = {
    PURCHASE_MUSIC: `/pay`,
    GET_ALL_MUSIC: `/music/all`,
    CREATE_MUSIC: `/music/add`,
    PLAY_MUSIC: `/play`,
    USER_PROFILE: (uid: string) => `
        /user?uid=${uid}
    `,
    PLAYER_PROFILE: (uid: string) => `
        /player?uid=${uid}
    `,
    GET_LEADERBOARD: `/leaderboard`,
    FAVORITE: `/favorite`,
    GET_FAVORITES: (uid: string) => `
        /favorites?uid=${uid}
    `,
    GET_MUSIC_PIECE: (mid: string) => `
        /music/one?mid=${mid}
    `
}

export let moralis = {
    SERVER_URL: 'https://xfbnhuzoic7x.usemoralis.com:2053/server',
    APP_ID: 'FItpSIxOvAYYjTDZvFEvCaj4g1uvAW6cX4l2CKkM'
}

