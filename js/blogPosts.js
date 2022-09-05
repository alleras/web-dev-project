// Requires library: https://unpkg.com/showdown/dist/showdown.min.js
// A Handlebars helper that will process markdown in a supplied string and convert it to an HTML Safe String
Handlebars.registerHelper("process-markdown", (text) => {
    // Initialize showdown converter
    let converter = new showdown.Converter();
    // For debugging purposes
    console.log(new Handlebars.SafeString(converter.makeHtml(text)));
    // We convert the Markdown Syntax to HTML with makeHtml, and then return a SafeString with the HTML string
    return new Handlebars.SafeString(converter.makeHtml(text));
});