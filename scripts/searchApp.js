
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
      placeholder: 'Search',

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
        item: //article tag lets it display on multiple lines rather than all inline
          `
          <article>
          
          <h6 class="tertiary-color">{{locationName}}</h6><br>
          <div class="divider"></div><br>
          <div class="section">
          <a  href="tel:+1-{{locationPhone}}" class="collection-item"><i class="small material-icons prefix vertical-align-middle">phone</i> {{locationPhone}}</a><br>
          <p class="white-text"> <i class="material-icons vertical-align-middle">mode_edit</i> Fax: {{locationFax}}</p>
          <a href="{{locationAddressLink}}" class="collection-item" target="_blank"><i class="small material-icons vertical-align-middle">add_location</i> {{locationAddress}}</a>
          </div>
          </article>
          

          `,
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