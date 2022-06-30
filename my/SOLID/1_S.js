
// S - Single Repovsibility Principle

class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }

    // printHTML() {
    //     return `
    //         <div class="news>
    //             <h1>${this.title}</h1>
    //             <p>${this.text}</p>
    //         </div>
    //     `;
    // }

    // printJSON() {
    //     return JSON.stringify({
    //         title: this.title,
    //         text: this.text,
    //         modified: this.modified,
    //     });
    // }

    // printXML() {
    //     return `
    //         <news>
    //             <title>${this.title}</title>
    //             <text>${this.text}</text>
    //         </news>
    //     `;
    // }
}

class NewsPrinter {
    constructor(news) {
        this.news = news
    }

    html() {
        return `
            <div class="news>
                <h1>${this.news.title}</h1>
                <p>${this.news.text}</p>
            </div>
        `;
    }

    json() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified,
        });
    }

    xml() {
        return `
            <news>
                <title>${this.news.title}</title>
                <text>${this.news.text}</text>
            </news>
        `;
    }
}

const printer = new NewsPrinter(
    new News('News title1', 'News text1')
);

// console.log(news1);
// console.log(news1.printHTML());
// console.log(news1.printJSON());

// console.log(printer);
console.log(printer.html());
console.log(printer.json());
console.log(printer.xml());