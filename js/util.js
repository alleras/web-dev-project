/*
    GENERAL OVERVIEW OF THIS FILE

    All in all, I love the idea of having a templating system that we could use to make development easier. However, full on templating is mostly available
    with Handlebars by using Express.js, which is not allowed.

    With this utils.js file I aim to enhance a little the capabilities of Handlebars.js without relying on external libraries that might need the host to
    spin up a server (a main deal-breaker for this assignment).

    The two motivations that led me to come up with this solution were:

    1) I want to be able to work on Handlebars templates and take advantage of the syntax highlighting in Visual Studio Code. 
       I achieve this by separating my templates into .hbs files which VSCode will recognize with the use of an extension.
    2) Separation of concerns and code organization: Mainly, I don't layouts and logic in one spot. By having separate .hbs files I
       can make sure that I get my design right regardless of where it is supposed to go.

    This utility file will provide me with a streamlined process to load all the templates and content of a site by abstracting it away.
    It is not a perfect solution, since I still have to duplicate the HTML, Header, body tags, etc.. in each 'Page' I want to publish. But
    all in all it makes my life a lot easier.
*/

// This function will read a local file using fetch() to gather the contents of the Handlebars template as a string
// so it can then be used with the compile() or registerPartial() function
async function readHandlebarsFile(templatePath){
    // Make sure that if the supplied template doesn't exist, or is empty, we throw an error
    if(templatePath === null || templatePath === '') 
        throw 'Handlebars file path is invalid: ' + templatePath;

    // We fetch the site for the file specified in templatePath
    const response = await fetch(templatePath);
    // Return the raw text of the handlebars template
    return response.text();
}

// General load of partials, I use layout elements such as header/footer/sidebar (not in this list) as partials to make my development easier
async function loadTemplatesAsPartials(){
    // Header and Footer partials are always added to the pages
    Handlebars.registerPartial('header', await readHandlebarsFile('./layouts/header.hbs'));           
    Handlebars.registerPartial('footer', await readHandlebarsFile('./layouts/footer.hbs'));           
}

// This is a general script for all of my pages, this will load the header and footer as partials (or anything else I'd like to add)
// And it will then inject the specified template (contentPath) to the convention-defined element, finding it by ID. 

// Note: This should be called on document load, but after data is gathered so it can be passed through.
async function initializeLayouts(contentPath, data){
    await loadTemplatesAsPartials();
    // Load the content template. This step first reads it from a file, then compiles it
    var hbsContent = Handlebars.compile(await readHandlebarsFile(contentPath));
    // Inject hbsContent (which is a collection of DOM nodes at this point) into the site
    document.body.innerHTML = hbsContent(data);
}