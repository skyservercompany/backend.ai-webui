export class BackendAIPainKiller {
    static errorMessageTable = {
        "Cannot read property 'map' of null": "User has no group. Please contact administrator to fix it.",
        "Cannot read property 'split' of undefined": 'Wrong API server address.',
        "server responded failure: 400 Bad Request - The virtual folder already exists with the same name.": "A virtual folder with the same name already exists. Delete your own folder or decline the invitation.",
        "server responded failure: 400 Bad Request - Missing or invalid API parameters. (You cannot create more vfolders.)": "You cannot create more vfolders due to resource policy"
    }

    static relieve(msg) {
        if (BackendAIPainKiller.errorMessageTable.hasOwnProperty(msg)) {
            return BackendAIPainKiller.errorMessageTable[msg];
        } else {
            return msg;
        }
    }
}