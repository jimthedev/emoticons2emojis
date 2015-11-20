This is is a node project that helps you to import your Hipchat emoticons into Slack as emoji.

## Usage

1. git clone this repo
2. npm install
3. Create a Hipchat v2 Api key with View Group permissions 
4. Copy the api key into the right place in src/index.js
5. Run using `./src/index.js`
6. Enter the slack information when prompted.
7. When it asks you for a path, tell it to use emoticons.yml
8. That's it, it should start the process of importing your emoticons into slack.

## Restrictions / Cautions
- Slack limits emojis to 64kb. If you have Hipchat gifs that are over 64kb, they will fail to upload but you will not get an error. 
- Only works with hipchat api v2.
- I've only used it once, but it worked. :D
- If you want more than 1000 emoticons imported then this won't handle it. (though you can edit the code to make it work)
- No tests because I'm the actual worst.
- No idea how this would work on windows. Only tried it on osx yosemite.
- Only tried it on Node 4.2.1 with Npm 3. Good luck with other versions.