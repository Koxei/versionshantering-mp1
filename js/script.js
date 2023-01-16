// 11bdf476bce441f48bc4221723622601
const container = document.querySelector('[data-container]');
const template = document.querySelector('#template');
const btn = document.querySelector('#btn');




fetch('https://newsapi.org/v2/top-headlines?q=ai&apiKey=11bdf476bce441f48bc4221723622601')
.then(res => res.json())
.then(data => {
    for (let i = 0; i < data.articles.length; i++) {
        let article = data.articles[i];
        let clone = template.content.cloneNode(true).children[0]; 
        
        let author = clone.querySelector('.author');
        let urlToImag = clone.querySelector('img');
        let title = clone.querySelector('.title');
        let description = clone.querySelector('.description');
        let url = clone.querySelector('.url');

        author.textContent = article.author;
        urlToImag.src = article.urlToImage;
        title.textContent = article.title;
        description.textContent = article.description;
        url.textContent = article.url;

        container.append(clone);
    }


})