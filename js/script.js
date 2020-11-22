'use strict';

{

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags',
    authorListSelector: '.authors',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-'
  };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clicked element:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('selected article:', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('target article:', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };


  const generateTitleLinks = function(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    let html = '';

    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    for (let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find and get the title from the title element */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      /* create html of the link */
      const htmlLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html = html + htmlLink;
      // titleList.insertAdjacentHTML('beforeend', htmlLink); /* druga metoda */

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();


  const calculateTagsParams = function(tags){
    const params = {'max': 0, 'min': 999999};

    for (let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times.');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    return params;
  };


  const calculateTagClass = function(count, params){

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

    /* let tagSize;                                                                         // mój sposób, nie działa, zawsze wychodzi 1 lub 2
    const classWidth = ((params.max - params.min) / opt.cloudClassCount);

    if (count <= (classWidth + params.min)) {
      classNumber = '1';
    } else if ((classWidth + params.min) < count <= (classWidth * 2 + params.min)) {
      classNumber = '2';
    } else if ((classWidth * 2 + params.min) < count <= (classWidth * 3 + params.min)) {
      classNumber = '3';
    } else if ((classWidth * 3 + params.min) < count <= (classWidth * 4 + params.min)) {
      classNumber = '4';
    } else {
      classNumber = '5';
    } */

    return opt.cloudClassPrefix + classNumber;

  };


  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article */
    for (let article of articles){

      /* find tags wrapper */
      const tagsList = article.querySelector(opt.articleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');


      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){

        /* generate html of the link */
        const htmlTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + htmlTag;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tags to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert html of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags */
    for (let tag in allTags){

      /* [NEW] generate code of the link and add it to allTagsHTML */
      allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(allTagsHTML);

    /* [NEW] END LOOP: for each tag in allTags */
    }

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  };

  generateTags();


  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags){

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const foundTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let foundTag of foundTags){

      /* add class active */
      foundTag.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a, .tags a');

    /* START LOOP: for each link */
    for (let link of links){

      /* add tagClickHandler as event listener for each link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }

  };

  addClickListenersToTags();


  const generateAuthors = function(){

    let allAuthors = {};
    const articles = document.querySelectorAll(opt.articleSelector);

    for (let article of articles){
      const authorList = article.querySelector(opt.articleAuthorSelector);
      const author = article.getAttribute('data-author');
      const htmlAuthor = '<li><a href="#author-' + author + '">by ' + author + '</a></li>';

      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

      authorList.innerHTML = htmlAuthor;
    }

    const authorsList = document.querySelector(opt.authorListSelector);
    let allAuthorsHTML = '';
    for (let author in allAuthors){
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
    }
    authorsList.innerHTML = allAuthorsHTML;
  };

  generateAuthors();


  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors){
      activeAuthor.classList.remove('active');
    }
    const foundAuthors = document.querySelectorAll('a[href="' + href + '"]');
    for (let foundAuthor of foundAuthors){
      foundAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){
    const links = document.querySelectorAll('.post-author a, .authors a');
    for (let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();


}
