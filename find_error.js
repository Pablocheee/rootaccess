const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');
const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
    scriptMatch.forEach((script, i) => {
        let content = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        try {
            require('vm').Script(content);
            console.log("Script", i, "is OK");
        } catch (e) {
            console.log("Error in script", i);
            console.log(e);
        }
    });
}
