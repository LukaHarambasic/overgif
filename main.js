const { app, BrowserWindow, globalShortcut, remote } = require('electron')

const GIFS = [
    {
        file: 'party_hard.gif',
        shortcut: 'Control+P',
        //displayTime: 2000
    },
    {
        file: 'thanks.gif',
        shortcut: 'Control+X'
    },
    {
        file: 'hello.webp',
        shortcut: 'Control+O'
    }
]

const DEFAULT_DISPLAY_TIME = 2000

let window = null

function createWindow() {
    window = new BrowserWindow({
        width: 500,
        height: 300,
        transparent: true,
        frame: false
    })
}

app.whenReady().then( () => {
    createWindow()
    GIFS.forEach(gif => {
        globalShortcut.register(gif.shortcut, async () => {
            console.log(gif.file, gif.shortcut);
            await window.loadFile('gifs/' + gif.file);
            window.show();
            setTimeout(async () => {
                window.minimize();
                await window.loadFile('gifs/placeholder.svg');
            }, gif.displayTime || DEFAULT_DISPLAY_TIME);
        })
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})
