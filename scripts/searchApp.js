
  // global algoliasearch instantsearch

const searchClient = algoliasearch(
    'PSNTZI3HVW', //YOUR ALGOLIA APP ID
    '634647cb6206ddc068510c9deaa72d3e' //YOUR ALGOLIA PUBLIC SEARCH API KEY
  );
  


  const search = instantsearch({
    indexName: 'locations', //CHANGE TO YOUR ALGOLIA INDEX NAME
    searchClient,
  });
  

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',

    }),
    instantsearch.widgets.configure({
        hitsPerPage: 5,
    }),
    //adds the multiple pages functionality
    instantsearch.widgets.pagination({
        container: '#pagination',
      }),

    instantsearch.widgets.hits({
      container: '#hits',

      templates: {
        item:
          '<h6>{{locationName}}</h6>',
      },
    }),
  
    instantsearch.widgets
      .index({ indexName: 'employees' })
      .addWidgets([
        instantsearch.widgets.hits({
          container: '#hitsTwo',
          templates: {
            item:
              '<h6>{{userName}}</h6>',
          },
        
        }),
      ]),
  ]),




  
  search.start();