const ejs = require("ejs");




async function markup(path, data) {

    try {

        let html = await ejs.renderFile(path, data);

        console.log(html);

        return html;

    } catch (error) {

        console.log(error);

    }

}




module.exports = markup;