// Requires library: https://unpkg.com/showdown/dist/showdown.min.js
Handlebars.registerHelper("process-markdown", (text) => {
    let converter = new showdown.Converter();
    console.log(new Handlebars.SafeString(converter.makeHtml(text)));
    return new Handlebars.SafeString(converter.makeHtml(text));
});