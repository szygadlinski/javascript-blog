'use strict';

{

  /* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }) */

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

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function(customSelector = ''){
    console.log('Function "generateTitleLinks" executed.');

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find and get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create html of the link */

      const htmlLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */

      html = html + htmlLink;
      //titleList.insertAdjacentHTML('beforeend', htmlLink); /* druga metoda */

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();


  const generateTags = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */
    for (let article of articles){

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);

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

      /* END LOOP: for each tag */
      }

      /* insert html of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article */
    }

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
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for (let link of links){

      /* add tagClickHandler as event listener for each link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }

  };

  addClickListenersToTags();


  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
      const authorList = article.querySelector(optArticleAuthorSelector);
      const authors = article.getAttribute('data-author');
      const htmlAuthor = '<li><a href="#author-' + authors + '">by ' + authors + '</a></li>';
      authorList.innerHTML = htmlAuthor;
    }
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
    const links = document.querySelectorAll('.post-author a');
    for (let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();


}
