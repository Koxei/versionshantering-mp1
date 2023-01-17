const container = document.querySelector('[data-container]');
const template = document.querySelector('#template');
const country = document.querySelector('#country');

// Tar bort child elements från .cloneContainer när ny sökning görs
const removeChild = () => {
    let container = document.querySelector('[data-container]');
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
  }

// even listener när man bytar Country i <select> dropdown
country.addEventListener('change', e => {
    e.preventDefault()
    removeChild()
    console.log('You selected: ', this.value);
    fetch(`https://newsapi.org/v2/top-headlines?country=${country.value}&category=business&pageSize=100&apiKey=11bdf476bce441f48bc4221723622601`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(res);
    })
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.articles.length; i++) {
            let article = data.articles[i];

            // Deklarerar kopierade content till "clone"
            let clone = template.content.cloneNode(true).children[0]; 
            
            // Deklarerar variablar för kopierade objekt
            let author = clone.querySelector('.author');
            let urlToImg = clone.querySelector('img');
            let title = clone.querySelector('.title');
            let description = clone.querySelector('.description');
            let url = clone.querySelector('.url');
    
            // Lägger till API objektens values till den nya containern
            author.textContent = article.author;
            urlToImg.src = article.urlToImage;
            title.textContent = article.title;
            description.textContent = article.description;
            url.textContent = 'Source: ' + article.url;
    
            // Sätter img till en placeholder.png ifall det inte hittar en bild från API objektet
            urlToImg.onerror = () => {urlToImg.src = '../img/placeholder.png'}

            // Appendar template content till en existerande container ".cloneContainer"
            container.append(clone);
        }
    })
    .catch((error) => {
        console.log(error.status, error.message);
        alert('Could not find any Article');
    })
  });

