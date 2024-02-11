function loadData(callback) {
  fetch('./Data/data.json')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Ошибка при загрузке данных:', error));
}

function showAutocompleteResults(results) {
  const autocompleteResults = document.getElementById('autocompleteResults');
  const searchInput = document.getElementById('searchInput');
  
  autocompleteResults.innerHTML = '';

  if (results.length === 0) {
    const noResultsLi = document.createElement('li');
    noResultsLi.textContent = 'Нет результатов';
    autocompleteResults.appendChild(noResultsLi);
    autocompleteResults.style.border = '1px solid #ccc';
    return;
  } else {
    results.forEach(result => {
      const li = document.createElement('li');
      
      const searchIcon = document.createElement('i');
      searchIcon.className = 'fa-solid fa-search';
      
      li.appendChild(searchIcon);
      
      const textNode = document.createTextNode(result);
      
      li.appendChild(textNode);
      
      li.addEventListener('click', () => {
        searchInput.value = result;
        autocompleteResults.style.display = 'none';
        searchInput.blur();
        changeToSearchButton();
      });
      
      autocompleteResults.appendChild(li);
    });
  }

  autocompleteResults.style.border = results.length || !searchInput.value ? '1px solid #ccc' : 'none';
}


const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearchInput); 

function handleSearchInput() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (searchTerm.length < 3) {
    const autocompleteResults = document.getElementById('autocompleteResults');
    autocompleteResults.style.border = '1px solid #ccc';
    autocompleteResults.innerHTML = '';
    return;
  }
  
  loadData(data => {
    const results = data.filter(item => item.toLowerCase().includes(searchTerm));
    const autocompleteResults = document.getElementById('autocompleteResults');
    if (results.length > 0) {
      showAutocompleteResults(results);
    } else {
      autocompleteResults.innerHTML = '<li>Нет результатов</li>';
    }
  });
}



function changeToBackButton() {
  const searchIcon = document.querySelector('.search-bar i');
  searchIcon.classList.remove('fa-search');
  searchIcon.classList.add('fa-arrow-left');
  searchIcon.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchIcon.style.display = 'none';
    const autocompleteResults = document.getElementById('autocompleteResults');
    autocompleteResults.style.display = 'none';
    changeToSearchButton();n
  });
}


function changeToSearchButton() {
  const searchIcon = document.querySelector('.search-bar i');
  searchIcon.classList.remove('fa-arrow-left');
  searchIcon.classList.add('fa-search');
  searchIcon.style.display = 'block';
}

const searchIcon = document.querySelector('.search-bar i');
searchIcon.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  searchInput.blur();
  const autocompleteResults = document.getElementById('autocompleteResults');
  autocompleteResults.style.display = 'none';
  changeToSearchButton();
});

searchInput.addEventListener('focus', () => {
  const autocompleteResults = document.getElementById('autocompleteResults');
  if (autocompleteResults.innerHTML) {
    autocompleteResults.style.border = '1px solid #ccc';
  }
});

searchInput.addEventListener('blur', () => {
  const autocompleteResults = document.getElementById('autocompleteResults');
  autocompleteResults.style.border = 'none';
});

searchInput.addEventListener('input', () => {
  const searchIcon = document.querySelector('.search-bar i');
  if (searchInput.value.trim() === '') {
    changeToSearchButton();
  } else {
    changeToBackButton();
  }
});


  function showNotification() {
    document.getElementById('overlay').style.display = 'block';
  }
  

  function hideNotification() {
    document.getElementById('overlay').style.display = 'none';
  }
  

  function deleteNotification(icon) {
    icon.closest('.notification-item').remove();
  }
  

  function clearNotifications() {
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
      item.remove();
    });
  }


  
  const slider = document.querySelector('.slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
  


function openAllNewsPanel() {
  var overlay = document.getElementById('news-overlay');

  overlay.style.display = 'block';

  var newsPanel = document.querySelector('.news-overlay .news-items');
  newsPanel.innerHTML = '';

  var newsItems = document.querySelectorAll('.news-item');
  newsItems.forEach(function(item) {
    var clonedItem = item.cloneNode(true);
    clonedItem.removeAttribute('onclick');

    var image = clonedItem.querySelector('img');
    if (image) {
      var altText = image.getAttribute('alt');
      image.setAttribute('alt', altText || 'News Image');
    }
    
    clonedItem.addEventListener('click', function() {
      var itemId = parseInt(this.getAttribute('data-item'));
      openNewsItem(itemId);
    });

    newsPanel.appendChild(clonedItem);
  });
}



function closeAllNewsPanel() {
  var overlay = document.getElementById('news-overlay');

  overlay.style.display = 'none';
}

window.onload = function() {
  var newsItems = document.querySelectorAll('.news-item');
  
  newsItems.forEach(function(item) {
    var paragraphElement = item.querySelector('.news-content p');
    
    if (paragraphElement) {
      var paragraphText = paragraphElement.innerHTML.slice(0, 77) + (paragraphElement.innerHTML.length > 50 ? '...' : '');
      
      paragraphElement.innerHTML = paragraphText;
    }
  });
};

function openNewsItem(itemId) {
  var overlay = document.getElementById('news-overlay');
  var panel = document.getElementById('news-panel');

  overlay.style.display = 'none';

  panel.style.display = 'block';

  var newsItems = document.querySelectorAll('.news-item');
  newsItems.forEach(function(item) {
    if (item.getAttribute('data-item') != itemId) {
      item.classList.remove('clicked');
    }
  });

  var clickedItem = document.querySelector('.news-item[data-item="' + itemId + '"]');
  clickedItem.classList.add('clicked');

  var newsContent = getNewsContent(clickedItem);

  var newsPanelContent = panel.querySelector('.news-item-content');
  newsPanelContent.innerHTML = newsContent;
}

function closeNewsPanel() {
  var panel = document.getElementById('news-panel');

  panel.style.display = 'none';
}

function getNewsContent(clickedItem) {
  var title = clickedItem.querySelector('.news-content h3').innerHTML;
  var paragraph = clickedItem.querySelector('.news-content p').getAttribute('data-full-text');
  var date = clickedItem.querySelector('.news-content .news-date').innerHTML;

  var newsContent = `
    <div class="news-content">
      <h2>${title}</h2>
      <p>${paragraph}</p>
      <span class="news-date">${date}</span>
    </div>
  `;

  var originalImage = clickedItem.querySelector('img');
  if (originalImage) {
    var clonedImage = originalImage.cloneNode(true);
    newsContent = clonedImage.outerHTML + newsContent;
  }

  return newsContent;
}