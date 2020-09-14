
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
          
          <h5 class="tertiary-color">{{locationName}}</h5><br>
          <div class="divider"></div><br>

          <ul>
          <li><a href="tel:+1-{{locationPhone}}" class="collection-item"><i class="small material-icons prefix vertical-align-middle">phone</i> {{locationPhone}}</a><br></li>
          <li><p class="white-text"> <i class="material-icons vertical-align-middle">mode_edit</i> Fax: {{locationFax}}</p></li>
          <li><a href="{{locationAddressLink}}" class="collection-item" target="_blank"><i class="small material-icons vertical-align-middle">add_location</i> {{locationAddress}}</a></li>
          
          
          </ul>
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
            `
            <article>
            
            <h5 class="tertiary-color">{{userName}}</h5><br>
            <div class="divider"></div><br>
    
            <h6 class="white-text">{{userTitle}}</h6><br><br>
            <ul>
            <li><p class="white-text"> <i class="material-icons vertical-align-middle">group</i> Department: {{userDepartment}}</p></li>
            <li><a href="mailto:{{userEmail}}"><i class="material-icons white-text vertical-align-middle">mail</i> {{userEmail}}</a></li>
            <li><a href="tel:+1-{{userCellPhone}}"><i class="material-icons white-text vertical-align-middle">phone_iphone</i> {{userCellPhone}}</a></li>
            <li><a href="tel:+1-{{userOfficePhone}}"><i class="material-icons white-text vertical-align-middle">phone</i> Office Phone: {{userOfficePhone}}</a></li>
            <li><p class="white-text"><i class="material-icons vertical-align-middle">dialpad</i> Ext: {{userExt}}</p></li>
            </ul>
            </article>
            
  
            `,
          },
        
        }),
      ]),
  ]),




  
  search.start();