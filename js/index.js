const container = document.querySelector('[data-container]');
const template = document.querySelector('.template');
const srch = document.querySelector('.srch');
const btn = document.querySelector('.btn');
const animation = document.querySelector('.spinner-wrapper');
const form = document.querySelector('form');

// Tar bort child elements från .cloneContainer när ny sökning görs
const removeChild = () => {
    let container = document.querySelector('[data-container]');
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
  }

// Gömmer animationen
const hideAnimation = () => {
    animation.style.display = 'none';
  }
  document.body.onload = ShowNewsOnLoad()

  function ShowNewsOnLoad() {
      removeChild()
      console.log('You selected: ', this.value);
      fetch(`https://newsapi.org/v2/top-headlines?country=${country.value}&pageSize=100&apiKey=11bdf476bce441f48bc4221723622601`)
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
                  urlToImg.onerror = () => { urlToImg.src = '../img/placeholder.png' }
  
                  // Appendar template content till en existerande container ".cloneContainer"
                  container.append(clone);
              }
          })
          .catch((error) => {
              console.log(error.status, error.message);
              alert('Could not find any Article');
          })
  };

// Fetchar API'n från newsapi
const apiCall = () => {
    fetch(`https://newsapi.org/v2/top-headlines?q=${srch.value}&pageSize=100&apiKey=11bdf476bce441f48bc4221723622601`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } 
        return Promise.reject(res);
    })
    .then(data => {
        hideAnimation();
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
            author.textContent = "- " + article.author;
            urlToImg.src = article.urlToImage;
            title.textContent = article.title;
            description.textContent = article.description;
            url.textContent = article.url;
            url.href = article.url;
            
            // Sätter img till en placeholder.png ifall det inte hittar en bild från API objektet
            urlToImg.onerror = () => {urlToImg.src = '../img/placeholder.png'}

            // Appendar template content till en existerande container ".cloneContainer"
            container.append(clone);
        }
    })
    .catch((error) => {
        hideAnimation();
        console.log(error.status, error.message);
        alert('Could not find any Article');
    })
}

// event listener onClick
btn.addEventListener('click', e => {
    e.preventDefault();
    removeChild();
    
//   Animationen
    animation.style.display = "block";
    anime({
        targets: '.fading-circle',
        easing: 'easeOutExpo',
        loop: true,
        scale: [0, 1],
        opacity: {
        value: [1, 0],
        easing: 'linear',
        duration: 800,
        },
        delay: (el, i) => 150 * i,
    })
    apiCall();
})

// event listener on Enter
form.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        removeChild();
        
        //   Animationen
    animation.style.display = "block";
    anime({
        targets: '.fading-circle',
        easing: 'easeOutExpo',
        loop: true,
        scale: [0, 1],
        opacity: {
        value: [1, 0],
        easing: 'linear',
        duration: 800,
        },
        delay: (el, i) => 150 * i,
    })
    apiCall();
    }
})
