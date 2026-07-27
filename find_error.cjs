const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');
const scriptMatch = code.match(/<script type="module">([\s\S]*?)<\/script>/);
if (scriptMatch) {
    let content = scriptMatch[1];
    try {
        new Function(content);
        console.log("OK");
    } catch (e) {
        console.log(e);
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            try {
                new Function(lines.slice(0, i + 1).join('\n'));
            } catch (err) {
                if (err.message !== e.message && !err.message.includes('Unexpected end of input')) {
                    console.log("Possible error at line", i + 217); // approx
                    console.log(lines[i]);
                }
            }
        }
    }
}
