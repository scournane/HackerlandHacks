export let api = {
    PURCHASE_MUSIC: `https://song-store.epiccodewizard2.repl.co/pay`,
    GET_ALL_MUSIC: `https://song-store.epiccodewizard2.repl.co/music/all`,
    CREATE_MUSIC: `https://song-store.epiccodewizard2.repl.co/music/add`,
    PLAY_MUSIC: `https://song-store.epiccodewizard2.repl.co/play`,
    USER_PROFILE: (uid: string) => `
    https://song-store.epiccodewizard2.repl.co/user?uid=${uid}
    `,
    PLAYER_PROFILE: (uid: string) => `
    https://song-store.epiccodewizard2.repl.co/player?uid=${uid}
    `,
    GET_LEADERBOARD: `https://song-store.epiccodewizard2.repl.co/leaderboard`,
    FAVORITE: `https://song-store.epiccodewizard2.repl.co/favorite`,
    GET_FAVORITES: (uid: string) => `
    https://song-store.epiccodewizard2.repl.co/favorites?uid=${uid}
    `,
    GET_MUSIC_PIECE: (mid: string) => `
    https://song-store.epiccodewizard2.repl.co/music/one?mid=${mid}
    `
}

export let moralis = {
    SERVER_URL: 'https://xfbnhuzoic7x.usemoralis.com:2053/server',
    APP_ID: 'FItpSIxOvAYYjTDZvFEvCaj4g1uvAW6cX4l2CKkM'
}

