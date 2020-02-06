

## 5Feb Errors
Add filter contentClass for templates, TourListTag etc:-
query {
  allMdx(
    limit: 2000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {frontmatter: {tags: { in: "Adventure" } }}
  ) {
        totalCount
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              tourId
              title
              date
              tags
              price_from
              featuredImage {
                id
              }
              meeting
            }
          }
        }
      }
  }

----------------------------------------------
Extract from gatsby-node
Creating regional tour lists
allRegions:-
[ 'La Fortuna', 'Osa' ]
# tours in La Fortuna: 4
Distinct tags for region La Fortuna:-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building' ]
slug = /la fortuna/
# tours in Osa: 1
Distinct tags for region Osa:-
[ 'Canopy', 'Adventure' ]
slug = /osa/
All tags for country (allTags):-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building',
  'Canopy' ]
index=6;template=SingleTour
tour: /tours/mountain-biking-arenal-single-track-madness/

Creating regional tour lists
allRegions:-
[ 'La Fortuna', 'Osa' ]
# tours in La Fortuna: 4
Distinct tags for region La Fortuna:-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building' ]
slug = /la fortuna/
# tours in Osa: 1
Distinct tags for region Osa:-
[ 'Canopy', 'Adventure' ]
slug = /osa/
All tags for country (allTags):-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building',
  'Canopy' ]
index=7;template=SingleTour
tour: /tours/new-gravity-falls-waterfall-jumping/

Creating regional tour lists
allRegions:-
[ 'La Fortuna', 'Osa' ]
# tours in La Fortuna: 4
Distinct tags for region La Fortuna:-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building' ]
slug = /la fortuna/
# tours in Osa: 1
Distinct tags for region Osa:-
[ 'Canopy', 'Adventure' ]
slug = /osa/
All tags for country (allTags):-
[ 'Adventure',
  'Canyoning',
  'Biking',
  'Extreme',
  'Rafting',
  'One day',
  'Team building',
  'Canopy' ]

---------------------------------------------
Unknown field 'allMarkdownRemark' on type 'Query'. Source: document `workspaceSeedrez10SrcTemplatesTourListJs93730953` file: `GraphQL request`

File: src/templates/TourListTag.js

Can't resolve '../components/ListPageHeader' in '/workspace/seedrez10/src/templates'
Can't resolve '../components/SideBar' in '/workspace/seedrez10/src/templates'
Can't resolve '../components/TourSectionNew' in '/workspace/seedrez10/src/templates'
File: src/templates/TourListAll.js

-------------------------------------------
Creating regional tour lists
allRegions:-
[]
All tags for country (allTags):-
[]
index=8;template=SingleTour
tour: /tours/mountain-biking-arenal-single-track-madness/

Creating regional tour lists
allRegions:-
[]
All tags for country (allTags):-
[]
index=9;template=SingleTour
tour: /tours/new-gravity-falls-waterfall-jumping/

Creating regional tour lists
allRegions:-
[]
All tags for country (allTags):-
[]
index=10;template=SingleTour
tour: /tours/team-building-adventure-while-rafting/

Creating regional tour lists
allRegions:-
[]
All tags for country (allTags):-
[]