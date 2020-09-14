
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
            `
            <article>
            
            <h6 class="tertiary-color">{{userName}}</h6><br>
            <div class="divider"></div><br>
            <div class="section">

            <ul class="collection">
            <p class="white-text"> <i class="collection-item material-icons vertical-align-middle">speaker_notes</i> Title: {{userTitle}}</p>
            <p class="white-text"> <i class="collection-item material-icons vertical-align-middle">group</i> Department: {{userDepartment}}</p>
            <a href="mailto:{{userEmail}}"><i class="collection-item material-icons white-text vertical-align-middle">mail</i> {{userEmail}}</a>
            <a href="tel:+1-{{userCellPhone}}"><i class="collection-item material-icons white-text vertical-align-middle">phone_iphone</i> {{userCellPhone}}</a>
            <a href="tel:+1-{{userOfficePhone}}"><i class="collection-item material-icons white-text vertical-align-middle">phone</i> Office Phone: {{userOfficePhone}}</a>
            <p class="white-text"> <i class="collection-item material-icons vertical-align-middle">dialpad</i> Ext: {{userExt}}</p>
            </ul>
            
            
            </div>
            </article>
            
  
            `,
          },
        
        }),
      ]),
  ]),




  
  search.start();